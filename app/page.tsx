"use client"

import { GrowthChart } from "@/components/growthChart";
import PageTitle from "@/components/pageTitle";
import PlacementCard from "@/components/placementCard";
import { SidebarTrigger } from "@/components/ui/sidebar";
import useInteractionDashboard from "@/zustand/useInteractionDashboard";
import useLogin from "@/zustand/useLogin";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const {
    errorLogin,
  } = useLogin();

  const router = useRouter();

  // dummy
  useEffect(() => {
    if (errorLogin) {
      if (!sessionStorage.getItem("token")) {
        router.push("/login");
        console.log("tidak ada session");
      } else {
        return
      }
    }
  }, [errorLogin, router]);

  return (
    <main>
      <div>
        <div style={{ padding: "10px" }}>
          <SidebarTrigger />
        </div>
        <div style={{ height: "1px", backgroundColor: "#E0E0E0" }}/>
        <div style={{ margin: "1rem 2rem" }}>
          <PageTitle
            title="Summary"
            subTitle="track your financial growth"
          />
          {/* <FilterData
            keyword={keyword}
            setKeyword={setKeyword}
            filterList1={statusOptions}
            filter1={status}
            setFilter1={setStatus}
            filterList2={platformOptions}
            filter2={platform}
            setFilter2={setPlatform}
          /> */}
          <PlacementCard />
          <GrowthChart />
        </div>
      </div>
    </main>
  );  
}