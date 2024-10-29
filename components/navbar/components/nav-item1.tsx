import React from "react";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";

import { usePathname } from "next/navigation";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

export default function Navitem1() {
  const PathName = usePathname();
  const dt = new Date().getDate()+"/"+months[new Date().getMonth()];

  return (
    <>
      <Link href="/admin">
        <MenubarMenu>
          <MenubarTrigger
            className={PathName === "/admin" ? "text-blue-400" : ""}
          >
            Home
          </MenubarTrigger>
        </MenubarMenu>
      </Link>

      <MenubarMenu>
        <MenubarTrigger
          className={PathName === "/admin/clientbase" ? "text-blue-400" : ""}
        >
          ClientBase
        </MenubarTrigger>
        <MenubarContent>
          <Link href="/admin/clientbase/all/1">
            <MenubarItem>All</MenubarItem>
          </Link>
          <Link href="/admin/clientbase/search">
            <MenubarItem>Search</MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger
          className={PathName.startsWith("/admin/blogs") ? "text-blue-400" : ""}
        >
          Blogs
        </MenubarTrigger>
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
        <MenubarTrigger
          className={
            PathName.startsWith("/admin/interact") ? "text-blue-400" : ""
          }
        >
          Interact
        </MenubarTrigger>
        <MenubarContent>
          <Link href="/admin/interact/whatsapp">
            <MenubarItem>Initiate Whatsapp chat</MenubarItem>
          </Link>
          <Link href="/admin/interact/birthdays">
            <MenubarItem>Birthday on {dt}</MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger
          className={
            PathName.startsWith("/admin/gallery") ? "text-blue-400" : ""
          }
        >
          Gallery Manage
        </MenubarTrigger>
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
