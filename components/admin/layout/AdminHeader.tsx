"use client";

import {
  BookOpen,
  Code2,
  ExternalLink,
  Layers,
  LayoutDashboard,
  Menu,
  PlayCircle,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import AdminLogOutButton from "./AdminLogOutButton";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/modules", label: "Modules", icon: Layers },
  { href: "/admin/lessons", label: "Lessons", icon: PlayCircle },
  { href: "/admin/categories", label: "Categories", icon: Tag },
];

function AdminHeader() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#e2e8f0] bg-white/90 backdrop-blur-xl">
      <div className="flex h-14 items-center px-4 lg:px-6">
        <Link
          href="/admin"
          className="flex items-center gap-2.5 font-semibold lg:mr-8"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF6B2C] shadow-md shadow-[#FF6B2C]/20">
            <Code2 className="h-4 w-4 text-white" />
          </div>
          <span className="hidden text-lg text-[#1A1A1A] sm:inline">Admin</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-[rgba(255,107,44,0.12)] text-[#c44a1a]"
                    : "text-[rgba(26,26,26,0.55)] hover:bg-[#F8F9FA] hover:text-[#1A1A1A]",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/studio"
            className="text-sm text-[rgba(26,26,26,0.55)] transition-colors hover:text-[#FF6B2C]"
          >
            Open Studio
          </Link>
          <AdminLogOutButton />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-[rgba(26,26,26,0.55)] hover:bg-[#F8F9FA] hover:text-[#1A1A1A]"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 border-[#e2e8f0] bg-white"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href, item.exact);
              return (
                <DropdownMenuItem key={item.href} asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex cursor-pointer items-center gap-2",
                      active
                        ? "bg-[rgba(255,107,44,0.1)] text-[#c44a1a]"
                        : "text-[#1A1A1A]",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator className="bg-[#e2e8f0]" />
            <DropdownMenuItem asChild>
              <Link
                href="/studio"
                className="flex cursor-pointer items-center gap-2 text-[#1A1A1A]"
              >
                <ExternalLink className="h-4 w-4" />
                Open Studio
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#e2e8f0]" />
            <div className="p-2">
              <AdminLogOutButton />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default AdminHeader;
