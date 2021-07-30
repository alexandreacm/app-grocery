export const maskFormatMoney = (value = '0.00') => {
  const maskedValue = parseFloat(value)
    .toFixed(2)
    .replace('.', ',')
    .replace(/\d(?=(\d{3})+,)/g, '$&.');

  return `R$ ${maskedValue}`;
};
