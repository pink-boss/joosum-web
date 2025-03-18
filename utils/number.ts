export const formatNumber = (amount: number): string => {
  return new Intl.NumberFormat("en-US").format(amount);
};
