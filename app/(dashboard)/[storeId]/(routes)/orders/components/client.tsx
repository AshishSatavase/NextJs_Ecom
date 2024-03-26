"use client";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface OrderProps{
    data:OrderColumn[];
}
export const OrderClient:React.FC<OrderProps>=({data})=>{
    return(
        <>
         <div className="flex items-center justify-between">
        <Heading
        title={`Orders(${data.length})`}
            description="Manage orders for your Store"
        />
    </div>
    <Separator/>
    <DataTable  searchKey="label" columns={columns} data={data}/>
        </>
       
    )
}