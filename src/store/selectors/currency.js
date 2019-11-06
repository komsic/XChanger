const getAllCurrenciesNameAndCode = ({ currencyState: { allCurrencies } }) => Object
  .values(allCurrencies).map(({ name, code }) => ({ name, code }));

export default getAllCurrenciesNameAndCode;
