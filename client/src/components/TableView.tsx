"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Heading from "./heading";
import fetchData from "@/utils/fetchData";
import axios from "axios";
import {
  IFormData,
  IQueryData,
  ICountedFormData,
} from "@/../../src/routes/schemas/formData.interface";
import PreviewDialog from "./DialogBox/PreviewDialog";
import CreateQueryDialog from "./DialogBox/CreateQueryDialog";
import QueryDialogBox from "./DialogBox/QueryDialogBox";

interface TableViewProps {
  data: IFormData[];
}

export default function TableView({ data }: TableViewProps) {
  const [formData, setFormData] = useState<IFormData[]>(data);
  const [dialogOpenIndex, setDialogOpenIndex] = useState<number | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [description, setDescription] = useState("");



  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex w-full flex-col justify-between">
        <Heading />

        <div className="flex flex-col">
          {formData.map((dataObject, key) => (
            <div key={key}>
              <div
                onClick={(e) => {
                  if (!(e.target as HTMLElement).closest("button")) {
                    setPreviewIndex(key);
                  }
                }}
                className="flex flex-col justify-between content-center py-3 border-[0.1vh] pl-5 hover:bg-stone-50 transition-all cursor-pointer"
              >
                <div className="flex flex-row gap-5 pl-2 pr-4 md:lg:pl-6 md:lg:pr-9 justify-between">
                  <div className="max-w-[200px] md:lg:max-w-[500px] truncate content-center">
                    {dataObject.question}
                  </div>

                  <div className="flex flex-row gap-16 md:lg:gap-10 items-center justify-between md:lg:w-1/3">
                    <div className="content-center max-w-[40px] md:lg:max-w-[350px] truncate font-medium">
                      {dataObject.answer}
                    </div>

                    {dataObject.query ? (
                      <QueryDialogBox
                        dialogOpenIndex={dialogOpenIndex}
                        setDialogOpenIndex={setDialogOpenIndex}
                        dataObject={dataObject}
                        description={description}
                        setDescription={setDescription}
                        setFormData={setFormData}
                        itemKey={key}
                        key={key} 
                      />
                    ) : (
                      <CreateQueryDialog
                        dialogOpenIndex={dialogOpenIndex}
                        setDialogOpenIndex={setDialogOpenIndex}
                        dataObject={dataObject}
                        description={description}
                        setDescription={setDescription}
                        setFormData={setFormData}
                        itemKey={key}
                        key={key} 
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Dialog */}
      <PreviewDialog
        previewIndex={previewIndex}
        setPreviewIndex={setPreviewIndex}
        formData={formData}
      />
    </div>
  );
}
