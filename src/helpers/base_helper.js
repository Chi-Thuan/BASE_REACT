export const formatCurrency = (value) => {
    return value
      .toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
      .replace('VND', 'đ');
};