'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface EventStats {
  id: string;
  name: string;
  date: string;
  signups: number;
  attended: number;
  conversionRate: number;
  totalImpact: number;
}

interface OverallStats {
  totalEvents: number;
  averageConversion: number;
  totalGuestsLifetime: number;
  bestPerformingEvent: string;
  thisMonthAttendees: number;
  lastMonthAttendees: number;
}

export default function DJAnalyticsPage() {
  const [eventStats, setEventStats] = useState<EventStats[]>([]);
  const [overallStats, setOverallStats] = useState<OverallStats | null>(null);
  const [timeRange, setTimeRange] = useState<'3months' | '6months' | '1year'>('6months');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('dj_authenticated');
    if (!isAuthenticated) {
      router.push('/dj/login');
      return;
    }

    // Mock data - in real app, fetch from API
    setTimeout(() => {
      setOverallStats({
        totalEvents: 8,
        averageConversion: 78,
        totalGuestsLifetime: 487,
        bestPerformingEvent: 'Summer Vibes',
        thisMonthAttendees: 67,
        lastMonthAttendees: 52
      });

      setEventStats([
        {
          id: '1',
          name: 'Last Weekend Bash',
          date: 'June 29, 2025',
          signups: 68,
          attended: 58,
          conversionRate: 85,
          totalImpact: 58
        },
        {
          id: '2',
          name: 'Friday Night Flow',
          date: 'June 21, 2025',
          signups: 72,
          attended: 45,
          conversionRate: 63,
          totalImpact: 45
        },
        {
          id: '3',
          name: 'Summer Vibes',
          date: 'June 14, 2025',
          signups: 75,
          attended: 71,
          conversionRate: 95,
          totalImpact: 71
        },
        {
          id: '4',
          name: 'Memorial Day Special',
          date: 'May 26, 2025',
          signups: 60,
          attended: 42,
          conversionRate: 70,
          totalImpact: 42
        },
        {
          id: '5',
          name: 'Spring Break',
          date: 'May 19, 2025',
          signups: 55,
          attended: 38,
          conversionRate: 69,
          totalImpact: 38
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, [router, timeRange]);

  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case '3months': return 'Last 3 Months';
      case '6months': return 'Last 6 Months';
      case '1year': return 'Last 12 Months';
    }
  };

  const getGrowthPercentage = () => {
    if (!overallStats) return 0;
    const growth = ((overallStats.thisMonthAttendees - overallStats.lastMonthAttendees) / overallStats.lastMonthAttendees) * 100;
    return Math.round(growth);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.push('/dj/dashboard')}
            className="text-gray-400 hover:text-white transition-colors mb-4 text-sm"
          >
            ← Back to Dashboard
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-light mb-2">Performance Analytics</h1>
              <p className="text-gray-300">Track your draw and conversion rates</p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setTimeRange('3months')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  timeRange === '3months' 
                    ? 'bg-white text-black' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                3M
              </button>
              <button
                onClick={() => setTimeRange('6months')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  timeRange === '6months' 
                    ? 'bg-white text-black' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                6M
              </button>
              <button
                onClick={() => setTimeRange('1year')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  timeRange === '1year' 
                    ? 'bg-white text-black' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                1Y
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Overall Stats */}
        {overallStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-sm text-gray-600 font-medium mb-1">Total Events</h3>
              <p className="text-3xl font-bold">{overallStats.totalEvents}</p>
              <p className="text-sm text-gray-500 mt-1">{getTimeRangeLabel()}</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-sm text-gray-600 font-medium mb-1">Average Conversion</h3>
              <p className="text-3xl font-bold">{overallStats.averageConversion}%</p>
              <p className="text-sm text-gray-500 mt-1">Signups to attendance</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-sm text-gray-600 font-medium mb-1">This Month</h3>
              <p className="text-3xl font-bold">{overallStats.thisMonthAttendees}</p>
              <p className={`text-sm mt-1 ${
                getGrowthPercentage() >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {getGrowthPercentage() >= 0 ? '+' : ''}{getGrowthPercentage()}% from last month
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-sm text-gray-600 font-medium mb-1">Lifetime Total</h3>
              <p className="text-3xl font-bold">{overallStats.totalGuestsLifetime}</p>
              <p className="text-sm text-gray-500 mt-1">Guests brought</p>
            </div>
          </div>
        )}

        {/* Best Performing Event */}
        {overallStats && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl">🏆</div>
              <h3 className="text-lg font-semibold">Best Performing Event</h3>
            </div>
            <p className="text-gray-700">
              <strong>{overallStats.bestPerformingEvent}</strong> had your highest conversion rate at 95%
            </p>
          </div>
        )}

        {/* Event-by-Event Breakdown */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-6">Event-by-Event Breakdown</h2>
          
          <div className="space-y-4">
            {eventStats.map((event) => (
              <div key={event.id} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{event.name}</h3>
                    <p className="text-gray-600 text-sm">{event.date}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{event.signups}</div>
                      <div className="text-xs text-gray-500">Signups</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{event.attended}</div>
                      <div className="text-xs text-gray-500">Attended</div>
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${
                        event.conversionRate >= 80 ? 'text-green-600' :
                        event.conversionRate >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {event.conversionRate}%
                      </div>
                      <div className="text-xs text-gray-500">Conversion</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{event.totalImpact}</div>
                      <div className="text-xs text-gray-500">Total Impact</div>
                    </div>
                  </div>
                  
                  <div className="lg:w-24">
                    <div className="bg-gray-200 rounded-full h-2 mb-1">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          event.conversionRate >= 80 ? 'bg-green-500' :
                          event.conversionRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${event.conversionRate}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                      {event.conversionRate}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">📊 Insights & Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Your Strengths:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• High conversion rates (78% average)</li>
                <li>• Consistent growth month-over-month</li>
                <li>• Strong repeat attendance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Areas to Improve:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Reduce no-show rates with reminders</li>
                <li>• Invite past guests who attended</li>
                <li>• Share links earlier for better planning</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-colors">
            Export Full Report
          </button>
        </div>
      </div>
    </div>
  );
}