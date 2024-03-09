export const convertQueryParams = (
  { current, pageSize, ...params }: any,
  sort: any,
  filter: any,
) => {
  const where: Record<string, { in: any[] }> = {};
  for (let key of Object.keys(filter)) {
    if (Array.isArray(filter[key])) {
      where[key] = {
        in: filter[key],
      };
    }
  }
  for (let key of Object.keys(params)) {
    if (params[key] === '') {
      delete params[key];
    }
  }
  return {
    where: { ...where, ...params },
  };
};
