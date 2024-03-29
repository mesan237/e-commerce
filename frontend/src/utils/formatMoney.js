export function formatMoney(value) {
  //  if the input is null, return a null value
  // if (!input) return input;
  // remove all characters from the input except number input.
  // const numberInput = input.replace(/[^\d]/g, "");
  const input = value.toString();
  //  take the length of the value of the input
  const numberInputLength = input.length;
  // if the number length is 1, 2, or 3, then return it as it is.
  if (numberInputLength < 4) {
    return input;
  } else if (numberInputLength <= 7) {
    // if the number input length is 4, 5, or 6, format it accordingly.
    if (numberInputLength === 4)
      return `${input.slice(0, 1)} ${input.slice(1, 4)}`;
    if (numberInputLength === 5)
      return `${input.slice(0, 2)} ${input.slice(2, 5)}`;
    if (numberInputLength === 6)
      return `${input.slice(0, 3)} ${input.slice(3, 6)}`;
    if (numberInputLength === 7)
      return `${input.slice(0, 1)} ${input.slice(1, 4)} ${input.slice(3, 6)}`;
    return `${input.slice(0, 3)} ${input.slice(3)}`;
  } else {
    //  if the number input length is 7, 8, 9, 10, or more, format it like the below.
    return `(${input.slice(0, 3)}) ${input.slice(3, 6)} ${input.slice(
      6,
      9
    )} ${input.slice(9, 13)}`;
  }
  // return empty string in case any condition doesn't satisfy.
  return "";
}
