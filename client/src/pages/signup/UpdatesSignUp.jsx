import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserPlus,
  Mail,
  User,
  Loader,
} from "lucide-react";
import { motion } from "framer-motion";

const UpdatesSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    channel: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(formData);
      // Add your submission logic here
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-2xl">
      {/* Form Container */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 shadow-xl">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-8 text-rose-400">
          Subscribe for Updates
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              First Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-rose-500 transition-colors"
                required
                placeholder="Enter your first name"
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Last Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-rose-500 transition-colors"
                required
                placeholder="Enter your last name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-rose-500 transition-colors"
                required
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Channel Selection */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Update Channel
            </label>
            <select
              value={formData.channel}
              onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-rose-500 transition-colors"
              required
            >
              <option value="" disabled>Select your preferred updates</option>
              <option value="New Movie Update">New Movie Updates</option>
              <option value="option2">Special Offers</option>
              <option value="option3">Exclusive Events</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-500 text-white rounded-lg px-4 py-2 hover:bg-rose-600 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader className="animate-spin mr-2" size={20} />
                Subscribing...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <UserPlus className="mr-2" size={20} />
                Subscribe
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatesSignUp;