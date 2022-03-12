const app = require("./app");
const { APP_PORT } = require("./configuration/env_config");
app.listen(APP_PORT, () => {
	console.log(`Server ready on port: ${APP_PORT}`);
});
