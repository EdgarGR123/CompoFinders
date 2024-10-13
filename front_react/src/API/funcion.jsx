// src/ProductPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductPage = () => {
  const [data, setData] = useState([]);
  const [currentDataType, setCurrentDataType] = useState('posts'); // Estado para el tipo de datos a mostrar

  // Función para obtener datos de la API
  const fetchData = async (dataType) => {
    try {
      let url = '';
      switch (dataType) {
        case 'posts':
          url = 'https://jsonplaceholder.typicode.com/posts';
          break;
        case 'users':
          url = 'https://jsonplaceholder.typicode.com/users';
          break;
        case 'comments':
          url = 'https://jsonplaceholder.typicode.com/comments';
          break;
        default:
          url = 'https://jsonplaceholder.typicode.com/posts';
      }

      const response = await axios.get(url);
      setData(response.data);
      localStorage.setItem('savedData', JSON.stringify(response.data)); // Guardar los datos en localStorage
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  // Hook para cargar datos al iniciar o al cambiar el tipo de datos
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('savedData')); // Obtener datos guardados
    if (savedData) {
      setData(savedData);
    } else {
      fetchData(currentDataType);
    }
  }, [currentDataType]);

  // Manejar el evento de cambio de tipo de datos
  const handleDataTypeChange = (dataType) => {
    setCurrentDataType(dataType);
    fetchData(dataType);
  };

  return (
    <div>
      <h1>Datos</h1>
      <div>
        <button onClick={() => handleDataTypeChange('posts')}>Posts</button>
        <button onClick={() => handleDataTypeChange('users')}>Users</button>
        <button onClick={() => handleDataTypeChange('comments')}>Comments</button>
      </div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title || item.name || item.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductPage;
