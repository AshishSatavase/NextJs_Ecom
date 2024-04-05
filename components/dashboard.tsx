"use client"
import { CreditCard, DollarSign, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Heading from "./ui/heading";
import { Separator } from "./ui/separator";
import { formatter } from "@/lib/utils";
import { Overview } from "./overview";
import { GraphData } from "@/types/Grpahdata";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from "react";
interface DashboardpProps{
     totalRevenue:number;
     graphRevenue:GraphData[];
    salesCount:number;
    stockCount:number;
}

const Dashboardp:React.FC<DashboardpProps>=({
    totalRevenue,
    graphRevenue,
    salesCount,
    stockCount
})=>{

       
const driverObj = driver({
    showProgress: true,
    steps: [
      { element: '#store', popover: { title: 'This is current store', description: 'you can switch from one store to another using this dropdown', side: "left", align: 'start' }},
      { element: '#totalrevenue', popover: { title: 'Total Revenue', description: 'This shows the total revenue u have generated from the current store', side: "bottom", align: 'start' }},
      { element: '#totalsales', popover: { title: 'Total Sales', description: 'This shows the total count of items that have been sold from the current store', side: "bottom", align: 'start' }},
      { element: '#totalproducts', popover: { title: 'Products in stock', description: 'This shows the count of items left in the current store', side: "left", align: 'start' }},
      { element: '#over', popover: { title: 'Overview', description: 'This shows the graphical representation of the sales per month ', side: "left", align: 'start' }},
      { element: '#billboards', popover: { title: 'Billboards', description: 'none ', side: "left", align: 'start' }},


    ]
  });
  useEffect(()=>{
    driverObj.drive();
  },[])
    return(
        <div className="flex-col" >
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <div id="totalrevenue">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatter.format(totalRevenue)}</div>
            </CardContent>
          </Card>
          </div>
          <div id="totalsales">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          </div>
          
          <div id="totalproducts">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products In Stock</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
          </div>
          
        </div>
        <div id='over'>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
        </div>
       
      </div>
    </div>
    );
};

export default Dashboardp;