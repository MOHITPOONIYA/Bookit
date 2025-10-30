import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


const API = axios.create({
  baseURL: API_URL
});

console.log('API is using base URL:', API_URL);


export interface IExperience {
  _id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  imageUrl: string;
}


export interface ISlot {
  _id: string;
  date: string;
  time: string;
  spotsLeft: number;
}


export interface IExperienceDetails {
  experience: IExperience;
  slots: ISlot[];
}


export interface IPromoPayload {
  code: string;
}


export interface IPromoResponse {
  message: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
}


export interface IBookingPayload {
  slotId: string;
  quantity: number;
  name: string;
  email: string;
  promoCode?: string; 
}


export interface IBookingConfirmation {
  message: string;
  booking: {
    _id: string;
    bookingRef: string;
    user: {
      name: string;
      email: string;
    };
    total: number;
  };
}



export const getExperiences = async () => {
  const { data } = await API.get<IExperience[]>('/experiences');
  return data;
};


export const getExperienceDetails = async (id: string) => {
  const { data } = await API.get<IExperienceDetails>(`/experiences/${id}`);
  return data;
};


export const validatePromoCode = async (code: string) => {
  const { data } = await API.post<IPromoResponse>('/promo/validate', { code });
  return data;
};



export const createBooking = async (bookingData: IBookingPayload) => {
  const { data } = await API.post<IBookingConfirmation>('/bookings', bookingData);
  return data;
};