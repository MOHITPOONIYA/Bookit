
import { useFormContext } from 'react-hook-form';

export interface ICheckoutFormData {
  fullName: string;
  email: string;
  promoCode: string;
  terms: boolean;
}

const CheckoutForm = () => {
  const { register, formState: { errors } } = useFormContext<ICheckoutFormData>();

  return (
    <div className="bg-[#EFEFEF] border border-gray-200 rounded-lg p-6 md:p-8 space-y-6 transition-all duration-200">
      {/* --- User Details --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-[#5B5B5B] mb-1"
          >
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Your name"
            {...register('fullName', { required: 'Full name is required' })}
            className={`w-full p-2 sm:p-3 border rounded-md bg-[#DDDDDD] placeholder:text-[#727272] placeholder:font-inter placeholder:text-[14px] 
              ${errors.fullName ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-yellow-300 focus:border-yellow-400'}
              focus:outline-none focus:ring-2 transition-all`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#5B5B5B] mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            })}
            className={`w-full p-2 sm:p-3 border rounded-md bg-[#DDDDDD] placeholder:text-[#727272] placeholder:font-inter placeholder:text-[14px] 
              ${errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-yellow-300 focus:border-yellow-400'}
              focus:outline-none focus:ring-2 transition-all`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* --- Promo Code --- */}
      <div>
        <label
          htmlFor="promoCode"
          className="block text-sm font-medium text-[#5B5B5B] mb-1"
        >
          Promo Code
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="promoCode"
            type="text"
            {...register('promoCode')}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-md bg-[#DDDDDD] placeholder:text-[#727272] placeholder:font-inter placeholder:text-[14px] focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all"
            placeholder="Promo code"
          />
          <button
            type="button"
            className="bg-gray-800 text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
          >
            Apply
          </button>
        </div>
      </div>

      {/* --- Terms --- */}
      <div className="flex items-start sm:items-center gap-2">
        <input
          type="checkbox"
          id="terms"
          {...register('terms', { required: 'You must accept the terms' })}
          className="mt-1 sm:mt-0 appearance-none w-4 h-4 border border-[#727272] rounded-[2px]
          checked:bg-black checked:border-black
          flex items-center justify-center
          checked:after:content-['✓'] checked:after:text-white checked:after:text-[10px]
          cursor-pointer transition-all"
        />
        <label
          htmlFor="terms"
          className="font-inter text-[12px] sm:text-[13px] text-[#5B5B5B]"
        >
          I agree to the terms and safety policy
        </label>
      </div>
      {errors.terms && (
        <p className="text-red-500 text-xs">{errors.terms.message}</p>
      )}
    </div>
  );
};

export default CheckoutForm;
