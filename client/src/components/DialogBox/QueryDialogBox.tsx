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

export default function QueryDialogBox({
  dialogOpenIndex,
  setDialogOpenIndex,
  dataObject,
  description,
  setDescription,
  setFormData,
  itemKey,
}: Props) {
  async function handleDelete(dataObject: IFormData) {
    try {
      await axios.delete("http://localhost:8080/delete-query", {
        data: {
          queryDataId: dataObject.query?.id,
        },
      });

      const updatedData = await fetchData();
      setFormData(updatedData);

      // Close the modal by resetting dialogOpenIndex
      setDialogOpenIndex(null);
    } catch (error) {
      console.error("Error resolving query:", error);
    }
  }

  async function handleResolve(dataObject: IFormData) {
    try {
      const currDate = new Date();

      await axios.put("http://localhost:8080/update-query", {
        queryDataId: dataObject.query?.id,
        updatedAt: currDate,
        status: "RESOLVED",
      });

      const updatedData = await fetchData();
      setFormData(updatedData);
    } catch (error) {
      console.error("Error resolving query:", error);
    }
  }

  function formatDate(date: string | Date): string {
    const parsedDate = new Date(date);
    return `${parsedDate.getFullYear()}/${String(
      parsedDate.getMonth() + 1
    ).padStart(2, "0")}/${String(parsedDate.getDate()).padStart(2, "0")}`;
  }

  return (
    <Dialog
      open={dialogOpenIndex === itemKey}
      onOpenChange={(open) => setDialogOpenIndex(open ? itemKey : null)}
    >
      <DialogTrigger asChild>
        <Button
          variant={
            dataObject?.query?.status === "RESOLVED" ? "resolved" : "open"
          }
          className="w-7 h-8 rounded-full"
        >
          <i
            className={`fa-solid ${
              dataObject?.query?.status === "RESOLVED"
                ? "fa-check"
                : "fa-question"
            }`}
          ></i>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>| Query</DialogTitle>
          <DialogDescription>{dataObject.question}</DialogDescription>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
        </DialogHeader>

        <div className="flex flex-col md:lg:flex-row gap-4 justify-center md:lg:justify-between">
          <div className="flex flex-row gap-4 justify-center">
            <div className="flex flex-col">
              <DialogDescription>Query Status</DialogDescription>
              <div className="flex flex-row items-center gap-1">
                <div
                  className={`w-[1.2vh] h-[1.2vh] ${
                    dataObject?.query?.status === "RESOLVED"
                      ? "bg-emerald-500"
                      : "bg-[#8BC5C4]"
                  } rounded-full`}
                ></div>
                <div>{dataObject?.query?.status}</div>
              </div>
            </div>

            <div className="flex flex-col">
              <DialogDescription>Created on</DialogDescription>
              <div className="text-[2.1vh]">
                {formatDate(dataObject?.query?.createdAt)}
              </div>
            </div>

            <div className="flex flex-col">
              <DialogDescription>Updated on</DialogDescription>
              <div className="text-[2.1vh]">
                {formatDate(dataObject?.query?.updatedAt)}
              </div>
            </div>
          </div>

          <Button
            className="bg-red-400 hover:bg-red-500 text-white"
            onClick={() => handleDelete(dataObject)}
            type="submit"
          >
            Delete
          </Button>
        </div>

        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />

        <div className="flex flex-col gap-1">
          <div className="font-medium">Description</div>
          <div className="text-[2.1vh] text-stone-700 py-2">
            {dataObject?.query?.description}
          </div>
        </div>

        <DialogFooter>
          {dataObject?.query?.status === "OPEN" && (
            <Button
              className="bg-emerald-600 hover:bg-emerald-800 text-white"
              onClick={() => handleResolve(dataObject)}
              type="submit"
            >
              Resolve
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
