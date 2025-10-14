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
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const router = useRouter();

  // Mock dates that have existing events
  const mockEventDates = [
    '2025-10-15',
    '2025-10-22',
    '2025-11-08',
    '2025-11-20',
  ];

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

  const filteredDJs = existingDJs.filter(
    dj =>
      dj.stageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dj.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAllocated = selectedDJs.reduce((sum, dj) => sum + (dj.capacity || 0), 0);

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const generateCalendarDays = () => {
    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateSelect = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const selectedDate = new Date(year, month, day);

    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return;
    }

    // Format as YYYY-MM-DD
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setEventDate(formattedDate);
  };

  const isDateSelected = (day: number) => {
    if (!eventDate) return false;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];
    return dateStr === eventDate;
  };

  const hasEvent = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];
    return mockEventDates.includes(dateStr);
  };

  const isPastDate = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button
            onClick={() => router.push('/manager/dashboard')}
            className="text-gray-600 hover:text-black transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-light">Create Event</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <div className="space-y-8">
          {/* Event Title */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Event Title (optional)</label>
            <input
              type="text"
              value={eventTitle}
              onChange={e => setEventTitle(e.target.value)}
              placeholder="e.g., Summer Kickoff Party"
              className="w-full px-4 py-2 border border-gray-200 rounded-3xl focus:border-black transition-colors"
            />
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm text-gray-700 mb-4">Event Date</label>

            {/* Calendar */}
            <div className="border border-gray-200 rounded-3xl p-4 w-fit max-w-sm">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handlePrevMonth}
                  className="text-gray-600 hover:text-black transition-colors p-1"
                  type="button"
                >
                  ←
                </button>
                <h3 className="text-base font-medium">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button
                  onClick={handleNextMonth}
                  className="text-gray-600 hover:text-black transition-colors p-1"
                  type="button"
                >
                  →
                </button>
              </div>

              {/* Days of week */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-[10px] text-gray-500 font-medium py-1">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays().map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="aspect-square" />;
                  }

                  const isSelected = isDateSelected(day);
                  const hasExistingEvent = hasEvent(day);
                  const isPast = isPastDate(day);

                  return (
                    <button
                      key={day}
                      onClick={() => handleDateSelect(day)}
                      disabled={isPast}
                      type="button"
                      className={`
                        aspect-square rounded-full flex items-center justify-center text-sm
                        transition-colors
                        ${
                          isSelected
                            ? 'bg-black text-white font-medium'
                            : hasExistingEvent
                            ? 'bg-gray-300 text-gray-900 hover:bg-gray-400'
                            : isPast
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'hover:bg-gray-100 text-gray-900'
                        }
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
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
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search existing DJs..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-3xl focus:border-black transition-colors"
              />
            </div>

            {/* Existing DJs list - only show when searching */}
            {searchTerm.trim() !== '' && (
              <div className="grid gap-2 mb-6 max-h-60 overflow-y-auto">
                {filteredDJs.map(dj => (
                  <div
                    key={dj.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-3xl hover:bg-gray-50 transition-colors"
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

            {/* Selected DJs */}
            {selectedDJs.length > 0 && (
              <div>
                <h3 className="text-lg mb-3">Selected DJs</h3>
                <div className="space-y-3">
                  {selectedDJs.map((dj, index) => (
                    <div
                      key={dj.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-3xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">#{index + 1}</span>
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
                              className="w-16 px-2 py-1 border border-gray-200 rounded text-sm"
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

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Total Guestlist Capacity</label>
                <input
                  type="number"
                  min="1"
                  value={totalCapacity}
                  onChange={e => setTotalCapacity(parseInt(e.target.value) || 75)}
                  className="px-4 py-2 border border-gray-200 rounded-3xl focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-3">Distribution</label>
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

          {/* Create Button */}
          <button
            onClick={handleCreateEvent}
            disabled={
              !eventDate || selectedDJs.length === 0 || isLoading || totalAllocated > totalCapacity
            }
            className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
          >
            {isLoading ? 'Creating Event...' : 'Create Event'}
          </button>
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
                <label className="block text-sm text-gray-700 mb-1">Instagram Handle (optional)</label>
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
