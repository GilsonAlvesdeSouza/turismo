export const capitalizeWords = (str: string): string => {
  const words = str.split(' ');

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const capitalizedString = capitalizedWords.join(' ');

  return capitalizedString;
};
