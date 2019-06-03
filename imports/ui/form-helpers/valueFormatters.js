export const formatObjectValue = (object, fields) => {
  return fields
    .map((fieldName) => object[fieldName])
    .filter((value) => !!value)
    .join(', ');
};

export const formatDebtor = (debtor) => {
  return formatObjectValue(debtor, ['name', 'country', 'companyNumber']);
};
