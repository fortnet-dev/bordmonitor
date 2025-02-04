import { systemBus, Message, Variant, MessageType } from "dbus-next"

const bus = systemBus()
const BLUEZ_SERVICE = "org.bluez"
const BLUEZ_DEVICE_INTERFACE = "org.bluez.Device1"
const DEBUG = false // Debugging ein-/ausschalten

// Hilfsfunktion zum Entpacken von Variants
function deepUnpack(value: any): any {
	if (value instanceof Variant) {
		return deepUnpack(value.value)
	}
	if (Array.isArray(value)) {
		return value.map(deepUnpack)
	}
	if (value && typeof value === "object") {
		return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, deepUnpack(v)]))
	}
	return value
}

async function getManagedObjects() {
	const msg = await bus.call(
		new Message({
			destination: BLUEZ_SERVICE,
			path: "/",
			interface: "org.freedesktop.DBus.ObjectManager",
			member: "GetManagedObjects",
		}),
	)
	return msg.body[0] as Record<string, Record<string, Record<string, Variant>>>
}

async function findPlayerPath() {
	try {
		const objects = await getManagedObjects()

		for (const [path, interfaces] of Object.entries(objects)) {
			if (DEBUG) console.log("[DEBUG] Checking path:", path)

			if (interfaces[BLUEZ_DEVICE_INTERFACE]?.Connected?.value === true) {
				if (DEBUG) console.log("[DEBUG] Found connected device at:", path)

				const playerPath = Object.keys(objects).find(
					(p) => p.startsWith(path) && objects[p]["org.bluez.MediaPlayer1"],
				)

				if (playerPath) {
					if (DEBUG) console.log("[DEBUG] Found media player at:", playerPath)
					return playerPath
				}
			}
		}
		throw new Error("No active media player found")
	} catch (error) {
		console.error("[DEBUG] Error in findPlayerPath:", error)
		throw error
	}
}

function formatDuration(ms: number) {
	const minutes = Math.floor(ms / 60000)
	const seconds = Math.floor((ms % 60000) / 1000)
	return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

async function monitorMetadata() {
	try {
		const playerPath = await findPlayerPath()
		console.log(`\n🎧 Monitoring Bluetooth Player: ${playerPath}\n`)

		const matchRule = [
			"type='signal'",
			"interface='org.freedesktop.DBus.Properties'",
			"member='PropertiesChanged'",
			`path='${playerPath}'`,
		].join(",")

		if (DEBUG) console.log("[DEBUG] Adding match rule:", matchRule)

		await bus.call(
			new Message({
				destination: "org.freedesktop.DBus",
				path: "/org/freedesktop/DBus",
				interface: "org.freedesktop.DBus",
				member: "AddMatch",
				signature: "s",
				body: [matchRule],
			}),
		)

		let currentTrack = {
			title: "Unknown Title",
			artist: "Unknown Artist",
			album: "Unknown Album",
			duration: 0,
		}

		bus.on("message", (msg: Message) => {
			try {
				if (DEBUG)
					console.log("\n[DEBUG] Raw message received:", {
						type: MessageType[msg.type],
						path: msg.path,
						interface: msg.interface,
						member: msg.member,
						body: msg.body,
					})

				if (
					msg.type === MessageType.SIGNAL &&
					msg.interface === "org.freedesktop.DBus.Properties" &&
					msg.member === "PropertiesChanged" &&
					msg.path === playerPath
				) {
					const [interfaceName, changedProps] = msg.body as [
						string,
						Record<string, Variant>,
					]

					if (DEBUG)
						console.log(
							"[DEBUG] Properties changed:",
							interfaceName,
							Object.keys(changedProps).join(", "),
						)

					// Track-Informationen verarbeiten
					if (changedProps.Track) {
						const rawTrack = deepUnpack(changedProps.Track)
						if (DEBUG)
							console.log("[DEBUG] Raw track data:", JSON.stringify(rawTrack, null, 2))

						currentTrack = {
							title: rawTrack.Title || "Unknown Title",
							artist: Array.isArray(rawTrack.Artist)
								? rawTrack.Artist.join(", ")
								: rawTrack.Artist || "Unknown Artist",
							album: rawTrack.Album || "Unknown Album",
							duration: rawTrack.Duration || 0,
						}

						console.log(
							`\n🎶 Now Playing:\n` +
								`   Title:  ${currentTrack.title}\n` +
								`   Artist: ${currentTrack.artist}\n` +
								`   Album:  ${currentTrack.album}\n` +
								`   Length: ${formatDuration(currentTrack.duration)}`,
						)
					}

					// Positions-Updates
					if (changedProps.Position) {
						const position = deepUnpack(changedProps.Position)
						if (DEBUG) console.log("[DEBUG] Position update:", position)

						if (currentTrack.duration > 0) {
							console.log(
								`   Progress: ${formatDuration(position)} / ${formatDuration(currentTrack.duration)}\n` +
									`   ${renderProgressBar(position, currentTrack.duration)}\n`,
							)
						}
					}
				}
			} catch (error) {
				console.error("\n[DEBUG] Error processing message:", error)
			}
		})
	} catch (error) {
		console.error("\n[DEBUG] Critical error:", error)
	}
}

function renderProgressBar(position: number, duration: number) {
	const progress = Math.min(1, position / duration)
	const filled = Math.floor(progress * 20)
	return `[${"█".repeat(filled)}${"░".repeat(20 - filled)}]`
}

monitorMetadata()
