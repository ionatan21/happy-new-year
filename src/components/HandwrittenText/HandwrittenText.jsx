import React, { useEffect, useState } from 'react';
import './HandwrittenText.css'; // Archivo CSS para los estilos

const HandwrittenText = () => {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    // Establecer el año actual
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="handwritten-container">
      <h1 className="handwritten-text">
        <span>Feliz año nuevo </span>
       
      </h1>
      <div className="underline"></div>
    </div>
  );
};

export default HandwrittenText;
