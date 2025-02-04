import type { SocketServer } from "~/types/socket.io"

const wait = (t: number): Promise<void> => new Promise((r) => setTimeout(r, t))
export const dbusLogger = async (io: SocketServer) => {
	while (true) {
		await wait(1000)
		io.emit("log", `dbus log ${Math.random()}`)
	}
}
