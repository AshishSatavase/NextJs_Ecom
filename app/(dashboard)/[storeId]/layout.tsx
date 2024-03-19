import prismadb from "@/lib/prismadb";
import { auth,  } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";
export default function DashBoardLayout({
    children,
    params  //parameters of function
}:{ //type of parameters
    children:React.ReactNode;
    params:{storeId:string}
}){
    const {userId}=auth()
    if(!userId){
        redirect('/sign-in');
    }
    const store =prismadb.store.findFirst({
        where:{
            id:params.storeId,
            userId
        }
    });
    if(!store){
        redirect('/');
    }
    return(
        <>
        <Navbar/>
        {children}
        
        </>
    )
}