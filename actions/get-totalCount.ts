import prismadb from "@/lib/prismadb";

export const getTotalCount=async(storeId:string)=>{
    const stockCount=await prismadb.order.count({
        where:{
            storeId,
            isPaid:false
        }
    });
    return stockCount;

}

