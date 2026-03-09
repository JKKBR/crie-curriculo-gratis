// Ajusta textarea do objetivo dinamicamente
document.getElementById("objetivo").addEventListener("input", function() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
});

// Função genérica para confirmar exclusão
function confirmarExclusao(botao) {
  if (confirm("Você realmente quer excluir este item?")) {
    botao.closest("div").remove();
    atualizarPreview();
  }
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
    document.querySelector(".preview-header").innerHTML =
      "<h3>" + document.getElementById("nomeCompleto").value + "</h3>";
    atualizarPreview();
  }
}

// 🔹 Função para escrever texto respeitando Y e paginação
function escreverTexto(texto, x, largura, yInicial, doc) {
  let linhas = doc.splitTextToSize(texto, largura);
  linhas.forEach(linha => {
    if (yInicial > 270) {
      doc.addPage();
      yInicial = 20;
    }
    doc.text(linha, x, yInicial);
    yInicial += 5;
  });
  return yInicial;
}

// 🔹 Conversão de cor HEX para RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

// Função que monta o conteúdo do PDF (sem salvar)
function finalizarPDF(doc, y, formatarDataBR) {
  // ... todas as seções: Cabeçalho, Contato, Objetivo, Experiências, Formação, Habilidades, Cursos ...

  // Idiomas
  let idiomas = Array.from(document.querySelectorAll("#idiomas div"));
  if (idiomas.some(i => i.querySelector(".idioma").value.trim() ||
                        i.querySelector(".idiomaOutro").value.trim())) {
    doc.setFontSize(13);
    doc.text("Idiomas:", 10, y); y += 6;
    idiomas.forEach(i => {
      let idiomaSelect = i.querySelector(".idioma").value.trim();
      let nivel = i.querySelector(".nivel").value.trim();
      const outro = i.querySelector(".idiomaOutro").value.trim();

      if (idiomaSelect === "portugues") idiomaSelect = "Português";
      else if (idiomaSelect === "ingles") idiomaSelect = "Inglês";
      else if (idiomaSelect === "espanhol") idiomaSelect = "Espanhol";
      else if (idiomaSelect === "outro") idiomaSelect = outro;

      if (nivel === "basico") nivel = "Básico";
      else if (nivel === "intermediario") nivel = "Intermediário";
      else if (nivel === "avancado") nivel = "Avançado";

      idiomaSelect = idiomaSelect.normalize("NFC");

      if (idiomaSelect) {
        doc.setFontSize(11);
        y = escreverTexto(`· ${idiomaSelect} - ${nivel}`, 12, 170, y, doc);
      }
    });
    y += 8;
  }

    // Palavras-Chaves ocultas
  const ativarPalavrasChaves = document.getElementById("ativarPalavrasChaves").checked;
  if (ativarPalavrasChaves) {
    const textoPalavrasChaves = document.getElementById("textoPalavrasChaves").value.trim();
    if (textoPalavrasChaves) {
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(6);
      y = escreverTexto(`Palavras-chave: ${textoPalavrasChaves}`, 10, 180, y, doc);
      doc.setTextColor(0, 0, 0);
    }
  }
}

