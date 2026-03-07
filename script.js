// Funções para adicionar blocos dinâmicos
function addExperiencia() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Empresa"><br>
    <input type="text" placeholder="Cargo"><br>
    <input type="text" placeholder="Período"><br>
    <textarea placeholder="Descrição"></textarea><br><br>
  `;
  document.getElementById("experiencias").appendChild(div);
}

function addFormacao() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Curso"><br>
    <input type="text" placeholder="Instituição"><br>
    <select onchange="toggleFormacaoAno(this)">
      <option value="concluido">Concluído</option>
      <option value="cursando">Cursando</option>
    </select><br>
    <input type="text" class="ano" placeholder="Ano de conclusão" style="display:none;">
    <input type="text" class="termino" placeholder="Previsão de término" style="display:none;"><br><br>
  `;
  document.getElementById("formacoes").appendChild(div);
}

function toggleFormacaoAno(select) {
  const ano = select.parentNode.querySelector(".ano");
  const termino = select.parentNode.querySelector(".termino");
  if (select.value === "concluido") {
    ano.style.display = "block";
    termino.style.display = "none";
  } else {
    ano.style.display = "none";
    termino.style.display = "block";
  }
}

function addHabilidade() {
  const div = document.createElement("div");
  div.innerHTML = `<input type="text" placeholder="Habilidade"><br>`;
  document.getElementById("habilidades").appendChild(div);
}

