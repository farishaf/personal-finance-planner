import React from "react";
import { Input } from "../ui/input";
import Combobox from "./comboBox";
import { OptionsProps } from "@/utils/interfaces";

interface FilterDataProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  filterList1: OptionsProps[];
  filter1: string;
  setFilter1: (filter1: string) => void;
  filterList2: OptionsProps[];
  filter2: string;
  setFilter2: (filter2: string) => void;
}
const FilterData = ({
  keyword,
  setKeyword,
  filterList1,
  filter1,
  setFilter1,
  filterList2,
  filter2,
  setFilter2,
}: FilterDataProps) => {
  const [openFilter1, setOpenFilter1] = React.useState(false);
  const [openFilter2, setOpenFilter2] = React.useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: "1rem",
        width: "100%",
      }}
    >
      <div style={{ width: "100%", maxWidth: "20rem" }}>
        <Input
          width={"300px"}
          type="text"
          placeholder="Search interaction . . ."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      {/* filter 1 */}
      <Combobox
        placeholder="status"
        Options={filterList1}
        value={filter1}
        setValue={setFilter1}
        open={openFilter1}
        setOpen={setOpenFilter1}
      />
      {/* filter 2 */}
      <Combobox
        placeholder="platform"
        Options={filterList2}
        value={filter2}
        setValue={setFilter2}
        open={openFilter2}
        setOpen={setOpenFilter2}
      />
    </div>
  );
};

export default FilterData;
