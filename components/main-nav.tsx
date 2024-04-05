"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import Component1 from "./Component1";

export function MainNav({
    className,
    ...props
}:React.HTMLAttributes<HTMLElement>){
    const pathname=usePathname();
    const params=useParams();
    const routes=[
      
        {
            id:'overview',
            href:`/${params.storeId}`,
            label:'Overview',
            active:pathname=== `/${params.storeId}`
        },
        {
            id:'billboards',
            href:`/${params.storeId}/billboards`,
            label:'Billboards',
            active:pathname=== `/${params.storeId}/billboards`
        },
        {
            id:'categories',
            href:`/${params.storeId}/categories`,
            label:'Categories',
            active:pathname=== `/${params.storeId}/categories`
        },
        {
            href:`/${params.storeId}/sizes`,
            label:'Sizes',
            active:pathname=== `/${params.storeId}/sizes`
        },
        {
            id:'colors',
            href:`/${params.storeId}/colors`,
            label:'Colors',
            active:pathname=== `/${params.storeId}/colors`
        },
        {
            id:'products',
            href:`/${params.storeId}/products`,
            label:'Products',
            active:pathname=== `/${params.storeId}/products`
        },
        {
            id:'orders',
            href:`/${params.storeId}/orders`,
            label:'Orders',
            active:pathname=== `/${params.storeId}/orders`
        },
        {
            id:'settings',
            href:`/${params.storeId}/settings`,
            label:'Settings',
            active:pathname=== `/${params.storeId}/settings`
        }
    ]
    return(
        <nav  id='over1' className={cn("flex items-center space-x-4 lg:space-x-6",className)}>
            {routes.map((route)=>
            <Link 
            id={route.id}
            key={route.href} 
            href={route.href}
            className={cn("text-sm font-medium transition-colors hover:text-primary",
            route.active?"text-black dark:text-white":"text-muted-foreground"
            )}
            >
            {route.label}
            </Link>
            
            )}
            <Component1/>
        </nav>
    );
};
