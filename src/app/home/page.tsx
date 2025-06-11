import HomeApplications from "@/components/homepage/HomeApplications";
import HomeProducts from "@/components/homepage/HomeProducts";
import {colorPalette} from "@/utils/variables"

export default function Home() {
  return (
    <>
      <div>
            {/* Separator */}
      <div
        className="w-1/2 h-1 my-8 rounded-full m-auto"
        style={{ backgroundColor: colorPalette.green5 }}
      ></div>

        <HomeProducts/>
            {/* Separator */}
      <div
        className="w-1/2 h-1 my-8 rounded-full m-auto"
        style={{ backgroundColor: colorPalette.green5 }}
      ></div>

        <HomeApplications/>
            {/* Separator */}
      <div
        className="w-1/2 h-1 my-8 rounded-full m-auto"
        style={{ backgroundColor: colorPalette.green5 }}
      ></div>

      </div>
    </>
  );
}
