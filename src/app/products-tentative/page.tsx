import React from 'react'
import HomeProducts from "@/components/homepage/HomeProducts";
import {colorPalette} from "@/utils/variables"

const page = () => {
  return (
    <div>
            <HomeProducts/>

       <div
        className="w-1/2 h-1 my-8 rounded-full m-auto"
        style={{ backgroundColor: colorPalette.green5 }}
      ></div>
    </div>
  )
}

export default page
