export interface Equipment {
  id: string;
  name: string;
  type: 'Tractor' | 'Harvester' | 'Rotavator' | 'Seed Drill' | 'Other';
  location: string;
  distanceKm: number;
  rates: {
    hour?: number;
    day: number;
    week: number;
  };
  owner: {
    name: string;
    rating: number;
    completedRentals: number;
  };
  features: string[];
  image: string;
  availableNext: string; // Date string
}

export const mockEquipment: Equipment[] = [
  {
    id: 'e1',
    name: 'Mahindra Novo 605 DI',
    type: 'Tractor',
    location: 'Punjab, India',
    distanceKm: 4.2,
    rates: { hour: 400, day: 3500, week: 20000 },
    owner: { name: 'Ranjit Singh', rating: 4.8, completedRentals: 42 },
    features: ['57 HP', '4WD', 'Power Steering', 'AC Cabin'],
    image: 'https://images.unsplash.com/photo-1592982537447-6f2334cbcc2b?auto=format&fit=crop&q=80&w=800',
    availableNext: new Date().toISOString()
  },
  {
    id: 'e2',
    name: 'Sonalika Tiger 55',
    type: 'Tractor',
    location: 'Haryana, India',
    distanceKm: 8.5,
    rates: { hour: 350, day: 3000, week: 18000 },
    owner: { name: 'Amit Kumar', rating: 4.9, completedRentals: 120 },
    features: ['55 HP', '2WD', 'High Torque'],
    image: 'https://images.unsplash.com/photo-1605680197779-7a06cb9f6ebb?auto=format&fit=crop&q=80&w=800',
    availableNext: new Date().toISOString()
  },
  {
    id: 'e3',
    name: 'Class Dominator 130',
    type: 'Harvester',
    location: 'Punjab, India',
    distanceKm: 12.1,
    rates: { day: 8000, week: 50000 },
    owner: { name: 'Kuldeep Farm Services', rating: 4.6, completedRentals: 85 },
    features: ['High Capacity', 'Multi-crop', 'Grain Tank 3200L'],
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800',
    availableNext: new Date(Date.now() + 86400000).toISOString() // Tomorrow
  },
  {
    id: 'e4',
    name: 'Shaktiman Rotavator 7ft',
    type: 'Rotavator',
    location: 'Punjab, India',
    distanceKm: 2.0,
    rates: { hour: 150, day: 1200, week: 7000 },
    owner: { name: 'Ranjit Singh', rating: 4.8, completedRentals: 42 },
    features: ['7 Feet', 'L Type Blade', 'Multi Speed'],
    image: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&q=80&w=800',
    availableNext: new Date().toISOString()
  }
];
