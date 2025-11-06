import { io } from "socket.io-client"

// Only create a browser socket. During build (Node) there is no `window` and
// attempting to connect can cause errors or network activity during the build.
export const socket = (typeof window !== 'undefined')
	? io("https://cac-file-requisition-system-server.onrender.com")
	: null