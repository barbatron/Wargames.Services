const compile = (parts) => {
  return parts.namespace ? `${parts.namespace}.${parts.type}` : parts.type;
};

export {compile};
