// Ajusta textarea do objetivo dinamicamente
document.getElementById("objetivo").addEventListener("input", function() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
});

// Função para calcular páginas estimadas
function atualizarPaginas() {
  const totalBlocos = document.querySelectorAll("#experiencias div, #formacoes div, #habilidades div, #cursos div, #idiomas div").length;
  const linhasEstimadas = totalBlocos * 6 + 20; // cada bloco ~6 linhas
  const paginas = Math.ceil(linhasEstimadas / 50); // ~50 linhas por página
  document.getElementById("contadorPaginas").innerText = `Estimativa: ${paginas} páginas A4`;
}

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
  document.getElementById("objetivo").style.fontFamily = font;
}

function setObjetivoSize(size) {
  objetivoSize = size;
  document.getElementById("objetivo").style.fontSize = size;
}

function toggleObjetivoBold() {
  objetivoBold = !objetivoBold;
  document.getElementById("objetivo").style.fontWeight = objetivoBold ? "bold" : "normal";
}

function aplicarEstiloGlobal(valor) {
  if (valor === "global") {
    globalFont = objetivoFont;
    globalSize = parseInt(objetivoSize);
    globalBold = objetivoBold;
    alert("Estilo aplicado ao PDF inteiro!");
  }
}
function togglePalavrasChaves() {
  const checkbox = document.getElementById("ativarPalavrasChaves");
  const bloco = document.getElementById("blocoPalavrasChaves");
  bloco.style.display = checkbox.checked ? "block" : "none";
}

async function gerarWord() {
  const { Document, Packer, Paragraph, TextRun } = window.docx;

  // Coleta dados básicos
  const nome = document.getElementById("nomeCompleto").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const localizacao = document.getElementById("localizacao").value;
  const linkedin = document.getElementById("linkedin").value;
  const portfolio = document.getElementById("portfolio").value;
  const objetivo = document.getElementById("objetivo").value;

  // Palavras-chave (se ativadas)
  let palavrasChaves = "";
  if (document.getElementById("ativarPalavrasChaves").checked) {
    palavrasChaves = document.getElementById("textoPalavrasChaves").value;
  }

  // Experiências
  const experiencias = Array.from(document.querySelectorAll("#experiencias div")).map(div => {
    const empresa = div.querySelector("input[placeholder='Empresa']").value;
    const cargo = div.querySelector("input[placeholder='Cargo']").value;
    const inicio = div.querySelector(".inicio").value;
    const fim = div.querySelector(".fim").value;
    const descricao = div.querySelector("textarea").value;
    return `${empresa} - ${cargo} (${inicio} - ${fim})\n${descricao}`;
  });

  // Formações
  const formacoes = Array.from(document.querySelectorAll("#formacoes div")).map(div => {
    const curso = div.querySelector("input[placeholder='Curso']").value;
    const instituicao = div.querySelector("input[placeholder='Instituição']").value;
    const ano = div.querySelector(".ano").value;
    const termino = div.querySelector(".termino").value;
    return `${curso} - ${instituicao} (${ano || termino})`;
  });

  // Habilidades
  const habilidades = Array.from(document.querySelectorAll("#habilidades input")).map(input => input.value);

  // Cursos
  const cursos = Array.from(document.querySelectorAll("#cursos div")).map(div => {
    const nomeCurso = div.querySelector("input[placeholder='Nome do Curso']").value;
    const instituicao = div.querySelector("input[placeholder='Instituição']").value;
    const ano = div.querySelector(".ano").value;
    const termino = div.querySelector(".termino").value;
    return `${nomeCurso} - ${instituicao} (${ano || termino})`;
  });

  // Idiomas
  const idiomas = Array.from(document.querySelectorAll("#idiomas div")).map(div => {
    const idioma = div.querySelector(".idioma").value;
    const nivel = div.querySelector(".nivel").value;
    const outro = div.querySelector(".idiomaOutro").value;
    return `${idioma === "outro" ? outro : idioma} - ${nivel}`;
  });

  // Cria documento Word
  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({ children: [new TextRun({ text: nome, bold: true, size: 28 })] }),
        new Paragraph({ text: `Telefone: ${telefone}` }),
        new Paragraph({ text: `E-mail: ${email}` }),
        new Paragraph({ text: `Localização: ${localizacao}` }),
        new Paragraph({ text: `LinkedIn: ${linkedin}` }),
        new Paragraph({ text: `Portfólio: ${portfolio}` }),
        new Paragraph({ text: "" }),
        new Paragraph({ children: [new TextRun({ text: "Objetivo", bold: true, size: 24 })] }),
        new Paragraph({ text: objetivo }),
        new Paragraph({ text: "" }),
        new Paragraph({ children: [new TextRun({ text: "Experiência Profissional", bold: true, size: 24 })] }),
        ...experiencias.map(exp => new Paragraph({ text: exp })),
        new Paragraph({ text: "" }),
        new Paragraph({ children: [new TextRun({ text: "Formação Acadêmica", bold: true, size: 24 })] }),
        ...formacoes.map(form => new Paragraph({ text: form })),
        new Paragraph({ text: "" }),
        new Paragraph({ children: [new TextRun({ text: "Habilidades Técnicas", bold: true, size: 24 })] }),
        ...habilidades.map(hab => new Paragraph({ text: hab })),
        new Paragraph({ text: "" }),
        new Paragraph({ children: [new TextRun({ text: "Cursos", bold: true, size: 24 })] }),
        ...cursos.map(cur => new Paragraph({ text: cur })),
        new Paragraph({ text: "" }),
        new Paragraph({ children: [new TextRun({ text: "Idiomas", bold: true, size: 24 })] }),
        ...idiomas.map(idi => new Paragraph({ text: idi })),
        new Paragraph({ text: "" }),
        palavrasChaves ? new Paragraph({ text: `Palavras-chave (ocultas): ${palavrasChaves}`, size: 8 }) : null
      ].filter(Boolean),
    }],
  });

  // Salva arquivo
  const blob = await Packer.toBlob(doc);
  saveAs(blob, "curriculo.docx");
}

