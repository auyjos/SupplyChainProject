// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage'; // Tu página principal existente
import LogisticaPage from './Pages/LogisticsPage'; // La nueva página de logística
import Products from './Pages/Products';
import DeleteProduct from './Pages/DeleteProduct';
import CreateRelationship from './Pages/CreateRelationship';
import LowStock from './Pages/Agregaciones/LowStock';
import SuppliersRep from './Pages/Agregaciones/SuppliersRep';
import ProductType from './Pages/Agregaciones/ProductType';
import CompanyTransportRoutes from './Pages/Agregaciones/CompanyTransportRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/logistica" element={<LogisticaPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/delete" element={<DeleteProduct />} />
        <Route path="/relationship" element={<CreateRelationship />} />
        <Route path="/products/low-stock" element={<LowStock />} />
        <Route path="/suppliers/reputation" element={<SuppliersRep />} />
        <Route path="/product/type" element={<ProductType />} />
        <Route path="/transport_routes/top-companies" element={<CompanyTransportRoutes />} />
        
      </Routes>
    </Router>
  );
}

export default App;
