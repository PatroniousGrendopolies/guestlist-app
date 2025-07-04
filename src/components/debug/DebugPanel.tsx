'use client';

import { useState } from 'react';

interface DebugPanelProps {
  onResetData?: () => void;
  onFillToCapacity?: () => void;
  onGenerateRandomGuests?: () => void;
  onClearStorage?: () => void;
  onToggleLoading?: () => void;
  onSimulateError?: () => void;
}

export default function DebugPanel({ 
  onResetData, 
  onFillToCapacity, 
  onGenerateRandomGuests, 
  onClearStorage, 
  onToggleLoading, 
  onSimulateError 
}: DebugPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showStorage, setShowStorage] = useState(false);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const getStorageData = () => {
    const data: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('dj_') || key.startsWith('guest_') || key.startsWith('event_'))) {
        try {
          data[key] = JSON.parse(localStorage.getItem(key) || '');
        } catch {
          data[key] = localStorage.getItem(key);
        }
      }
    }
    return data;
  };

  const clearAllStorage = () => {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('dj_') || key.startsWith('guest_') || key.startsWith('event_')) {
        localStorage.removeItem(key);
      }
    });
    onClearStorage?.();
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-500 text-white px-3 py-2 rounded-full text-xs hover:bg-red-600 transition-colors"
        >
          🐛 DEBUG
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border-2 border-red-500 rounded-xl p-4 shadow-lg max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-red-600">Debug Panel</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onResetData}
            className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
          >
            Reset Data
          </button>
          <button
            onClick={onFillToCapacity}
            className="px-2 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600 transition-colors"
          >
            Fill to Capacity
          </button>
          <button
            onClick={onGenerateRandomGuests}
            className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
          >
            Add Random Guests
          </button>
          <button
            onClick={onToggleLoading}
            className="px-2 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600 transition-colors"
          >
            Toggle Loading
          </button>
          <button
            onClick={onSimulateError}
            className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
          >
            Simulate Error
          </button>
          <button
            onClick={clearAllStorage}
            className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors"
          >
            Clear Storage
          </button>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <button
            onClick={() => setShowStorage(!showStorage)}
            className="text-xs text-gray-600 hover:text-gray-800"
          >
            {showStorage ? 'Hide' : 'Show'} Storage Data
          </button>
        </div>

        {showStorage && (
          <div className="bg-gray-50 p-2 rounded text-xs max-h-40 overflow-y-auto">
            <pre className="text-xs">
              {JSON.stringify(getStorageData(), null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}