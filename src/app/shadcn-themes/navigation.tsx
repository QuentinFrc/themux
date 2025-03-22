"use client";

import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNavigation() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-4 max-md:hidden">
      <Link href={"/"} className="font-base pr-4 font-bold">
        themux
      </Link>
      {NAV_LINKS.map(({ href, title }) => (
        <NavLink href={href} title={title} key={href} />
      ))}
    </nav>
  );
}

function NavLink({ href, title }: { href: string; title: string }) {
  const pathname = usePathname();

  return (
    <Link
      key={href}
      href={href}
      className={cn(
        "text-muted-foreground hover:text-foreground/80 text-sm transition-all ease-out",
        href === pathname && "text-foreground hover:text-foreground",
      )}
    >
      {title}
    </Link>
  );
}