function atualizarPreview() {
  let html = "";

  // Nome
  const nome = document.getElementById("nomeCompleto").value;
  if (nome) html += `<h3>${nome}</h3>`;

  // Contato
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const localizacao = document.getElementById("localizacao").value;
  const linkedin = document.getElementById("linkedin").value;
  const portfolio = document.getElementById("portfolio").value;
  html += `<p>${telefone} | ${email} | ${localizacao} | ${linkedin} | ${portfolio}</p>`;

  // Objetivo
  const objetivo = document.getElementById("objetivo").value;
  if (objetivo) html += `<p><strong>Objetivo:</strong> ${objetivo}</p>`;

  // Experiências
  const experiencias = Array.from(document.querySelectorAll("#experiencias div")).map(div => {
    const empresa = div.querySelector("input[placeholder='Empresa']").value;
    const cargo = div.querySelector("input[placeholder='Cargo']").value;
    const inicio = div.querySelector(".inicio").value;
    const fim = div.querySelector(".fim").value;
    const descricao = div.querySelector("textarea").value;
    return `<p><strong>${cargo}</strong> - ${empresa} (${inicio} - ${fim})<br>${descricao}</p>`;
  }).join("");
  if (experiencias) html += `<h4>Experiência Profissional</h4>${experiencias}`;

  // Formação
  const formacoes = Array.from(document.querySelectorAll("#formacoes div")).map(div => {
    const curso = div.querySelector("input[placeholder='Curso']").value;
    const instituicao = div.querySelector("input[placeholder='Instituição']").value;
    const ano = div.querySelector(".ano").value;
    const termino = div.querySelector(".termino").value;
    return `<p>${curso} - ${instituicao} (${ano || termino})</p>`;
  }).join("");
  if (formacoes) html += `<h4>Formação Acadêmica</h4>${formacoes}`;

  // Habilidades
  const habilidades = Array.from(document.querySelectorAll("#habilidades input")).map(i => i.value).filter(Boolean);
  if (habilidades.length) html += `<h4>Habilidades Técnicas</h4><p>${habilidades.join(", ")}</p>`;

  // Cursos
  const cursos = Array.from(document.querySelectorAll("#cursos div")).map(div => {
    const nomeCurso = div.querySelector("input[placeholder='Nome do Curso']").value;
    const instituicao = div.querySelector("input[placeholder='Instituição']").value;
    const ano = div.querySelector(".ano").value;
    const termino = div.querySelector(".termino").value;
    return `<p>${nomeCurso} - ${instituicao} (${ano || termino})</p>`;
  }).join("");
  if (cursos) html += `<h4>Cursos</h4>${cursos}`;

  // Idiomas
  const idiomas = Array.from(document.querySelectorAll("#idiomas div")).map(div => {
    const idioma = div.querySelector(".idioma").value;
    const nivel = div.querySelector(".nivel").value;
    const outro = div.querySelector(".idiomaOutro").value;
    return `<p>${idioma === "outro" ? outro : idioma} - ${nivel}</p>`;
  }).join("");
  if (idiomas) html += `<h4>Idiomas</h4>${idiomas}`;

  document.getElementById("previewCurriculo").innerHTML = html;
}

