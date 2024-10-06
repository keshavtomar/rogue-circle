import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";

type DeleteAlertProps = {
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  open: boolean;
};

export default function DeleteAlert({
  onConfirmDelete,
  onCancelDelete,
  open,
}: DeleteAlertProps) {
  const [loading, setLoading] = useState(false);

  const confirmDelete = async () => {
    setLoading(true);
    onConfirmDelete();
    setLoading(false);
  };

  if (!open) return null;
  return (
    <Alert
      variant="destructive"
      className="absolute w-fit bg-white shadow-2xl dark:shadow-zinc-700 dark:bg-[#09090b]"
    >
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Are you sure you want to delete this client?
      </AlertDescription>
      <div className="flex justify-between">
        {loading ? (
          <Loader />
        ) : (
          <Button
            variant={"destructive"}
            onClick={() => confirmDelete()}
            className="w-2/5"
          >
            Yes
          </Button>
        )}
        <Button
          variant={"default"}
          onClick={() => onCancelDelete()}
          className="w-2/5"
        >
          No
        </Button>
      </div>
    </Alert>
  );
}
