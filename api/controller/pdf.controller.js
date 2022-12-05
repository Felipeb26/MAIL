const PDFdocument = require("pdfkit");

const img = `${__dirname}/assets/logo.png`;
const data = Date.now();
const date = new Date(data).toLocaleDateString("pt-br");
const time = new Date(data).toLocaleTimeString("pt-br");
const link_color = "#0000ff";
const text_color = "#000000";

function welcomeUser(doc) {
	try {
		doc = new PDFdocument();

		doc.image(img, {
			fit: [150, 150],
			align: "right",
			valign: "center",
		});

		doc.fontSize(14)
			.lineGap(5)
			.text(`Olá ${data}, seja bem vindo ao Origami Sáude!`, 65, 270)
			.text(
				"Sua entrada para como usuario de nossos serviços é um grande avanço no cuidado e tratamento de sua saúde, nos dedicamos para poder ajudar de acordo sua necessidade oferecendo um tratamento e auxilio 24hrs com os medicos disponiveis em nosso sistema",
				65,
				300
			)
			.text(
				"então agora que já finalizou seu cadastro que tal saber um pouco",
				65,
				440
			)
			.fillColor(link_color)
			.text("sobre nós", 65, 460)
			.underline(65, 450, 65, 26, { color: link_color })
			.link(65, 450, 65, 26, "https://felipeb26.github.io/front_a3/about")
			.fillColor(text_color)
			.text(
				"e passar em uma consulta de nossos medicos parceiros?",
				135,
				460
			)
			.text("ficou em duvida sobre nós", 65, 520)
			.fillColor(link_color)
			.text("entre em contato", 235, 520)
			.underline(235, 510, 105, 25, { color: link_color })
			.link(235, 510, 105, 25, "mailto:felipeb2silva@gmail.com")
			.fillColor(text_color)
			.text("para descubrir um pouco mais!", 345, 520);

		doc.fontSize(12)
			.fillColor(text_color)
			.text(`Documento gerado em São Paulo em ${date} ás ${time}`, 300, 650);

		return doc;
	} catch (error) {
		console.log("errosr");
		console.log(error);
	} finally {
		console.log("created file!");
	}
}

function welcomeDoc(doc) {
	try {
		doc = new PDFdocument();

		doc.image(img, {
			fit: [150, 150],
			align: "right",
			valign: "center",
		});

		doc.fontSize(14)
			.lineGap(5)
			.text(`Olá ${data}, seja bem vindo ao Origami Sáude!`, 65, 270)
			.text(
				"Sua entrada para como usuario colaborador de nossos serviços é um grande avanço no cuidado e tratamento da saúde de nossos clientes",
				65,
				300
			)
			.text(
				"Nós como grupo nos dedicamos para poder oferecer a melhor ajuda de acordo com a necessidade da melhor forma possivel.",
				65,
				360
			)
			.text(
				"então agora que já finalizou seu cadastro que tal saber um pouco",
				65,
				440
			)
			.fillColor(link_color)
			.text("sobre nós", 65, 460)
			.underline(65, 450, 65, 26, { color: link_color })
			.link(65, 450, 65, 26, "https://felipeb26.github.io/front_a3/about")
			.fillColor(text_color)
			.text("Que tal conhecer alguns beneficios como", 135, 460)
			.fillColor(link_color)
			.text("colaborador?", 395, 460)
			.underline(395, 450, 85, 25, { color: link_color })
			.link(395, 450, 85, 25, "https://felipeb26.github.io/front_a3/")
			.fillColor(text_color)
			.text("ficou em duvida sobre nós", 65, 520)
			.fillColor(link_color)
			.text("entre em contato", 235, 520)
			.underline(235, 510, 105, 25, { color: link_color })
			.link(235, 510, 105, 25, "mailto:felipeb2silva@gmail.com")
			.fillColor(text_color)
			.text("para descubrir um pouco mais!", 345, 520);

		doc.fontSize(12)
			.fillColor(text_color)
			.text(`Documento gerado em São Paulo em ${date} ás ${time}`, 300, 650);

		return doc;
	} catch (error) {
		console.log("errosr");
		console.log(error);
	} finally {
		console.log("created file!");
	}
}

function deleteConsult(doc) {
	try {
		doc = new PDFdocument();

		doc.image(img, {
			fit: [150, 150],
			align: "right",
			valign: "center",
		});

		doc.fontSize(14)
			.lineGap(5)
			.text(
				`Caro ${data} lamentamos em disser que sua consulta foi cancelada`,
				65,
				270
			)
			.text(`Sua consulta foi cancelada por causa de ......`, 65, 320)
			.text("Caso queira remarcar a sua consulta clique", 65, 370)
			.fillColor(link_color)
			.text("aqui!!", 340, 370)
			.underline(340, 365, 30, 17, { color: link_color })
			.link(34, 365, 30, 17, "https://felipeb26.github.io/front_a3/about");

		doc.fontSize(12)
			.fillColor(text_color)
			.text(`Documento gerado em São Paulo em ${date} ás ${time}`, 300, 650);

		return doc;
	} catch (error) {
		console.log("errosr");
		console.log(error);
	} finally {
		console.log("created file!");
	}
}

function reagendarConsulta(doc) {
	try {
		doc = new PDFdocument();

		doc.image(img, {
			fit: [150, 150],
			align: "right",
			valign: "center",
		});

		doc.fontSize(14)
			.lineGap(5)
			.text(`Caro ${data} sua consulta foi reagendada para o dia`, 65, 270);

		doc.text(`${date} ás ${time}.`, 65, 300).underline(65, 300, 155, 17);

		doc.text("Caso queira alterar a data acesse", 65, 330);

		doc.fillColor(link_color)
			.text("aqui", 280, 330)
			.underline(280, 330, 30, 17, { color: link_color })
			.link(280, 330, 30, 17, "https://felipeb26.github.io/front_a3/calendario");

		doc.fontSize(12)
			.fillColor(text_color)
			.text(`Documento gerado em São Paulo em ${date} ás ${time}`, 300, 650)

		return doc;
	} catch (error) {}
}

module.exports = {
	welcomeUser,
	welcomeDoc,
	deleteConsult,
	reagendarConsulta,
};
