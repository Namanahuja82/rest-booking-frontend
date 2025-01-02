'use client';
import { useEffect, useState } from 'react';
import { getBookings, deleteBooking } from '@/utils/api';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface Booking {
  _id: string;
  name: string;
  date: string;
  time: string;
  guests: number;
  status: string;
}

export default function BookingList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState('');

  const fetchBookings = async () => {
    try {
      const data = await getBookings(selectedDate);
      setBookings(data);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [selectedDate]);

  const handleDelete = async (id: string) => {
    try {
      await deleteBooking(id);
      toast.success('Booking cancelled successfully');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  return (
    <div className="booking-card">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Bookings</h2>
      <div className="mb-6">
        <label className="form-label">Filter by Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="booking-form-input"
        />
      </div>
      
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No bookings found</p>
        ) : (
          bookings.map((booking) => (
            <div 
              key={booking._id} 
              className="border border-gray-100 p-6 rounded-lg hover:shadow-md transition-shadow duration-200 bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="font-semibold text-lg text-gray-800">{booking.name}</p>
                  <p className="text-gray-600">
                    {format(new Date(booking.date), 'PPP')} at {booking.time}
                  </p>
                  <div className="flex space-x-4">
                    <p className="text-gray-600">
                      <span className="font-medium">Guests:</span> {booking.guests}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Status:</span>{' '}
                      <span className={`
                        ${booking.status === 'confirmed' ? 'text-green-600' : ''}
                        ${booking.status === 'pending' ? 'text-yellow-600' : ''}
                        ${booking.status === 'cancelled' ? 'text-red-600' : ''}
                      `}>
                        {booking.status}
                      </span>
                    </p>
                  </div>
                </div>
                {booking.status !== 'cancelled' && (
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}