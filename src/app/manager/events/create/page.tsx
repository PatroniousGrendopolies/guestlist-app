'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SafeStorage } from '@/lib/utils/safeStorage';

interface DJ {
  id: string;
  name: string;
  email: string;
  stageName: string;
  capacity?: number;
}

interface NewDJ {
  stageName: string;
  givenName: string;
  email: string;
  phone: string;
  instagram: string;
}

export default function CreateEventPage() {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [totalCapacity, setTotalCapacity] = useState(75);
  const [selectedDJs, setSelectedDJs] = useState<DJ[]>([]);
  const [capacityDistribution, setCapacityDistribution] = useState<'equal' | 'individual'>('equal');
  const [existingDJs, setExistingDJs] = useState<DJ[]>([]);
  const [showNewDJModal, setShowNewDJModal] = useState(false);
  const [newDJ, setNewDJ] = useState<NewDJ>({
    stageName: '',
    givenName: '',
    email: '',
    phone: '',
    instagram: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [draggedDJId, setDraggedDJId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = SafeStorage.getItem('manager_authenticated');
    if (!isAuthenticated) {
      router.push('/manager/login');
      return;
    }

    // Load existing DJs
    const mockDJs: DJ[] = [
      { id: '1', name: 'Marcus Johnson', email: 'marcus@example.com', stageName: 'DJ Marcus' },
      { id: '2', name: 'Sarah Deep', email: 'sarah@example.com', stageName: 'Sarah Deep' },
      { id: '3', name: 'Alex Shadow', email: 'alex@example.com', stageName: 'DJ Shadow' },
      { id: '4', name: 'Mike Solar', email: 'mike@example.com', stageName: 'MC Solar' },
      { id: '5', name: 'Lisa Techno', email: 'lisa@example.com', stageName: 'Techno Lisa' },
    ];
    setExistingDJs(mockDJs);

    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setEventDate(tomorrow.toISOString().split('T')[0]);
  }, [router]);

  // ESC key handler to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showNewDJModal) {
        setShowNewDJModal(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showNewDJModal]);

  // Keyboard navigation for DJ dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (searchTerm.trim() === '') return;

      const filtered = existingDJs.filter(
        dj =>
          dj.stageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dj.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filtered.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex(prev => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filtered.length) {
          handleAddExistingDJ(filtered[highlightedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setSearchTerm('');
        setHighlightedIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchTerm, existingDJs, highlightedIndex, selectedDJs, capacityDistribution, totalCapacity]);

  // Reset highlighted index when search term changes
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchTerm]);

  const handleAddExistingDJ = (dj: DJ) => {
    if (!selectedDJs.find(selected => selected.id === dj.id)) {
      const newDJ = {
        ...dj,
        capacity:
          capacityDistribution === 'equal'
            ? Math.floor(totalCapacity / (selectedDJs.length + 1))
            : 25,
      };
      setSelectedDJs([...selectedDJs, newDJ]);

      // Redistribute capacity if equal distribution
      if (capacityDistribution === 'equal') {
        const updatedDJs = [...selectedDJs, newDJ].map(selectedDJ => ({
          ...selectedDJ,
          capacity: Math.floor(totalCapacity / (selectedDJs.length + 1)),
        }));
        setSelectedDJs(updatedDJs);
      }
    }
  };

  const handleRemoveDJ = (djId: string) => {
    const updated = selectedDJs.filter(dj => dj.id !== djId);
    setSelectedDJs(updated);

    // Redistribute capacity if equal distribution
    if (capacityDistribution === 'equal' && updated.length > 0) {
      const redistributed = updated.map(dj => ({
        ...dj,
        capacity: Math.floor(totalCapacity / updated.length),
      }));
      setSelectedDJs(redistributed);
    }
  };

  const handleCapacityChange = (djId: string, newCapacity: number) => {
    setSelectedDJs(selectedDJs.map(dj => (dj.id === djId ? { ...dj, capacity: newCapacity } : dj)));
  };

  const handleCreateNewDJ = () => {
    if (!newDJ.stageName.trim()) return;

    const id = `new_${Date.now()}`;
    const djToAdd: DJ = {
      id,
      name: newDJ.givenName || newDJ.stageName,
      email: newDJ.email,
      stageName: newDJ.stageName,
      capacity:
        capacityDistribution === 'equal'
          ? Math.floor(totalCapacity / (selectedDJs.length + 1))
          : 25,
    };

    setSelectedDJs([...selectedDJs, djToAdd]);
    setExistingDJs([...existingDJs, djToAdd]);

    // Reset form
    setNewDJ({ stageName: '', givenName: '', email: '', phone: '', instagram: '' });
    setShowNewDJModal(false);

    // Redistribute capacity if equal distribution
    if (capacityDistribution === 'equal') {
      const updatedDJs = [...selectedDJs, djToAdd].map(selectedDJ => ({
        ...selectedDJ,
        capacity: Math.floor(totalCapacity / (selectedDJs.length + 1)),
      }));
      setSelectedDJs(updatedDJs);
    }
  };

  const handleCreateEvent = async () => {
    if (!eventDate || selectedDJs.length === 0) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock event creation success
      router.push('/manager/dashboard');
    } catch (error) {
      console.error('Failed to create event:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragStart = (djId: string) => {
    setDraggedDJId(djId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetDJId: string) => {
    if (!draggedDJId || draggedDJId === targetDJId) return;

    const draggedIndex = selectedDJs.findIndex(dj => dj.id === draggedDJId);
    const targetIndex = selectedDJs.findIndex(dj => dj.id === targetDJId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newDJs = [...selectedDJs];
    const [draggedDJ] = newDJs.splice(draggedIndex, 1);
    newDJs.splice(targetIndex, 0, draggedDJ);

    setSelectedDJs(newDJs);
    setDraggedDJId(null);
  };

  const filteredDJs = existingDJs.filter(
    dj =>
      dj.stageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dj.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAllocated = selectedDJs.reduce((sum, dj) => sum + (dj.capacity || 0), 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-light">Create Event</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-8">
          {/* Event Title and Date */}
          <div className="flex gap-6">
            {/* Left: Event Title */}
            <div className="flex-1">
              <label className="block text-sm text-gray-700 mb-2">Event Title (optional)</label>
              <input
                type="text"
                value={eventTitle}
                onChange={e => setEventTitle(e.target.value)}
                placeholder="e.g., Summer Kickoff Party"
                className="w-full px-4 py-2 border border-gray-200 rounded-3xl focus:border-black transition-colors"
              />
            </div>

            {/* Right: Date Selection */}
            <div className="flex-1">
              <label className="block text-sm text-gray-700 mb-2">Event Date</label>
              <input
                type="date"
                value={eventDate}
                onChange={e => setEventDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-3xl focus:border-black transition-colors"
              />
            </div>
          </div>

          {/* DJ Selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg">DJ Selection</h2>
              <button
                onClick={() => setShowNewDJModal(true)}
                className="bg-gray-100 text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors text-sm"
              >
                Add New DJ
              </button>
            </div>

            {/* Search existing DJs */}
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Search existing DJs..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-3xl focus:border-black transition-colors"
              />

              {/* Existing DJs list - dropdown style */}
              {searchTerm.trim() !== '' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                  {filteredDJs.map((dj, index) => (
                    <div
                      key={dj.id}
                      className={`flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0 transition-colors ${
                        index === highlightedIndex ? 'bg-gray-100' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div>
                        <p className="font-medium">{dj.stageName}</p>
                        <p className="text-sm text-gray-600">{dj.name}</p>
                      </div>
                      <button
                        onClick={() => handleAddExistingDJ(dj)}
                        disabled={selectedDJs.some(selected => selected.id === dj.id)}
                        className="px-3 py-1 bg-black text-white rounded-full hover:bg-gray-900 transition-colors text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        {selectedDJs.some(selected => selected.id === dj.id) ? 'Added' : 'Add'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected DJs */}
            {selectedDJs.length > 0 && (
              <div>
                <h3 className="text-lg mb-3">Selected DJs</h3>
                <div className="space-y-3">
                  {selectedDJs.map(dj => (
                    <div
                      key={dj.id}
                      draggable
                      onDragStart={() => handleDragStart(dj.id)}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(dj.id)}
                      className={`flex items-center justify-between p-4 bg-gray-50 rounded-3xl transition-opacity ${
                        draggedDJId === dj.id ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="text-gray-400 cursor-move"
                          >
                            <circle cx="7" cy="5" r="1.5" />
                            <circle cx="7" cy="10" r="1.5" />
                            <circle cx="7" cy="15" r="1.5" />
                            <circle cx="13" cy="5" r="1.5" />
                            <circle cx="13" cy="10" r="1.5" />
                            <circle cx="13" cy="15" r="1.5" />
                          </svg>
                          <div>
                            <p className="font-medium">{dj.stageName}</p>
                            <p className="text-sm text-gray-600">{dj.name}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {capacityDistribution === 'individual' && (
                          <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600">Capacity:</label>
                            <input
                              type="number"
                              min="0"
                              max={totalCapacity}
                              value={dj.capacity || 0}
                              onChange={e =>
                                handleCapacityChange(dj.id, parseInt(e.target.value) || 0)
                              }
                              className="w-16 px-2 py-1 border border-gray-200 rounded text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        )}

                        <button
                          onClick={() => handleRemoveDJ(dj.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Capacity Settings */}
          <div>
            <h2 className="text-lg mb-4">Capacity Settings</h2>

            <div className="space-y-6">
              {/* Capacity and Distribution Side by Side */}
              <div className="flex gap-6">
                {/* Left: Total Capacity Input */}
                <div className="flex-1">
                  <label className="block text-sm text-gray-700 mb-2">Total Guestlist Capacity</label>
                  <input
                    type="number"
                    min="1"
                    value={totalCapacity}
                    onChange={e => setTotalCapacity(parseInt(e.target.value) || 75)}
                    className="px-4 py-2 border border-gray-200 rounded-3xl focus:border-black transition-colors"
                  />
                </div>

                {/* Right: Distribution Settings */}
                <div className="flex-1">
                  <label className="block text-sm text-gray-700 mb-2">Distribution</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="distribution"
                        checked={capacityDistribution === 'equal'}
                        onChange={() => setCapacityDistribution('equal')}
                        className="text-black"
                      />
                      <span className="text-sm">Share capacity equally</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="distribution"
                        checked={capacityDistribution === 'individual'}
                        onChange={() => setCapacityDistribution('individual')}
                        className="text-black"
                      />
                      <span className="text-sm">Set individual limits</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Capacity Allocation Display */}
              {selectedDJs.length > 0 && (
                <div className="p-4 bg-gray-50 rounded-3xl">
                  <p className="text-sm text-gray-600">
                    Total allocated: {totalAllocated} / {totalCapacity}
                    {totalAllocated > totalCapacity && (
                      <span className="text-red-600 ml-2">(Over capacity!)</span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/manager/dashboard')}
              className="flex-1 bg-gray-100 text-black py-3 rounded-full hover:bg-gray-200 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateEvent}
              disabled={
                !eventDate || selectedDJs.length === 0 || isLoading || totalAllocated > totalCapacity
              }
              className="flex-1 bg-black text-white py-3 rounded-full hover:bg-gray-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
            >
              {isLoading ? 'Creating Event...' : 'Create Event'}
            </button>
          </div>
        </div>
      </div>

      {/* New DJ Modal */}
      {showNewDJModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
            <h3 className="text-lg mb-4">Add New DJ</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Stage Name *</label>
                <input
                  type="text"
                  value={newDJ.stageName}
                  onChange={e => setNewDJ({ ...newDJ, stageName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-3xl focus:border-black transition-colors"
                  placeholder="DJ Marcus"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Given Name</label>
                <input
                  type="text"
                  value={newDJ.givenName}
                  onChange={e => setNewDJ({ ...newDJ, givenName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-3xl focus:border-black transition-colors"
                  placeholder="Marcus Johnson"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newDJ.email}
                  onChange={e => setNewDJ({ ...newDJ, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-3xl focus:border-black transition-colors"
                  placeholder="marcus@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={newDJ.phone}
                  onChange={e => setNewDJ({ ...newDJ, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-3xl focus:border-black transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Instagram Handle (optional)
                </label>
                <input
                  type="text"
                  value={newDJ.instagram}
                  onChange={e => setNewDJ({ ...newDJ, instagram: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-3xl focus:border-black transition-colors"
                  placeholder="@djusername"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNewDJModal(false)}
                className="flex-1 bg-gray-100 text-black py-2 rounded-full hover:bg-gray-200 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNewDJ}
                disabled={!newDJ.stageName.trim()}
                className="flex-1 bg-black text-white py-2 rounded-full hover:bg-gray-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
              >
                Add DJ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
