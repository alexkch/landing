module.exports = (fields, updatedFields) => {
  return {
    ...fields,
    ...updatedFields
  };
};
