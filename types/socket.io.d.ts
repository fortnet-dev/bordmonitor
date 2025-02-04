import type { Server } from "socket.io"
import type { Socket } from "socket.io-client"

type ServerToClientEvents = {
	hello: (callback: (data: string) => void) => void
	log: (data: string) => void
}

type ClientToServerEvents = {
	hello: (callback: (data: string) => void) => void
}

export type SocketServer = Server<ClientToServerEvents, ServerToClientEvents>
export type SocketClient = Socket<ServerToClientEvents, ClientToServerEvents>
