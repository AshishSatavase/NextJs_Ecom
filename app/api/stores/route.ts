import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
//we are making this to add store to database
export async function POST(req:Request) {
        try{
            const { userId }=auth(); //get user id to send in db that which user added 
            console.log(userId) 
            const body=await req.json(); 
            const {name}=body; //get name of store from user

            if(!userId){ //if user is not logged in no user id then throw error ig
                return new NextResponse("Unauthorized",{status:401})
            }

            if(!name){//if name of store is not given throw error
                return new NextResponse("Name is required",{status:400})
            }
            //after u have name user Id make db instance
            const store =await prismadb.store.create({
                data:{
                    name,
                    userId
                }
            })

            return NextResponse.json(store);
        }catch(error){
            console.log('Stores_POST',error);
            return new NextResponse("Internal error",{status:500})  
        }
}