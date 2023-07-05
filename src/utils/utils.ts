export const Utils = {
  capitalizeWords: (str: string): string => {
    if (str && str.length > 0) {
      const words = str.split(' ');

      const capitalizedWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });

      const capitalizedString = capitalizedWords.join(' ');

      return capitalizedString;
    }
    return;
  },

  calcPageServices: (
    pageNumber: number,
    pageSize: number,
    countRecords: number,
  ) => {
    const pageNumberReq = pageNumber || 1;
    const take = pageSize || 10;
    const skip = (pageNumberReq - 1) * take;
    const pageCount = Math.ceil(countRecords / take);
    return { skip, take, pageCount, pageNumberReq };
  },

  stringToDate: (field: string) => {
    if (field) {
      return new Date(field);
    }
    return;
  },
};
