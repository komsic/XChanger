const fetchRates = async ({ baseCurrency, selectedCurrencies }) => {
  const sc = selectedCurrencies.join(',');
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/rates?base_currency=${baseCurrency}&currencies=${sc}`);
  const data = await res.json();
  if (data.status === 'error') throw new Error(data.error);

  return data;
};

export default fetchRates;
