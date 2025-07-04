"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { GrowthChart } from "@/components/growth-chart";
import PageTitle from "@/components/page-title";
import PlacementCard from "@/components/placement-card";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useHomepage } from "@/zustand/use-homepage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter();
  const token = localStorage.getItem("accessToken");

  const { loadingSummary, errorSummary, txSummary, fetchSummary } = useHomepage();

  useEffect(() => {
    console.log("isauthenticated", token);
    if (!token) {
      router.push("/login");
    }
  }, [router, token]);

  useEffect(() => {
      fetchSummary();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      style={{ height: "100%", width: "100%" }}
    >
      {token && <AppSidebar />}
      <ResizablePanel defaultSize={100} style={{ height: "100%" }}>
        <div className="px-2 py-[10px] flex justify-start">
          <SidebarTrigger />
        </div>
        <div style={{ height: "1px", borderBottom: "1px solid #E0E0E0" }} />
        <main className="min-h-screen">
          <div className="flex flex-col">
            <div className="flex flex-col p-4 space-y-4">
              <PageTitle
                title="Summary"
                subTitle="track your financial growth"
              />

              {/* Horizontal Scroll Cards */}
              <div className="flex overflow-x-auto pb-2 -mx-4 px-4">
                <div className="flex space-x-4 w-full">
                  {loadingSummary &&
                  <>
                    <PlacementCardSkeleton />
                    <PlacementCardSkeleton />
                    <PlacementCardSkeleton />
                    <PlacementCardSkeleton />
                    </>
                  }
                  {txSummary && !errorSummary && txSummary.map((placement, index) => (
                    <PlacementCard
                      key={index}
                      bankCode={placement.placementName}
                      placementType={placement.placementTag}
                      balance={placement.totalAmount}
                      lastUpdated={placement.lastUpdated}
                      color={placement.color}
                    />
                  ))}
                </div>
              </div>

              {/* Growth Chart - Tambahkan padding dan width penuh */}
              <div className="w-full px-0 overflow-hidden">
                <GrowthChart />
              </div>
            </div>
          </div>
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}


// skeleton, to be moved soon
const PlacementCardSkeleton = () => {
  return (
    <div className="min-w-[360px] w-full my-2 p-6 rounded-2xl flex flex-col gap-4 bg-gray-200 animate-pulse">
      <div className="w-full flex flex-row gap-1 items-center justify-between">
        <div className="h-8 w-24 bg-gray-300 rounded-md"></div>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-300">
          <div className="h-4 w-16 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      <div className="flex flex-col bg-gray-300 p-4 rounded-xl">
        <div className="h-4 w-20 bg-gray-400 rounded-md mb-2"></div>
        <div className="h-8 w-32 bg-gray-400 rounded-md"></div>
      </div>

      <div className="h-4 w-40 bg-gray-300 rounded-md"></div>
    </div>
  );
};