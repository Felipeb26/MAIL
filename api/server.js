require("dotenv").config();
const express = require("express");
const rotas = require("./routes/mail.routes");
const compress = require("compression");

const port = process.env.PORT | 3003;
const host = process.env.HOST | "0.0.0.0";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compress());

app.use(rotas);

if(new String(port).startsWith("3000")){
	port = 3003;
}

const server = app.listen(port, host, () => {
	console.log(`MAIL rodando em http://localhost:${port}`);
});

process.on("SIGINT", () => {
	server.close();
	console.log("MAIl fechando");
});

process.on("SIGINT", () => {
	server.close();
	console.log("MAIl fechando");
});
