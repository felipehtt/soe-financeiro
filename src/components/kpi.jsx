import React from 'react';
import './kpi.scss';

const KPI = ({ title, value, color }) => {
    
  return (
    
    <div className="kpi-card" style={{ borderColor: color }}>
        
      <div className="kpi-details">
        
        <h4>{title}</h4>
        
        <p>{value}</p>
        
      </div>
      
    </div>
    
  );
  
};

export default KPI;
