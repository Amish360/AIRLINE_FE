import React, { useState, useEffect } from 'react';
import axios from '../components/axiosconfig';

const FlightBooking = () => {
  const [flights, setFlights] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get('/airlinesapi/flights/');
      setFlights(response.data.results);
      setSearchResults(response.data.results); // Set initial search results to all flights
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setSearchResults(flights); // Show all flights if search term is empty
    } else {
      const filteredFlights = flights.filter(flight =>
        flight.flight_number.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredFlights); // Filter flights based on search term
    }
  };

  const handleBookFlight = async (flightId) => {
    try {
      const response = await axios.post('/airlinesapi/book_flight/', { flight_id: flightId }, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      setMessage('Flight booked successfully');
      setSelectedFlight(response.data);
    } catch (error) {
      console.error('Error booking flight:', error);
      setMessage('Error booking flight');
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(`/airlinesapi/cancel-booking/${bookingId}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      setMessage('Booking cancelled successfully');
      setSelectedFlight(null);
    } catch (error) {
      console.error('Error canceling booking:', error);
      setMessage('Error canceling booking');
    }
  };

  return (
    <div>
      <h1>Flight Booking</h1>

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/">Flight Booking System</a>
      </nav>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search flights..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Airline</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map(flight => (
            <tr key={flight.id}>
              <td>{flight.flight_number}</td>
              <td>{flight.airline.name}</td>
              <td>{flight.origin.name}</td>
              <td>{flight.destination.name}</td>
              <td>{new Date(flight.scheduled_departure).toLocaleString()}</td>
              <td>{new Date(flight.scheduled_arrival).toLocaleString()}</td>
              <td>{flight.status}</td>
              <td>
                {selectedFlight && selectedFlight.id === flight.id ? (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleCancelBooking(selectedFlight.id)}
                  >
                    Cancel Booking
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleBookFlight(flight.id)}
                  >
                    Book Flight
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {message && <div className="alert alert-info">{message}</div>}
    </div>
    
  );
};

export default FlightBooking;
