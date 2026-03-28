"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import {
  BookOpen,
  Code2,
  LayoutDashboard,
  Menu,
  Play,
  Sparkles,
  Star,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const loggedOutLinks = [
  { href: "#courses", label: "Courses", homeOnly: true },
  { href: "/student-stories", label: "Student Stories" },
  { href: "/pricing", label: "Pricing" },
  { href: "#testimonials", label: "Reviews", homeOnly: true },
];

export function Header() {
  const pathname = usePathname();
  const { has } = useAuth();

  const isUltra = has?.({ plan: "ultra" });
  const isHomepage = pathname === "/";

  const visibleLoggedOutLinks = loggedOutLinks.filter(
    (link) => !link.homeOnly || isHomepage,
  );

  const loggedInLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/courses", label: "My Courses", icon: BookOpen },
    { href: "/student-stories", label: "Student Stories", icon: Star },
    ...(isUltra
      ? [{ href: "/pricing", label: "Account", icon: Sparkles }]
      : [{ href: "/pricing", label: "Upgrade", icon: Sparkles }]),
  ];

  const linkMuted = "text-[rgba(26,26,26,0.7)] hover:text-[#1A1A1A]";
  const linkActive = "bg-[#FF6B2C]/10 text-[#FF6B2C]";

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex h-24 w-full items-center border-b border-[#f1f5f9] bg-white/95 backdrop-blur-[24px]">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-6 lg:px-12">
        <div className="shrink-0">
          <Link href="/" className="group flex items-center gap-3">
            <Logo />
          </Link>
        </div>

        <div className="hidden min-w-0 flex-1 items-center justify-center md:flex">
          <SignedOut>
            <div
              className={cn(
                "flex items-center",
                isHomepage
                  ? "gap-10 text-[13px] font-bold tracking-[0.18em] text-[rgba(26,26,26,0.7)] uppercase"
                  : "gap-8 text-sm font-medium",
              )}
            >
              {visibleLoggedOutLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors duration-200 hover:text-[#1A1A1A]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SignedOut>

          <SignedIn>
            <div className="flex max-w-full flex-wrap items-center justify-center gap-1">
              {loggedInLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/dashboard" &&
                    pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all lg:px-4",
                      isActive ? linkActive : `${linkMuted} hover:bg-black/5`,
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="hidden lg:inline">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </SignedIn>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <SignedOut>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#1A1A1A] hover:bg-black/5"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="border border-slate-200 bg-white"
              >
                {visibleLoggedOutLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} className="cursor-pointer text-[#1A1A1A]">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className="text-[rgba(26,26,26,0.7)] hover:bg-black/5 hover:text-[#1A1A1A]"
              >
                Sign in
              </Button>
            </SignInButton>
            <Link href="/pricing" className="hidden sm:block">
              <Button className="h-11 rounded-full border-0 bg-[#1A1A1A] px-6 font-bold text-white hover:bg-[#2a2a2a] lg:px-8">
                Start Learning
              </Button>
            </Link>
          </SignedOut>

          <SignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#1A1A1A] hover:bg-black/5"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="border border-slate-200 bg-white"
              >
                {loggedInLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/dashboard" &&
                      pathname.startsWith(link.href));

                  return (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          "flex cursor-pointer items-center gap-2",
                          isActive ? "text-[#FF6B2C]" : "text-[#1A1A1A]",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 ring-2 ring-[#FF6B2C]/25",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <>
      <div className="relative">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6B2C] shadow-[0_10px_15px_-3px_rgba(255,107,44,0.3)] transition-shadow group-hover:shadow-[0_12px_20px_-4px_rgba(255,107,44,0.35)]">
          <Code2 className="h-5 w-5 text-white" />
        </div>
        <div className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FFC107]">
          <Play className="h-2 w-2 fill-white text-white" />
        </div>
      </div>
      <div className="flex flex-col font-['Outfit',sans-serif]">
        <span className="text-lg leading-none font-bold tracking-tight text-[#1A1A1A]">
          VISION
        </span>
        <span className="text-[10px] tracking-[0.2em] text-[#FF6B2C] uppercase">
          1000
        </span>
      </div>
    </>
  );
}
