// Ajusta textarea do objetivo dinamicamente
document.getElementById("objetivo").addEventListener("input", function() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
});

// Função de estimativa de páginas
function atualizarEstimativa() {
  const texto = document.getElementById("previewCurriculo").innerText;
  const caracteresPorPagina = 1800; // aproximação
  const paginas = Math.max(1, Math.ceil(texto.length / caracteresPorPagina));
  document.getElementById("contadorPaginas").innerText = `Estimativa: ${paginas} página(s) A4`;
}

// Funções para adicionar blocos
function addExperiencia() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Empresa"><br>
    <input type="text" placeholder="Cargo"><br>
    <label>Início:</label><input type="date" class="inicio"><br>
    <label>Fim:</label><input type="date" class="fim"><br>
    <select onchange="toggleEmpregoAtual(this)">
      <option value="">Selecione</option>
      <option value="atual">Emprego Atual</option>
      <option value="antigo">Emprego Antigo</option>
    </select><br>
    <textarea placeholder="Descrição" rows="5"></textarea><br><br>
  `;
  document.getElementById("experiencias").appendChild(div);
  atualizarPreview();
}
function toggleEmpregoAtual(select) {
  const fim = select.parentNode.querySelector(".fim");
  fim.style.display = select.value === "atual" ? "none" : "block";
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
  ano.style.display = select.value === "concluido" ? "block" : "none";
  termino.style.display = select.value === "cursando" ? "block" : "none";
}

function addHabilidade() {
  const div = document.createElement("div");
  div.innerHTML = `<input type="text" placeholder="Habilidade"><br>`;
  document.getElementById("habilidades").appendChild(div);
  atualizarPreview();
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
  atualizarPreview();
}
function toggleCursoStatus(select) {
  const ano = select.parentNode.querySelector(".ano");
  const termino = select.parentNode.querySelector(".termino");
  ano.style.display = (select.value === "concluido") ? "block" : "none";
  termino.style.display = (select.value === "cursando") ? "block" : "none";
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
  atualizarPreview();
}
function toggleIdiomaOutro(select) {
  const outroInput = select.parentNode.querySelector(".idiomaOutro");
  outroInput.style.display = select.value === "outro" ? "block" : "none";
}

// Função de pré-visualização com espaçamento reduzido
function atualizarPreview() {
  let html = "";

  // Nome + Foto
  const nome = document.getElementById("nomeCompleto").value;
  const fotoInput = document.getElementById("fotoCandidato");
  let fotoHTML = "";
  if (fotoInput && fotoInput.files && fotoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      fotoHTML = `<img src="${e.target.result}" alt="Foto do candidato">`;
      document.querySelector(".preview-header").innerHTML =
        `${fotoHTML}<h3 style="margin:2px 0;">${nome}</h3>`;
    };
    reader.readAsDataURL(fotoInput.files[0]);
  } else {
    document.querySelector(".preview-header").innerHTML =
      `<h3 style="margin:2px 0;">${nome}</h3>`;
  }

  // Contato
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const localizacao = document.getElementById("localizacao").value;
  const linkedin = document.getElementById("linkedin").value;
  const portfolio = document.getElementById("portfolio").value;

  html += `<div style="text-align:center; font-size:12px; line-height:1.3;">`;
  if (telefone) html += `<p style="margin:4px 0;">Telefone: ${telefone}</p>`;
  if (email) html += `<p style="margin:4px 0;">E-mail: ${email}</p>`;
  if (localizacao) html += `<p style="margin:4px 0;">Localização: ${localizacao}</p>`;
  if (linkedin) html += `<p style="margin:4px 0;">LinkedIn: ${linkedin}</p>`;
  if (portfolio) html += `<p style="margin:4px 0;">Portfólio: ${portfolio}</p>`;
  html += `</div>`;

  // Objetivo
  const objetivo = document.getElementById("objetivo").value;
  if (objetivo) {
    html += `<h2 style="font-size:13px; margin:5px 0;">Objetivo</h2>`;
    html += `<p style="font-size:12px; line-height:1.3; margin:4px 0;">${objetivo}</p>`;
  }

  // Experiências
  const experiencias = Array.from(document.querySelectorAll("#experiencias div")).map(div => {
    const empresa = (div.querySelector("input[placeholder='Empresa']") || {}).value || "";
    const cargo = (div.querySelector("input[placeholder='Cargo']") || {}).value || "";
    const inicio = div.querySelector(".inicio")?.value || "";
    const fim = div.querySelector(".fim")?.value || "";
    const descricao = div.querySelector("textarea")?.value || "";
    if (!empresa && !cargo && !descricao) return "";
    return `<p style="font-size:12px; line-height:1.3; margin:4px 0;">
              Cargo: ${cargo} &nbsp;&nbsp; Empresa: ${empresa} &nbsp;&nbsp; Data: ${inicio || "?"} - ${fim || "?"}<br>
              ${descricao}
            </p>`;
  }).filter(Boolean).join("");
  if (experiencias) {
    html += `<h2 style="font-size:13px; margin:5px 0;">Experiência Profissional</h2>${experiencias}`;
  }

    // Formação Acadêmica
  const formacoes = Array.from(document.querySelectorAll("#formacoes div")).map(div => {
    const curso = (div.querySelector("input[placeholder='Curso']") || {}).value || "";
    const instituicao = (div.querySelector("input[placeholder='Instituição']") || {}).value || "";
    const ano = div.querySelector(".ano")?.value || "";
    const termino = div.querySelector(".termino")?.value || "";

    if (!curso && !instituicao) return "";

    return `<p style="font-size:12px; line-height:1.3; margin:4px 0;">
              Curso: ${curso} &nbsp;&nbsp; Instituição: ${instituicao} &nbsp;&nbsp; Status: ${ano || termino || "?"}
            </p>`;
  }).filter(Boolean).join("");

  if (formacoes) {
    html += `<h2 style="font-size:13px; margin:5px 0;">Formação Acadêmica</h2>${formacoes}`;
  }

  // Habilidades Técnicas (grid 4x4 com espaçamento moderado)
  const habilidades = Array.from(document.querySelectorAll("#habilidades input"))
    .map(i => i.value.trim())
    .filter(Boolean);

  if (habilidades.length) {
    html += `<h2 style="font-size:13px; margin:5px 0;">Habilidades Técnicas</h2>`;
    html += `<div style="display:grid; grid-template-columns:repeat(4,1fr); gap:6px; font-size:12px; line-height:1.3;">`;
    habilidades.forEach(h => {
      html += `<div>${h}</div>`;
    });
    html += `</div>`;
  }

  // Cursos
  const cursos = Array.from(document.querySelectorAll("#cursos div")).map(div => {
    const nomeCurso = (div.querySelector("input[placeholder='Nome do Curso']") || {}).value || "";
    const instituicao = (div.querySelector("input[placeholder='Instituição']") || {}).value || "";
    const ano = div.querySelector(".ano")?.value || "";
    const termino = div.querySelector(".termino")?.value || "";

    if (!nomeCurso && !instituicao) return "";

    return `<p style="font-size:12px; line-height:1.3; margin:4px 0;">
              Curso: ${nomeCurso} &nbsp;&nbsp; Instituição: ${instituicao} &nbsp;&nbsp; ${ano || termino || ""}
            </p>`;
  }).filter(Boolean).join("");

  if (cursos) {
    html += `<h2 style="font-size:13px; margin:5px 0;">Cursos</h2>${cursos}`;
  }

  // Idiomas
  const idiomas = Array.from(document.querySelectorAll("#idiomas div")).map(div => {
    const idioma = div.querySelector(".idioma")?.value || "";
    const nivel = div.querySelector(".nivel")?.value || "";
    const outro = div.querySelector(".idiomaOutro")?.value || "";

    if (!idioma && !nivel) return "";

    return `<p style="font-size:12px; line-height:1.3; margin:3px 0;">
              Idioma: ${idioma === "outro" ? outro : idioma} - Nível: ${nivel}
            </p>`;
  }).filter(Boolean).join("");

  if (idiomas) {
    html += `<h2 style="font-size:13px; margin:5px 0;">Idiomas</h2>${idiomas}`;
  }

  // Atualiza preview e contador
  document.getElementById("previewCurriculo").innerHTML = html;
  atualizarEstimativa();
}

// Eventos para atualizar preview em tempo real nos campos básicos
["nomeCompleto","telefone","email","localizacao","linkedin","portfolio","objetivo"].forEach(id => {
  document.getElementById(id).addEventListener("input", atualizarPreview);
});

// ✅ Listener da foto separado
document.getElementById("fotoCandidato").addEventListener("change", atualizarPreview);

// Função para gerar PDF
function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 30; // posição inicial

  // Função auxiliar para escrever texto com quebra automática
  function escreverTexto(texto, x, largura) {
    const linhas = doc.splitTextToSize(texto, largura);
    linhas.forEach(linha => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(linha, x, y);
      y += 6; // ✅ espaçamento reduzido
    });
    y += 3; // espaço extra menor entre blocos
  }

  // Função utilitária para formatar datas em DD/MM/AAAA
  function formatarDataBR(dataStr) {
    if (!dataStr) return "";
    const partes = dataStr.split("-");
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataStr;
  }

  // Função que escreve todo o conteúdo do currículo
  function finalizarPDF() {
    // Cabeçalho e nome
    const nomeCompleto = (document.getElementById("nomeCompleto") || {}).value || "";
    doc.setFontSize(20);
    if (nomeCompleto) doc.text(nomeCompleto, 50, 25);
    y = 55; // espaço antes dos contatos

    // Dados de contato
    doc.setFontSize(13);
    doc.text("Dados de Contato:", 10, y); y += 6;
    doc.setFontSize(11);
    escreverTexto(`Telefone: ${document.getElementById("telefone").value}`, 10, 180);
    escreverTexto(`Email: ${document.getElementById("email").value}`, 10, 180);
    escreverTexto(`Localização: ${document.getElementById("localizacao").value}`, 10, 180);
    const linkedin = document.getElementById("linkedin").value;
    if (linkedin) escreverTexto(`LinkedIn: ${linkedin}`, 10, 180);
    const portfolio = document.getElementById("portfolio").value;
    if (portfolio) escreverTexto(`Portfólio: ${portfolio}`, 10, 180);

    // Objetivo
    y += 6;
    doc.setFontSize(13);
    doc.text("Objetivo:", 10, y); y += 6;
    doc.setFontSize(11);
    const objetivo = document.getElementById("objetivo").value;
    escreverTexto(objetivo, 10, 180);

    // Experiências
    let experiencias = Array.from(document.querySelectorAll("#experiencias div"));
    experiencias.sort((a, b) => {
      const statusA = a.querySelector("select").value;
      const statusB = b.querySelector("select").value;
      if (statusA === "atual" && statusB !== "atual") return -1;
      if (statusB === "atual" && statusA !== "atual") return 1;
      const inicioA = a.querySelector(".inicio").value ? new Date(a.querySelector(".inicio").value) : new Date(0);
      const inicioB = b.querySelector(".inicio").value ? new Date(b.querySelector(".inicio").value) : new Date(0);
      return inicioB - inicioA;
    });

    y += 6;
    doc.setFontSize(13);
    doc.text("Experiência Profissional:", 10, y); y += 6;

    experiencias.forEach(exp => {
      if (y > 270) { doc.addPage(); y = 20; }
      const empresa = exp.querySelector("input[placeholder='Empresa']").value;
      const cargo = exp.querySelector("input[placeholder='Cargo']").value;
      const inicio = formatarDataBR(exp.querySelector(".inicio").value);
      const fim = formatarDataBR(exp.querySelector(".fim").value);
      const status = exp.querySelector("select").value;
      const descricao = exp.querySelector("textarea").value;

      doc.setFontSize(11);
      escreverTexto(`Cargo: ${cargo} | Empresa: ${empresa} | Data: ${inicio} até ${status === "atual" ? "o momento" : fim}`, 10, 180);
      escreverTexto("Descrição:", 10, 180);
      escreverTexto(descricao, 10, 180);
      y += 6;
    });

    // Formação Acadêmica
    y += 6;
    doc.setFontSize(13);
    doc.text("Formação Acadêmica:", 10, y); y += 6;
    let formacoes = Array.from(document.querySelectorAll("#formacoes div"));
    formacoes.sort((a,b) => {
      const anoA = a.querySelector(".ano").value || a.querySelector(".termino").value;
      const anoB = b.querySelector(".ano").value || b.querySelector(".termino").value;
      return (anoB ? new Date(anoB) : new Date(0)) - (anoA ? new Date(anoA) : new Date(0));
    });

    formacoes.forEach(f => {
      if (y > 270) { doc.addPage(); y = 20; }
      const curso = f.querySelector("input[placeholder='Curso']").value;
      const instituicao = f.querySelector("input[placeholder='Instituição']").value;
      const status = f.querySelector("select").value;
      const ano = formatarDataBR(f.querySelector(".ano").value);
      const termino = formatarDataBR(f.querySelector(".termino").value);

      doc.setFontSize(11);
      escreverTexto(`Curso: ${curso} | Instituição: ${instituicao}`, 10, 180);
      let anoOuPrevisao = "";
      if (status === "concluido" && ano) anoOuPrevisao = `Ano: ${ano}`;
      if (status === "cursando" && termino) anoOuPrevisao = `Previsão: ${termino}`;
      escreverTexto(`Status: ${status} ${anoOuPrevisao}`, 10, 180);
      y += 6;
    });

    // Habilidades Técnicas (em colunas)
    y += 6;
    doc.setFontSize(13);
    doc.text("Habilidades Técnicas:", 10, y); y += 6;
    const habilidades = Array.from(document.querySelectorAll("#habilidades input")).map(h => h.value).filter(Boolean);

    let col = 0;
    habilidades.forEach(h => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.setFontSize(11);
      doc.text(h, 10 + (col * 45), y);
      col++;
      if (col === 4) { col = 0; y += 6; }
    });
    y += 6;

    // Cursos
    y += 6;
    doc.setFontSize(13);
    doc.text("Cursos:", 10, y); y += 6;
    let cursos = Array.from(document.querySelectorAll("#cursos div"));
    cursos.forEach(c => {
      if (y > 270) { doc.addPage(); y = 20; }
      const nomeCurso = c.querySelector("input[placeholder='Nome do Curso']").value;
      const instituicao = c.querySelector("input[placeholder='Instituição']").value;
      const ano = formatarDataBR(c.querySelector(".ano").value);
      const termino = formatarDataBR(c.querySelector(".termino").value);
      const status = c.querySelector("select").value;

      doc.setFontSize(11);
      escreverTexto(`Curso: ${nomeCurso} | Instituição: ${instituicao}`, 10, 180);
      if (status === "concluido") escreverTexto(`Ano: ${ano}`, 10, 180);
      if (status === "cursando") escreverTexto(`Previsão: ${termino}`, 10, 180);
      y += 6;
    });

        // Idiomas
    y += 6;
    doc.setFontSize(13);
    doc.text("Idiomas:", 10, y); y += 6;
    const idiomas = document.querySelectorAll("#idiomas div");
    idiomas.forEach(i => {
      if (y > 270) { doc.addPage(); y = 20; }
      const idiomaSelect = i.querySelector(".idioma").value;
      const nivel = i.querySelector(".nivel").value;
      const outro = i.querySelector(".idiomaOutro").value;
      let idiomaFinal = idiomaSelect === "outro" ? outro : idiomaSelect;
      doc.setFontSize(11);
      escreverTexto(`Idioma: ${idiomaFinal} - Nível: ${nivel}`, 10, 180);
      y += 6; // ✅ espaçamento reduzido
    });

    // Palavras-Chaves ocultas (ATS)
    const ativarPalavrasChaves = document.getElementById("ativarPalavrasChaves").checked;
    if (ativarPalavrasChaves) {
      const textoPalavrasChaves = document.getElementById("textoPalavrasChaves").value;
      if (textoPalavrasChaves.trim() !== "") {
        doc.setTextColor(255, 255, 255); // branco
        doc.setFontSize(6);
        escreverTexto(`Palavras-chave: ${textoPalavrasChaves}`, 10, 180);
        doc.setTextColor(0, 0, 0); // volta ao preto
      }
    }

    // Finalizar PDF
    doc.save("curriculo.pdf");
  }

  // Foto opcional
  const fotoInput = document.getElementById("fotoCandidato");
  if (fotoInput.files && fotoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const mimeType = fotoInput.files[0].type.toLowerCase();
      const tipoImagem = mimeType.includes("png") ? "PNG" :
                         (mimeType.includes("jpg") || mimeType.includes("jpeg")) ? "JPEG" : "JPEG";
      doc.addImage(e.target.result, tipoImagem, 10, 10, 30, 40);
      y = 55; // ✅ garante espaço entre foto, nome e contatos
      finalizarPDF();
    };
    reader.onerror = function() {
      finalizarPDF(); // ✅ fallback se houver erro na leitura
    };
    reader.readAsDataURL(fotoInput.files[0]);
  } else {
    finalizarPDF();
  }
}
