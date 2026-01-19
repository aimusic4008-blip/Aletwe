import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Users } from 'lucide-react';
import { DraggablePanel } from '../components/DraggablePanel';
import { ScrollableSection } from '../components/ScrollableSection';
import { MapBackground } from '../components/MapBackground';
import { PaymentMethodPanel } from '../components/PaymentMethodPanel';
import { useFoodOrderSession } from '../contexts/FoodOrderSession';

interface DeliveryMode {
  id: string;
  name: string;
  description: string;
  time: string;
  price: number;
  icon: React.ReactNode;
  category: 'recommended' | 'faster' | 'cheaper';
}

export function DeliverySelection() {
  const navigate = useNavigate();
  const {
    cartItems,
    currentLocationFoodIds,
    stops,
    getCurrentLocationFoods,
    getStopFoods
  } = useFoodOrderSession();

  const [activeTab, setActiveTab] = useState<'recommended' | 'faster' | 'cheaper'>('recommended');
  const [selectedMode, setSelectedMode] = useState<DeliveryMode | null>(null);
  const [showPaymentPanel, setShowPaymentPanel] = useState(false);

  const totalFoodPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const deliveryModes: DeliveryMode[] = [
    {
      id: 'car',
      name: 'Car',
      description: 'Fast delivery',
      time: '15-25 min',
      price: Math.round(totalFoodPrice * 0.15) || 20,
      icon: '🚗',
      category: 'faster'
    },
    {
      id: 'motorbike',
      name: 'Motorbike',
      description: 'Balanced speed',
      time: '20-30 min',
      price: Math.round(totalFoodPrice * 0.10) || 15,
      icon: '🏍️',
      category: 'recommended'
    },
    {
      id: 'bicycle',
      name: 'Bicycle',
      description: 'Eco-friendly',
      time: '30-45 min',
      price: Math.round(totalFoodPrice * 0.08) || 10,
      icon: '🚲',
      category: 'cheaper'
    }
  ];

  const filteredModes = deliveryModes.filter(mode => mode.category === activeTab);

  const buildRouteSummary = () => {
    const parts: string[] = [];

    const currentLocationFoods = getCurrentLocationFoods();
    if (currentLocationFoods.length > 0) {
      parts.push(`Current Location (${currentLocationFoods.length} food${currentLocationFoods.length !== 1 ? 's' : ''})`);
    }

    stops.forEach(stop => {
      const stopFoods = getStopFoods(stop.id);
      if (stopFoods.length > 0 && stop.address) {
        const shortAddress = stop.address.split(',')[0].substring(0, 15);
        parts.push(`${shortAddress} (${stopFoods.length} food${stopFoods.length !== 1 ? 's' : ''})`);
      }
    });

    return parts.join(' → ');
  };

  const handleBackToRoute = () => {
    navigate('/foodies-route', {
      state: { highlightCurrentLocation: true }
    });
  };

  const handleSelectMode = (mode: DeliveryMode) => {
    setSelectedMode(mode);
  };

  const handleConfirmDelivery = () => {
    if (!selectedMode) return;

    navigate('/confirm-delivery', {
      state: {
        deliveryMode: selectedMode,
        totalFoodPrice,
        totalPrice: totalFoodPrice + selectedMode.price,
        cartItems,
        currentLocationFoodIds,
        stops
      }
    });
  };

  React.useEffect(() => {
    const defaultMode = deliveryModes.find(m => m.category === 'recommended');
    if (defaultMode) {
      setSelectedMode(defaultMode);
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MapBackground />

      <motion.div
        className="absolute top-0 left-0 right-0 z-10 p-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="bg-white rounded-2xl shadow-lg px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleBackToRoute}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>

            <button
              onClick={handleBackToRoute}
              className="flex-1 overflow-x-auto scrollbar-hide"
            >
              <div className="text-left whitespace-nowrap text-sm font-medium text-gray-900">
                {buildRouteSummary()}
              </div>
            </button>

            <button
              onClick={handleBackToRoute}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
            >
              <Plus size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-24 left-1/2 transform -translate-x-1/2 z-10 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
      >
        <span className="font-medium">Arrive by 4:55 PM</span>
      </motion.div>

      <DraggablePanel initialHeight={450} maxHeight={600} minHeight={300}>
        <div className="space-y-4">
          <motion.div
            className="bg-blue-600 text-white rounded-xl px-4 py-3 -mx-4 -mt-4 mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-white font-medium">✓ 30% promo applied</span>
            </div>
          </motion.div>

          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => setActiveTab('recommended')}
              className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'recommended'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Recommended
            </button>
            <button
              onClick={() => setActiveTab('faster')}
              className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'faster'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Faster
            </button>
            <button
              onClick={() => setActiveTab('cheaper')}
              className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'cheaper'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cheaper
            </button>
          </div>

          <ScrollableSection maxHeight="max-h-64">
            <div className="space-y-3">
              {filteredModes.map((mode, index) => (
                <motion.button
                  key={mode.id}
                  onClick={() => handleSelectMode(mode)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all ${
                    selectedMode?.id === mode.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{mode.icon}</div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900">{mode.name}</h3>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">K {totalFoodPrice + mode.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-600">{mode.time}</span>
                        <div className="flex items-center space-x-1">
                          <span className="text-base">🍔</span>
                          <span className="text-sm text-gray-600">{cartItems.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </ScrollableSection>
        </div>
      </DraggablePanel>

      <motion.div
        className="fixed bottom-6 left-4 right-4 z-30 space-y-3"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center space-x-3 bg-white rounded-xl p-3 shadow-lg">
          <div className="flex items-center space-x-2 flex-1">
            <Users size={20} className="text-gray-600" />
            <button
              onClick={() => setShowPaymentPanel(true)}
              className="text-sm font-medium text-gray-900"
            >
              Cash
            </button>
            <span className="text-gray-400">▼</span>
          </div>
        </div>

        <button
          onClick={handleConfirmDelivery}
          disabled={!selectedMode}
          className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-colors ${
            selectedMode
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {selectedMode ? `Select ${selectedMode.name}` : 'Select delivery mode'}
        </button>
      </motion.div>

      <PaymentMethodPanel
        isOpen={showPaymentPanel}
        onClose={() => setShowPaymentPanel(false)}
      />
    </div>
  );
}
