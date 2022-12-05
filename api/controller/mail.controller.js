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
		const doc = new PDFdocument({
			pdfVersion: "1.7",
			compress: true,
			layout: "portrait",
			bufferPages: true,
			// userPassword: "origamis",
			printing: "lowResolution",
		});

		const docs = pdfService.welcomeUser(doc);
		let buffers = [];

		docs.end();
		docs.on("data", buffers.push.bind(buffers));
		docs.on("end", () => {
			let pdfData = Buffer.concat(buffers);
			res.writeHead(StatusCode.ACCEPTED, {
				"Content-Length": Buffer.byteLength(pdfData),
				"Content-Type": "application/pdf",
				"Content-disposition": "attachment;filename=test.pdf",
			}).end(pdfData);
		});
	} catch (error) {
		console.log("errosr");
		console.log(error);
		return res.status(StatusCode.SERVER_ERROR).send({ error: error.message });
	}
};

const request = async (re, res) => {
	try {
		const doc = new PDFdocument({
			pdfVersion: "1.7",
			compress: true,
			layout: "portrait",
			bufferPages: true,
			// userPassword: "origamis",
			printing: "lowResolution",
		});

		const docs = pdfService.welcomeUser(doc);

		let buffers = [];
		docs.on("data", buffers.push.bind(buffers));
		docs.on("end", () => {
			const pdfData = Buffer.concat(buffers);
			(function sendMail() {
				transporter
					.sendMail({
						from: "Felipe Batista <felipeb2silva@gmail.com>",
						replyTo: "lipethunderb@gmail.com",
						to: "felipeb2silva@gmail.com",
						subject: "Origami Saúde",
						text: "mensagem",
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

const teste = async (req, res) => {
	try {
		const doc = new PDFdocument({
			pdfVersion: "1.7",
			compress: true,
			layout: "portrait",
			bufferPages: true,
			// userPassword: "origamis",
			printing: "lowResolution",
		});

		const docs = pdfService.welcomeDoc(doc);


		docs.pipe(fs.createWriteStream(name))

		docs.end();
		return res.send({message:StatusCode.ACCEPTED})
	} catch (error) {
		console.log(error);
		return res.send(error.message);
	}
};

module.exports = { build, request,teste };
