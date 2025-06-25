"use client"

import { GrowthChart } from "@/components/growthChart";
import PageTitle from "@/components/page-title";
import PlacementCard from "@/components/placementCard";
import useLogin from "@/zustand/use-login";
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
  );  
}