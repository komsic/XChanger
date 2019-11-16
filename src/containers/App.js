/* eslint-disable no-console */
import React from 'react';
import './App.css';
import Header from './header/Header';
import Hero from './hero/Hero';
import Main from './main/Main';
import Footer from './footer/Footer';
import Modal from '../components/modal/Modal';
import ManageCurrencies from './manage-currencies/ManageCurrencies';

function App() {
  return (
    <div className="App">
      <Header />

      <Hero />

      <Main />

      <Footer />

      <Modal>
        <ManageCurrencies />
      </Modal>
    </div>
  );
}

export default App;
