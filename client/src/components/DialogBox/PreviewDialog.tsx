import React, { SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {IFormData, IQueryData, ICountedFormData} from "@/../../src/routes/schemas/formData.interface"

export default function PreviewDialog(
    { previewIndex, setPreviewIndex, formData }
    : 
    { previewIndex: number | null, setPreviewIndex: React.Dispatch<SetStateAction<number|null>>, 
        formData: IFormData[]
     }) {
  return (
    <>
      {/* Preview Dialog */}
      <Dialog
        open={previewIndex !== null}
        onOpenChange={() => setPreviewIndex(null)}
      >
        <DialogContent className="gap-1">
          {previewIndex !== null && (
            <>
              <DialogHeader>
                <DialogTitle>Question Preview</DialogTitle>
                <DialogDescription>
                  {formData[previewIndex].question}
                </DialogDescription>
              </DialogHeader>
              <div className="text-stone-700 font-medium mt-4">Answer:</div>
              <div className="text-[2.1vh] text-stone-700 py-2">
                {formData[previewIndex].answer}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
