import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({children} //param
    :{children:React.ReactNode}                      //type of param
    ){
        const userId=auth().userId;
        if(!userId){
            redirect('/sign-in');
        }
        const store=await prismadb.store.findFirst({
            where:{
                userId
            }
        });
        if(store){
            redirect(`/${store.id}`)
        }
        return(
            <>
            {children};
            </>
        )
}
    
