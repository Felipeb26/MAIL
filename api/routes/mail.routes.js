const route = require("express").Router({ caseSensitive: false });
const controller = require("../controller/mail.controller");


route.get("/mail", controller.request)

route.get("/pdf", controller.build);

route.get("/teste", controller.teste);

route.get("/", async (req, res) => {
	return res.status(200).send({ message: "MAIl is running" });
});

module.exports = route;
