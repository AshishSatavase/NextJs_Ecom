"use client";

import { BillBoard } from "@prisma/client";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import * as z  from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";
interface BillboardFormProps {
    initialData: BillBoard;
}

const formSchema=z.object({
    label:z.string().min(1),
    imageUrl:z.string().min(1)
})

type BillboardFormValues=z.infer<typeof formSchema>
export const BillboardForm: React.FC<BillboardFormProps> = ({
    initialData
}) => {
    const [open,setOpen]=useState(false);
    const [loading,setLoading]=useState(false);
    const params=useParams();
    const router=useRouter();
    const origin=useOrigin();
    const title=initialData?"Edit Billboard":"Create billboard";
    const description=initialData?"Edit a Billboard":"Add a new billboard";
    const toastMessage  =initialData?"Billboard Updated.":"BillBoard Created.";
    const action=initialData?"Save Changes":"Create";

const form =useForm<BillboardFormValues>({
    resolver:zodResolver(formSchema),
    defaultValues:initialData ||{
        label:'',
        imageUrl:''
    }
});

const onSubmit=async(data:BillboardFormValues)=>{
    console.log(data);
    try {
        setLoading(true);
        await axios.patch(`/api/stores/${params.storeId}`,data);
        router.refresh();
        toast.success("Store Updated")
    } catch (error) {
        toast.error("Something went wrong");
    }
    finally{
        setLoading(false);
    }
}

    const onDelete=async()=>{
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`);
            router.push("/");
            router.refresh();
            toast.success("Store deleted");
        } catch (error) {
                toast.error("Make sure u removed all products and categories first")
        }finally{
            setLoading(false);
            setOpen(false);
        }

    }

    return (
        <>
        <AlertModal
        onOpen={()=>{}}
            isOpen={open}
            onClose={()=>{setOpen(false)}}
            onConfirm={onDelete}
            loading={loading}
        />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description} />
                    {initialData && <Button variant="destructive" size="icon" onClick={() => {setOpen(true) }}>
                    <Trash className="h-4 w-4"></Trash>
                </Button>}
                
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField control={form.control}
                        name="ImageUrl"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Background Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                    value={field.value? [field.value]:[]}
                                    disabled={loading}
                                    onChange={(url)=>field.onChange(url)}
                                    onRemove={()=> field.onChange("")}

                                    />
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                    )}/>
                    <div className="grid grid-cols-3 gap-8">
                        <FormField control={form.control}
                        name="label"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input disabled={loading}
                                    placeholder="Billboard Label"
                                    {...field}/>
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                    )}/>
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">{action}</Button>
                </form>
            </Form>
            <Separator></Separator>
           
        </>


    );
}