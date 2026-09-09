"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarNav() {
  const pathname = usePathname();

  const links = [
    { name: "Platform Global", href: "/dashboard" },
    { name: "IoT Sensors", href: "/dashboard/iot-sensors" },
    { name: "AI Action Ledger", href: "/dashboard/ai-ledger" },
    { name: "Configurations", href: "/dashboard/configurations" },
  ];

  return (
    <nav className="flex-1 space-y-3">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`block px-4 py-3 rounded-xl font-medium transition-colors cursor-pointer ${
              isActive
                ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border-l border-emerald-500/20 text-emerald-400"
                : "border-l border-transparent hover:bg-white/5 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
