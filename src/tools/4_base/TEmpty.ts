export const removeAllEmptyValues = (obj: any): any => {
  const isObject = (value: any) => Object(value) === value;

  if (Array.isArray(obj)) return obj;

  const newObj: any = {};
  Object.keys(obj).forEach((key) => {
    if (isObject(obj[key])) newObj[key] = removeAllEmptyValues(obj[key]);
    else if (
      !(obj[key] === undefined || obj[key] === null || obj[key] === '' || obj[key] === 'null' || obj[key] === 0)
    ) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

export const removeEmptyValues = (obj: any): any => {
  const isObject = (value: any) => Object(value) === value;

  if (Array.isArray(obj)) return obj;

  const newObj: any = {};
  Object.keys(obj).forEach((key) => {
    if (isObject(obj[key])) newObj[key] = removeEmptyValues(obj[key]);
    else if (!(obj[key] === undefined || obj[key] === null || obj[key] === '' || obj[key] === 'null')) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};