// Atualiza preview em tempo real
["nomeCompleto","telefone","email","localizacao","linkedin","portfolio","objetivo"].forEach(id => {
  document.getElementById(id).addEventListener("input", atualizarPreview);
});

function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // variável de controle vertical
  let y = 30;

  // Cabeçalho e nome
  const nomeCompleto = document.getElementById("nomeCompleto")?.value || "";
  doc.setFontSize(22);
  if (nomeCompleto) doc.text(nomeCompleto, 105, 20, { align: "center" });

  // Dados de contato
  doc.setFontSize(14);
  doc.text("Dados de Contato:", 10, y);
  y += 8;

  doc.setFontSize(12);
  doc.text(`Telefone: ${document.getElementById("telefone").value}`, 10, y);
  y += 6;
  doc.text(`Email: ${document.getElementById("email").value}`, 10, y);
  y += 6;
  doc.text(`Localização: ${document.getElementById("localizacao").value}`, 10, y);
  y += 6;

  const linkedin = document.getElementById("linkedin").value;
  if (linkedin) { doc.text(`LinkedIn: ${linkedin}`, 10, y); y += 6; }

  const portfolio = document.getElementById("portfolio").value;
  if (portfolio) { doc.text(`Portfólio: ${portfolio}`, 10, y); y += 6; }

  // Objetivo
  y += 10;
  doc.setFontSize(14);
  doc.text("Objetivo:", 10, y);
  y += 8;
  doc.setFontSize(12);
  const objetivo = document.getElementById("objetivo").value;
  const objetivoTexto = doc.splitTextToSize(objetivo, 180);
  doc.text(objetivoTexto, 10, y);
  y += objetivoTexto.length * 5 + 8;

  // Experiências
  let experiencias = Array.from(document.querySelectorAll("#experiencias div"));
