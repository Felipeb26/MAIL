const route = require("express").Router({ caseSensitive: false });
const controller = require("../controller/mail.controller");

route.post("/mail", controller.request)

route.post("/pdf", controller.build);

route.post("/send", controller.simple);

route.post("/teste", controller.teste);

route.get("/", async (req, res) => {
	return res.status(200).send({ message: "MAIl is running" });
});

module.exports = route;
