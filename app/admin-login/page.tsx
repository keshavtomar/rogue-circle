"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/password-input";
import { useTheme } from "next-themes";

const AdminLogin = () => {
  const {resolvedTheme} = useTheme();
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("clicked");
    setLoading(true);

    // await new Promise((resolve) => setTimeout(resolve, 5000));
    setTimeout(() => {
      setLoading(false);
    }, 5000);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    console.log(res);
    if (res.ok) {
      console.log("Login successful");
      router.push("/admin");
    } else {
      setError("Unauthorized");
      setLoading(false);
    }
  };

  return (
    <div className="admin-card-container h-screen text-center flex items-center justify-center">
      <Card className="w-9/12 max-w-[350px]">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Login to the admin portal</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            </div>
          </form>

          <CardDescription className="text-red-400">{error}</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-center items-center text-center">
          <Button onClick={handleSubmit} className="w-20">
            {loading ?  <div className={resolvedTheme === "dark" ? "loader1" : "loader2"}></div> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
