import React from 'react';
import { Link } from 'react-router-dom';
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
  selectedSlot: ISlot | null;
  quantity: number;
  price: number;
  subtotal: number;
  taxes: number;
  total: number;
  onQuantityChange: (delta: number) => void;
}

const PriceSummaryCard: React.FC<Props> = ({
  experience,
  selectedSlot,
  quantity,
  price,
  subtotal,
  taxes,
  total,
  onQuantityChange,
}) => {
  return (
    <div className="bg-[#EFEFEF] border border-gray-200 rounded-lg shadow-lg p-6 lg:sticky  w-[387px] h-fit gap-[15px] rounded-[12px] flex flex-col ">
      <div className="space-y-3">
        <div className="flex justify-between w-full h-fit">
          <span className='font-inter font-normal text-[16px]  tracking-[0em] text-[#656565]'>Starts at</span>
          <span className=" font-inter  text-[18px] leading-[22px] tracking-[0em] text-[#161616]">{formatCurrency(price)}</span>
        </div>
        <div className="flex justify-between items-center ">
          <span className='font-inter font-normal text-[16px]  tracking-[0em] text-[#656565]'>Quantity</span>
          <div className="flex items-center justify-between  font-inter gap-[9px]  ">
            <button
              onClick={() => onQuantityChange(-1)}
              disabled={quantity === 1}
              className=" w-[24px] h-[24px] flex items-center justify-center border border-[#C9C9C9] text-[#161616] text-[14px] font-medium hover:bg-gray-100 cursor-pointer disabled:opacity-50"
            >
              -
            </button>
            <span className="text-[12px] text-[#161616]">{quantity}</span>
            <button
              onClick={() => onQuantityChange(1)}
              className="w-[24px] h-[24px] flex items-center justify-center border border-[#C9C9C9] text-[#161616] text-[14px] font-medium hover:bg-gray-100 cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <span className='font-inter font-normal text-[16px] leading-[20px] tracking-[0em] text-[#656565]'>Subtotal</span>
          <span className="font-inter font-normal text-[14px] leading-[20px] tracking-[0em] text-[#161616]">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span className='font-inter font-normal text-[16px] leading-[20px] tracking-[0em] text-[#656565]'>Taxes</span>
          <span className='text-[#161616] text-[14px]'>{formatCurrency(taxes)}</span>
        </div>
      </div>

      <hr className="text-[#D9D9D9]" />

      <div className="flex justify-between text-xl font-bold mb-1">
        <span className='font-inter font-medium text-[20px] leading-[24px] tracking-[0em]'>Total</span>
        <span className='font-inter font-medium text-[20px] leading-[24px] tracking-[0em]'>{formatCurrency(total)}</span>
      </div>

      <Link
        to="/checkout"
        state={{
          experience: experience,
          slot: selectedSlot,
          quantity: quantity,
          subtotal: subtotal,
          taxes: taxes,
          total: total,
        }}
        className={`w-full text-center py-3 rounded-md font-semibold ${
          !selectedSlot
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-yellow-500 text-black hover:bg-yellow-600'
        } bd-[#D&D&D&]`}
        onClick={(e) => !selectedSlot && e.preventDefault()}
      >
        Confirm
      </Link>
    </div>
  );
};

export default PriceSummaryCard;
