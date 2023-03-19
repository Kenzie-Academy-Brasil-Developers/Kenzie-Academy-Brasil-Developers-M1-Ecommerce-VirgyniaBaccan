let cartCount = 0 //quantidade
let priceCount = 0 //preço

// Garante que preço e quantidade, apareçam apenas quando o carrinho estiver com produtos.
let divDetails = document.querySelector('.cart-details')
divDetails.style.display = "none"

function createCard(products) {  //função para criação do card de cada produto do e-commerce
    
    let list = document.querySelector('.productsList')
    list.innerHTML = ''
    
    for(let i = 0; i < products.length; i++) {
        let product = products[i]
        let card = document.createElement('li');
        card.classList.add('card');
        card.id = product.id;

        let img = document.createElement ('img');
        img.src = product.img;
        img.classList.add('productImg');

        let tag = document.createElement('button');
        tag.innerText = product.tag;
        tag.classList.add('productType');

        let nameItem = document.createElement('h2');
        nameItem.innerText = product.nameItem;
        nameItem.classList.add('productName');
        
        let description = document.createElement('p');
        description.innerText = product.description;
        description.classList.add("productDescription");
        
        let value = document.createElement('p');
        value.innerText = `R$${product.value.toFixed(2)}`;
        value.classList.add('productValue');
        
        let btn = document.createElement('p');
        btn.innerHTML = "Adicionar ao carrinho";
        btn.id = product.id;
        btn.classList.add("productButton");
        
        card.append(img, tag, nameItem, description, value, btn)
        list.appendChild(card)
        
        btn.addEventListener('click', function(e) { // adicionando evento de click para inserir o card no carrinho de compras
                    
            priceCount += product.value
            cartCount++;
            document.querySelector('#priceCount').innerHTML = `R$${priceCount.toFixed(2)}`
            document.querySelector('#count').innerHTML = cartCount      
            let emptyCart = document.querySelector('.cart-empty')
            let divEmptyCart = document.querySelector('.cart-details')
            emptyCart.style.display = "none"
            divEmptyCart.style.display = "flex"
            cartAdd(product)
                        
        }    
        );
    }
}

createCard(data) // chamando a função


function clickedCard (id) {  // função para auxiliar o eventListener identificando o card clicado
    for(let i = 0; i < data.length; i++) {
        if(data[i].id == id) {
            return data[i];
        }
        
    }
}  // aqui está percorrendo a lista de id e vendo se corresponde ao id clicado


// Para adicionar produtos ao carrinho de compras

function cartAdd (product) {
    let ul = document.querySelector('.cart-list')
    let card = document.createElement('li')
    let img = document.createElement('img');
    let divCart = document.createElement('div');
    let nameItem = document.createElement('h2')
    let value = document.createElement('p');
    let btn = document.createElement('button');

    card.classList.add('cartCard')
    img.classList.add('cartImg')
    divCart.classList.add('cartDiv')
    nameItem.classList.add('cartNameItem')
    value.classList.add('cartValue')
    btn.classList.add("productButton");
   
    
    card.id = product.id;
    img.src = product.img;
    nameItem.innerText = product.nameItem;
    value.innerText = `R$${product.value.toFixed(2)}`;
    btn.innerHTML = "Remover produto";
    btn.id = product.id;
    
    ul.append(card)
    card.append(img, divCart);
    divCart.append(nameItem, value, btn)

    btn.addEventListener('click', function (event) {
        
        priceCount -= product.value
        cartCount --;
        document.querySelector('#priceCount').innerHTML = `R$${priceCount.toFixed(2)}` 
        document.querySelector('#count').innerHTML = cartCount
        card.style.display = "none"

        if(cartCount == 0) {
            let emptyCart = document.querySelector('.cart-empty')
            emptyCart.style.display = "flex"
            let divDetails = document.querySelector('.cart-details')
            divDetails.style.display = "none"
        }
        let cardPath = event.composedPath();
        cardPath[1].remove();
    })

}

// Para selecionar classe de produtos através das tags: 

let btnCristais = document.querySelector('#cristais')
   
btnCristais.addEventListener('click', function (event) {
       
    let arrTemp = []
        for(let i = 0; i < data.length; i++) {
            if(data[i].tag[0] == 'Cristais') {
                arrTemp.push(data[i])
            }
        }  return createCard(arrTemp)
}
)

let btnTodos = document.querySelector('#all')

btnTodos.addEventListener('click', function (event) {
    createCard(data)
}
)

let btnMandalas = document.querySelector("#mandalas") 

btnMandalas.addEventListener('click', function (event) {

    let arrTemp = []
    for(let i = 0; i < data.length; i++) {
        if(data[i].tag[0] == 'Mandalas') {
            arrTemp.push(data[i])
        }
    }  return createCard(arrTemp)

}
)

// Para buscar através do nome/tag do produto (usuário digitando)

let btnSearch = document.querySelector(".search-button")

btnSearch.addEventListener('click', function (event) {
    let searchInput = document.querySelector('.search-input').value
    let arrTemp = []
    
    for(let i = 0; i < data.length; i++) {
        if(data[i].tag.includes(searchInput) || data[i].nameItem.includes(searchInput)) {
            arrTemp.push(data[i])
            createCard(arrTemp)
        }
    }
}
)
