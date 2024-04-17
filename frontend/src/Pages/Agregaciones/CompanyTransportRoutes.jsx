import React, { useState, useEffect } from 'react';
import NavbarComponent from '../../components/NavbarComponent';
function CompanyTransportRoutes() {
  const [routesByCompany, setRoutesByCompany] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchRoutesByCompany();
  }, []);

  const fetchRoutesByCompany = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/transport_routes/by_company');
      if (!response.ok) {
        throw new Error('Failed to fetch transport routes by company');
      }
      const data = await response.json();
      setRoutesByCompany(data);
    } catch (error) {
      setError('Error fetching transport routes by company: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
       <NavbarComponent/>
      <h2>Transport Routes by Company / Top 10</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Number of Routes</th>
            </tr>
          </thead>
          <tbody>
            {routesByCompany.map((route, index) => (
              <tr key={index} style={{ backgroundColor: index < 3 ? 'lightyellow' : 'transparent' }}>
                <td>{route.company}</td>
                <td>{route.route_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CompanyTransportRoutes;
