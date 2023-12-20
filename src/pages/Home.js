import React, { Suspense, useContext, useEffect } from "react";
import "../css/home.css";
import "@fontsource/open-sans";
import Hero_Section from "../component/hero/hero-section";
import BttomHomeSection from "../component/hero/bottom-home-section";
import MostRecentDiscussion from "../component/sections/most-recent-discussions";
import MostClosestSpa from "../component/spa/ShowClosestSpas";
import MostRecentSpaDiscussion from "../component/sections/most-recent-spa-discussions";
import MostRecentForum from "../component/sections/most-recent-forum";
import MostRecentMasseuseDiscussion from "../component/sections/most-recent-masseuse-discussions";
import { Context } from "../context/dataContext";
export default function Home() {
  const { setIsSearchPage } = useContext(Context);
  useEffect(() => {

    setIsSearchPage(false)

  }, []);
  return (
    <div className="w-full">
      {/* <Hero_Section /> */}
      {/* <div className="max-w-[1600px] mx-auto p-[0px] sm:p-[8px] sm:pr-[14px] min-[769px]:pr-[5px] xl:p-[16px]"> */}
      <div className="max-w-[1600px] mx-auto p-[0px] xs:p-[8px] xl:p-[16px]">
        <MostClosestSpa />
        <MostRecentForum />
      </div>
      {/* <MostRecentDiscussion /> */}
      {/* <MostRecentSpaDiscussion />
      <MostRecentMasseuseDiscussion /> */}

      <BttomHomeSection />
    </div>
  );
}