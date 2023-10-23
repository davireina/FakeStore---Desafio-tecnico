var url = 'https://fakestoreapi.com/products';
var productContainer = document.querySelector("#product-container");
var filtroCategorias = document.querySelector("#filtro-categorias");
var ordenarPreco = document.querySelector("#ordenar-preco");
var produtos = [];

function fetchProdutos() {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      produtos = data;
      preencherCategoriasEProdutos();
    })
    .catch(function(error) {
      console.error('Erro ao buscar dados da API: ' + error);
    });
}

fetchProdutos();

var categorias = [];
function preencherCategoriasEProdutos() {
  produtos.forEach(function(produto) {
    var productDiv = document.createElement("div");
     productDiv.className = "produtos__container__box";

    var productImage = document.createElement("img");
    productImage.className = "produtos__container__imagem";
    productImage.src = produto.image;
    productImage.alt = "Imagem " + produto.id;

    var productName = document.createElement("h2");
    productName.className = "produtos__container__nome";
    productName.textContent = produto.title;

    var productPrice = document.createElement("p");
    productPrice.className = "produtos__container__preco";
    productPrice.textContent = "$" + parseFloat(produto.price).toFixed(2);

    productDiv.appendChild(productImage);
    productDiv.appendChild(productName);
    productDiv.appendChild(productPrice);

    productContainer.appendChild(productDiv);

    if (!categorias.includes(produto.category)) {
      categorias.push(produto.category);

      var categoriaCheckbox = document.createElement("input");
      categoriaCheckbox.type = "checkbox";
      categoriaCheckbox.value = produto.category;
      categoriaCheckbox.id = produto.category.replace(" ", "").replace("'", "");

      var categoriaLabel = document.createElement("label");
      categoriaLabel.appendChild(categoriaCheckbox);
      categoriaLabel.appendChild(document.createTextNode(produto.category));

      filtroCategorias.appendChild(categoriaLabel);
    }
  })

  ordenarPreco.addEventListener("change", function() {
    var valorSelecionado = ordenarPreco.value;
    ordenarProdutosPrice(valorSelecionado);
  });
}

function ordenar(produtos) {
  productContainer.innerHTML = "";

  produtos.forEach(function(produto) {
    var productDiv = document.createElement("div");
    productDiv.className = "produtos__container__box";

    var productImage = document.createElement("img");
    productImage.className = "produtos__container__imagem";
    productImage.src = produto.image;
    productImage.alt = "Imagem " + produto.id;

    var productName = document.createElement("h2");
    productName.className = "produtos__container__nome";
    productName.textContent = produto.title;

    var productPrice = document.createElement("p");
    productPrice.className = "produtos__container__preco";
    productPrice.textContent = "$" + parseFloat(produto.price).toFixed(2);

    productDiv.appendChild(productImage);
    productDiv.appendChild(productName);
    productDiv.appendChild(productPrice);

    productContainer.appendChild(productDiv);
  });
}

function ordenarProdutosPrice(ordenacao) {
  if (ordenacao === "asc") {
    produtos.sort(function(a, b) {
      return a.price - b.price;
    });
  } else if (ordenacao === "desc") {
    produtos.sort(function(a, b) {
      return b.price - a.price;
    });
  }
  else {
    produtos.sort(function(a, b) {
      return a.id - b.id;
    });
  }
  ordenar(produtos);
}