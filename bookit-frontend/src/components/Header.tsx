import React, { useState } from 'react'; // 1. Import useState
import { Link } from 'react-router-dom';
import image from "../assets/logo.png";

// 2. Define the props we expect from App.tsx
interface HeaderProps {
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setSearchTerm }) => { // 3. Accept props
  
  // 4. This state tracks what's typed in the box
  const [localSearch, setLocalSearch] = useState('');

  const handleSearchClick = () => {
    // 5. On click, send the typed value up to App.tsx
    setSearchTerm(localSearch);
  };

  return (
    <nav className="bg-white shadow-[0_2px_18px_rgba(0,0,0,0.10)] h-auto lg:h-[87px] ">
      <div className="container mx-auto px-4 lg:px-8 py-4 lg:py-0 flex flex-col lg:flex-row h-full items-center justify-between gap-4 lg:gap-0 w-[80%] mx-auto">
        
        {/* Logo */}
        <Link to="/" className="text-xl w-[100px]  font-bold text-gray-800">
          <img src={image} alt="" />
        </Link>

        {/* Search - Updated with 16px gap */}
        <div className="flex items-center gap-x-4  max-w-lg   gap-[16px] w-[443px] h-[42px] ">
          <input
            type="text"
            placeholder="Search experiences"
            className="text-[#727272] flex-1 px-4 py-2 bg-[#EDEDED] border border-gray-300 rounded-md h-[42px] focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={localSearch} // 6. Use local state value
            onChange={(e) => setLocalSearch(e.target.value)} // 7. Update local state on type
          />
          <button
            type="button"
            className="bg-[#FFD634] text-[#161616] px-6 py-2 rounded-md font-semibold h-[42px] hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onClick={handleSearchClick} // 8. Add click handler
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;