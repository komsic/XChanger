export const getAllCurrenciesNameAndCode = ({ currencyState: { allCurrencies } }) => Object
  .values(allCurrencies).map(({ name, code }) => ({ name, code }));

export const getSelectedCurrenciesWithBaseCurrency = ({
  currencyState: { baseCurrency, selectedCurrencies },
}) => [baseCurrency, ...selectedCurrencies];

export const isCurrencyValid = (state) => {
  const list = getSelectedCurrenciesWithBaseCurrency(state);

  return (code) => list.filter(({ name, code: c }) => (name === code || c === code))[0];
};

export const getRates = ({ currencyState: { baseCurrency: { code: c }, rates } }) => (
  code, otherCode = c, money = 1,
) => {
  if (!money) return 0;
  const formatedMoney = parseFloat(money.toString().replace(/,/g, ''));
  const result = (formatedMoney * rates[code]) / rates[otherCode];
  return result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};
