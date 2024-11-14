import ProtectedRoute from './components/ProtectedRoute';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login_Page';
import MainBody from './components/Main_Body';
import NewProd from './components/NewProd';
import Navbar from './components/Navbar';
import Panel from './components/panel';
import Navbar_Panel from './components/Navbar_Panel';
import React from 'react';
import BarCode from './components/BarCode';


const barcodes_page = () => (
  <>
    <Navbar_Panel />
    <BarCode />
  </>
);


export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <MainBody />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <Navbar />
            <LoginPage />
          </>
        }
      />
      <Route
        path="/panel"
        element={<>
          <Navbar_Panel />
          <ProtectedRoute element={Panel} />
        </>}
      />
      <Route
        path="/NewProd"
        element={
          <>
            <ProtectedRoute element={NewProd} />
            {/* <NewProd /> */}
          </>
        }
      />
      <Route
        path="/warehouse"
        element={
          <>
            <Navbar />
          </>
        }
      />
      <Route
        path="/barcodes"
        element={<>
          <ProtectedRoute element={barcodes_page} />
          {/* <Navbar_Panel /> */}
          {/* <BarCode /> */}
        </>}
      />
    </Routes>
  );
}

// element={<ProtectedRoute element={Panel} />}
