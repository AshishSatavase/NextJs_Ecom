"use client";


import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { Children, useEffect } from "react";
import { Button } from "./ui/button";


const Component1=()=>{
    const driverObj = driver({
        showProgress: true,
        steps: [
          { element: '#store', popover: { title: 'This is current store', description: 'you can switch from one store to another using this dropdown', side: "left", align: 'start' }},
          { element: '#totalrevenue', popover: { title: 'Total Revenue', description: 'This shows the total revenue u have generated from the current store', side: "bottom", align: 'start' }},
          { element: '#totalsales', popover: { title: 'Total Sales', description: 'This shows the total count of items that have been sold from the current store', side: "bottom", align: 'start' }},
          { element: '#stock', popover: { title: 'Products in stock', description: 'This shows the count of items left in the current store', side: "left", align: 'start' }},
        ]
      });
    useEffect(()=>{
        
    },[])
    const drive=()=>{
        driverObj.drive();
    }
    return(
        <div><Button onClick={drive}>Drive</Button></div>
        
    )
};

export default Component1;