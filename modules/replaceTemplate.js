module.exports = (temp, product) => {
  let output = temp.replace(/{%ProductName%}/g, product.productName);
  output = output.replace(/{%Image%}/g, product.image);
  output = output.replace(/{%Price%}/g, product.price);
  output = output.replace(/{%From%}/g, product.from);
  output = output.replace(/{%Nutrient%}/g, product.nutrients);
  output = output.replace(/{%Quantity%}/g, product.quantity);
  output = output.replace(/{%Description%}/g, product.description);
  output = output.replace(/{%Id%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%Not_Organic%}/g, 'not-organic');
  return output;
};
