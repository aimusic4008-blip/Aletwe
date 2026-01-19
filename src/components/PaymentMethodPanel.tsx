import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Clock, DollarSign } from 'lucide-react';

interface PaymentMethodPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentMethodPanel: React.FC<PaymentMethodPanelProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'work'>('work');
  const [selectedMethod, setSelectedMethod] = useState('cash');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[80vh] flex flex-col"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-center p-4 border-b border-gray-200 relative">
              <h3 className="text-lg font-bold text-gray-900">Payment</h3>
              <button
                onClick={onClose}
                className="absolute right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="bg-gray-100 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Bolt balance</div>
                <div className="text-3xl font-bold text-gray-900 mb-3">R 0</div>
                <p className="text-sm text-gray-600">
                  Bolt balance is not available with this payment method
                </p>
              </div>

              <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">❓</span>
                </div>
                <span className="flex-1 text-left text-gray-900 font-medium">
                  What is Bolt balance?
                </span>
              </button>

              <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Clock size={20} className="text-gray-600" />
                </div>
                <span className="flex-1 text-left text-gray-900 font-medium">
                  See Bolt balance transactions
                </span>
              </button>

              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">Payment methods</h4>

                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={() => setActiveTab('personal')}
                    className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTab === 'personal'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Personal
                  </button>
                  <button
                    onClick={() => setActiveTab('work')}
                    className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTab === 'work'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Work
                  </button>
                </div>

                <button
                  onClick={() => setSelectedMethod('cash')}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors mb-3"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <DollarSign size={20} className="text-white" />
                    </div>
                    <span className="text-gray-900 font-medium">Cash</span>
                  </div>
                  {selectedMethod === 'cash' && (
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>

                <button className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 rounded-xl transition-colors mb-3">
                  <Plus size={20} className="text-gray-600" />
                  <span className="text-gray-900 font-medium">Add debit/credit card</span>
                </button>

                <button className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">✏️</span>
                  </div>
                  <span className="text-gray-900 font-medium">Manage work profile</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
