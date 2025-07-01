"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { GrowthChart } from "@/components/growth-chart";
import PageTitle from "@/components/page-title";
import PlacementCard from "@/components/placement-card";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const placements = [
  {
    bankCode: "BNI",
    placementType: "Daily",
    balance: 12000000,
    lastUpdated: "23/06/2025",
    color: "orange",
  },
  {
    bankCode: "BRI",
    placementType: "Savings",
    balance: 27000000,
    lastUpdated: "22/06/2025",
    color: "blue",
  },
  {
    bankCode: "Stockbit",
    placementType: "Investment",
    balance: 87500000,
    lastUpdated: "20/06/2025",
    color: "slate",
  },
  {
    bankCode: "Gopay",
    placementType: "daily",
    balance: 200000,
    lastUpdated: "22/06/2025",
    color: "green",
  },
  // {
  //   bankCode: "Dana",
  //   placementType: "games",
  //   balance: 180000,
  //   lastUpdated: "22/06/2025",
  //   color: "sky",
  // },
  // {
  //   bankCode: "Jago",
  //   placementType: "savings",
  //   balance: 15000,
  //   lastUpdated: "22/06/2025",
  //   color: "orange",
  // },
];

export default function Home() {

  const router = useRouter();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    console.log("isauthenticated", token);
    if (!token) {
      router.push("/login");
    }
  }, [router, token]);

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
                  {placements.map((placement, index) => (
                    <PlacementCard
                      key={index}
                      bankCode={placement.bankCode}
                      placementType={placement.placementType}
                      balance={placement.balance}
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
