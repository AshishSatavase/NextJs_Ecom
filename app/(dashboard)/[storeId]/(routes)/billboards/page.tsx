import prismadb from "@/lib/prismadb";

import {format} from "date-fns";

import { BillBoardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";
 const BillBoardsPage=async ({
    params
 }:{params:{storeId:string}})=>{
    const billboards=await prismadb.billboard.findMany({
        where:{
            storeId:params.storeId
        },
        orderBy:{
            createdAt:'desc'
        }
    })

    const formattedBillboards:BillboardColumn[]=billboards.map((item)=>({
        id:item.id,
        label:item.label,
        createdAt:format(item.createdAt,"MMMM do, yyyy")
    }))
    return(

        <div className="flex-col">
            <div className="flex-1 space-y-4 pt-6 p-10">
                <BillBoardClient data={formattedBillboards}/>
            </div>
        </div>
    )
};

export default BillBoardsPage;