const app = require("./app");
const PORT = 3010;


app.listen(PORT, () => {
  console.info(`identity provider is listening on port ${PORT}`);
});