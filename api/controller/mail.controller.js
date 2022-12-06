const fs = require("fs");
const pdfService = require("../controller/pdf.controller");
const config = require("../utils/mail.config");
const PDFdocument = require("pdfkit");
const PDFWatermark = require("pdf-watermark");
const uuid = require("uuid");
const { StatusCode } = require("../utils/status_code.enum");

const data = Date.now();

const newName = uuid.v4();
const name = `${__dirname}/arquivo.pdf`;
const transporter = config.transport;

const build = async (req, res) => {
	try {
		const { user, para, mensagem, modelo } = req.body;

		const doc = new PDFdocument({
			pdfVersion: "1.7",
			compress: true,
			layout: "portrait",
			bufferPages: true,
			userPassword: "origamis",
			printing: "lowResolution",
		});

		let docs;
		switch (modelo) {
			case "reagendamento":
				docs = pdfService.reagendarConsulta(doc, user);
				break;
			case "deleta":
				docs = pdfService.deleteConsulta(doc, user);
				break;
			case "bemvindo_user":
				docs = pdfService.welcomeUser(doc, user);
				break;
			case "bemvindo_doc":
				docs = pdfService.welcomeDoc(doc, user);
			default:
				return res
					.status(StatusCode.NOT_FOUND)
					.send({ message: "não encontrado o modelo" });
		}

		let buffers = [];
		docs.end();
		docs.on("data", buffers.push.bind(buffers));
		docs.on("end", () => {
			let pdfData = Buffer.concat(buffers);
			res.writeHead(StatusCode.ACCEPTED, {
				"Content-Length": Buffer.byteLength(pdfData),
				"Content-Type": "application/pdf",
				"Content-disposition": `attachment;filename=${newName}.pdf`,
			}).end(pdfData);
		});
	} catch (error) {
		console.log("errosr");
		console.log(error);
		return res.status(StatusCode.SERVER_ERROR).send({ error: error.message });
	}
};

const request = async (req, res) => {
	try {
		const { user, para, mensagem, modelo } = req.body;

		const doc = new PDFdocument({
			pdfVersion: "1.7",
			compress: true,
			layout: "portrait",
			bufferPages: true,
			userPassword: "origamis",
			printing: "lowResolution",
		});

		let docs;
		switch (modelo) {
			case "reagendamento":
				docs = pdfService.reagendarConsulta(doc, user);
				break;
			case "deleta":
				docs = pdfService.deleteConsulta(doc, user);
				break;
			case "bemvindo_user":
				docs = pdfService.welcomeUser(doc, user);
				break;
			case "bemvindo_doc":
				docs = pdfService.welcomeDoc(doc, user);
			default:
				return res
					.status(StatusCode.NOT_FOUND)
					.send({ message: "não encontrado o modelo" });
		}

		let buffers = [];
		docs.on("data", buffers.push.bind(buffers));
		docs.on("end", () => {
			const pdfData = Buffer.concat(buffers);
			(function sendMail() {
				transporter
					.sendMail({
						from: "Felipe Batista <felipeb2silva@gmail.com>",
						replyTo: "lipethunderb@gmail.com",
						to: para | "felipeb2silva@gmail.com",
						subject: `Origami Saúde:`,
						text: mensagem | "",
						priority: "high",
						date: data,
						attachments: [
							{
								filename: `${newName}.pdf`,
								content: pdfData,
							},
						],
					})
					.then(() => {
						return res.status(StatusCode.OK).send({
							message: `email enviado com sucesso`,
						});
					})
					.catch((err) => {
						console.log(err);
						return res
							.status(StatusCode.SERVER_ERROR)
							.send({ erro: err.message });
					});
			})();
		})();
	} catch (error) {
		console.log(error);
	}
};

const simple = async (req, res) => {
	try {
		const { assunto, para, mensagem, modelo } = req.body;

		(function sendMail() {
			transporter
				.sendMail({
					from: "Felipe Batista <felipeb2silva@gmail.com>",
					replyTo: "lipethunderb@gmail.com",
					to: para | "felipeb2silva@gmail.com",
					subject: `Origami Saúde: ${assunto}`,
					text: mensagem | "",
					priority: "high",
					date: data,
				})
				.then(() => {
					return res.status(StatusCode.OK).send({
						message: `email enviado com sucesso`,
					});
				})
				.catch((err) => {
					console.log(err);
					return res
						.status(StatusCode.SERVER_ERROR)
						.send({ erro: err.message });
				});
		})();
	} catch (error) {
		return res.status(StatusCode.SERVER_ERROR).send({ error: error.message });
	}
};

const teste = async (req, res) => {
	try {
		const { user, para, mensagem, modelo } = req.body;

		const doc = new PDFdocument({
			pdfVersion: "1.7",
			compress: true,
			layout: "portrait",
			bufferPages: true,
			userPassword: "origamis",
			printing: "lowResolution",
		});

		let docs;
		switch (modelo) {
			case "reagendamento":
				docs = pdfService.reagendarConsulta(doc, user);
				break;
			case "deleta":
				docs = pdfService.deleteConsulta(doc, user);
				break;
			case "bemvindo_user":
				docs = pdfService.welcomeUser(doc, user);
				break;
			case "bemvindo_doc":
				docs = pdfService.welcomeDoc(doc, user);
			default:
				return res
					.status(StatusCode.NOT_FOUND)
					.send({ message: "não encontrado o modelo" });
		}

		docs.pipe(fs.createWriteStream(name));

		docs.end();
		return res.send({ message: StatusCode.ACCEPTED });
	} catch (error) {
		console.log(error);
		return res.send(error.message);
	}
};

module.exports = { build, request, simple, teste };
