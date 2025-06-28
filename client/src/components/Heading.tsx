import React from "react";

export default function Heading() {
  return (
    <div>
      <div className="flex flex-row justify-between md:lg:pl-6 md:lg:pr-6 p-5">
        <label className="font-semibold text-stone-500">FIELDS</label>
        <div className="flex flex-row gap-5 w-1/4 md:lg:w-1/2 md:lg:gap-x-60 justify-end">
          <label className="font-semibold text-stone-500">ANSWER</label>
          <label className="font-semibold text-stone-500">QUERIES</label>
        </div>
      </div>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
}
