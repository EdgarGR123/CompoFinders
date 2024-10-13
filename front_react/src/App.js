//App.js
import Header from "./components/header";
import Modal from "./components/modal";
import Inicio from "./content/text1";
import Text2 from "./content/text2";
import Text3 from "./content/text3";
import Text4 from "./content/text4";
import Text5 from "./content/text5";
import Text6 from "./content/text6";
import Head from './content/text7';
import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes }  from "react-router-dom";

function App() {
  const [elementos, setElementos] = useState(() => {
    const savedElementos = localStorage.getItem("elementos");
    return savedElementos ? JSON.parse(savedElementos) : [];
  });
  useEffect(() => {
    localStorage.setItem("elementos", JSON.stringify(elementos));
  }, [elementos]);
  return (
    <>
      <Head />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <Modal />
      <Router>
        <Header setElementos={setElementos} />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/Sobre" element={<Text2 />} />
          <Route path="/Comprar" element={<Text3 setElementos= {setElementos} />} />
          <Route path="/Contacto" element={<Text4 />} />
          <Route path="/Shop" element={<Text5 elementos= {elementos} />} />
          <Route path="/Shop_busqueda" element={<Text6 elementos= {elementos} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;