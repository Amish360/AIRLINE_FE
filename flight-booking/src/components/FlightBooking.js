import React, { useState, useEffect } from 'react';
import axios from './axiosConfig'; 

const FlightBooking = () => {
  const [flights, setFlights] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get('/api/flights/');
      setFlights(response.data.results);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('/api/search/flights/', { params: { search: searchTerm } });
      setFlights(response.data.results);
    } catch (error) {
      console.error('Error searching flights:', error);
    }
  };

  const handleBookFlight = async (flightId) => {
    try {
      const response = await axios.post('/api/book-flight/', { flight_id: flightId }, {
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
      await axios.delete(`/api/cancel-booking/${bookingId}/`, {
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
          {flights.map(flight => (
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
