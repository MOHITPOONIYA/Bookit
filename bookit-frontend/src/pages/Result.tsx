import { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

// This is the data we expect from the Checkout page's navigation state
interface LocationState {
  success: boolean;
  bookingRef?: string; // Optional, only on success
}

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  // --- Security Redirect ---
  // If a user types '/result' in the URL, `state` will be null.
  // We must redirect them to the home page.
  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);

  // Render nothing while redirecting
  if (!state) {
    return null;
  }
  
  const { success, bookingRef } = state;

  return (
    <div className="container mx-auto flex justify-center mt-20" 
         // This style centers the box vertically on the page
         style={{ minHeight: 'calc(100vh - 87px)' }}>
      
      <div className="p-5 text-center w-full max-w-md">
        
        {/* --- SUCCESS STATE --- */}
        {success ? (
          <div>
            <BsCheckCircleFill className="text-green-500 w-[70px] h-[70px] text-6xl mx-auto mb-6" />
            <h1 className="text-3xl mb-3 font-inter font-medium text-[32px]  tracking-[0em] text-[#161616]">Booking Confirmed</h1>
            <p className="text-lg text-gray-600 mb-6">
              Ref ID: <span className=" font-inter font-normal text-[20px]  tracking-[0em] text-[#656565]">{bookingRef}</span>
            </p>
            <Link
              to="/"
              className="bg-[#E3E3E3] text-[#656565]   px-6 py-2 rounded-md font-semibold hover:bg-gray-300 "
            >
              Back to Home
            </Link>
          </div>
        ) : (
        
        /* --- FAILURE STATE --- */
          <div>
            <BsXCircleFill className="text-red-500 text-6xl mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-3">Booking Failed</h1>
            <p className="text-lg text-gray-600 mb-6">
              Something went wrong with your booking. Please try again.
            </p>
            <Link
              to="/" // You could also link back to checkout
              className="bg-yellow-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-yellow-600"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;