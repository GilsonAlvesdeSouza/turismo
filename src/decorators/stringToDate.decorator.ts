export function StringToDate(fields: string[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (data: any) {
      for (const field of fields) {
        if (data.hasOwnProperty(field) && typeof data[field] === 'string') {
          data[field] = new Date(data[field]);
        }
      }

      return originalMethod.apply(this, [data]);
    };

    return descriptor;
  };
}
