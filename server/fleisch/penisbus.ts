import dbus, { Message, Variant } from "dbus-next"

const bus = dbus.systemBus()

const object = await bus.getProxyObject("org.bluez", "/org/bluez/hci0")

const Variant = dbus.Variant

// let mediaControls = obj.getInterface("org.bluez.MediaControl1")
// let deviceProperties = obj.getInterface("org.freedesktop.DBus.Properties")
// let battery = obj.getInterface("org.bluez.Battery1")

// let mediaControlsConnected = deviceProperties.Get("org.bluez.MediaControl1", "Connected")
// let mediaControlsPlayer = deviceProperties.Get("org.bluez.MediaControl1", "Player")

// console.log(obj.nodes)
const findPlayerPath = async () => {
	for (const node of object.nodes) {
		try {
			const nodeObject = await bus.getProxyObject("org.bluez", node)
			const deviceProperties = nodeObject.getInterface("org.freedesktop.DBus.Properties")
			const mediaControlsConnected = await deviceProperties.Get(
				"org.bluez.MediaControl1",
				"Connected",
			)

			if ((mediaControlsConnected.value) === true) {
				return node
			}
		} catch {
			continue
		}
	}
}



console.log(await findPlayerPath())
// console.log(mediaControls.$properties)

// await mediaControls.Play()
// console.log(await deviceProperties.Get("org.bluez.Battery1", "Percentage"))
