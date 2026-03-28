"use client";

import { useLogOut } from "@sanity/sdk-react";
import { LogOut } from "lucide-react";

function AdminLogOutButton() {
  const logout = useLogOut();

  const handleLogout = () => {
    logout();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex items-center gap-2 rounded-md border border-[#e2e8f0] px-3 py-1.5 text-sm text-[rgba(26,26,26,0.55)] transition-colors hover:border-[#cbd5e1] hover:bg-[#F8F9FA] hover:text-[#1A1A1A]"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </button>
  );
}

export default AdminLogOutButton;
