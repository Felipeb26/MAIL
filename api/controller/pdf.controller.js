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
				"nos dedicamos para poder oferecer ajudar de acordo com a necessidade da melhor forma possivel",65,360
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

module.exports = {
	welcomeUser,
	welcomeDoc,
};
