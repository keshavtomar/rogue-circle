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
import { useCopyToClipboard } from "usehooks-ts";
import React from "react";
import DeleteAlert from "./DeleteAlert";
import { convertOptionToFoundVia } from "@/lib/utils";
import { PaginationContext } from "../../pagination";
import CopyIcon from "@/lib/icons/copy.svg";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const { page } = useContext(PaginationContext);
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        console.log("Copied!", { text });
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };
  const handleDeleteClient = async () => {
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
  };

  return (
    <Card className="w-max md:w-[320px] max-w-[320px] h-auto shadow-xl p-2 m-1 ">
      <CardHeader>
        <CardDescription>#{(page - 1) * 20 + props.index + 1}</CardDescription>
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
        <Button variant={"destructive"} onClick={() => setIsAlertOpen(true)}>
          Delete
        </Button>
        <a
          className="mx-4"
          href={`https://wa.me/${props.phone}?text=${encodeURIComponent(
            `Hello ${props.name}`
          )}`}
          target="_blank" // This will open the link in a new tab
          rel="noopener noreferrer" // Security best practice when using target="_blank"
        >
          <Button variant={"outline"}>WhatsApp</Button>
        </a>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant={"outline"}
                onClick={handleCopy("Hey " + props.name.split(" ")[0])}
              >
                <Image src={CopyIcon} alt="Copy" className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy Greeting</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
      <div className="absolute">
        <DeleteAlert
          open={isAlertOpen}
          onConfirmDelete={handleDeleteClient}
          onCancelDelete={() => setIsAlertOpen(false)}
        />
      </div>
    </Card>
  );
}
