import { Link } from 'react-router-dom';
import { Search, Tractor, User, ShoppingCart } from 'lucide-react';
import './Navbar.css'; // We'll add custom styles here or use vanilla CSS

export default function Navbar() {
  return (
    <header className="navbar-container">
      <div className="container flex justify-between items-center h-full">
        <Link to="/" className="flex items-center gap-2 logo">
          <Tractor className="text-primary-600" size={32} />
          <span className="text-gradient logo-text">AgriRent</span>
        </Link>
        
        <div className="nav-links flex items-center gap-6">
          <Link to="/search" className="nav-link">Find Equipment</Link>
          <Link to="/" className="nav-link">How it Works</Link>
          <div className="flex items-center gap-4 ml-4">
            <Link to="/search" className="icon-btn" title="Search"><Search size={20} /></Link>
            <Link to="/checkout" className="icon-btn" title="Cart"><ShoppingCart size={20} /></Link>
            <button className="btn btn-primary btn-sm flex items-center gap-2" onClick={() => alert('Login functionality coming soon!')}>
              <User size={18} />
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
