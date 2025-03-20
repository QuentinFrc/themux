"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", title: "home" },
  { href: "/shadcn-themes", title: "theme customizer" },
  { href: "/shadcn-themes/components", title: "components" },
  { href: "/shadcn-themes/fonts", title: "fonts" },
];

export default function MainNavigation() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-4 max-md:hidden">
      {NAV_LINKS.map(({ href, title }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "lowercase transition-all ease-out hover:text-neutral-500",
            href === pathname && "font-semibold",
          )}
        >
          {title}
        </Link>
      ))}
    </nav>
  );
}
