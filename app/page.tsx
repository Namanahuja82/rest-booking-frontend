import BookingForm from '@/components/BookingForm';
import BookingList from '@/components/BookingList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Restaurant Table Booking
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Reserve your table at our restaurant. Please fill in the form below with your details.
        </p>
        <div className="grid lg:grid-cols-2 gap-8">
          <BookingForm />
          <BookingList />
        </div>
      </div>
    </main>
  );
}