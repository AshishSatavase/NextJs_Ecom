"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";


import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from 'axios';
import toast from "react-hot-toast";
const formSchema = z.object({
    name: z.string().min(1),
})
export const StoreModal = () => {
    const storeModal = useStoreModal();
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            console.log(values);
            const response = await axios.post('/api/stores', values);
            toast.success("Store Created.");
            //we dont use redirect here because we want to reload the entier page
            //windows does that plus using redirect problems occour sometimes db is not
            //ready to take data and even tho we are redirected to dash
            window.location.assign(`/${response.data.id}`);
            console.log(response.data);
        } catch (error) {
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
        }
    }
    return (
        <Modal title="Create Store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}  //set isopen variable in use-store-modal as true
            onClose={storeModal.onClose} //set isopen variable in use-store-modal as false 
        >
            <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="E-com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button
                                    disabled={loading}
                                    variant={"outline"} onClick={storeModal.onClose}>Cancel</Button>
                                <Button disabled={loading}>Continue</Button>

                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );
}