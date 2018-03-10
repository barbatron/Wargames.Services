const compile = (parts) => {
  // console.log('compiling', JSON.stringify(parts));
  return parts.namespace ? `${parts.namespace}.${parts.type}` : parts.type;
};

module.exports = {compile};