function addCurso() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Nome do Curso"><br>
    <input type="text" placeholder="Instituição"><br>
    <select onchange="toggleCursoStatus(this)">
      <option value="">Selecione</option>
      <option value="concluido">Concluído</option>
      <option value="cursando">Cursando</option>
    </select><br>
    <input type="text" class="ano" placeholder="Ano de conclusão" style="display:none;">
    <input type="text" class="termino" placeholder="Data prevista (dia/mês/ano)" style="display:none;"><br><br>
  `;
  document.getElementById("cursos").appendChild(div);
}

function toggleCursoStatus(select) {
  const ano = select.parentNode.querySelector(".ano");
  const termino = select.parentNode.querySelector(".termino");
  if (select.value === "concluido") {
    ano.style.display = "block";
    termino.style.display = "none";
  } else if (select.value === "cursando") {
    ano.style.display = "none";
    termino.style.display = "block";
  } else {
    ano.style.display = "none";
    termino.style.display = "none";
  }
}

function addIdioma() {
  const div = document.createElement("div");
  div.innerHTML = `
    <select onchange="toggleIdiomaOutro(this)" class="idioma">
      <option value="portugues">Português</option>
      <option value="espanhol">Espanhol</option>
      <option value="ingles">Inglês</option>
      <option value="outro">Outro</option>
    </select>
    <select class="nivel">
      <option value="basico">Básico</option>
      <option value="intermediario">Intermediário</option>
      <option value="avancado">Avançado</option>
    </select>
    <input type="text" class="idiomaOutro" placeholder="Informe o idioma" style="display:none;"><br><br>
  `;
  document.getElementById("idiomas").appendChild(div);
}

function toggleIdiomaOutro(select) {
  const outroInput = select.parentNode.querySelector(".idiomaOutro");
  if (select.value === "outro") {
    outroInput.style.display = "block";
  } else {
    outroInput.style.display = "none";
  }
}

// Função principal para gerar o PDF
function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Dados de contato
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const localizacao = document.getElementById("localizacao").value;
  const linkedin = document.getElementById("linkedin").value;
  const portfolio = document.getElementById("portfolio").value;
  const objetivo = document.getElementById("objetivo").value;

  doc.setFontSize(18);
  doc.text("Currículo", 10, 10);

  doc.setFontSize(12);
  doc.text(`Telefone: ${telefone}`, 10, 20);
  doc.text(`Email: ${email}`, 10, 30);
  doc.text(`Localização: ${localizacao}`, 10, 40);
  doc.text(`LinkedIn: ${linkedin}`, 10, 50);
  if (portfolio) doc.text(`Portfólio: ${portfolio}`, 10, 60);

  doc.text("Objetivo:", 10, 75);
  doc.text(doc.splitTextToSize(objetivo, 180), 10, 85);

  // Experiências
  let y = 105;
  doc.setFontSize(14);
  doc.text("Experiência Profissional:", 10, y);
  y += 10;
  const experiencias = document.querySelectorAll("#experiencias div");
  experiencias.forEach(exp => {
    const empresa = exp.querySelector("input[placeholder='Empresa']").value;
    const cargo = exp.querySelector("input[placeholder='Cargo']").value;
    const periodo = exp.querySelector("input[placeholder='Período']").value;
    const descricao = exp.querySelector("textarea").value;

    doc.setFontSize(12);
    doc.text(`Empresa: ${empresa}`, 10, y);
    doc.text(`Cargo: ${cargo}`, 10, y+10);
    doc.text(`Período: ${periodo}`, 10, y+20);
    doc.text(doc.splitTextToSize(descricao, 180), 10, y+30);
    y += 50;
  });

  // Formações
  doc.setFontSize(14);
  doc.text("Formação Acadêmica:", 10, y);
  y += 10;
  const formacoes = document.querySelectorAll("#formacoes div");
  formacoes.forEach(f => {
    const curso = f.querySelector("input[placeholder='Curso']").value;
    const instituicao = f.querySelector("input[placeholder='Instituição']").value;
    const status = f.querySelector("select").value;
    const ano = f.querySelector(".ano").value;
    const termino = f.querySelector(".termino").value;

    doc.setFontSize(12);
    doc.text(`Curso: ${curso}`, 10, y);
    doc.text(`Instituição: ${instituicao}`, 10, y+10);
    doc.text(`Status: ${status}`, 10, y+20);
    if (status === "concluido" && ano) doc.text(`Ano de conclusão: ${ano}`, 10, y+30);
    if (status === "cursando" && termino) doc.text(`Previsão de término: ${termino}`, 10, y+30);
    y += 40;
  });

  // Habilidades
  doc.setFontSize(14);
  doc.text("Habilidades Técnicas:", 10, y);
  y += 10;
  const habilidades = document.querySelectorAll("#habilidades input");
  habilidades.forEach(h => {
    doc.setFontSize(12);
    doc.text(`- ${h.value}`, 10, y);
    y += 10;
  });

 // Cursos
  doc.setFontSize(14);
  doc.text("Cursos:", 10, y);
  y += 10;
  const cursos = document.querySelectorAll("#cursos div");
  cursos.forEach(c => {
    const nomeCurso = c.querySelector("input[placeholder='Nome do Curso']").value;
    const instituicao = c.querySelector("input[placeholder='Instituição']").value;
    const status = c.querySelector("select").value;
    const ano = c.querySelector(".ano").value;
    const termino = c.querySelector(".termino").value;

    doc.setFontSize(12);
    doc.text(`Curso: ${nomeCurso}`, 10, y);
    doc.text(`Instituição: ${instituicao}`, 10, y+10);
    doc.text(`Status: ${status}`, 10, y+20);
    if (status === "concluido" && ano) doc.text(`Ano de conclusão: ${ano}`, 10, y+30);
    if (status === "cursando" && termino) doc.text(`Previsão de término: ${termino}`, 10, y+30);
    y += 40;
  });

  // Idiomas
  doc.setFontSize(14);
  doc.text("Idiomas:", 10, y);
  y += 10;
  const idiomas = document.querySelectorAll("#idiomas div");
  idiomas.forEach(i => {
    const idiomaSelect = i.querySelector(".idioma").value;
    const nivel = i.querySelector(".nivel").value;
    const outro = i.querySelector(".idiomaOutro").value;

    let idiomaFinal = idiomaSelect === "outro" ? outro : idiomaSelect;

    doc.setFontSize(12);
    doc.text(`Idioma: ${idiomaFinal} - Nível: ${nivel}`, 10, y);
    y += 15;
  });

  // Finalizar PDF
  doc.save("curriculo.pdf");
}
