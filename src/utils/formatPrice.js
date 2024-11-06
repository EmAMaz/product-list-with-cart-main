export const formatPrice = (price) => {
  const formattedPrice = parseFloat(price).toFixed(2);
  return `$${formattedPrice}`;
};
