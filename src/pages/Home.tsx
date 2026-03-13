import { Search, MapPin, Clock, Crosshair } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/search');
  };
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section relative">
        <div className="hero-bg absolute inset-0"></div>
        <div className="container relative z-10">
          <div className="hero-content text-center flex flex-col items-center justify-center">
            <h1 className="hero-title text-gradient">Smart Farm Equipment Rental</h1>
            <p className="hero-subtitle">
              Find and rent tractors, harvesters, and tools from trusted local owners. 
              Boost your yield without breaking the bank.
            </p>
            
            {/* Quick Search Widget */}
            <div className="search-widget glass-panel mt-8 text-left">
              <div className="search-tabs flex gap-4 mb-4">
                <button className="tab active text-primary-700 font-medium">Rent Equipment</button>
                <button className="tab text-muted hover:text-primary-600">Hire Labour</button>
              </div>

              <form className="search-inputs grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={handleSearch}>
                {/* Equipment Type */}
                <div className="input-group">
                  <label>What do you need?</label>
                  <div className="input-wrapper flex items-center gap-2">
                    <Search className="text-muted" size={18} />
                    <input type="text" placeholder="Tractor, Rotavator..." className="w-full" />
                  </div>
                </div>

                {/* Location */}
                <div className="input-group">
                  <label>Where?</label>
                  <div className="input-wrapper flex items-center gap-2">
                    <MapPin className="text-muted" size={18} />
                    <input type="text" placeholder="Current location..." className="w-full" />
                    <button type="button" className="loc-detect-btn" title="Use GPS" onClick={() => alert('Detecting GPS Location...')}>
                      <Crosshair size={16} className="text-primary-500" />
                    </button>
                  </div>
                </div>

                {/* Duration */}
                <div className="input-group">
                  <label>How long?</label>
                  <div className="input-wrapper flex items-center gap-2">
                    <Clock className="text-muted" size={18} />
                    <select className="w-full bg-transparent border-none outline-none text-main">
                      <option value="day">Full Day</option>
                      <option value="hour">By Hour</option>
                      <option value="week">By Week</option>
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <button type="submit" className="btn btn-primary w-full h-11 text-lg">
                    Find Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="categories-section py-16 bg-muted">
        <div className="container">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="section-title">Popular Equipment</h2>
              <p className="text-muted">Top rented farming tools near you</p>
            </div>
            <button className="btn btn-outline" onClick={() => navigate('/search')}>View All</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category Cards */}
            {[
              { name: 'Tractors', img: 'https://images.unsplash.com/photo-1592982537447-6f2334cbcc2b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', count: '124 available' },
              { name: 'Harvesters', img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', count: '45 available' },
              { name: 'Seed Drills', img: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', count: '89 available' },
              { name: 'Rotavators', img: 'https://images.unsplash.com/photo-1605680197779-7a06cb9f6ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', count: '156 available' }
            ].map((cat, i) => (
              <div key={i} className="category-card rounded-lg overflow-hidden relative group cursor-pointer" onClick={() => navigate('/search')}>
                <div className="img-overlay absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all"></div>
                <img src={cat.img} alt={cat.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{cat.name}</h3>
                  <p className="text-sm opacity-90">{cat.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
