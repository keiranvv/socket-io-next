"use client";

import { useSocketIo } from "@/contexts/socketIoContext";
import Link from "next/link";

export function Header() {
  const { status } = useSocketIo();

  return (
    <nav style={{ padding: "2rem" }}>
      My app header: {status}
      <ul>
        <li>
          <Link href="/">Home Page</Link>
        </li>
        <li>
          <Link href="/test/">Test Page</Link>
        </li>
      </ul>
    </nav>
  );
}
