function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const formacao = document.getElementById("formacao").value;
  const experiencia = document.getElementById("experiencia").value;
  const habilidades = document.getElementById("habilidades").value;
  const template = document.getElementById("template").value;

  doc.setFontSize(18);
  doc.text("Currículo", 10, 10);

  doc.setFontSize(12);
  doc.text(`Nome: ${nome}`, 10, 20);
  doc.text(`Email: ${email}`, 10, 30);
  doc.text(`Telefone: ${telefone}`, 10, 40);

  doc.text("Formação:", 10, 50);
  doc.text(doc.splitTextToSize(formacao, 180), 10, 60);

  doc.text("Experiência:", 10, 90);
  doc.text(doc.splitTextToSize(experiencia, 180), 10, 100);

  doc.text("Habilidades:", 10, 130);
  doc.text(doc.splitTextToSize(habilidades, 180), 10, 140);

  // Diferentes estilos de template
  if (template === "moderno") {
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(10, 15, 200, 15); // linha horizontal
  }

  doc.save(`curriculo_${nome}.pdf`);
}