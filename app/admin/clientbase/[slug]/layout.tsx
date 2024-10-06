"use client";
import React, { useEffect, useContext } from "react";
import { statsTypes } from "@/app/types";
import { clientBasePageSize } from "../../data";
import { PaginationContext } from "../layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { setTotalPages, totalPages } = useContext(PaginationContext);

  useEffect(() => {
    const fetchTotalPages = async () => {
      const fetchedData = await fetch("/api/admin/stats", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const stats: statsTypes = await fetchedData.json();
      await setTotalPages(
        Math.floor(
          (stats.appointmentsCount + clientBasePageSize) / clientBasePageSize
        )
      );
      console.log(
        "Total pages are " +
          Math.floor(
            (stats.appointmentsCount + clientBasePageSize) / clientBasePageSize
          )
      );
      console.log("Total pages here are now "+ totalPages)
    };
    fetchTotalPages();
  }, [totalPages]);
  return <div>{children}</div>;
}
