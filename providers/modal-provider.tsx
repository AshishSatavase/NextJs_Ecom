"use client";
import { StoreModal } from "@/components/modals/store-modal";
import { useState, useEffect } from "react";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, [])
    if (!isMounted) {
        return null;
    }
    //all the above code is just to check is the modal is open or something like that
    //this is prevention mechanism to avoid hydration error
    //hydration error is when a modal maybe open in client side but closed in server side
    //above code is if we are in server side below if we are in client side
    return(
        <>
        <StoreModal/>
        </>
    )

}