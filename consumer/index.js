const app = require("./app");
const PORT = 3020;


app.listen(PORT, () => {
  console.info(`consumer is listening on port ${PORT}`);
});