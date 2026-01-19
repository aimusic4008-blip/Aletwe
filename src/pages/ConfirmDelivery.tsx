import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapBackground } from '../components/MapBackground';
import { useFoodOrderSession } from '../contexts/FoodOrderSession';

export function ConfirmDelivery() {
  const navigate = useNavigate();
  const location = useLocation();
  const { deliveryMode, totalFoodPrice, totalPrice, cartItems, stops } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmDelivery = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/waiting-for-delivery-driver', {
        state: {
          deliveryMode,
          totalPrice,
          cartItems,
          stops
        }
      });
    }, 1500);
  };

  const handleBack = () => {
    navigate('/delivery-selection');
  };

  if (!deliveryMode) {
    navigate('/delivery-selection');
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MapBackground />

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            className="absolute top-0 left-0 right-0 z-10 p-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ delay: 0.1 }}
          >
            <button
              onClick={handleBack}
              className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-800" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute top-24 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold">{deliveryMode.time}</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-6 z-20"
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.2 }}
      >
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">{deliveryMode.icon}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{deliveryMode.name} Delivery</h2>
            <p className="text-lg text-gray-600">Estimated: {deliveryMode.time}</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
            <div className="space-y-2">
              {cartItems.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <span className="text-gray-900">{item.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">K {item.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Food Total</span>
              <span className="font-medium text-gray-900">K {totalFoodPrice}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-medium text-gray-900">K {deliveryMode.price}</span>
            </div>
            <div className="border-t border-gray-300 pt-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-gray-900 text-xl">K {totalPrice}</span>
              </div>
            </div>
          </div>

          <motion.button
            onClick={handleConfirmDelivery}
            disabled={isLoading}
            className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-colors ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
          >
            {isLoading ? 'Processing...' : 'Confirm order'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
