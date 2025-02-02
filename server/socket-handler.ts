import type { SocketServer } from "~/types/socket.io"

export const socketHandler = (io: SocketServer) => {
	io.on("connection", (socket) => {
		console.log("socket connected", socket.id)
		socket.on("disconnect", () => {
			console.log("socket disconnected", socket.id)
		})

		socket.on("hello", (callback) => {
			callback("hello")
		})
	})
}
