import React, { useState } from 'react';
import { Calendar, Clock, Plus, ChevronLeft, ChevronRight, MoreHorizontal, X } from 'lucide-react';

const SchedulePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'day', 'week', 'month'
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    description: '',
    category: 'meeting'
  });

  // Sample events data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Editorial Meeting',
      start: new Date(2023, 7, 15, 10, 0),
      end: new Date(2023, 7, 15, 11, 30),
      description: 'Weekly editorial meeting to discuss upcoming articles',
      category: 'meeting'
    },
    {
      id: 2,
      title: 'Interview with Local Artist',
      start: new Date(2023, 7, 16, 14, 0),
      end: new Date(2023, 7, 16, 15, 0),
      description: 'Interview with Jane Doe about her new exhibition',
      category: 'interview'
    },
    {
      id: 3,
      title: 'Content Review',
      start: new Date(2023, 7, 17, 9, 0),
      end: new Date(2023, 7, 17, 10, 0),
      description: 'Review content for the weekend edition',
      category: 'review'
    }
  ]);

  // Navigation functions
  const goToToday = () => setCurrentDate(new Date());
  
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };
  
  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  // Format date for display
  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Get current view title
  const getViewTitle = () => {
    if (viewMode === 'day') {
      return formatDate(currentDate);
    } else if (viewMode === 'week') {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      const startMonth = startOfWeek.toLocaleDateString('en-US', { month: 'short' });
      const endMonth = endOfWeek.toLocaleDateString('en-US', { month: 'short' });
      
      return `${startMonth} ${startOfWeek.getDate()} - ${endMonth} ${endOfWeek.getDate()}, ${currentDate.getFullYear()}`;
    } else if (viewMode === 'month') {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };

  // Handle event form submission
  const handleEventSubmit = (e) => {
    e.preventDefault();
    
    if (selectedEvent) {
      // Update existing event
      const updatedEvents = events.map(event => 
        event.id === selectedEvent.id ? { ...event, ...newEvent } : event
      );
      setEvents(updatedEvents);
    } else {
      // Add new event
      const newEventWithId = {
        ...newEvent,
        id: events.length + 1,
        start: new Date(newEvent.start),
        end: new Date(newEvent.end)
      };
      setEvents([...events, newEventWithId]);
    }
    
    // Reset form and close modal
    setNewEvent({
      title: '',
      start: '',
      end: '',
      description: '',
      category: 'meeting'
    });
    setSelectedEvent(null);
    setShowEventModal(false);
  };

  // Handle event deletion
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      const filteredEvents = events.filter(event => event.id !== selectedEvent.id);
      setEvents(filteredEvents);
      setShowEventModal(false);
      setSelectedEvent(null);
    }
  };

  // Open modal to add new event
  const openAddEventModal = () => {
    setSelectedEvent(null);
    setNewEvent({
      title: '',
      start: new Date().toISOString().slice(0, 16),
      end: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().slice(0, 16),
      description: '',
      category: 'meeting'
    });
    setShowEventModal(true);
  };

  // Open modal to edit event
  const openEditEventModal = (event) => {
    setSelectedEvent(event);
    setNewEvent({
      title: event.title,
      start: event.start.toISOString().slice(0, 16),
      end: event.end.toISOString().slice(0, 16),
      description: event.description,
      category: event.category
    });
    setShowEventModal(true);
  };

  // Generate time slots for day view
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 20; hour++) {
      slots.push({
        time: `${hour}:00`,
        hour
      });
    }
    return slots;
  };

  // Generate days for week view
  const generateWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  // Check if an event is on a specific day
  const isEventOnDay = (event, day) => {
    return event.start.getDate() === day.getDate() && 
           event.start.getMonth() === day.getMonth() && 
           event.start.getFullYear() === day.getFullYear();
  };

  // Render day view
  const renderDayView = () => {
    const timeSlots = generateTimeSlots();
    const dayEvents = events.filter(event => 
      event.start.getDate() === currentDate.getDate() && 
      event.start.getMonth() === currentDate.getMonth() && 
      event.start.getFullYear() === currentDate.getFullYear()
    );
    
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-12 h-full">
          {/* Time column */}
          <div className="col-span-1 border-r border-gray-200">
            {timeSlots.map((slot, index) => (
              <div key={index} className="h-20 border-b border-gray-200 px-2 py-1 text-xs text-gray-500">
                {slot.time}
              </div>
            ))}
          </div>
          
          {/* Events column */}
          <div className="col-span-11 relative">
            {timeSlots.map((slot, index) => (
              <div key={index} className="h-20 border-b border-gray-200"></div>
            ))}
            
            {/* Render events */}
            {dayEvents.map(event => {
              const startHour = event.start.getHours();
              const startMinutes = event.start.getMinutes();
              const endHour = event.end.getHours();
              const endMinutes = event.end.getMinutes();
              
              const top = (startHour - 8) * 80 + (startMinutes / 60) * 80;
              const height = ((endHour - startHour) * 60 + (endMinutes - startMinutes)) / 60 * 80;
              
              return (
                <div 
                  key={event.id}
                  className={`absolute left-2 right-2 rounded-md p-2 overflow-hidden cursor-pointer ${
                    event.category === 'meeting' ? 'bg-blue-100 border-l-4 border-blue-500' :
                    event.category === 'interview' ? 'bg-purple-100 border-l-4 border-purple-500' :
                    'bg-green-100 border-l-4 border-green-500'
                  }`}
                  style={{ top: `${top}px`, height: `${height}px` }}
                  onClick={() => openEditEventModal(event)}
                >
                  <h4 className="font-medium text-sm truncate">{event.title}</h4>
                  <p className="text-xs text-gray-600">
                    {event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                    {event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Render week view
  const renderWeekView = () => {
    const weekDays = generateWeekDays();
    const timeSlots = generateTimeSlots();
    
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-8 h-full">
          {/* Time column */}
          <div className="border-r border-gray-200">
            <div className="h-12 border-b border-gray-200"></div>
            {timeSlots.map((slot, index) => (
              <div key={index} className="h-20 border-b border-gray-200 px-2 py-1 text-xs text-gray-500">
                {slot.time}
              </div>
            ))}
          </div>
          
          {/* Days columns */}
          {weekDays.map((day, dayIndex) => (
            <div key={dayIndex} className="relative">
              {/* Day header */}
              <div className="h-12 border-b border-gray-200 flex flex-col items-center justify-center">
                <div className="text-sm font-medium">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div className={`text-sm ${
                  day.getDate() === new Date().getDate() && 
                  day.getMonth() === new Date().getMonth() && 
                  day.getFullYear() === new Date().getFullYear() 
                    ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' 
                    : ''
                }`}>
                  {day.getDate()}
                </div>
              </div>
              
              {/* Time slots */}
              {timeSlots.map((slot, slotIndex) => (
                <div key={slotIndex} className="h-20 border-b border-gray-200 border-r"></div>
              ))}
              
              {/* Events */}
              {events.filter(event => isEventOnDay(event, day)).map(event => {
                const startHour = event.start.getHours();
                const startMinutes = event.start.getMinutes();
                const endHour = event.end.getHours();
                const endMinutes = event.end.getMinutes();
                
                const top = (startHour - 8) * 80 + (startMinutes / 60) * 80 + 48; // 48px for the header
                const height = ((endHour - startHour) * 60 + (endMinutes - startMinutes)) / 60 * 80;
                
                return (
                  <div 
                    key={event.id}
                    className={`absolute left-1 right-1 rounded-md p-1 overflow-hidden cursor-pointer ${
                      event.category === 'meeting' ? 'bg-blue-100 border-l-4 border-blue-500' :
                      event.category === 'interview' ? 'bg-purple-100 border-l-4 border-purple-500' :
                      'bg-green-100 border-l-4 border-green-500'
                    }`}
                    style={{ top: `${top}px`, height: `${height}px` }}
                    onClick={() => openEditEventModal(event)}
                  >
                    <h4 className="font-medium text-xs truncate">{event.title}</h4>
                    <p className="text-xs text-gray-600 truncate">
                      {event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render month view
  const renderMonthView = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();
    
    const weeks = [];
    let days = [];
    
    // Add days from previous month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(firstDayOfMonth);
      prevMonthDay.setDate(prevMonthDay.getDate() - (startingDayOfWeek - i));
      days.push({ date: prevMonthDay, isCurrentMonth: false });
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      days.push({ date, isCurrentMonth: true });
      
      if (days.length === 7) {
        weeks.push(days);
        days = [];
      }
    }
    
    // Add days from next month
    if (days.length > 0) {
      const daysToAdd = 7 - days.length;
      for (let i = 1; i <= daysToAdd; i++) {
        const nextMonthDay = new Date(lastDayOfMonth);
        nextMonthDay.setDate(nextMonthDay.getDate() + i);
        days.push({ date: nextMonthDay, isCurrentMonth: false });
      }
      weeks.push(days);
    }
    
    return (
      <div className="bg-white rounded-lg shadow">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className="py-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 border-b border-gray-200">
              {week.map((day, dayIndex) => {
                const dayEvents = events.filter(event => isEventOnDay(event, day.date));
                const isToday = day.date.getDate() === new Date().getDate() && 
                               day.date.getMonth() === new Date().getMonth() && 
                               day.date.getFullYear() === new Date().getFullYear();
                
                return (
                  <div 
                    key={dayIndex} 
                    className={`min-h-[100px] p-1 border-r border-gray-200 ${
                      day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <div className={`text-right ${
                      isToday ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center ml-auto' : 
                      day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {day.date.getDate()}
                    </div>
                    
                    {/* Events */}
                    <div className="mt-1">
                      {dayEvents.slice(0, 3).map(event => (
                        <div 
                          key={event.id}
                          className={`text-xs rounded px-1 py-0.5 mb-1 truncate cursor-pointer ${
                            event.category === 'meeting' ? 'bg-blue-100 text-blue-800' :
                            event.category === 'interview' ? 'bg-purple-100 text-purple-800' :
                            'bg-green-100 text-green-800'
                          }`}
                          onClick={() => openEditEventModal(event)}
                        >
                          {event.title}
                        </div>
                      ))}
                      
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          onClick={openAddEventModal}
        >
          <Plus size={16} className="mr-1" />
          Add Event
        </button>
      </div>
      
      {/* Calendar Controls */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-2">
          <button 
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={goToPrevious}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={goToToday}
          >
            Today
          </button>
          <button 
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={goToNext}
          >
            <ChevronRight size={20} />
          </button>
          <h2 className="text-lg font-semibold text-gray-900 ml-2">{getViewTitle()}</h2>
        </div>
        
        <div className="flex space-x-1">
          <button 
            className={`px-3 py-1 rounded-md text-sm ${viewMode === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setViewMode('day')}
          >
            Day
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-sm ${viewMode === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setViewMode('week')}
          >
            Week
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-sm ${viewMode === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setViewMode('month')}
          >
            Month
          </button>
        </div>
      </div>
      
      {/* Calendar View */}
      <div className="h-[calc(100vh-240px)] overflow-auto">
        {viewMode === 'day' && renderDayView()}
        {viewMode === 'week' && renderWeekView()}
        {viewMode === 'month' && renderMonthView()}
      </div>
      
      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b border-gray-200 px-4 py-3">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedEvent ? 'Edit Event' : 'Add New Event'}
              </h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowEventModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleEventSubmit} className="p-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Event Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="start" className="block text-sm font-medium text-gray-700">
                      Start Time
                    </label>
                    <input
                      type="datetime-local"
                      id="start"
                      value={newEvent.start}
                      onChange={(e) => setNewEvent({...newEvent, start: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="end" className="block text-sm font-medium text-gray-700">
                      End Time
                    </label>
                    <input
                      type="datetime-local"
                      id="end"
                      value={newEvent.end}
                      onChange={(e) => setNewEvent({...newEvent, end: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="meeting">Meeting</option>
                    <option value="interview">Interview</option>
                    <option value="review">Review</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="mt-5 flex justify-between">
                {selectedEvent && (
                  <button
                    type="button"
                    onClick={handleDeleteEvent}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                )}
                <div className={selectedEvent ? '' : 'ml-auto'}>
                  <button
                    type="button"
                    onClick={() => setShowEventModal(false)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {selectedEvent ? 'Update' : 'Create'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;