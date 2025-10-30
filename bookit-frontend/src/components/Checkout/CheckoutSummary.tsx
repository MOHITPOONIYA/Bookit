import React from 'react';
import type { IExperience, ISlot } from '../../services/api';

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
};

interface Props {
  experience: IExperience;
  slot: ISlot;
  quantity: number;
  subtotal: number;
  taxes: number;
  total: number;
  isSubmitting: boolean;
  isValid: boolean;
}

const CheckoutSummary: React.FC<Props> = ({
  experience,
  slot,
  quantity,
  subtotal,
  taxes,
  total,
  isSubmitting,
  isValid
}) => {
  return (
    <div className="bg-[#EFEFEF] border border-gray-200 rounded-lg shadow-lg p-6 sm:p-5 md:p-6 lg:sticky lg:top-28 w-full max-w-md mx-auto lg:max-w-none">

      {/* Experience Details */}
      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between text-sm sm:text-base">
          <span className="text-[#656565] font-inter">Experience</span>
          <span className="font-inter font-semibold text-[#161616] text-right">{experience.name}</span>
        </div>
        <div className="flex justify-between text-sm sm:text-base">
          <span className="text-[#656565] font-inter">Date</span>
          <span className="font-inter font-semibold text-[#161616] text-right">{slot.date}</span>
        </div>
        <div className="flex justify-between text-sm sm:text-base">
          <span className="text-[#656565] font-inter">Time</span>
          <span className="font-inter font-semibold text-[#161616] text-right">{slot.time}</span>
        </div>
        <div className="flex justify-between text-sm sm:text-base">
          <span className="text-[#656565] font-inter">Qty</span>
          <span className="font-inter font-semibold text-[#161616] text-right">{quantity}</span>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2 mt-5">
        <div className="flex justify-between text-sm sm:text-base">
          <span className="text-[#656565] font-inter">Subtotal</span>
          <span className="font-inter font-semibold text-[#161616]">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm sm:text-base">
          <span className="text-[#656565] font-inter">Taxes</span>
          <span className="font-inter font-semibold text-[#161616]">{formatCurrency(taxes)}</span>
        </div>
      </div>

      <hr className="my-4 border-[#D9D9D9]" />

      {/* Total */}
      <div className="flex justify-between text-lg sm:text-xl font-bold mb-6">
        <span className="font-inter font-medium text-[#161616]">Total</span>
        <span className="font-inter font-medium text-[#161616]">{formatCurrency(total)}</span>
      </div>

      {/* Checkout Button */}
      <button
        type="submit"
        form="checkout-form"
        disabled={!isValid || isSubmitting}
        className="w-full text-center py-3 sm:py-3.5 rounded-md font-semibold bg-yellow-500 text-black hover:bg-yellow-600 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Processing...' : 'Pay and Confirm'}
      </button>
    </div>
  );
};

export default CheckoutSummary;
