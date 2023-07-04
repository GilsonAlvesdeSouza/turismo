export function CapitalizeWordsFields(fields: string[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (data: any) {
      for (const field of fields) {
        if (data.hasOwnProperty(field)) {
          data[field] = capitalizeWords(data[field]);
        }
      }

      return originalMethod.apply(this, [data]);
    };

    return descriptor;
  };
}

function capitalizeWords(str: string): string {
  const words = str.split(' ');

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const capitalizedString = capitalizedWords.join(' ');

  return capitalizedString;
}
