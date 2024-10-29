"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@uidotdev/usehooks";
import Loader from "@/components/ui/loader";
import { ClientTypes } from "@/app/types";
import { Label } from "@radix-ui/react-menubar";
import ClientCard from "../all/[slug]/components/ClientCard";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useMediaQuery("only screen and (max-width : 768px)");
  const [message, setMessage] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [searchResults, setSearchResults] = useState<ClientTypes[]>([]);
  const [deepSearch, setDeepSearch] = useState<boolean>(false);

  const handlePageRefresh = async () => {
    window.location.reload();
  };

  const fetchSearchResults = async () => {
    const response = await fetch(
      `/api/admin/clientbase${deepSearch ? "/deepsearch" : ""}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchTerm: searchTerm,
        }),
      }
    );
    const data = await response.json();
    if (data.status === 200) {
      setMessage("");
      setSearchResults(data.data);
    } else {
      setSearchResults([]);
      setMessage(data.message);
    }
    setIsloading(false);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);
    fetchSearchResults();
    // setIsloading(false);
  };

  return (
    <div className="search-container">
      <form
        onSubmit={handleSearch}
        className="flex flex-row items-center gap-2 m-4"
      >
        <Input
          type="text"
          placeholder="Search for a client by number or name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-row items-center gap-2">
          <Input
            name="deepSearch"
            type="checkbox"
            placeholder="Deep Search"
            checked={deepSearch}
            onChange={(e) => setDeepSearch(e.target.checked)}
            className="w-5"
          />
          <Label className="text-sm text-gray-500">deepsearch</Label>
        </div>
        <Button type="submit" className="w-20">
          {isloading ? <Loader /> : "Search"}
        </Button>
      </form>
      <div>
        <div className="flex flex-row flex-wrap gap-4 justify-center items-center">
          {searchResults?.map((item: ClientTypes, index) => {
            return (
              <ClientCard
                key={index}
                index={index}
                {...item}
                handlePageRefresh={handlePageRefresh}
              />
            );
          })}
        </div>
        {message !== "" && (
          <div className="text-center text-sm text-gray-500">{message}</div>
        )}
      </div>
    </div>
  );
}
