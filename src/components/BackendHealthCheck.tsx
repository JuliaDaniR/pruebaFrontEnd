import React, { useState, useEffect } from 'react';

const BackendHealthCheck: React.FC = () => {
  const [status, setStatus] = useState<string>('Comprobando...');
  const [message, setMessage] = useState<string>('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Obtén la URL del backend desde el entorno

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Construir la URL completa
        const response = await fetch(`${backendUrl}/api/health`);
        if (response.ok) {
          console.log("Responsee "+ response);
          const responseData = await response.text();
          setStatus('Conexión exitosa');
          setMessage(responseData);
        } else {
          setStatus('Error en la conexión');
          setMessage('Error al conectar con el servidor');
        }
      } catch (error) {
        setStatus('Error en la conexión');
        setMessage('No se pudo conectar al backend');
      }
    };

    testConnection();
  }, [backendUrl]);

  return (
    <div className="p-4 bg-green-100 rounded-md">
      <h2>Estado de la conexión al backend</h2>
      <p>{status}</p>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BackendHealthCheck;