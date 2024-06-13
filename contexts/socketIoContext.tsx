"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

type SocketIoContextType = {
  status: "connected" | "connecting" | "disconnected";
};

export const SocketIoContext = createContext<SocketIoContextType>({
  status: "disconnected",
} as SocketIoContextType);

export function SocketIoProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] =
    useState<SocketIoContextType["status"]>("disconnected");

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (socket) {
      return;
    }

    console.log("connecting...");
    setStatus("connecting");
    const sock = io("ws://localhost:8080");

    setSocket(sock);

    sock.on("connect", () => {
      console.log("connected");
      setStatus("connected");
    });

    sock.on("disconnect", () => {
      console.log("disconnected");
      setStatus("disconnected");
    });
  }, [socket]);

  return (
    <SocketIoContext.Provider value={{ status }}>
      {children}
    </SocketIoContext.Provider>
  );
}

export function useSocketIo() {
  const context = useContext(SocketIoContext);

  return context;
}
