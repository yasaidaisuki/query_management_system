// CreateQueryDialog.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import fetchData from "@/utils/fetchData";
import { IFormData } from "@/../../src/routes/schemas/formData.interface";

interface Props {
  dialogOpenIndex: number | null;
  setDialogOpenIndex: React.Dispatch<React.SetStateAction<number | null>>;
  dataObject: IFormData;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setFormData: React.Dispatch<React.SetStateAction<IFormData[]>>;
  itemKey: number;
}

export default function CreateQueryDialog({
  dialogOpenIndex,
  setDialogOpenIndex,
  dataObject,
  description,
  setDescription,
  setFormData,
  itemKey,
}: Props) {
  async function handleCreate(dataObject: IFormData) {
    try {
      const currDate = new Date();
      await axios.post("http://localhost:8080/create-query", {
        title: dataObject.question,
        description: description,
        createdAt: currDate,
        updatedAt: currDate,
        status: "OPEN",
        formData: dataObject,
        formDataId: dataObject.id,
      });

      const updatedData = await fetchData();
      setFormData(updatedData);
      setDescription("");
      setDialogOpenIndex(null);
    } catch (error) {
      console.error("Error creating query:", error);
    }
  }

  return (
    <Dialog
      open={dialogOpenIndex === itemKey}
      onOpenChange={(open) => setDialogOpenIndex(open ? itemKey : null)}
    >
      <DialogTrigger asChild>
        <Button variant="create" className="w-7 h-8 rounded-full">
          <i className="fa-solid fa-plus"></i>
        </Button>
      </DialogTrigger>
      <DialogContent className="z-[1000] bg-white">
        <DialogHeader>
          <DialogTitle>Create Query</DialogTitle>
          <DialogDescription>{dataObject.question}</DialogDescription>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
        </DialogHeader>

        <div className="grid gap-2 py-2">
          <div className="flex flex-row gap-1 font-medium items-center">
            Description <span className="text-sm">(optional)</span>
          </div>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a new remark..."
          />
        </div>

        <DialogFooter>
          <Button
            variant="create"
            onClick={() => handleCreate(dataObject)}
            type="submit"
          >
            Create Query
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
