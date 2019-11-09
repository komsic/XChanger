export const getAllCurrenciesNameAndCode = ({ currencyState: { allCurrencies } }) => Object
  .values(allCurrencies).map(({ name, code }) => ({ name, code }));

export const getSelectedCurrenciesWithBaseCurrency = ({
  currencyState: { baseCurrency, selectedCurrencies },
}) => [baseCurrency, ...selectedCurrencies];
