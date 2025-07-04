import React from "react";
import Typography from "../Typography/Typography";
import { convertRupiah } from "@/utils/helper";
import { PlacementCardProps } from "@/types";
import { format } from "date-fns";

const colorMaps = {
  // Reds
  red: "from-red-400 to-red-500",
  
  // Oranges
  orange: "from-orange-400 to-orange-500",
  amber: "from-amber-400 to-amber-500",
  
  // Yellows
  yellow: "from-yellow-400 to-yellow-500",
  
  // Greens
  lime: "from-lime-400 to-lime-500",
  green: "from-green-400 to-green-500",
  emerald: "from-emerald-400 to-emerald-500",
  
  // Teals
  teal: "from-teal-400 to-teal-500",
  
  // Cyans
  cyan: "from-cyan-400 to-cyan-500",
  sky: "from-sky-400 to-sky-500",
  
  // Blues
  blue: "from-blue-400 to-blue-500",
  indigo: "from-indigo-400 to-indigo-500",
  
  // Purples
  violet: "from-violet-400 to-violet-500",
  purple: "from-purple-400 to-purple-500",
  fuchsia: "from-fuchsia-400 to-fuchsia-500",
  
  // Pinks
  pink: "from-pink-400 to-pink-500",
  rose: "from-rose-400 to-rose-500",
  
  // Grays
  slate: "from-slate-400 to-slate-500",
  gray: "from-gray-400 to-gray-500",
  zinc: "from-zinc-400 to-zinc-500",
  neutral: "from-neutral-400 to-neutral-500",
  stone: "from-stone-400 to-stone-500",
  
  // You can also add other variations if needed
  // Example with different shades:
  redDark: "from-red-600 to-red-700",
  blueLight: "from-blue-300 to-blue-400"
};
const PlacementCard = ({bankCode, placementType, balance, lastUpdated, color}: PlacementCardProps) => {

  const gradientClass = colorMaps[color as keyof typeof colorMaps] || "from-gray-400 to-gray-500";

  return (
    <div className={`min-w-[360px] w-full my-2 p-6 rounded-2xl flex flex-col gap-4 bg-gradient-to-br ${gradientClass} shadow-lg hover:shadow-xl transition-shadow duration-300`}>
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
        Last Updated: {format(lastUpdated, "dd-MM-yyyy")}
      </Typography>
    </div>
  );
};

export default PlacementCard;
