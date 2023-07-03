export const calcPageServices = (
  pageNumber: number,
  pageSize: number,
  countRecords: number,
) => {
  const pageNumberReq = pageNumber || 1;
  const take = pageSize || 10;
  const skip = (pageNumberReq - 1) * take;
  const pageCount = Math.ceil(countRecords / take);
  return { skip, take, pageCount, pageNumberReq };
};
