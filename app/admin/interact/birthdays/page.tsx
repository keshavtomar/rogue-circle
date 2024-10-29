"use client";
import { ClientTypes } from "@/app/types";
import React, { useState, useEffect } from "react";
import ClientCard from "../../clientbase/all/[slug]/components/ClientCard";

export default function Birthdays() {
  const [birthdaysData, setBirthdaysData] = useState<ClientTypes[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchBirthdays = async () => {
    const response = await fetch("/api/admin/birthdaytoday");
    const data = await response.json();
    if (data.status === 200) {
      await setBirthdaysData(data.data);
    } else {
      setBirthdaysData([]);
      setMessage(data.message);
    }
    setIsLoading(false);
  };

  const handlePageRefresh = async () => {
    window.location.reload();
  };

  useEffect(() => {
    setIsLoading(true);
    fetchBirthdays();
  }, []);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-lg text-center font-bold align-middle underline mt-5">
        Birthdays Today
      </h1>
      {birthdaysData.map((item: ClientTypes, index) => {
        return (
          <div key={index}>
            <ClientCard
              key={index + 1}
              {...item}
              handlePageRefresh={handlePageRefresh}
              index={index}
            />
          </div>
        );
      })}
      {message !== "" && (
        <div className="text-center text-sm text-gray-500">{message}</div>
      )}
    </div>
  );
}
