import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExperienceDetails } from "../services/api";
import type { ISlot, IExperienceDetails } from "../services/api";

// Import the new components
import ExperienceInfo from "../components/details/ExperienceInfo";
import SlotSelector from "../components/details/SlotSelector";
import PriceSummaryCard from "../components/details/PriceSummaryCard";

// Helper to get unique dates
const getUniqueDates = (slots: ISlot[]) => {
  const dates = slots.map((slot) => slot.date);
  return [...new Set(dates)];
};

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // State for data
  const [details, setDetails] = useState<IExperienceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for selections
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<ISlot | null>(null);
  const [quantity, setQuantity] = useState(1);

  // 1. Data Fetching
  useEffect(() => {
    if (!id) {
      setError("No experience ID provided.");
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getExperienceDetails(id!);
        setDetails(data);

        // Auto-select the first available date
        const uniqueDates = getUniqueDates(data.slots);
        if (uniqueDates.length > 0) {
          setSelectedDate(uniqueDates[0]);
        }
      } catch (err) {
        setError("Failed to load details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  // 2. Derived State (calculating what to show)
  const uniqueDates = useMemo(() => {
    return getUniqueDates(details?.slots || []);
  }, [details?.slots]);

  const slotsForSelectedDate = useMemo(() => {
    return details?.slots.filter((slot) => slot.date === selectedDate) || [];
  }, [details?.slots, selectedDate]);

  // 3. Price Calculation
  const price = details?.experience.price || 0;
  const subtotal = price * quantity;
  const taxes = subtotal * 0.05; // 5% tax
  const total = subtotal + taxes;

  // 4. Handlers
  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset time on date change
  };

  const handleSlotChange = (slot: ISlot) => {
    if (slot.spotsLeft > 0) {
      setSelectedSlot(slot);
      setQuantity(1); // Reset quantity on new slot selection
    }
  };

  // --- Render Logic ---
  if (loading) {
    return <div className="text-center p-10">Loading Details...</div>;
  }

  if (error || !details) {
    return (
      <div className="text-center p-10 text-red-500">
        {error || "Details not found."}
      </div>
    );
  }

  const { experience } = details;

  return (
    <div className="container w-[80%] mx-auto p-4 md:p-6">
      <button
        onClick={() => navigate(-1)} // Go back to previous page
        className="text-gray-700 font-semibold mb-4 gap-[8px] w-fit h-fit cursor-pointer"
      >
        <span className="w-[12.99px] h-[12.65px] text-[#000000] font-inter font-medium text-[14px] leading-[18px] tracking-[0em] ">&larr; Details</span>
        
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Details */}
        <div className="w-full lg:w-2/3">
          <ExperienceInfo experience={experience} />
          <SlotSelector
            uniqueDates={uniqueDates}
            slotsForSelectedDate={slotsForSelectedDate}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            onDateChange={handleDateChange}
            onSlotChange={handleSlotChange}
          />
        </div>

        {/* Right Side: Price Card (Sticky) */}
        <div className="w-full lg:w-1/3">
          <PriceSummaryCard
            experience={experience}
            selectedSlot={selectedSlot}
            quantity={quantity}
            price={price}
            subtotal={subtotal}
            taxes={taxes}
            total={total}
            onQuantityChange={handleQuantityChange}
          />
        </div>
      </div>
      <div className="w-[765px]">
        <h2 className="text-xl font-semibold mb-3">About</h2>
        <p className="text-gray-600 bg-gray-100 p-4 rounded-md">
          Scenic routes, trained guides, and safety briefing. Minimum age 10.
        </p>
      </div>
    </div>
  );
};

export default Details;