// Função para salvar como TXT
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
    let idiomaSelect = i.querySelector(".idioma").value;
    const nivel = i.querySelector(".nivel").value;
    const outro = i.querySelector(".idiomaOutro").value;

    if (idiomaSelect === "portugues") idiomaSelect = "Português";
    else if (idiomaSelect === "ingles") idiomaSelect = "Inglês";
    else if (idiomaSelect === "espanhol") idiomaSelect = "Espanhol";
    else if (idiomaSelect === "outro") idiomaSelect = outro;

    conteudo += `- ${idiomaSelect.normalize("NFC")} (${nivel.normalize("NFC")})\n`;
  });

  const blob = new Blob([conteudo], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${nomeCompleto}.txt`;
  link.click();
}

// Função para importar TXT
function importarTXT(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const linhas = e.target.result.split("\n");
    let secaoAtual = "";

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
        if (secaoAtual === "habilidade") {
          addHabilidade();
          const div = document.querySelector("#habilidades div:last-child");
          div.querySelector("input").value = linha.replace("-", "").trim();
        }
        if (secaoAtual === "curso") {
          addCurso();
          const div = document.querySelector("#cursos div:last-child");
          const partes = linha.replace("-", "").trim().split(" - ");
          div.querySelector("input[placeholder='Nome do Curso']").value = partes[0];
          div.querySelector("input[placeholder='Instituição']").value = partes[1]?.split("(")[0].trim() || "";
        }
        if (secaoAtual === "idioma") {
          addIdioma();
          const div = document.querySelector("#idiomas div:last-child");
          const partes = linha.replace("-", "").trim().split("(");
          const idiomaTxt = partes[0].trim();
          const nivelTxt = partes[1]?.replace(")", "").trim() || "";

          if (idiomaTxt.toLowerCase() === "português") {
            div.querySelector(".idioma").value = "portugues";
          } else if (idiomaTxt.toLowerCase() === "inglês") {
            div.querySelector(".idioma").value = "ingles";
          } else if (idiomaTxt.toLowerCase() === "espanhol") {
            div.querySelector(".idioma").value = "espanhol";
          } else {
            div.querySelector(".idioma").value = "outro";
            div.querySelector(".idiomaOutro").value = idiomaTxt;
          }

          div.querySelector(".nivel").value = nivelTxt;
                  }
      } else if (secaoAtual === "objetivo" && linha.trim() !== "") {
        document.getElementById("objetivo").value += linha + "\n";
      }
    });

    atualizarPreview();
  };
  reader.readAsText(file);
}

// 🔹 Função para gerar PDF
function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 30;

  function formatarDataBR(dataStr) {
    if (!dataStr) return "";
    const partes = dataStr.split("-");
    if (partes.length === 3) return `${partes[2]}/${partes[1]}/${partes[0]}`;
    return dataStr;
  }

  const fotoInput = document.getElementById("fotoCandidato");
  if (fotoInput.files && fotoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const mimeType = fotoInput.files[0].type.toLowerCase();
      const tipoImagem = mimeType.includes("png") ? "PNG" :
                         (mimeType.includes("jpg") || mimeType.includes("jpeg")) ? "JPEG" : "JPEG";
      doc.addImage(e.target.result, tipoImagem, 10, 10, 30, 40);
      y = 55;
      finalizarPDF(doc, y, formatarDataBR);
      doc.save("curriculo.pdf");
    };
    reader.onerror = function() {
      finalizarPDF(doc, y, formatarDataBR);
      doc.save("curriculo.pdf");
    };
    reader.readAsDataURL(fotoInput.files[0]);
  } else {
    finalizarPDF(doc, y, formatarDataBR);
    doc.save("curriculo.pdf");
  }
}
// Atualiza contador logo ao carregar a página
window.onload = atualizarContadorPaginas;

// Eventos para atualizar preview em tempo real
["nomeCompleto","telefone","email","localizacao","linkedin","portfolio","objetivo"].forEach(id => {
  document.getElementById(id).addEventListener("input", atualizarPreview);
});

// Listener da foto
document.getElementById("fotoCandidato").addEventListener("change", atualizarPreview);

// Função para alternar exibição da caixa de palavras-chave
function togglePalavrasChaves() {
  const checkbox = document.getElementById("ativarPalavrasChaves");
  const bloco = document.getElementById("blocoPalavrasChaves");
  bloco.style.display = checkbox.checked ? "block" : "none";
}

// 🔹 Função para salvar como TXT
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
    let idiomaSelect = i.querySelector(".idioma").value;
    const nivel = i.querySelector(".nivel").value;
    const outro = i.querySelector(".idiomaOutro").value;

    if (idiomaSelect === "portugues") idiomaSelect = "Português";
    else if (idiomaSelect === "ingles") idiomaSelect = "Inglês";
    else if (idiomaSelect === "espanhol") idiomaSelect = "Espanhol";
    else if (idiomaSelect === "outro") idiomaSelect = outro;

    conteudo += `- ${idiomaSelect.normalize("NFC")} (${nivel.normalize("NFC")})\n`;
  });

  const blob = new Blob([conteudo], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${nomeCompleto}.txt`;
  link.click();
}

// 🔹 Função para importar TXT
function importarTXT(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const linhas = e.target.result.split("\n");
    let secaoAtual = "";

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
        if (secaoAtual === "habilidade") {
          addHabilidade();
          const div = document.querySelector("#habilidades div:last-child");
          div.querySelector("input").value = linha.replace("-", "").trim();
        }
        if (secaoAtual === "curso") {
          addCurso();
          const div = document.querySelector("#cursos div:last-child");
          const partes = linha.replace("-", "").trim().split(" - ");
          div.querySelector("input[placeholder='Nome do Curso']").value = partes[0];
          div.querySelector("input[placeholder='Instituição']").value = partes[1]?.split("(")[0].trim() || "";
        }
        if (secaoAtual === "idioma") {
          addIdioma();
          const div = document.querySelector("#idiomas div:last-child");
          const partes = linha.replace("-", "").trim().split("(");
          const idiomaTxt = partes[0].trim();
          const nivelTxt = partes[1]?.replace(")", "").trim() || "";

          if (idiomaTxt.toLowerCase() === "português") {
            div.querySelector(".idioma").value = "portugues";
          } else if (idiomaTxt.toLowerCase() === "inglês") {
            div.querySelector(".idioma").value = "ingles";
          } else if (idiomaTxt.toLowerCase() === "espanhol") {
            div.querySelector(".idioma").value = "espanhol";
          } else {
            div.querySelector(".idioma").value = "outro";
            div.querySelector(".idiomaOutro").value = idiomaTxt;
          }

          div.querySelector(".nivel").value = nivelTxt;
        }
      } else if (secaoAtual === "objetivo" && linha.trim() !== "") {
        document.getElementById("objetivo").value += linha + "\n";
      }
    });

    atualizarPreview();
  };
  reader.readAsText(file);
}