experiencias.sort((a, b) => {
  const statusA = a.querySelector("select").value;
  const statusB = b.querySelector("select").value;

  // Emprego atual sempre primeiro
  if (statusA === "atual" && statusB !== "atual") return -1;
  if (statusB === "atual" && statusA !== "atual") return 1;

  // Se ambos forem atuais ou ambos antigos, ordenar pela data de início (mais recente primeiro)
  const inicioA = new Date(a.querySelector(".inicio").value);
  const inicioB = new Date(b.querySelector(".inicio").value);
  return inicioB - inicioA;
});

  doc.setFontSize(14);
  doc.text("Experiência Profissional:", 10, y);
  y += 8;

  experiencias.forEach(exp => {
    if (y > 270) { doc.addPage(); y = 20; }
    const empresa = exp.querySelector("input[placeholder='Empresa']").value;
    const cargo = exp.querySelector("input[placeholder='Cargo']").value;
    const inicio = exp.querySelector(".inicio").value;
    const fim = exp.querySelector(".fim").value;
    const status = exp.querySelector("select").value;
    const descricao = exp.querySelector("textarea").value;

    doc.setFontSize(12);
    doc.text(`Cargo: ${cargo}`, 10, y);
    y += 6;
    doc.text(`Empresa: ${empresa}`, 10, y);
    doc.text(`Data: ${inicio} até ${status === "atual" ? "o momento" : fim}`, 100, y);
    y += 8;

    doc.text("Descrição:", 10, y);
    y += 6;
    const descricaoTexto = doc.splitTextToSize(descricao, 180);
    doc.text(descricaoTexto, 10, y);
    y += descricaoTexto.length * 5 + 8;
  });

  // Formação Acadêmica
  doc.setFontSize(14);
  doc.text("Formação Acadêmica:", 10, y);
  y += 8;

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
    doc.text(`Instituição: ${instituicao}`, 100, y);
    y += 6;

    let anoOuPrevisao = "";
    if (status === "concluido" && ano) anoOuPrevisao = `Ano: ${ano}`;
    if (status === "cursando" && termino) anoOuPrevisao = `Previsão: ${termino}`;

    doc.text(`Status: ${status}`, 10, y);
    doc.text(anoOuPrevisao, 100, y);
    y += 8;
  });

  // Habilidades
  doc.setFontSize(14);
  doc.text("Habilidades Técnicas:", 10, y);
  y += 8;
  const habilidades = Array.from(document.querySelectorAll("#habilidades input")).map(h => h.value);
  let col = 0;
  habilidades.forEach(h => {
    if (y > 270) { doc.addPage(); y = 20; col = 0; }
    doc.text(h, 10 + col*50, y);
    col++;
    if (col === 4) { col = 0; y += 6; }
  });
  y += 8;

  // Cursos
  doc.setFontSize(14);
  doc.text("Cursos:", 10, y);
  y += 8;

  let cursos = Array.from(document.querySelectorAll("#cursos div"));
  let concluidos = cursos.filter(c => c.querySelector("select").value === "concluido");
  let cursando = cursos.filter(c => c.querySelector("select").value === "cursando");

  concluidos.sort((a,b) => new Date(b.querySelector(".ano").value) - new Date(a.querySelector(".ano").value));
  cursando.sort((a,b) => new Date(b.querySelector(".termino").value) - new Date(a.querySelector(".termino").value));

  doc.setFontSize(14);
  doc.text("Cursos Concluídos:", 10, y);
  y += 8;

  concluidos.forEach(c => {
    if (y > 270) { doc.addPage(); y = 20; }
    const nomeCurso = c.querySelector("input[placeholder='Nome do Curso']").value;
    const instituicao = c.querySelector("input[placeholder='Instituição']").value;
    const ano = c.querySelector(".ano").value;

    doc.setFontSize(12);
    doc.text(`Curso: ${nomeCurso}`, 10, y);
    doc.text(`Instituição: ${instituicao}`, 100, y);
    y += 6;
    doc.text(`Ano: ${ano}`, 10, y);
    y += 8;
  });

 // Cursos em andamento (só aparece se houver algum)
if (cursando.length > 0) {
  doc.setFontSize(14);
  doc.text("Cursos em andamento:", 10, y);
  y += 8;

  cursando.forEach(c => {
    if (y > 270) { doc.addPage(); y = 20; }
    const nomeCurso = c.querySelector("input[placeholder='Nome do Curso']").value;
    const instituicao = c.querySelector("input[placeholder='Instituição']").value;
    const termino = c.querySelector(".termino").value;

    doc.setFontSize(12);
    doc.text(`Curso: ${nomeCurso}`, 10, y);
    doc.text(`Instituição: ${instituicao}`, 100, y);
    y += 6;
    doc.text(`Previsão: ${termino}`, 10, y);
    y += 8; // espaço extra entre cursos
  });
}

  // Idiomas
  doc.setFontSize(14);
  doc.text("Idiomas:", 10, y);
  y += 8;

  const idiomas = document.querySelectorAll("#idiomas div");
  idiomas.forEach(i => {
    if (y > 270) { doc.addPage(); y = 20; }
    const idiomaSelect = i.querySelector(".idioma").value;
    const nivel = i.querySelector(".nivel").value;
    const outro = i.querySelector(".idiomaOutro").value;
    let idiomaFinal = idiomaSelect === "outro" ? outro : idiomaSelect;

    doc.setFontSize(12);
    doc.text(`Idioma: ${idiomaFinal} - Nível: ${nivel}`, 10, y);
    y += 6;
  });

// Palavras-Chaves ocultas
const ativarPalavrasChaves = document.getElementById("ativarPalavrasChaves").checked;
if (ativarPalavrasChaves) {
  const textoPalavrasChaves = document.getElementById("textoPalavrasChaves").value;
  if (textoPalavrasChaves.trim() !== "") {
    doc.setTextColor(255, 255, 255); // branco = invisível no PDF
    doc.setFontSize(6);
    doc.text(`Palavras-chave: ${textoPalavrasChaves}`, 10, y);
    doc.setTextColor(0, 0, 0); // volta ao preto normal
  }
}

  // Finalizar PDF
  doc.save("curriculo.pdf");
}











