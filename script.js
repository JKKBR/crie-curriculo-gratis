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
  const idade = document.getElementById("idade").value.trim();
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const localizacao = document.getElementById("localizacao").value;
  const linkedin = document.getElementById("linkedin").value;
  const portfolio = document.getElementById("portfolio").value;

  html += `<h2>Dados de Contato</h2><ul style="font-size:12px; line-height:1.3;">`;
  if (idade) html += `<li>Idade: ${idade}</li>`;
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
                         .map(h => h.value.trim())
                         .filter(Boolean);
if (habilidades.length > 0) {
  y += 6;
  doc.setFontSize(13);
  doc.text("Habilidades Técnicas:", 10, y);
  y += 6;
  habilidades.forEach(h => {
    doc.setFontSize(11); // Fonte igual às outras seções
    doc.text(`· ${h}`, 11, y);
    y += 4; // Espaçamento fixo
  });
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

function finalizarPDF() {
  // Cabeçalho e nome
  const nomeCompleto = (document.getElementById("nomeCompleto") || {}).value || "";
  doc.setFontSize(20);
  if (nomeCompleto) doc.text(nomeCompleto, 50, 25);
  y = 55;

  // Dados de contato (sempre aparece se houver ao menos um campo preenchido)
  const idade = document.getElementById("idade").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const email = document.getElementById("email").value.trim();
  const localizacao = document.getElementById("localizacao").value.trim();
  const linkedin = document.getElementById("linkedin").value.trim();
  const portfolio = document.getElementById("portfolio").value.trim();

  if (telefone || email || localizacao || linkedin || portfolio) {
    doc.setFontSize(13);
    doc.text("Dados de Contato:", 10, y); y += 6;
    doc.setFontSize(11);
    if (idade) doc.text(`· Idade: ${idade}`, 12, y), y+=4;
    if (telefone) doc.text(`· Telefone: ${telefone}`, 12, y), y+=4;
    if (email) doc.text(`· E-mail: ${email}`, 12, y), y+=4;
    if (localizacao) doc.text(`· Localização: ${localizacao}`, 12, y), y+=4;
    if (linkedin) doc.text(`· LinkedIn: ${linkedin}`, 12, y), y+=4;
    if (portfolio) doc.text(`· Portfólio: ${portfolio}`, 12, y), y+=4;
  }

  // Objetivo
  const objetivo = document.getElementById("objetivo").value.trim();
  if (objetivo) {
    y += 6;
    doc.setFontSize(13);
    doc.text("Objetivo:", 10, y); y += 6;
    doc.setFontSize(11);
    escreverTexto(objetivo, 12, 180);
  }

  // Experiências
  let experiencias = Array.from(document.querySelectorAll("#experiencias div"));
  if (experiencias.some(exp => exp.querySelector("input[placeholder='Empresa']").value.trim() ||
                               exp.querySelector("input[placeholder='Cargo']").value.trim() ||
                               exp.querySelector("textarea").value.trim())) {
    y += 6;
    doc.setFontSize(13);
    doc.text("Experiência Profissional:", 10, y); y += 6;
    experiencias.forEach(exp => {
      const empresa = exp.querySelector("input[placeholder='Empresa']").value.trim();
      const cargo = exp.querySelector("input[placeholder='Cargo']").value.trim();
      const inicio = formatarDataBR(exp.querySelector(".inicio").value);
      const fim = formatarDataBR(exp.querySelector(".fim").value);
      const status = exp.querySelector("select").value;
      const descricao = exp.querySelector("textarea").value.trim();
      if (empresa || cargo || descricao) {
        doc.setFontSize(11);
        doc.text(`· ${cargo} - ${empresa} (${inicio} até ${status === "atual" ? "o momento" : fim})`, 12, y);
        y += 4;
        escreverTexto(descricao, 14, 170);
      }
    });
  }

  // Formação Acadêmica
  let formacoes = Array.from(document.querySelectorAll("#formacoes div"));
  if (formacoes.some(f => f.querySelector("input[placeholder='Curso']").value.trim() ||
                          f.querySelector("input[placeholder='Instituição']").value.trim())) {
    y += 6;
    doc.setFontSize(13);
    doc.text("Formação Acadêmica:", 10, y); y += 6;
    formacoes.forEach(f => {
      const curso = f.querySelector("input[placeholder='Curso']").value.trim();
      const instituicao = f.querySelector("input[placeholder='Instituição']").value.trim();
      const ano = formatarDataBR(f.querySelector(".ano").value);
      const termino = formatarDataBR(f.querySelector(".termino").value);
      if (curso || instituicao) {
        doc.setFontSize(11);
        doc.text(`· ${curso} - ${instituicao} (${ano || termino || ""})`, 12, y);
        y += 4;
      }
    });
  }

  // Habilidades Técnicas
  const habilidades = Array.from(document.querySelectorAll("#habilidades input"))
                           .map(h => h.value.trim())
                           .filter(Boolean);
  if (habilidades.length > 0) {
    y += 6;
    doc.setFontSize(13);
    doc.text("Habilidades Técnicas:", 10, y); y += 6;
    habilidades.forEach(h => {
      let textoQuebrado = doc.splitTextToSize(`· ${h}`, 180);
      doc.text(textoQuebrado, 12, y);
      y += (textoQuebrado.length * 5);
    });
  }

  // Cursos
  let cursos = Array.from(document.querySelectorAll("#cursos div"));
  if (cursos.some(c => c.querySelector("input[placeholder='Nome do Curso']").value.trim() ||
                       c.querySelector("input[placeholder='Instituição']").value.trim())) {
    y += 6;
    doc.setFontSize(13);
    doc.text("Cursos:", 10, y); y += 6;
    cursos.forEach(c => {
      const nomeCurso = c.querySelector("input[placeholder='Nome do Curso']").value.trim();
      const instituicao = c.querySelector("input[placeholder='Instituição']").value.trim();
      const ano = formatarDataBR(c.querySelector(".ano").value);
      const termino = formatarDataBR(c.querySelector(".termino").value);
      const status = c.querySelector("select").value;
      if (nomeCurso || instituicao) {
        let textoCurso = `· ${nomeCurso} - ${instituicao}`;
        if (status === "concluido" && ano) textoCurso += ` (${ano})`;
        if (status === "cursando" && termino) textoCurso += ` (Previsão: ${termino})`;
        doc.setFontSize(11);
        doc.text(textoCurso, 12, y);
        y += 4;
      }
    });
  }

  // Idiomas
  let idiomas = Array.from(document.querySelectorAll("#idiomas div"));
  if (idiomas.some(i => i.querySelector(".idioma").value.trim() ||
                        i.querySelector(".idiomaOutro").value.trim())) {
    y += 6;
    doc.setFontSize(13);
    doc.text("Idiomas:", 10, y); y += 6;
    idiomas.forEach(i => {
      const idiomaSelect = i.querySelector(".idioma").value.trim();
      const nivel = i.querySelector(".nivel").value.trim();
      const outro = i.querySelector(".idiomaOutro").value.trim();
      let idiomaFinal = idiomaSelect === "outro" ? outro : idiomaSelect;
      if (idiomaFinal) {
        doc.setFontSize(11);
        doc.text(`· ${idiomaFinal} - ${nivel}`, 12, y);
        y += 4;
      }
    });
  }

  // Palavras-Chaves ocultas
  const ativarPalavrasChaves = document.getElementById("ativarPalavrasChaves").checked;
  if (ativarPalavrasChaves) {
    const textoPalavrasChaves = document.getElementById("textoPalavrasChaves").value.trim();
    if (textoPalavrasChaves) {
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(6);
      escreverTexto(`Palavras-chave: ${textoPalavrasChaves}`, 10, 180);
      doc.setTextColor(0, 0, 0);
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

function salvarComoTXT() {
  const nomeCompleto = document.getElementById("nomeCompleto").value.trim() || "curriculo";

  let conteudo = "";
  conteudo += `Nome: ${nomeCompleto}\n`;
  conteudo += `Idade: ${document.getElementById("idade").value}\n`;
  conteudo += `Telefone: ${document.getElementById("telefone").value}\n`;
  conteudo += `E-mail: ${document.getElementById("email").value}\n`;
  conteudo += `Localização: ${document.getElementById("localizacao").value}\n`;
  conteudo += `LinkedIn: ${document.getElementById("linkedin").value}\n`;
  conteudo += `Portfólio: ${document.getElementById("portfolio").value}\n\n`;

  conteudo += `Objetivo:\n${document.getElementById("objetivo").value}\n\n`;

  // Experiências
  conteudo += "Experiência Profissional:\n";
  Array.from(document.querySelectorAll("#experiencias div")).forEach(exp => {
    const empresa = exp.querySelector("input[placeholder='Empresa']").value;
    const cargo = exp.querySelector("input[placeholder='Cargo']").value;
    const inicio = exp.querySelector(".inicio").value;
    const fim = exp.querySelector(".fim").value;
    const descricao = exp.querySelector("textarea").value;
    conteudo += `- ${cargo} em ${empresa} (${inicio} - ${fim})\n  ${descricao}\n`;
  });
  conteudo += "\n";

  // Formação
  conteudo += "Formação Acadêmica:\n";
  Array.from(document.querySelectorAll("#formacoes div")).forEach(f => {
    const curso = f.querySelector("input[placeholder='Curso']").value;
    const instituicao = f.querySelector("input[placeholder='Instituição']").value;
    const ano = f.querySelector(".ano").value;
    const termino = f.querySelector(".termino").value;
    conteudo += `- ${curso} - ${instituicao} (${ano || termino})\n`;
  });
  conteudo += "\n";

  // Habilidades
  conteudo += "Habilidades Técnicas:\n";
  Array.from(document.querySelectorAll("#habilidades input")).forEach(h => {
    if (h.value.trim()) conteudo += `- ${h.value}\n`;
  });
  conteudo += "\n";

  // Cursos
  conteudo += "Cursos:\n";
  Array.from(document.querySelectorAll("#cursos div")).forEach(c => {
    const nomeCurso = c.querySelector("input[placeholder='Nome do Curso']").value;
    const instituicao = c.querySelector("input[placeholder='Instituição']").value;
    const ano = c.querySelector(".ano").value;
    const termino = c.querySelector(".termino").value;
    conteudo += `- ${nomeCurso} - ${instituicao} (${ano || termino})\n`;
  });
  conteudo += "\n";

  // Idiomas
  conteudo += "Idiomas:\n";
  Array.from(document.querySelectorAll("#idiomas div")).forEach(i => {
    const idiomaSelect = i.querySelector(".idioma").value;
    const nivel = i.querySelector(".nivel").value;
    const outro = i.querySelector(".idiomaOutro").value;
    let idiomaFinal = idiomaSelect === "outro" ? outro : idiomaSelect;
    conteudo += `- ${idiomaFinal} (${nivel})\n`;
  });

  const blob = new Blob([conteudo], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${nomeCompleto}.txt`;
  link.click();
}

function importarTXT(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const linhas = e.target.result.split("\n");
    let secaoAtual = "";

    // 🔹 Limpa todas as seções antes de recriar
    document.getElementById("experiencias").innerHTML = "";
    document.getElementById("formacoes").innerHTML = "";
    document.getElementById("habilidades").innerHTML = "";
    document.getElementById("cursos").innerHTML = "";
    document.getElementById("idiomas").innerHTML = "";

    linhas.forEach(linha => {
      if (linha.startsWith("Nome:")) document.getElementById("nomeCompleto").value = linha.replace("Nome:", "").trim();
      else if (linha.startsWith("Idade:")) document.getElementById("idade").value = linha.replace("Idade:", "").trim();
      else if (linha.startsWith("Telefone:")) document.getElementById("telefone").value = linha.replace("Telefone:", "").trim();
      else if (linha.startsWith("E-mail:")) document.getElementById("email").value = linha.replace("E-mail:", "").trim();
      else if (linha.startsWith("Localização:")) document.getElementById("localizacao").value = linha.replace("Localização:", "").trim();
      else if (linha.startsWith("LinkedIn:")) document.getElementById("linkedin").value = linha.replace("LinkedIn:", "").trim();
      else if (linha.startsWith("Portfólio:")) document.getElementById("portfolio").value = linha.replace("Portfólio:", "").trim();
      else if (linha.startsWith("Objetivo:")) secaoAtual = "objetivo";
      else if (linha.startsWith("Experiência Profissional:")) secaoAtual = "experiencia";
      else if (linha.startsWith("Formação Acadêmica:")) secaoAtual = "formacao";
      else if (linha.startsWith("Habilidades Técnicas:")) secaoAtual = "habilidade";
      else if (linha.startsWith("Cursos:")) secaoAtual = "curso";
      else if (linha.startsWith("Idiomas:")) secaoAtual = "idioma";
      else if (linha.startsWith("-")) {
        if (secaoAtual === "experiencia") {
          addExperiencia();
          const div = document.querySelector("#experiencias div:last-child");
          const partes = linha.replace("-", "").trim().split(" em ");
          div.querySelector("input[placeholder='Cargo']").value = partes[0].split("(")[0].trim();
          div.querySelector("input[placeholder='Empresa']").value = partes[1]?.split("(")[0].trim() || "";
        }
        if (secaoAtual === "formacao") {
          addFormacao();
          const div = document.querySelector("#formacoes div:last-child");
          const partes = linha.replace("-", "").trim().split(" - ");
          div.querySelector("input[placeholder='Curso']").value = partes[0];
          div.querySelector("input[placeholder='Instituição']").value = partes[1]?.split("(")[0].trim() || "";
        }
        if (secaoAtual === "habilidade" && linha.trim() !== "-") {
          addHabilidade();
          const div = document.querySelector("#habilidades div:last-child");
          div.querySelector("input").value = linha.replace("-", "").trim();
        }
        if (secaoAtual === "curso") {
          addCurso();
          const div = document.querySelector("#cursos div:last-child");
          const partes = linha.replace("-", "").trim().split(" - ");
          div.querySelector("input[placeholder='Nome do Curso']").value = partes[0] || "";
          div.querySelector("input[placeholder='Instituição']").value = partes[1]?.split("(")[0].trim() || "";
          const anoTermino = linha.match(/\((.*?)\)/);
          if (anoTermino) {
            const valor = anoTermino[1];
            if (valor.toLowerCase().includes("previsão")) {
              div.querySelector(".termino").value = valor.replace("Previsão:", "").trim();
              div.querySelector("select").value = "cursando";
            } else {
              div.querySelector(".ano").value = valor;
              div.querySelector("select").value = "concluido";
            }
          }
        }
        if (secaoAtual === "idioma") {
          addIdioma();
          const div = document.querySelector("#idiomas div:last-child");
          const partes = linha.replace("-", "").trim().split("(");
          const idioma = partes[0].trim();
          const nivel = partes[1]?.replace(")", "").trim() || "";
          if (["portugues","ingles","espanhol"].includes(idioma.toLowerCase())) {
            div.querySelector(".idioma").value = idioma.toLowerCase();
          } else {
            div.querySelector(".idioma").value = "outro";
            div.querySelector(".idiomaOutro").value = idioma;
          }
          div.querySelector(".nivel").value = nivel;
        }
      } else if (secaoAtual === "objetivo" && linha.trim() !== "") {
        document.getElementById("objetivo").value += linha + "\n";
      }
    });

    atualizarPreview();
  };
  reader.readAsText(file);
}

















