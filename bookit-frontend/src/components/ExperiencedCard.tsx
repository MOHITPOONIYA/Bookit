import React from 'react';
import { Link } from 'react-router-dom';
import type { IExperience } from '../services/api'; // Import our type

interface Props {
  experience: IExperience;
}

const ExperienceCard: React.FC<Props> = ({ experience }) => {
  return (
    <div className="border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col w-[90%] sm:w-[280px] bg-white transition-transform duration-200 hover:scale-[1.02] mx-auto">
      
      {/* Image Section */}
      <div className="h-[180px] w-full overflow-hidden">
        <img
          src={experience.imageUrl}
          alt={experience.name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex-grow flex flex-col bg-[#F0F0F0]">
        
        {/* Title and Location */}
        <div className="flex justify-between items-center">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 font-inter leading-tight">
            {experience.name}
          </h3>
          <span className="text-xs sm:text-sm text-[#161616] font-inter font-medium bg-[#D6D6D6] px-2 py-1 rounded-md">
            {experience.location}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 mt-2 flex-grow font-inter">
          {experience.description}
        </p>

        {/* Price and Button */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-baseline">
            <span className="text-xs sm:text-sm mr-1 font-inter">From</span>
            <span className="text-lg sm:text-xl font-semibold text-gray-900 font-inter">
              ₹{experience.price}
            </span>
          </div>

          <Link
            to={`/details/${experience._id}`}
            className="bg-yellow-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
