"use client";
import { useStoreModal } from '@/hooks/use-store-modal';
import { useEffect } from 'react';
const SetupPage=()=> {
  // const storeModal = useStoreModal();//this works fine but dosent work fine when u have to useeffect
  //so we write another way to write this and acess functions of storeModal
  //storeModal has useStore modal which has a var isopen a method onOpen and onClose
  const onOpen=useStoreModal((state)=> state.onOpen);
  const isOpen=useStoreModal((state)=>state.isOpen);

  useEffect(()=>{
    if(!isOpen){
      onOpen();
    }
  },[isOpen,onOpen])

  return null;
}
export default SetupPage;
