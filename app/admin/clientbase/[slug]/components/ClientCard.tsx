import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import DeleteAlert from "./DeleteAlert";
import { convertOptionToFoundVia } from "@/lib/utils";
import { PaginationContext } from "../../layout";

type ClientProps = {
  index: number;
  id: string;
  name: string;
  dob: string;
  phone: string;
  selectedValue: string;
  date: string;
  handlePageRefresh: () => void;
};

export default function ClientCard(props: ClientProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const {page} = useContext(PaginationContext);

  const handleDeleteClient = async () =>{
    const res = await fetch("/api/admin/clientbase", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: props.id }),
    });
    if (res.ok) {
      setIsAlertOpen(true);
      props.handlePageRefresh();
    } else {
      alert("Error deleting client");
    }
  }

  return (
    <Card className="w-max md:w-[320px] max-w-[320px] h-auto shadow-xl p-2 m-1 ">
      <CardHeader>
        <CardDescription>#{((page-1)*20)+props.index + 1}</CardDescription>
        <CardTitle>{props.name}</CardTitle>
        <CardDescription>{props.phone}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">Date of Birth - {props.dob}</p>
        <p className="text-sm text-gray-500">
          Found us via - {convertOptionToFoundVia(props.selectedValue)}
        </p>
        <p className="text-sm text-gray-500">
          Done on - {new Date(props.date).toDateString()}
        </p>
      </CardContent>
      <CardFooter>
        {/* Database uda diya tha direct function pass krke props.handleClientDelete(props.id) */}
        <Button variant={"destructive"} onClick={()=>setIsAlertOpen(true)}>
          Delete
        </Button>
      </CardFooter>
      <DeleteAlert open={isAlertOpen} onConfirmDelete={handleDeleteClient} onCancelDelete={() => setIsAlertOpen(false)} />
    </Card>
  );
}
