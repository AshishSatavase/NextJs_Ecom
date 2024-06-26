
import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


import StoreSwitcher from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
// import { ThemeToggle } from "@/components/theme-toggle";
import prismadb from "@/lib/prismadb";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

const Navbar = async () => {
  const { userId } = auth();


  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    }
  });

 
  return ( 
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} className=""/>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle/>
          <UserButton afterSignOutUrl="/"/>
        </div>
      </div>
    </div>
  );
};
 
export default Navbar;