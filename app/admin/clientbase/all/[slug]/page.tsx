"use client";

import React, { useContext, useEffect, useState } from "react";
import { PaginationContext } from "../pagination";
import { useRouter } from "next/navigation";
import PaginationComponent from "./components/PaginationComponent";
import ClientCard from "./components/ClientCard";
import { clientBasePageSize } from "../../../data";
import { ClientTypes } from "@/app/types";

type  ClientDataType = ClientTypes[];

export default function Page({ params }: { params: { slug: number } }) {
  const { setPage, totalPages } = useContext(PaginationContext);
  const [clientData, setClientData] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const handlePageRefresh = async () => {
    window.location.reload();
  };

  useEffect(() => {
    const slugAsNumber = Number(params.slug);
    if (isNaN(slugAsNumber) || slugAsNumber < 1 || slugAsNumber > totalPages) {
      router.push("/admin/clientbase/all/1");
      return; // Prevent further execution
    }

    setPage(slugAsNumber);
    const fetchData = async () => {
      const fetchedData = await fetch(
        "/api/admin/clientbase?page=" + slugAsNumber,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await fetchedData.json();
      setClientData(data);
      setIsLoading(false);
    };
    fetchData();
  }, [params.slug, router, setPage, totalPages]); 



  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div>
      <div className="client-base-container flex flex-wrap content-center justify-center mb-10">
        {clientData?.map((client:ClientTypes, index:number) => {
          return (
            <ClientCard
              key={Number(params.slug) * clientBasePageSize + index}
              {...client}
              handlePageRefresh={handlePageRefresh}
              index={index}
            />
          );
        })}
      </div>
      <div className="fixed bottom-0 w-full dark:bg-gray-900 bg-slate-100 shadow-lg shadow-zinc-400">
        <PaginationComponent />
      </div>
    </div>
  );
}
