var context = require.context('./test', true, /\.js$/);
context.keys().forEach(function(moduleName) {
  context(moduleName);
});
