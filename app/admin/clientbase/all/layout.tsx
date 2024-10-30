import React from "react";
import Pagination from "./pagination";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Pagination>{children}</Pagination>;
}
