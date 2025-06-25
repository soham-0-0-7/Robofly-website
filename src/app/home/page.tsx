import HomeApplications from "@/components/homepage/HomeApplications";
import {colorPalette} from "@/utils/variables"
import About from "@/components/homepage/HomeAbout";
import RecognitionSection from "@/components/homepage/RecognitionSection";


export default function Home() {
  return (
    <>
      <div>
            {/* Separator */}
      <div
        className="w-1/2 h-1 my-8 rounded-full m-auto"
        style={{ backgroundColor: colorPalette.green5 }}
      ></div>

      <About/>

            {/* Separator */}
      <div
        className="w-1/2 h-1 my-8 rounded-full m-auto"
        style={{ backgroundColor: colorPalette.green5 }}
      ></div>

      <RecognitionSection/>

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
