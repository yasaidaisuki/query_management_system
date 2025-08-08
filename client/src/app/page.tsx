import Image from "next/image";
import TableView from "@/components/TableView";
import axios from "axios";
import fetchData from "@/utils/fetchData";

export default async function Home() {

  // fetch overhead data using axios
  // done in the page to reduce client-side fetching
  const data = await fetchData();

  console.log(data)

  return (
    <div className="w-full h-full">
      {data ? <TableView data={data}/> : null }
    </div>
  );
}
