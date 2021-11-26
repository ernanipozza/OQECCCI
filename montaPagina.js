import { receitasTodas } from "./receitas.js";

var id = new URLSearchParams(location.search).get("id")

imprimeReceita(id);

function imprimeReceita() {
    receitaTitle.innerHTML = receitasTodas[id].receita;
    receitaTitulo.innerHTML = receitasTodas[id].receita;
    receitaIngredientes.innerHTML = receitasTodas[id].ingredientes;
    receitaModoPreparo.innerHTML = receitasTodas[id].modoPreparo;
    receitaImagem.innerHTML = `<img src="${receitasTodas[id].link_imagem}"></img>`;
}