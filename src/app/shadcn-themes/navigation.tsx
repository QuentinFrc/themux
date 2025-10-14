"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FrameHighlight } from "@/components/frame-highlight";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ContainerWrapper } from "@/components/wrappers";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useMediaQuery } from "@/hooks/use-media-query";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MainNavigation() {
  return (
    <nav className="flex items-center gap-4">
      <Link className="pr-4 font-base font-bold" href={"/"}>
        themux
      </Link>
      <div className="contents max-md:hidden">
        {NAV_LINKS.map(({ href, title }) => (
          <NavLink href={href} key={href} title={title} />
        ))}
      </div>
    </nav>
  );
}

export function MobileNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobile && isOpen) {
      //  Close the mobile menu if the screen size gets larger and it's open
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);

  useClickOutside(mobileMenuRef, () => setIsOpen(false));

  return (
    <div ref={mobileMenuRef}>
      <Button
        className="inline-flex md:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
        size="icon"
        variant="ghost"
      >
        <Menu
          className={cn(
            "size-4 transition duration-200",
            isOpen ? "absolute scale-0" : "scale-100"
          )}
        />
        <X
          className={cn(
            "size-4 transition duration-200",
            isOpen ? "scale-100" : "absolute scale-0"
          )}
        />
      </Button>
      <div
        className={cn(
          "absolute inset-x-0 top-full z-40 grid grid-rows-[0fr] gap-2 overflow-hidden bg-background transition-all duration-200 ease-out md:grid-rows-[0fr]",
          isOpen && isMobile ? "grid-rows-[1fr] border-b" : ""
        )}
      >
        <ContainerWrapper className="overflow-hidden">
          <Label className="text-muted-foreground text-xs">Navigation</Label>
          <div className="flex flex-col gap-2.5 pt-2 pb-4">
            {NAV_LINKS.map(({ href, title }) => {
              const isSamePathname = pathname === href;
              return (
                <button
                  className="m-0 h-fit p-0 text-left"
                  key={href}
                  onClick={() => {
                    if (isSamePathname) return;
                    // Only close the mobile menu if the link clicked has a different pathname
                    setIsOpen(false);
                  }}
                >
                  <NavLink href={href} title={title} />
                </button>
              );
            })}
          </div>
        </ContainerWrapper>
      </div>
    </div>
  );
}

function NavLink({ href, title }: { href: string; title: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      className={cn(
        "relative text-muted-foreground text-sm transition-all ease-out hover:text-accent-foreground",
        isActive && "text-foreground hover:text-foreground"
      )}
      href={href}
      key={href}
      onNavigate={(e) => {
        if (isActive) e.preventDefault();
      }}
    >
      {isActive ? <FrameHighlight>{title}</FrameHighlight> : title}
    </Link>
  );
}
