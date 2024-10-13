import React from 'react';


const FormComponent = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Obtener y enviar los datos del formulario al endpoint /recibir
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const response = await fetch('http://127.0.0.1:5000/recibir', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("DATOS ENVIADOS CON EXITO....")
    console.log(result);
    console.log(response)
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required />
      <br />
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
