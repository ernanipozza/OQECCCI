import { receitasTodas } from "./receitas.js";

var botaoAdicionar = document.getElementById("adicionaIngrediente");
botaoAdicionar.addEventListener("click", adicionarIngrediente);
var arrayIngredientes = [];
var receitasFiltradas = [];

var receitasCards = document.querySelector("#receitasCards");

function efetuaPesquisa(receitas, ingredientes) {
  return receitas.filter(receita => {
    return ingredientes.every(ingrediente=>{
      return Object.values(receita.ingredientesBase)
        .some(ingredienteBase=>ingredienteBase.toLowerCase()===ingrediente.toLowerCase())
    })
  })
}

function adicionarIngrediente() {

  var inputIngrediente = document.getElementById("inputIngrediente");
  
  if (arrayIngredientes.includes(inputIngrediente.value)) {
    alert("O ingrediente informado já está na lista");
  } else if (inputIngrediente.value.length == 0) {
    alert("Nenhum ingrediente foi informado");
  } else {
    var ul = document.getElementById("listaIngredientes");
    var li = document.createElement("li");
    li.className = "itemLista";
    li.setAttribute("id", "lista" + inputIngrediente.value);
    li.appendChild(document.createTextNode(inputIngrediente.value));
    ul.appendChild(li);

    arrayIngredientes.push(inputIngrediente.value);
    
    var botaoExcluir = document.createElement("button");
    botaoExcluir.innerText = "X";
    botaoExcluir.className = "removeIngrediente";
    botaoExcluir.setAttribute("id", inputIngrediente.value);
    li.appendChild(botaoExcluir);

    receitasFiltradas = efetuaPesquisa(receitasTodas, arrayIngredientes);

    criaCards(receitasFiltradas);

    botaoExcluir.addEventListener("click", removerIngrediente);

    function removerIngrediente(e) {
      var index = arrayIngredientes.indexOf(this.id);
      if (index > -1) {
        arrayIngredientes.splice(index, 1);
      }
      if (e.target.id === this.id) {
        ul.removeChild(e.target.parentElement);
      }
      receitasFiltradas = efetuaPesquisa(receitasTodas, arrayIngredientes);

      criaCards(receitasFiltradas);
    }
    inputIngrediente.value = "";
  }
}

function criaCards(receitas) {
  if(!receitas.length){
    receitasCards.innerHTML = "Não encontramos nenhuma receita que use todos os ingredientes informados."
    return
  }
  receitasCards.innerHTML = receitas.map(receita=>`<a href="receita.html?id=${receita.id}" target="_blank"><div class="card" style="width: 18rem;"><img class="card-img-top" src="${receita.link_imagem}" alt="${receita.receita}"><div class="card-body"><p class="card-text">${receita.receita}</p></div></div><a>`
  ).join ("")
}
