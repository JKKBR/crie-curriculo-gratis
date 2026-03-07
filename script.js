// Ajusta textarea do objetivo dinamicamente
document.getElementById("objetivo").addEventListener("input", function() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
});

// Função para calcular páginas estimadas
function atualizarPaginas() {
  const totalBlocos = document.querySelectorAll("#experiencias div, #formacoes div, #habilidades div, #cursos div, #idiomas div").length;
  const linhasEstimadas = totalBlocos * 8 + 30; // estimativa simples
  const paginas = Math.ceil(linhasEstimadas / 40); // 40 linhas por página
  document.getElementById("contadorPaginas").innerText = `Estimativa: ${paginas} páginas A4`;
}

// Exemplo: adicionar contador no HTML
// <span id="contadorPaginas">Estimativa: 1 página A4</span>

// Função para adicionar experiência
function addExperiencia() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Empresa"><br>
    <input type="text" placeholder="Cargo"><br>
    <label>Início:</label><input type="month" class="inicio"><br>
    <label>Fim:</label><input type="month" class="fim"><br>
    <select onchange="toggleEmpregoAtual(this)">
      <option value="">Selecione</option>
      <option value="atual">Emprego Atual</option>
      <option value="antigo">Emprego Antigo</option>
    </select><br>
    <textarea placeholder="Descrição" rows="5"></textarea><br><br>
  `;
  document.getElementById("experiencias").appendChild(div);
  atualizarPaginas();
}

function toggleEmpregoAtual(select) {
  const fim = select.parentNode.querySelector(".fim");
  if (select.value === "atual") {
    fim.style.display = "none";
  } else {
    fim.style.display = "block";
  }
}

// Função principal para gerar PDF
function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Nome completo centralizado
  const nomeCompleto = document.getElementById("nomeCompleto")?.value || "";
  doc.setFontSize(22);
  doc.text("Currículo", 105, 20, { align: "center" });
  if (nomeCompleto) doc.text(nomeCompleto, 105, 30, { align: "center" });

 } 

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

// Variáveis de estilo
let objetivoFont = "Helvetica";
let objetivoSize = "14px";
let objetivoBold = false;

let globalFont = "Helvetica";
let globalSize = 12;
let globalBold = false;

function setObjetivoFont(font) {
  objetivoFont = font;
  document.getElementById("objetivo").style.fontFamily = font; // muda na hora
}

function setObjetivoSize(size) {
  objetivoSize = size;
  document.getElementById("objetivo").style.fontSize = size; // muda na hora
}

function toggleObjetivoBold() {
  objetivoBold = !objetivoBold;
  document.getElementById("objetivo").style.fontWeight = objetivoBold ? "bold" : "normal"; // muda na hora
}

function aplicarEstiloGlobal(valor) {
  if (valor === "global") {
    globalFont = objetivoFont;
    globalSize = parseInt(objetivoSize); // converte "14px" para número
    globalBold = objetivoBold;
    alert("Estilo aplicado ao PDF inteiro!");
  }
}

// Função principal para gerar PDF
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

  // Cabeçalho
  doc.setFontSize(18);
  doc.setFont(globalFont, globalBold ? "bold" : "normal");
  doc.text("Currículo", 10, 10);

 // Dados de contato
  doc.setFontSize(11);
  let y = 50;
  doc.text(`Telefone: ${document.getElementById("telefone").value}`, 10, y);
  doc.text(`Email: ${document.getElementById("email").value}`, 10, y+10);
  doc.text(`Localização: ${document.getElementById("localizacao").value}`, 10, y+20);
  doc.text(`LinkedIn: ${document.getElementById("linkedin").value}`, 10, y+30);
  const portfolio = document.getElementById("portfolio").value;
  if (portfolio) doc.text(`Portfólio: ${portfolio}`, 10, y+40);

  // Objetivo
  y += 60;
  doc.setFontSize(14);
  doc.text("Objetivo:", 10, y);
  y += 10;
  doc.setFontSize(12);
  const objetivo = document.getElementById("objetivo").value;
  const objetivoTexto = doc.splitTextToSize(objetivo, 180);
  doc.text(objetivoTexto, 10, y);
  y += objetivoTexto.length * 6;

  // Experiências ordenadas (mais recente primeiro)
  let experiencias = Array.from(document.querySelectorAll("#experiencias div"));
  experiencias.sort((a,b) => {
    const inicioA = a.querySelector(".inicio").value;
    const inicioB = b.querySelector(".inicio").value;
    return new Date(inicioB) - new Date(inicioA);
  });

  doc.setFontSize(14);
  doc.text("Experiência Profissional:", 10, y);
  y += 10;
  experiencias.forEach(exp => {
    if (y > 270) { doc.addPage(); y = 20; }
    const empresa = exp.querySelector("input[placeholder='Empresa']").value;
    const cargo = exp.querySelector("input[placeholder='Cargo']").value;
    const inicio = exp.querySelector(".inicio").value;
    const fim = exp.querySelector(".fim").value;
    const status = exp.querySelector("select").value;
    const descricao = exp.querySelector("textarea").value;

    doc.setFontSize(12);
    doc.text(`Empresa: ${empresa}`, 10, y);
    doc.text(`Cargo: ${cargo}`, 10, y+10);
    doc.text(`Início: ${inicio}`, 10, y+20);
    if (status !== "atual") doc.text(`Fim: ${fim}`, 10, y+30);
    doc.text(doc.splitTextToSize(descricao, 180), 10, y+40);
    y += 60;
  });

  // Formações
doc.setFontSize(14);
doc.text("Formação Acadêmica:", 10, y);
y += 10;

let formacoes = Array.from(document.querySelectorAll("#formacoes div"));
formacoes.sort((a,b) => {
  const anoA = a.querySelector(".ano").value || a.querySelector(".termino").value;
  const anoB = b.querySelector(".ano").value || b.querySelector(".termino").value;
  return new Date(anoB) - new Date(anoA);
});

formacoes.forEach(f => {
  if (y > 270) { doc.addPage(); y = 20; }
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
  if (y > 270) { doc.addPage(); y = 20; }
  doc.setFontSize(12);
  doc.text(`- ${h.value}`, 10, y);
  y += 10;
});

// Cursos
doc.setFontSize(14);
doc.text("Cursos:", 10, y);
y += 10;

let cursos = Array.from(document.querySelectorAll("#cursos div"));
let concluidos = cursos.filter(c => c.querySelector("select").value === "concluido");
let cursando = cursos.filter(c => c.querySelector("select").value === "cursando");

concluidos.sort((a,b) => new Date(b.querySelector(".ano").value) - new Date(a.querySelector(".ano").value));
cursando.sort((a,b) => new Date(b.querySelector(".termino").value) - new Date(a.querySelector(".termino").value));

doc.setFontSize(14);
doc.text("Cursos Concluídos:", 10, y);
y += 10;
concluidos.forEach(c => {
  if (y > 270) { doc.addPage(); y = 20; }
  const nomeCurso = c.querySelector("input[placeholder='Nome do Curso']").value;
  const instituicao = c.querySelector("input[placeholder='Instituição']").value;
  const ano = c.querySelector(".ano").value;

  doc.setFontSize(12);
  doc.text(`Curso: ${nomeCurso}`, 10, y);
  doc.text(`Instituição: ${instituicao}`, 10, y+10);
  doc.text(`Ano de conclusão: ${ano}`, 10, y+20);
  y += 40;
});

doc.setFontSize(14);
doc.text("Cursos em andamento:", 10, y);
y += 10;
cursando.forEach(c => {
  if (y > 270) { doc.addPage(); y = 20; }
  const nomeCurso = c.querySelector("input[placeholder='Nome do Curso']").value;
  const instituicao = c.querySelector("input[placeholder='Instituição']").value;
  const termino = c.querySelector(".termino").value;

  doc.setFontSize(12);
  doc.text(`Curso: ${nomeCurso}`, 10, y);
  doc.text(`Instituição: ${instituicao}`, 10, y+10);
  doc.text(`Previsão de término: ${termino}`, 10, y+20);
  y += 40;
});

// Idiomas
doc.setFontSize(14);
doc.text("Idiomas:", 10, y);
y += 10;
const idiomas = document.querySelectorAll("#idiomas div");
idiomas.forEach(i => {
  if (y > 270) { doc.addPage(); y = 20; }
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





