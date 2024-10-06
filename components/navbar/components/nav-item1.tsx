import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";

import { usePathname } from "next/navigation";

export default function Navitem1() {
    const PathName = usePathname();

  return (
    <>
      <Link href="/admin">
        <MenubarMenu>
          <MenubarTrigger className={PathName === "/admin" ? "text-blue-400" : ""}>Home</MenubarTrigger>
        </MenubarMenu>
      </Link>
      <Link href="/admin/clientbase">
        <MenubarMenu>
          <MenubarTrigger className={PathName === "/admin/clientbase" ? "text-blue-400" : ""}>ClientBase</MenubarTrigger>
        </MenubarMenu>
      </Link>
      <MenubarMenu>
        <MenubarTrigger className={PathName.startsWith("/admin/blogs") ? "text-blue-400" : ""}>Blogs</MenubarTrigger>
        <MenubarContent>
          <Link href="/admin/blogs/edit">
            <MenubarItem>Edit</MenubarItem>
          </Link>
          <Link href="/admin/blogs/new">
            <MenubarItem>New Blog</MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className={PathName.startsWith("/admin/interact") ? "text-blue-400" : ""}>Interact</MenubarTrigger>
        <MenubarContent>
          <Link href="/admin/interact/whatsapp">
            <MenubarItem>Send Custom Whatsapp</MenubarItem>
          </Link>
          <Link href="/admin/interact/clientProfile">
            <MenubarItem>Complete Client Profile</MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className={PathName.startsWith("/admin/gallery") ? "text-blue-400" : ""}>Gallery Manage</MenubarTrigger>
          <MenubarContent>
            <Link href="/admin/gallery/website">
              <MenubarItem>Change Website Images</MenubarItem>
            </Link>
            <Link href="/admin/gallery/manage">
              <MenubarItem>Manage Gallery</MenubarItem>
            </Link>
          </MenubarContent>
        </MenubarMenu>
    </>
  );
}
