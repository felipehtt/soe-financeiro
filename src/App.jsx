import React from 'react';
import './components/FinanceDashboard.scss';
import DashboardOverview from './components/DashboardOverview';

const App = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard Completo de Negócios</h1>
      <DashboardOverview />
    </div>
  );
};

export default App;
