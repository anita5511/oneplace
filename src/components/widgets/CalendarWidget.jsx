import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Plus } from 'lucide-react';

function CalendarWidget() {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Mock calendar events for demo
    setEvents([
      {
        id: 1,
        title: 'Team Meeting',
        time: '10:00 AM',
        date: new Date().toDateString(),
        type: 'meeting'
      },
      {
        id: 2,
        title: 'Project Review',
        time: '2:30 PM',
        date: new Date().toDateString(),
        type: 'work'
      },
      {
        id: 3,
        title: 'Doctor Appointment',
        time: '4:00 PM',
        date: new Date(Date.now() + 86400000).toDateString(),
        type: 'personal'
      }
    ]);
  }, []);

  const todayEvents = events.filter(event => 
    event.date === currentDate.toDateString()
  );

  const upcomingEvents = events.filter(event => 
    new Date(event.date) > currentDate
  ).slice(0, 3);

  const getEventColor = (type) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'work': return 'bg-green-100 text-green-800';
      case 'personal': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 card-hover animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Calendar</h3>
        </div>
        <a
          href="https://calendar.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 text-gray-600" />
        </a>
      </div>

      <div className="space-y-4">
        {/* Today's Events */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Today</h4>
          {todayEvents.length > 0 ? (
            <div className="space-y-2">
              {todayEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-600">{event.time}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No events today</p>
          )}
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Upcoming</h4>
            <div className="space-y-2">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-600">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarWidget;