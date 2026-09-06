import { Link, NavLink } from 'react-router-dom';
import { Heart } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white bg-opacity-80 backdrop-blur-xs fixed w-full z-10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-bold text-primary">ESCAPE</Link>
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-accent' : 'text-gray-600 hover:text-primary'}>Discover</NavLink>
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-accent' : 'text-gray-600 hover:text-primary'}>Destinations</NavLink>
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-accent' : 'text-gray-600 hover:text-primary'}>How it works</NavLink>
          <NavLink to="/saved" className={({ isActive }) => isActive ? 'text-accent' : 'text-gray-600 hover:text-primary'}>Saved</NavLink>
          <Link to="/" className="ml-4 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition">
            Plan My Weekend
          </Link>
        </div>
        {/* Mobile menu placeholder */}
      </div>
    </nav>
  );
}

export default Navbar;
