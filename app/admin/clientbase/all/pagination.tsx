"use client";
import React, { useState, createContext } from "react";

export const PaginationContext = createContext<{
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (totalPages: number) => void;
}>({ page: 1, setPage: () => {}, totalPages: 2, setTotalPages: () => {} });

export default function Pagination({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  return (
    <PaginationContext.Provider value={{ page, setPage, totalPages, setTotalPages }}>
      <div>{children}</div>
    </PaginationContext.Provider>
  );
}
