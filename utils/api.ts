import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

export interface BookingData {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  phoneNumber: string;
}

export const createBooking = async (data: BookingData) => {
  const response = await api.post('/api/bookings', data);
  return response.data;
};

export const getBookings = async (date?: string) => {
  const response = await api.get('/api/bookings', {
    params: { date }
  });
  return response.data;
};

export const deleteBooking = async (id: string) => {
  const response = await api.delete(`/api/bookings/${id}`);
  return response.data;
};