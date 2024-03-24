import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
//we are making this to add store to database
export async function POST(
    req:Request,
    {params}:{params:{storeId:string}}
    
    ) {
        try{
            const { userId }=auth(); //get user id to send in db that which user added 
            const body=await req.json(); 
            const {name,value}=body; //get name of store from user

            if(!userId){ //if user is not logged in no user id then throw error ig
                return new NextResponse("UnAuchtnticated",{status:401})
            }

            if(!name){//if name of store is not given throw error
                return new NextResponse("Name is required",{status:400})
            }
            if(!value){//if name of store is not given throw error
                return new NextResponse("Value  is required",{status:400})
            }

            if(!params.storeId){
                return new NextResponse("StoreID is required",{status:400})
            }

            const  storeByUserId=await prismadb.store.findFirst({
                where:{
                    id:params.storeId,
                    userId
                }
            });
            //this checks if  the user is editing his own bllboard only and not someone elses
            if(!storeByUserId){
                return new NextResponse("Unauthorized",{status:403})
            }

            //after u have name user Id make db instance
            const size =await prismadb.size.create({
                data:{
                    name,
                    value,
                    storeId:params.storeId
                }
            })

            return NextResponse.json(size);
        }catch(error){
            console.log('[SIZES_POST]',error);
            return new NextResponse("Internal error",{status:500})  
        }
}

export async function GET(
    req:Request,
    {params}:{params:{storeId:string}}
    
    ) {
        try{
            if(!params.storeId){
                return new NextResponse("StoreID is required",{status:400})
            }

            const sizes =await prismadb.size.findMany({
                where:{
                    storeId:params.storeId
                }
            })

            return NextResponse.json(sizes);
        }catch(error){
            console.log('[SIZES_GET]',error);
            return new NextResponse("Internal error",{status:500})  
        }
}