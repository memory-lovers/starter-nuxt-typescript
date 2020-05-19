const funcs = {
  // TODO: <functionName>:<importPath>
};

for (let name in funcs) {
  if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === name) {
    exports[name] = require(funcs[name]).default;
  }
}
