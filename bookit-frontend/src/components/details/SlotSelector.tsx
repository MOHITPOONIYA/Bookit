import React from "react";
import type { ISlot } from "../../services/api";

interface Props {
  uniqueDates: string[];
  slotsForSelectedDate: ISlot[];
  selectedDate: string | null;
  selectedSlot: ISlot | null;
  onDateChange: (date: string) => void;
  onSlotChange: (slot: ISlot) => void;
}

const SlotSelector: React.FC<Props> = ({
  uniqueDates,
  slotsForSelectedDate,
  selectedDate,
  selectedSlot,
  onDateChange,
  onSlotChange,
}) => {
  return (
    <>
      {/* Date Selector */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Choose date</h2>
        <div className="flex flex-wrap gap-3">
          {uniqueDates.map((date) => (
            <button
              key={date}
              onClick={() => onDateChange(date)}
              className={`px-4 py-2 rounded-md border cursor-pointer ${
                selectedDate === date
                  ? "bg-yellow-500 text-black border-yellow-500"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      {/* Time Selector */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Choose time</h2>
        <div className="flex flex-wrap gap-3">
          {slotsForSelectedDate.map((slot) => (
            <button
              key={slot._id}
              onClick={() => onSlotChange(slot)}
              disabled={slot.spotsLeft === 0}
              className={`px-4 py-2 rounded-md border cursor-pointer ${
                selectedSlot?._id === slot._id
                  ? "bg-yellow-500 text-black border-yellow-500"
                  : slot.spotsLeft === 0
                  ? " bg-[#BDBDBD] text-[#838383] border-gray-300"
                  : " text-[#838383] border-gray-300"
              }`}
            >
              {slot.time}
              <span className= {`${slot.spotsLeft === 0?"text-[#6A6A6A]":"text-[#FF4C0A]"} ml-2  font-inter font-medium text-[10px] leading-[12px] tracking-[0em]`}>
                {slot.spotsLeft === 0
                  ? "Sold out"
                  : `${slot.spotsLeft} left`}
              </span>
            </button>
          ))}
        </div>
        <div className="font-inter font-normal text-[#838383] text-[12px] leading-[16px] tracking-[0em] mt-2">All times are in IST(GMT +5:30)</div>
      </div>
    </>
  );
};

export default SlotSelector;
