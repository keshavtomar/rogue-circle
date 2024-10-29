"use client";

import React, { useEffect, useContext, useState } from "react";
import { PaginationContext } from "../../layout";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";

export default function PaginationComponent() {
  const { page, totalPages } = useContext(PaginationContext);
  const [paginationArray, setPaginationArray] = useState<number[]>([]);
  const leftPages = page - 1;
  const rightPages = totalPages - page;

  useEffect(() => {
    const tempArray = [];
    for (let i = page - 2; i <= page + 2; i++) {
      if (i <= totalPages && i >= 1) {
        tempArray.push(i);
      }
    }
    setPaginationArray(tempArray);
  }, [page, totalPages]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="/admin/clientbase/all/1" />
        </PaginationItem>
        {leftPages > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {paginationArray.map((item) => {
          return (
            <PaginationItem key={item}>
              <PaginationLink href={"/admin/clientbase/all/" + item} isActive={item === page}>
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {rightPages > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext href={"/admin/clientbase/all/" + (totalPages)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
