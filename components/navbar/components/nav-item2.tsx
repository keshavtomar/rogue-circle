import React,{useState} from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ModeToggle } from "@/components/theme-toggle";
import router from "next/router";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function Navitem2() {
    const {resolvedTheme} = useTheme();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  return (
    <>
      <MenubarMenu>
        <MenubarTrigger className="text-red-500 min-w-16 h-8" onClick={logout}>
            {loading ? <div className={resolvedTheme === "dark" ? "loader1" : "loader2"}></div> : "Logout"}
        </MenubarTrigger>
      </MenubarMenu>
      <ModeToggle />
    </>
  );
}
