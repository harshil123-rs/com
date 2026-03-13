import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Truck, Store, CreditCard, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Equipment } from '../data/mockData';
import { format } from 'date-fns';
import './Checkout.css';

interface BookingState {
  equipment: Equipment;
  duration: 'hour' | 'day' | 'week';
  count: number;
  date: Date;
  total: number;
}

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState<BookingState | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'wallet'>('upi');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (location.state) {
      setState(location.state as BookingState);
    } else {
      // Handle direct navigation without state (fallback)
      navigate('/search');
    }
  }, [location, navigate]);

  if (!state) return <div>Loading...</div>;

  const { equipment, duration, count, date, total } = state;
  const serviceFee = Math.round(total * 0.05);
  const deliveryFee = deliveryMethod === 'delivery' ? 500 : 0;
  const finalTotal = total + serviceFee + deliveryFee;

  const handleConfirm = () => {
    setIsSuccess(true);
    // In a real app we would submit to an API here
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-muted py-12 flex items-center justify-center">
        <div className="bg-card max-w-md w-full rounded-2xl p-8 text-center shadow-lg border border-light">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-primary-600" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-muted mb-8">
            Your {equipment.name} has been booked. Managing Owner {equipment.owner.name} will contact you shortly.
          </p>
          <div className="bg-primary-50 rounded-lg p-4 mb-8 text-sm text-left">
            <div className="flex justify-between mb-2">
              <span className="text-primary-700">Booking ID</span>
              <span className="font-bold">#AGR-{Math.floor(Math.random() * 10000)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-primary-700">Date</span>
              <span className="font-bold">{format(new Date(date), 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-700">Amount Paid</span>
              <span className="font-bold">₹{finalTotal}</span>
            </div>
          </div>
          <Link to="/" className="btn btn-primary w-full shadow-md">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-muted min-h-screen py-8">
      <div className="container max-w-5xl">
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-primary-600 font-medium mb-6 hover:text-primary-700">
          <ArrowLeft size={18} className="mr-2" /> Back to details
        </button>

        <h1 className="text-2xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Delivery Selection */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-light">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-primary-600" size={20} /> How will you get the equipment?
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <label className={`selection-card ${deliveryMethod === 'pickup' ? 'active' : ''} cursor-pointer p-4 rounded-lg flex gap-3 relative`}>
                  <input 
                    type="radio" 
                    name="delivery" 
                    className="mt-1 accent-primary-600 w-4 h-4" 
                    checked={deliveryMethod === 'pickup'} 
                    onChange={() => setDeliveryMethod('pickup')}
                  />
                  <div>
                    <div className="font-bold mb-1 flex items-center gap-2"><Store size={16}/> Self Pickup</div>
                    <div className="text-sm text-muted">Pick up from {equipment.location} ({equipment.distanceKm} km away)</div>
                    <div className="text-sm font-semibold text-primary-600 mt-2">Free</div>
                  </div>
                </label>

                <label className={`selection-card ${deliveryMethod === 'delivery' ? 'active' : ''} cursor-pointer p-4 rounded-lg flex gap-3 relative`}>
                  <input 
                    type="radio" 
                    name="delivery" 
                    className="mt-1 accent-primary-600 w-4 h-4" 
                    checked={deliveryMethod === 'delivery'} 
                    onChange={() => setDeliveryMethod('delivery')}
                  />
                  <div>
                    <div className="font-bold mb-1 flex items-center gap-2"><Truck size={16}/> Delivery to Farm</div>
                    <div className="text-sm text-muted">Equipment delivered directly to your saved location</div>
                    <div className="text-sm font-semibold text-primary-600 mt-2">+₹500</div>
                  </div>
                </label>
              </div>

              {deliveryMethod === 'delivery' && (
                <div className="mt-4 pt-4 border-t border-light">
                  <label className="block text-sm font-medium mb-2">Delivery Address</label>
                  <textarea 
                    className="w-full border border-light rounded-md p-3 focus:border-primary-500 outline-none text-sm" 
                    rows={3} 
                    placeholder="Enter full farm address and landmarks..."
                    defaultValue="Survey No. 45/2, Near Old Banyan Tree, Village Road"
                  ></textarea>
                </div>
              )}
            </div>

            {/* Payment Selection */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-light">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <CreditCard className="text-primary-600" size={20} /> Payment Option
              </h2>

              <div className="space-y-3">
                <label className={`payment-method ${paymentMethod === 'upi' ? 'active' : ''} flex items-center p-4 border border-light rounded-lg cursor-pointer bg-card transition-colors`}>
                  <input type="radio" name="payment" className="accent-primary-600 w-4 h-4 mr-4" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                  <div className="flex-1 font-medium">UPI (Google Pay, PhonePe, Paytm)</div>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-4 opacity-70" />
                </label>

                <label className={`payment-method ${paymentMethod === 'wallet' ? 'active' : ''} flex items-center p-4 border border-light rounded-lg cursor-pointer bg-card transition-colors`}>
                  <input type="radio" name="payment" className="accent-primary-600 w-4 h-4 mr-4" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} />
                  <div className="flex-1 font-medium">AgriWallet Balance</div>
                  <span className="text-sm font-bold text-primary-600">₹1,250 Available</span>
                </label>

                <label className={`payment-method ${paymentMethod === 'cod' ? 'active' : ''} flex items-center p-4 border border-light rounded-lg cursor-pointer bg-card transition-colors`}>
                  <input type="radio" name="payment" className="accent-primary-600 w-4 h-4 mr-4" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                  <div className="flex-1 font-medium">Pay on Delivery / Pickup</div>
                  <span className="text-sm text-muted">Cash or UPI accepted</span>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column - Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl shadow-lg border border-primary-100 sticky top-28 overflow-hidden">
              <div className="p-6 border-b border-light bg-primary-50">
                <h3 className="font-bold text-lg mb-4 text-primary-900">Order Summary</h3>
                <div className="flex gap-4">
                  <img src={equipment.image} alt={equipment.name} className="w-20 h-20 object-cover rounded-md shadow-sm" />
                  <div>
                    <h4 className="font-bold text-sm lh-tight">{equipment.name}</h4>
                    <p className="text-xs text-muted mt-1">{equipment.owner.name}</p>
                    <p className="text-xs font-semibold mt-2">{format(new Date(date), 'MMM dd, yyyy')} • {count} {duration}(s)</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between text-muted">
                    <span>Rate ({count} {duration}s)</span>
                    <span className="font-medium text-main">₹{total}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Service Fee (5%)</span>
                    <span className="font-medium text-main">₹{serviceFee}</span>
                  </div>
                  {deliveryMethod === 'delivery' && (
                    <div className="flex justify-between text-muted">
                      <span>Delivery Fee</span>
                      <span className="font-medium text-main">₹{deliveryFee}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-light pt-4 mb-6">
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-black text-2xl text-primary-700">₹{finalTotal}</span>
                  </div>
                </div>

                <button 
                  onClick={handleConfirm}
                  className="btn btn-primary w-full h-12 text-lg font-bold flex justify-between items-center px-6 shadow-md hover:-translate-y-1 transition-transform"
                >
                  <span>Pay ₹{finalTotal}</span>
                  <ChevronRight size={20} />
                </button>
                <div className="text-center mt-4 flex items-center justify-center gap-1 text-xs text-muted">
                  <ShieldCheck size={14} className="text-green-600" /> Secure Payment
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
