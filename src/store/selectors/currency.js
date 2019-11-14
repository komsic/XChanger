export const getAllCurrenciesNameAndCode = ({ currencyState: { allCurrencies } }) => Object
  .values(allCurrencies).map(({ name, code }) => ({ name, code }));

export const getSelectedCurrenciesWithBaseCurrency = ({
  currencyState: { baseCurrency, selectedCurrencies },
}) => [baseCurrency, ...selectedCurrencies];

export const isCurrencyValid = (state) => {
  const list = getSelectedCurrenciesWithBaseCurrency(state);

  return (code) => list.find(({ name, code: c }) => (name === code || c === code));
};

export const getRates = ({ currencyState: { baseCurrency: { code: c }, rates } }) => (
  code, otherCode = c, money = 1,
) => {
  if (!money) return 0;
  const formatedMoney = parseFloat(money.toString().replace(/,/g, ''));
  const result = (formatedMoney * rates[code]) / rates[otherCode];
  if (result - 1 < 0) return result.toFixed(6);
  return result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

export const getBaseCurrencyCode = ({ currencyState: { baseCurrency } }) => baseCurrency.code;

export const getSelectedCurrencies = (
  { currencyState: { selectedCurrencies } },
) => selectedCurrencies;

export const getBaseCurrency = ({ currencyState: { allCurrencies } }) => (currency) => {
  if (currency.length === 3) {
    return allCurrencies[currency];
  }

  return Object.values(allCurrencies).find(
    ({ name }) => name.toLowerCase() === currency.toLowerCase(),
  );
};
