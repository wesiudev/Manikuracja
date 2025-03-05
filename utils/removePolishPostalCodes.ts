export const removePolishPostalCodes = (text: string): string => {
  const regEx = /\b\d{2}-\d{3}\b/g;
  return text.replace(regEx, "");
};
