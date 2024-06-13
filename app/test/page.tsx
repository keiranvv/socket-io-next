"use client";

import { useSocketIo } from "@/contexts/socketIoContext";

export default function TestPage() {
  const { status } = useSocketIo();

  return <nav>My test page: {status}</nav>;
}
