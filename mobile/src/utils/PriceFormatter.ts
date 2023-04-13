export function priceFormatter(price: string | number) {
  price = price.toString();

  if (price.length == 3) {
    return `${price.slice(0)},${price.slice(1)}`;
  } else if (price.length == 4) {
    return `${price.slice(0, 2)},${price.slice(2)}`;
  } else if (price.length == 5) {
    return `${price.slice(0, 3)},${price.slice(3)}`;
  } else if (price.length == 6) {
    return `${price.slice(0, 1)}.${price.slice(1, 4)},${price.slice(4)}`;
  } else if (price.length == 7) {
    return `${price.slice(0, 2)}.${price.slice(2, 5)},${price.slice(5)}`;
  }
}
