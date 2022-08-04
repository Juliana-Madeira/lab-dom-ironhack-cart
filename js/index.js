// ITERATION 1

function updateSubtotal(product) {
  const price = product.querySelector('.price span');
  const quantity = product.querySelector('.quantity input');  //todo valor colocado num input pelo usuario, entra como string, entao devemos transformar em number o price e quantity primeiro de tudo
                                                   
  const priceContent = parseFloat(price.innerText);
  const quantityContent = Number(quantity.value);

  const subtotalContent = priceContent * quantityContent;       //calculo do subtotal em numero agora = price * quantity (em numeros => content)

  //tudo numa variavel para depois fazer o innerText
  const subtotal = product.querySelector('.subtotal span');   //colocar o subtotalContent no local exato no html com a classe subtotal e dentro do span<>

  subtotal.innerText = subtotalContent;     //innerText coloca o texto, que é o calculo no caso, la no campo subtotal do html
  
  return subtotalContent;
}



function calculateAll() {
  // ITERATION 2
  const products = document.querySelectorAll('.product');    //é um array de vários produtos, um produto por linha
  let totalMultiply = 0;
  products.forEach(product => {                       //método de array para calcular e somar o subtotal de cada produto
    totalMultiply += updateSubtotal(product);
  });


//   // ITERATION 3
  let totalValue = document.querySelector('#total-value span')   //onde é dirigido o valor calculado
  totalValue.innerText = totalMultiply;     //colocando texto da multiplicaçao de valores nesse campo
 }

// // ITERATION 4 
//botão do remove, lá na window onde já carrega a função quando carrega a página (load), automático
function removeProduct(event) {
  const target = event.currentTarget;
  const removeProductRow = target.parentNode.parentNode;         //preciso deletar o product, que é pai do pai do button
  removeProductRow.remove();               //metodo que remove o elemento no DOM
  calculateAll();       //chamo novamente para somar novamente os produtos que nao foram removidos
}


// // ITERATION 5
function createProduct() {
  let createProductRow = document.querySelector('create-product');
  let productNameInput = document.querySelector('input[type=text]');
  let productNameValue = productNameInput.value;
  let productPriceInput = document.querySelector('input[type=number');
  let productPriceValue = Number(productPriceInput.value).toFixed(2);

  const newProductRow = document.createElement('tr');
  newProductRow.className = 'product';
  newProductRow.innerHTML = `
    <td class="name">
      <span>${productNameValue}</span>
    </td>
    <td class="price">$<span>${productPriceValue}</span></td>
    <td class="quantity">
      <input type="number" value="0" min="0" placeholder="Quantity" />
    </td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action">
      <button class="btn btn-remove">Remove</button>
    </td>
  `;

  const parent = document.querySelector('#cart tbody');    //pegar o parent dessa nova linha criada, novo product

  parent.appendChild(newProductRow);                  //fazer o apendice desse filho (novo criado) no parent 

  const removeButton = newProductRow.querySelector('.btn-remove');          //certificar que o botao tem a mesma funçao que nos outros produtos
  removeButton.addEventListener('click', removeProduct);

  productNameInput.value = ''           //aqui eu limpo os campos para preenchimento
  productPriceInput.value = 0


}


window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const removeButtons = document.querySelectorAll('.btn-remove');   //é um array de vários botoes possiveis de remove
    removeButtons.forEach(button => {
    button.addEventListener('click', removeProduct);
    //button.onclick(removeProduct);           //ou chamando a funçao que quero ao clicar o botao do remove
  });

  const addProduct = document.querySelector('#create');
  addProduct.addEventListener('click', (event) => {
    createProduct()
    calculateAll()
  });

})
