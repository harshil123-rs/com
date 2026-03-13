import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, ShieldCheck, CheckCircle2, ChevronLeft, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { mockEquipment } from '../data/mockData';
import './EquipmentDetails.css';

export default function EquipmentDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const equipment = mockEquipment.find(e => e.id === id) || mockEquipment[0];

  const [rentDuration, setRentDuration] = useState<'hour' | 'day' | 'week'>('day');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [durationCount, setDurationCount] = useState<number>(1);

  const calculateTotal = () => {
    let rate = 0;
    if (rentDuration === 'hour') rate = equipment.rates.hour || 0;
    else if (rentDuration === 'day') rate = equipment.rates.day;
    else if (rentDuration === 'week') rate = equipment.rates.week;

    return rate * durationCount;
  };

  const handleBooking = () => {
    // In a real app we would pass booking state via context or redxu
    navigate('/checkout', {
      state: {
        equipment,
        duration: rentDuration,
        count: durationCount,
        date: selectedDate,
        total: calculateTotal()
      }
    });
  };

  return (
    <div className="bg-muted min-h-screen pb-16 pt-8">
      <div className="container max-w-6xl">
        <Link to="/search" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-6 transition-colors">
          <ChevronLeft size={20} /> Back to Search Results
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-light">
              <div className="h-96 relative">
                <img src={equipment.image} alt={equipment.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold text-primary-700 shadow-sm flex items-center gap-1">
                  <ShieldCheck size={16} /> Verified Equipment
                </div>
              </div>
            </div>

            {/* Details Wrapper */}
            <div className="bg-card rounded-xl p-6 lg:p-8 shadow-sm border border-light transition-shadow hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{equipment.name}</h1>
                  <div className="flex items-center flex-wrap gap-4 text-muted text-sm">
                    <span className="flex items-center gap-1"><MapPin size={16} /> {equipment.location}</span>
                    <span className="flex items-center gap-1">📍 {equipment.distanceKm} km away</span>
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">Available Now</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-b border-light py-6 my-6">
                <h3 className="text-lg font-bold mb-4">Specs & Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {equipment.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={16} className="text-primary-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-primary-500" />
                    <span>GPS Tracking Enabled</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Owner Identity</h3>
                <div className="flex items-center gap-4 bg-primary-50 p-4 rounded-lg border border-primary-100">
                  <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center text-primary-700 font-bold text-xl">
                    {equipment.owner.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{equipment.owner.name}</h4>
                    <div className="text-sm text-muted flex items-center gap-2">
                      <span className="flex items-center text-yellow-500 font-medium">
                        <Star size={14} className="fill-current mr-1" /> {equipment.owner.rating}
                      </span>
                      <span>• {equipment.owner.completedRentals} rentals</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl shadow-lg border border-primary-100 p-6 sticky top-28 booking-sidebar">
              <h2 className="text-xl font-bold mb-6 border-b border-light pb-4">Rent This Equipment</h2>

              {/* Duration Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Rent Duration</label>
                <div className="grid grid-cols-3 gap-2">
                  {equipment.rates.hour && (
                    <button
                      className={`pricing-btn ${rentDuration === 'hour' ? 'active' : ''}`}
                      onClick={() => setRentDuration('hour')}
                    >
                      <div className="text-xs text-muted mb-1">Per Hour</div>
                      <div className="font-bold">₹{equipment.rates.hour}</div>
                    </button>
                  )}
                  <button
                    className={`pricing-btn ${rentDuration === 'day' ? 'active' : ''}`}
                    onClick={() => setRentDuration('day')}
                  >
                    <div className="text-xs text-muted mb-1">Per Day</div>
                    <div className="font-bold">₹{equipment.rates.day}</div>
                  </button>
                  <button
                    className={`pricing-btn ${rentDuration === 'week' ? 'active' : ''}`}
                    onClick={() => setRentDuration('week')}
                  >
                    <div className="text-xs text-muted mb-1">Per Week</div>
                    <div className="font-bold">₹{equipment.rates.week}</div>
                  </button>
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Select Start Date</label>
                <div className="flex items-center gap-3 border border-light rounded-lg p-3 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition-colors">
                  <CalendarIcon className="text-primary-600" size={20} />
                  <input
                    type="date"
                    className="w-full text-sm outline-none text-main bg-transparent"
                    defaultValue={format(selectedDate, 'yyyy-MM-dd')}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  />
                </div>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1 font-medium">
                  <CheckCircle2 size={12} /> Available on selected dates
                </p>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3">How many {rentDuration}s?</label>
                <div className="flex items-center gap-4">
                  <button
                    className="w-10 h-10 rounded-full border border-primary-200 flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-colors"
                    onClick={() => setDurationCount(Math.max(1, durationCount - 1))}
                  >-</button>
                  <span className="text-lg font-bold w-8 text-center">{durationCount}</span>
                  <button
                    className="w-10 h-10 rounded-full border border-primary-200 flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-colors"
                    onClick={() => setDurationCount(durationCount + 1)}
                  >+</button>
                </div>
              </div>

              {/* Pricing Summary */}
              <div className="bg-muted p-4 rounded-lg mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">₹{rentDuration === 'hour' ? equipment.rates.hour : rentDuration === 'day' ? equipment.rates.day : equipment.rates.week} x {durationCount} {rentDuration}s</span>
                  <span className="font-semibold">₹{calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted">Service Fee (5%)</span>
                  <span className="font-semibold">₹{Math.round(calculateTotal() * 0.05)}</span>
                </div>
                <div className="border-t border-light mt-3 pt-3 flex justify-between font-bold text-lg">
                  <span>Total Total</span>
                  <span className="text-primary-700">₹{Math.round(calculateTotal() * 1.05)}</span>
                </div>
              </div>

              <button
                onClick={handleBooking}
                className="btn btn-primary w-full h-12 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 mt-6"
              >
                Book Now
              </button>

              <p className="text-center text-xs text-muted mt-4">You won't be charged yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
