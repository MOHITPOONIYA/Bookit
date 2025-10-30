import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form'; // Import FormProvider
import { createBooking } from '../services/api';
import type { IExperience, ISlot } from '../services/api';

// Import our new components
import CheckoutForm from '../components/Checkout/CheckoutForm';
import type { ICheckoutFormData } from '../components/Checkout/CheckoutForm';
import CheckoutSummary from '../components/Checkout/CheckoutSummary';

// Type for the data passed from the Details page
interface LocationState {
  experience: IExperience;
  slot: ISlot;
  quantity: number;
  subtotal: number;
  taxes: number;
  total: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  // --- Form State ---
  // We initialize react-hook-form here
  const methods = useForm<ICheckoutFormData>({
    mode: 'onChange', // Validate on every change
  });
  const { handleSubmit, formState: { isValid } } = methods;

  // --- API State ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // --- Redirect if no data ---
  if (!state) {
    navigate('/'); // Send them home
    return null; // Don't render anything
  }
  
  const { experience, slot, quantity, subtotal, taxes, total } = state;

  /**
   * Final submission to create the booking.
   */
  const onSubmit = async (data: ICheckoutFormData) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const bookingPayload = {
        slotId: slot._id,
        quantity: quantity,
        name: data.fullName,
        email: data.email,
        promoCode: data.promoCode || undefined, // Send if not empty
      };

      const confirmation = await createBooking(bookingPayload);

      // Success! Navigate to the result page
      navigate('/result', { 
        state: {
          success: true,
          bookingRef: confirmation.booking.bookingRef,
        } 
      });

    } catch (err) {
      setSubmitError('Failed to create booking. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container w-[80%]  mx-auto p-4 md:p-6">
      <button
        onClick={() => navigate(-1)}
        className=" mb-4 font-inter font-medium text-[14px] leading-[18px] tracking-[0em] text-[#000000]"
      >
        &larr; Checkout
      </button>

      {/* FormProvider allows us to pass form methods to nested components 
        (like CheckoutForm) without prop drilling.
      */}
      <FormProvider {...methods}>
        {/* We use <form> here to wrap both components */}
        <form 
          id="checkout-form" // This ID links the summary button
          onSubmit={handleSubmit(onSubmit)} 
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Left Side: Form */}
          <div className="w-full lg:w-2/3 ">
            <CheckoutForm />
          </div>

          {/* Right Side: Price Summary */}
          <div className="w-full lg:w-1/3">
            <CheckoutSummary
              experience={experience}
              slot={slot}
              quantity={quantity}
              subtotal={subtotal}
              taxes={taxes}
              total={total}
              isSubmitting={isSubmitting}
              isValid={isValid} // Pass form validity to the button
            />
          </div>
        </form>
      </FormProvider>

      {submitError && (
        <p className="text-red-500 text-sm mt-4 text-center">{submitError}</p>
      )}
    </div>
  );
};

export default Checkout;
