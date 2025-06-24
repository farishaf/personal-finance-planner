import React from "react";
import Typography from "../Typography/Typography";
import { convertRupiah } from "@/utils/helper";
import { PlacementCardProps } from "@/types";

const PlacementCard = ({bankCode, placementType, balance, lastUpdated, color}: PlacementCardProps) => {
  return (
    <div className={`min-w-[360px] w-full my-2 p-6 rounded-2xl flex flex-col gap-4 bg-gradient-to-br from-${color}-400 to-${color}-500 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
      <div className="w-full flex flex-row gap-1 items-center justify-between">
        <Typography type="title-2xl" color="#fff">
          {bankCode}
        </Typography>
        <div className="inline-flex items-center px-3 py-1 rounded-full backdrop-blur-sm bg-white/30 border border-white/20 shadow-sm">
          <Typography type="caption-md" color="#fff">
            {placementType}
          </Typography>
        </div>
      </div>

      <div className="flex flex-col bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
        <Typography type="body-sm" color="#fff">
          Total Balance
        </Typography>
        <Typography type="title-xl" color="#fff">
          {convertRupiah(balance)}
        </Typography>
      </div>

      <Typography type="caption-md" color="#fff">
        Last Updated: {lastUpdated}
      </Typography>
    </div>
  );
};

export default PlacementCard;
