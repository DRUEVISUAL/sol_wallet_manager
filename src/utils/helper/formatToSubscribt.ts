export default function formatToSubscribt(balance: number) {
  const fixedString = balance.toFixed(20);

  let nonZeroIndex = fixedString.indexOf('0.') + 2;

  while (fixedString[nonZeroIndex] === '0') {
    nonZeroIndex++;
  }

  const nonZeroNumbers = fixedString.slice(nonZeroIndex, nonZeroIndex + 4);
  const subscript = nonZeroIndex - 2;

  return { nonZeroIndex, nonZeroNumbers, subscript };
}
