export const formatCurrency = (amount: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  if (amount >= 1000000000) {
    return formatter.format(amount / 1000000000) + 'B';
  } else if (amount >= 1000000) {
    return formatter.format(amount / 1000000) + 'M';
  } else if (amount >= 1000) {
    return formatter.format(amount / 1000) + 'K';
  }
  
  return formatter.format(amount);
};

export const formatNumber = (num: number): string => {
  const formatter = new Intl.NumberFormat('en-US');
  return formatter.format(num);
};
