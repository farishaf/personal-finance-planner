"use client";

import PageTitle from "@/components/page-title";
import React from "react";
import PlacementSettingsTable from "@/components/settings/placement-settings";
import TagsSettings from "@/components/settings/tags-settings";

const SettingsPage = () => {
  return (
    <div className="flex flex-col p-4 space-y-4">
      <PageTitle title="Settings" subTitle="Manage your tags and placements" />

      {/* to do: add settings components here */}
      <div className="flex flex-row w-full gap-4 justify-between">
        <PlacementSettingsTable />
        <TagsSettings />
      </div>
    </div>
  );
};

export default SettingsPage;
