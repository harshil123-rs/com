import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, MapPin, Star } from 'lucide-react';
import { mockEquipment } from '../data/mockData';
import './SearchRefined.css';

export default function SearchRefined() {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="search-results-page bg-muted min-h-screen pb-12">
      {/* Top Search Bar */}
      <div className="bg-card border-b border-light py-4 sticky top-0 z-40 shadow-sm">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full max-w-2xl flex gap-2">
              <input 
                type="text" 
                placeholder="Search equipment..." 
                className="w-full px-4 py-2 rounded-md border border-light focus:outline-none focus:border-primary-500"
                defaultValue="Tractor"
              />
              <button className="btn btn-primary px-6" onClick={() => alert('Search initiated!')}>Search</button>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <span className="text-sm font-medium whitespace-nowrap">{mockEquipment.length} Results</span>
              <div className="flex border border-light rounded-md overflow-hidden">
                <button 
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'list' ? 'bg-primary-50 text-primary-700' : 'bg-card'}`}
                  onClick={() => setActiveTab('list')}
                >
                  List
                </button>
                <button 
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'map' ? 'bg-primary-50 text-primary-700' : 'bg-card'}`}
                  onClick={() => setActiveTab('map')}
                >
                  Map Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-card rounded-lg p-6 shadow-sm sticky top-28">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-light">
                <Filter size={20} className="text-primary-600" />
                <h2 className="text-lg font-bold">Filters</h2>
              </div>
              
              <div className="filter-group mb-6">
                <h3 className="font-semibold mb-3">Equipment Type</h3>
                {['Tractor', 'Harvester', 'Rotavator', 'Seed Drill'].map(type => (
                  <label key={type} className="flex items-center gap-3 mb-2 cursor-pointer">
                    <input type="checkbox" className="accent-primary-600 w-4 h-4" defaultChecked={type === 'Tractor'} />
                    <span>{type}</span>
                  </label>
                ))}
              </div>

              <div className="filter-group mb-6">
                <h3 className="font-semibold mb-3">Distance</h3>
                <input type="range" className="w-full accent-primary-600" min="1" max="50" defaultValue="15" />
                <div className="flex justify-between text-sm text-muted mt-2">
                  <span>1 km</span>
                  <span>15 km</span>
                  <span>50 km</span>
                </div>
              </div>

              <div className="filter-group">
                <h3 className="font-semibold mb-3">Price Per Day (₹)</h3>
                <div className="flex gap-2 items-center">
                  <input type="number" placeholder="Min" className="w-full px-2 py-1 border border-light rounded text-sm" />
                  <span>-</span>
                  <input type="number" placeholder="Max" className="w-full px-2 py-1 border border-light rounded text-sm" />
                </div>
              </div>
              
              <button className="btn btn-outline w-full mt-6" onClick={() => alert('Filters reset!')}>Reset Filters</button>
            </div>
          </aside>

          {/* Results List */}
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockEquipment.map((item) => (
                <div key={item.id} className="equipment-card bg-card rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                  <div className="relative h-48">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-xs font-bold text-primary-700 shadow-sm flex items-center gap-1">
                      <Star size={12} className="fill-current" /> {item.owner.rating}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg lh-tight leading-tight">{item.name}</h3>
                    </div>
                    
                    <div className="text-sm text-muted mb-4 flex items-center gap-1">
                      <MapPin size={14} /> {item.location} • {item.distanceKm} km away
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.features.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full border border-primary-100">
                          {f}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-end justify-between pt-4 border-t border-light text-sm">
                      <div>
                        <span className="font-bold text-xl">₹{item.rates.day}</span>
                        <span className="text-muted">/day</span>
                      </div>
                      <Link to={`/equipment/${item.id}`} className="btn btn-primary px-4 py-2 transition-transform hover:scale-105">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
