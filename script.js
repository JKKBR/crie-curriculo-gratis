// Ajusta textarea do objetivo dinamicamente
document.getElementById("objetivo").addEventListener("input", function() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
});

// Função de estimativa de páginas
function atualizarEstimativa() {
  const texto = document.getElementById("previewCurriculo").innerText;
  const caracteresPorPagina = 1800; 
  const paginas = Math.max(1, Math.ceil(texto.length / caracteresPorPagina));
  document.getElementById("contadorPaginas").innerText = `Estimativa: ${paginas} página(s) A4`;
}

// Função genérica para confirmar exclusão
function confirmarExclusao(botao) {
  if (confirm("Você realmente quer excluir este item?")) {
    botao.parentNode.remove();
    atualizarPreview();
  }
}

// Funções para adicionar blocos com botão de exclusão
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
    <textarea placeholder="Descrição" rows="5"></textarea><br>
    <button type="button" class="btn-excluir" onclick="confirmarExclusao(this)">Excluir</button>
    <br><br>
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
    <input type="text" class="termino" placeholder="Previsão de término" style="display:none;"><br>
    <button type="button" class="btn-excluir" onclick="confirmarExclusao(this)">Excluir</button>
    <br><br>
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
  div.innerHTML = `
    <input type="text" placeholder="Habilidade">
    <button type="button" class="btn-excluir" onclick="confirmarExclusao(this)">Excluir</button>
    <br>
  `;
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
    <input type="text" class="termino" placeholder="Data prevista (dia/mês/ano)" style="display:none;"><br>
    <button type="button" class="btn-excluir" onclick="confirmarExclusao(this)">Excluir</button>
    <br><br>
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
    <input type="text" class="idiomaOutro" placeholder="Informe o idioma" style="display:none;">
    <button type="button" class="btn-excluir" onclick="confirmarExclusao(this)">Excluir</button>
  `;
  document.getElementById("idiomas").appendChild(div);
  atualizarPreview();
}
function toggleIdiomaOutro(select) {
  const outroInput = select.parentNode.querySelector(".idiomaOutro");
  outroInput.style.display = select.value === "outro" ? "block" : "none";
}

// Remover foto com confirmação
function removerFoto() {
  if (confirm("Você realmente quer remover a foto?")) {
    const fotoInput = document.getElementById("fotoCandidato");
    fotoInput.value = "";
    document.querySelector(".preview-header").innerHTML = "<h3>" + document.getElementById("nomeCompleto").value + "</h3>";
    atualizarPreview();
  }
}

// Função de pré-visualização (mantida igual, mas já atualiza ao excluir)
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
        `${fotoHTML}<h3>${nome}</h3>`;
    };
    reader.readAsDataURL(fotoInput.files[0]);
  } else {
    document.querySelector(".preview-header").innerHTML =
      `<h3>${nome}</h3>`;
  }

  // Contato
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const localizacao = document.getElementById("localizacao").value;
  const linkedin = document.getElementById("linkedin").value;
  const portfolio = document.getElementById("portfolio").value;

  html += `<h2>Dados de Contato</h2><ul style="font-size:12px; line-height:1.3;">`;
  if (telefone) html += `<li>Telefone: ${telefone}</li>`;
  if (email) html += `<li>E-mail: ${email}</li>`;
  if (localizacao) html += `<li>Localização: ${localizacao}</li>`;
  if (linkedin) html += `<li>LinkedIn: ${linkedin}</li>`;
  if (portfolio) html += `<li>Portfólio: ${portfolio}</li>`;
  html += `</ul>`;

  // Objetivo
  const objetivo = document.getElementById("objetivo").value;
  if (objetivo) {
    html += `<h2>Objetivo</h2><p style="font-size:12px; line-height:1.3;">${objetivo}</p>`;
  }

  // Experiências
  const experiencias = Array.from(document.querySelectorAll("#experiencias div")).map(div => {
    const empresa = (div.querySelector("input[placeholder='Empresa']") || {}).value || "";
    const cargo = (div.querySelector("input[placeholder='Cargo']") || {}).value || "";
    const inicio = div.querySelector(".inicio")?.value || "";
    const fim = div.querySelector(".fim")?.value || "";
    const descricao = div.querySelector("textarea")?.value || "";
    if (!empresa && !cargo && !descricao) return "";
    return `<p style="font-size:12px; line-height:1.3; margin:3px 0;">
              <strong>${cargo}</strong> - ${empresa} (${inicio || "?"} - ${fim || "?"})<br>
              ${descricao}
            </p>`;
  }).filter(Boolean).join("");
  if (experiencias) {
    html += `<h2>Experiência Profissional</h2>${experiencias}`;
  }

  // Formação Acadêmica
  const formacoes = Array.from(document.querySelectorAll("#formacoes div")).map(div => {
    const curso = (div.querySelector("input[placeholder='Curso']") || {}).value || "";
    const instituicao = (div.querySelector("input[placeholder='Instituição']") || {}).value || "";
    const ano = div.querySelector(".ano")?.value || "";
    const termino = div.querySelector(".termino")?.value || "";
    if (!curso && !instituicao) return "";
    return `<li>${curso} - ${instituicao} (${ano || termino || "?"})</li>`;
  }).filter(Boolean).join("");
  if (formacoes) {
    html += `<h2>Formação Acadêmica</h2><ul style="font-size:12px; line-height:1.3; margin:3px 0;">${formacoes}</ul>`;
  }

  // Habilidades Técnicas
  const habilidades = Array.from(document.querySelectorAll("#habilidades input"))
    .map(i => i.value.trim())
    .filter(Boolean);
  if (habilidades.length) {
    html += `<h2>Habilidades Técnicas</h2><ul style="font-size:12px; line-height:1.3; margin:3px 0;">`;
    habilidades.forEach(h => {
      html += `<li>${h}</li>`;
    });
    html += `</ul>`;
  }

  // Cursos
  const cursos = Array.from(document.querySelectorAll("#cursos div")).map(div => {
    const nomeCurso = (div.querySelector("input[placeholder='Nome do Curso']") || {}).value || "";
    const instituicao = (div.querySelector("input[placeholder='Instituição']") || {}).value || "";
    const ano = div.querySelector(".ano")?.value || "";
    const termino = div.querySelector(".termino")?.value || "";
    if (!nomeCurso && !instituicao) return "";
    return `<li>${nomeCurso} - ${instituicao} (${ano || termino || "?"})</li>`;
  }).filter(Boolean).join("");
  if (cursos) {
    html += `<h2>Cursos</h2><ul style="font-size:12px; line-height:1.3; margin:3px 0;">${cursos}</ul>`;
  }

  // Idiomas
  const idiomas = Array.from(document.querySelectorAll("#idiomas div")).map(div => {
    const idioma = div.querySelector(".idioma")?.value || "";
    const nivel = div.querySelector(".nivel")?.value || "";
    const outro = div.querySelector(".idiomaOutro")?.value || "";
    if (!idioma && !nivel) return "";
    return `<li>${idioma === "outro" ? outro : idioma} - ${nivel}</li>`;
  }).filter(Boolean).join("");
  if (idiomas) {
    html += `<h2>Idiomas</h2><ul style="font-size:12px; line-height:1.2; margin:2px 0;">${idiomas}</ul>`;
  }

  // Atualiza preview e contador
  document.getElementById("previewCurriculo").innerHTML = html;
  atualizarEstimativa();
}

// Eventos para atualizar preview em tempo real nos campos básicos
["nomeCompleto","telefone","email","localizacao","linkedin","portfolio","objetivo"].forEach(id => {
  document.getElementById(id).addEventListener("input", atualizarPreview);
});

// Listener da foto separado
document.getElementById("fotoCandidato").addEventListener("change", atualizarPreview);

// Função para alternar exibição da caixa de palavras-chave
function togglePalavrasChaves() {
  const checkbox = document.getElementById("ativarPalavrasChaves");
  const bloco = document.getElementById("blocoPalavrasChaves");
  bloco.style.display = checkbox.checked ? "block" : "none";
}

// Função para gerar PDF
function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 30; // posição inicial

  // Função auxiliar para escrever texto com quebra automática
  function escreverTexto(texto, x, largura) {
    if (!texto) return;
    const linhas = doc.splitTextToSize(texto, largura);
    linhas.forEach(linha => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(linha, x, y);
      y += 4;
    });
    y += 2;
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
    y = 55;

    // Dados de contato
    doc.setFontSize(13);
    doc.text("Dados de Contato:", 10, y); y += 6;
    doc.setFontSize(11);
    if (document.getElementById("telefone").value) doc.text(`· Telefone: ${document.getElementById("telefone").value}`, 12, y), y+=4;
    if (document.getElementById("email").value) doc.text(`· E-mail: ${document.getElementById("email").value}`, 12, y), y+=4;
    if (document.getElementById("localizacao").value) doc.text(`· Localização: ${document.getElementById("localizacao").value}`, 12, y), y+=4;
    if (document.getElementById("linkedin").value) doc.text(`· LinkedIn: ${document.getElementById("linkedin").value}`, 12, y), y+=4;
    if (document.getElementById("portfolio").value) doc.text(`· Portfólio: ${document.getElementById("portfolio").value}`, 12, y), y+=4;

    // Objetivo
    y += 6;
    doc.setFontSize(13);
    doc.text("Objetivo:", 10, y); y += 6;
    doc.setFontSize(11);
    const objetivo = document.getElementById("objetivo").value;
    escreverTexto(objetivo, 12, 180);

    // Experiências
    y += 6;
    doc.setFontSize(13);
    doc.text("Experiência Profissional:", 10, y); y += 6;
    let experiencias = Array.from(document.querySelectorAll("#experiencias div"));
    experiencias.forEach(exp => {
      if (y > 270) { doc.addPage(); y = 20; }
      const empresa = exp.querySelector("input[placeholder='Empresa']").value;
      const cargo = exp.querySelector("input[placeholder='Cargo']").value;
      const inicio = formatarDataBR(exp.querySelector(".inicio").value);
      const fim = formatarDataBR(exp.querySelector(".fim").value);
      const status = exp.querySelector("select").value;
      const descricao = exp.querySelector("textarea").value;

      doc.setFontSize(11);
      doc.text(`· ${cargo} - ${empresa} (${inicio} até ${status === "atual" ? "o momento" : fim})`, 12, y);
      y += 4;
      escreverTexto(descricao, 14, 170);
    });

    // Formação Acadêmica
    y += 6;
    doc.setFontSize(13);
    doc.text("Formação Acadêmica:", 10, y); y += 6;
    let formacoes = Array.from(document.querySelectorAll("#formacoes div"));
    formacoes.forEach(f => {
      if (y > 270) { doc.addPage(); y = 20; }
      const curso = f.querySelector("input[placeholder='Curso']").value;
      const instituicao = f.querySelector("input[placeholder='Instituição']").value;
      const ano = formatarDataBR(f.querySelector(".ano").value);
      const termino = formatarDataBR(f.querySelector(".termino").value);
      doc.setFontSize(11);
      doc.text(`· ${curso} - ${instituicao} (${ano || termino || "?"})`, 12, y);
      y += 4;
    });

    // Habilidades Técnicas em 3 colunas
y += 6;
doc.setFontSize(13);
doc.text("Habilidades Técnicas:", 10, y);
y += 6;

const habilidades = Array.from(document.querySelectorAll("#habilidades input"))
  .map(h => h.value)
  .filter(Boolean);

let colunas = 3;              // número de colunas
let larguraColuna = 60;       // largura de cada coluna
let alturaLinha = 6;          // espaçamento vertical

habilidades.forEach((h, idx) => {
  if (y > 270) { doc.addPage(); y = 20; }

  doc.setFontSize(11);

  let colunaAtual = idx % colunas;
  let linhaAtual = Math.floor(idx / colunas);

  let posX = 12 + (colunaAtual * larguraColuna);
  let posY = y + (linhaAtual * alturaLinha);

  // quebra automática de texto dentro da largura da coluna
  let textoQuebrado = doc.splitTextToSize(`· ${h}`, larguraColuna - 5);
  doc.text(textoQuebrado, posX, posY);
});

// Atualiza y para depois da última linha
y += Math.ceil(habilidades.length / colunas) * alturaLinha;

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
      let textoCurso = `· ${nomeCurso} - ${instituicao}`;
      if (status === "concluido" && ano) textoCurso += ` (${ano})`;
      if (status === "cursando" && termino) textoCurso += ` (Previsão: ${termino})`;
      doc.text(textoCurso, 12, y);
      y += 4;
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
      doc.text(`· ${idiomaFinal} - ${nivel}`, 12, y);
      y += 3; // espaçamento reduzido
    });

        // Palavras-Chaves ocultas
    const ativarPalavrasChaves = document.getElementById("ativarPalavrasChaves").checked;
    if (ativarPalavrasChaves) {
      const textoPalavrasChaves = document.getElementById("textoPalavrasChaves").value;
      if (textoPalavrasChaves.trim() !== "") {
        // Inserção invisível para ATS
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
      y = 55; // garante espaço entre foto, nome e contatos
      finalizarPDF();
    };
    reader.onerror = function() {
      finalizarPDF(); // fallback se houver erro na leitura
    };
    reader.readAsDataURL(fotoInput.files[0]);
  } else {
    finalizarPDF();
  }
}


