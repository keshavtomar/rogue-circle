import React, { useEffect, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "../theme-toggle";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Navitem1 from "./components/nav-item1";
import Navitem2 from "./components/nav-item2";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // State to handle mobile menu toggle
  const PathName = usePathname();

  const logout = async () => {
    const res = await fetch("/api/admin/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/admin-login");
    } else {
      alert("Logout failed");
    }
  };

  return (
    <div className="relative">
      {/* Mobile Menu Toggle Button */}
      <button
        className="md:hidden p-2 text-gray-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}{" "}
        {/* Toggle between menu and close icons */}
      </button>

      <Menubar className="hidden md:flex justify-between items-center p-4 w-full">
        <div className="flex space-x-4">
          <Navitem1 />
        </div>
        <div className="flex items-center space-x-4">
          <Navitem2 />
        </div>
      </Menubar>

      {/* Mobile Menu */}
      {isOpen && (
        <Menubar className="flex flex-col space-y-2 md:hidden p-4 h-auto">
          <Navitem1 />
          <MenubarSeparator className="w-full" />
          <Navitem2 />
        </Menubar>
      )}
    </div>
  );
}
