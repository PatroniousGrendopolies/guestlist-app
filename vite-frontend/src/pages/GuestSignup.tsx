import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserPlusIcon } from 'lucide-react';
const GuestSignup: React.FC = () => {
  const {
    promoterId
  } = useParams<{
    promoterId: string;
  }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    additionalGuests: 0
  });
  const [loading, setLoading] = useState(false);
  // In a real app, we would fetch the promoter's name from the API
  const promoterName = promoterId === 'paul-promoter' ? 'Paul Promoter' : 'DJ Awesome';
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'additionalGuests' ? parseInt(value) || 0 : value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In a real app, we would submit the form data to an API
    // For now, we'll just simulate a delay and redirect
    setTimeout(() => {
      // Generate a mock guest ID
      const guestId = `g${Math.floor(Math.random() * 1000)}`;
      navigate(`/confirmation/${guestId}`);
    }, 1500);
  };
  return <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="bg-gray-900 p-4 text-center">
        <h1 className="text-xl font-bold">Nightclub Guest List</h1>
      </header>
      <div className="flex-1 p-4 max-w-md mx-auto w-full">
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <h2 className="text-lg font-medium mb-1">
            Sign up for the Guest List
          </h2>
          <p className="text-sm text-gray-400 mb-4">Added by {promoterName}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Your full name" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="your@email.com" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Your phone number" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">
                Additional Guests
              </label>
              <div className="flex items-center">
                <UserPlusIcon size={18} className="mr-2 text-gray-400" />
                <input type="number" name="additionalGuests" value={formData.additionalGuests} onChange={handleChange} min="0" max="3" className="w-full bg-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                You can bring up to 3 additional guests
              </p>
            </div>
            <div className="mb-4">
              <label className="flex items-start">
                <input type="checkbox" required className="mt-1 mr-2" />
                <span className="text-sm text-gray-300">
                  I consent to the collection and storage of my personal
                  information in accordance with Quebec privacy laws
                </span>
              </label>
            </div>
            <button type="submit" disabled={loading} className={`w-full py-3 rounded-md text-white font-medium flex items-center justify-center ${loading ? 'bg-gray-600' : 'bg-purple-700 hover:bg-purple-600'}`}>
              {loading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div> : 'Sign Up for Guest List'}
            </button>
          </form>
        </div>
      </div>
    </div>;
};
export default GuestSignup;