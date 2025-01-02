'use client';
import { useState } from 'react';
import { createBooking } from '@/utils/api';
import toast from 'react-hot-toast';

const AVAILABLE_TIMES = [
  '12:00', '13:00', '14:00', '15:00', '18:00', '19:00', '20:00', '21:00'
];

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: 1,
    phoneNumber: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBooking(formData);
      toast.success('Booking created successfully!', {
        style: {
          background: '#10B981',
          color: '#fff'
        }
      });
      setFormData({
        name: '',
        email: '',
        date: '',
        time: '',
        guests: 1,
        phoneNumber: ''
      });
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to create booking', {
        style: {
          background: '#EF4444',
          color: '#fff'
        }
      });
    }
  };

  return (
    <div className="booking-card">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Make a Reservation</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="form-label">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="booking-form-input"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="booking-form-input"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              className="booking-form-input"
              placeholder="Your phone number"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Date</label>
            <input
              type="date"
              value={formData.date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="booking-form-input"
              required
            />
          </div>

          <div>
            <label className="form-label">Time</label>
            <select
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="booking-form-input"
              required
            >
              <option value="">Select time</option>
              {AVAILABLE_TIMES.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="form-label">Number of Guests</label>
          <input
            type="number"
            min="1"
            max="10"
            value={formData.guests}
            onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
            className="booking-form-input"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-lg shadow-lg hover:shadow-xl"
        >
          Book Table
        </button>
      </form>
    </div>
  );
}