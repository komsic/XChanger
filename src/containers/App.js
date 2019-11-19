/* eslint-disable no-console */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import Header from './header/Header';
import Hero from './hero/Hero';
import Main from './main/Main';
import Footer from './footer/Footer';
import Modal from '../components/modal/Modal';
import ManageCurrencies from './manage-currencies/ManageCurrencies';
import Button from '../components/button/Button';
import {
  getErrorStatus, getFutureCurrencyState, getBaseCurrencyNameCode, getSelectedCurrencies,
} from '../store/selectors/currency';
import { doFetchRate, doCancelError } from '../store/actions/currency';

function App({
  baseCurrency, selectedCurrencies, error, fetchRates, cancelError,
  currency: { baseCurrency: bc, selectedCurrencies: sc },
}) {
  useEffect(() => {
    fetchRates(baseCurrency, selectedCurrencies);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Header />

      <Hero />

      <div className={`error-container ${error ? '' : 'is-close'}`}>
        <span className="error">
          <span>{error}</span>

          <Button
            onClick={() => cancelError()}
          >
            CANCEL
          </Button>

          <Button
            classes="black"
            onClick={() => fetchRates(bc, sc)}
          >
            RETRY
          </Button>
        </span>
      </div>

      <Main />


      <Footer />

      <Modal>
        <ManageCurrencies />
      </Modal>
    </div>
  );
}

App.propTypes = {
  error: PropTypes.string,
  currency: PropTypes.shape({
    baseCurrency: PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    }),
    selectedCurrencies: PropTypes.arrayOf(PropTypes.object),
  }),
  baseCurrency: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
  selectedCurrencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchRates: PropTypes.func.isRequired,
  cancelError: PropTypes.func.isRequired,
};

App.defaultProps = {
  error: '',
  currency: {},
};

const mapStateToProps = (state) => ({
  baseCurrency: getBaseCurrencyNameCode(state),
  selectedCurrencies: getSelectedCurrencies(state),
  error: getErrorStatus(state),
  currency: getFutureCurrencyState(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchRates: (baseCurrency, selectedCurrencies) => dispatch(
    doFetchRate(baseCurrency, selectedCurrencies),
  ),
  cancelError: () => dispatch(doCancelError()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
