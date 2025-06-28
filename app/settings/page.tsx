"use client";

import PageTitle from "@/components/page-title";
import React, { useEffect } from "react";
import PlacementSettingsTable from "@/components/settings/placement-settings";
import TagsSettings from "@/components/settings/tags-settings";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

const SettingsPage = () => {
  const router = useRouter();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    console.log("isauthenticated", token);
    if (!token) {
      router.push("/login");
    }
  }, [router, token]);

  return (
    <>
      <div className="px-2 py-[10px] flex justify-start">
        <SidebarTrigger />
      </div>
      <div style={{ height: "1px", borderBottom: "1px solid #E0E0E0" }} />
      <div className="flex flex-col p-4 space-y-4">
        <PageTitle
          title="Settings"
          subTitle="Manage your tags and placements"
        />

        {/* to do: add settings components here */}
        <div className="flex flex-row w-full gap-4 justify-between">
          <PlacementSettingsTable />
          <TagsSettings />
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
