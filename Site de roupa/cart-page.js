// Pega o carrinho salvo no localStorage ou cria um vazio
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Elementos da página
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Função que desenha o carrinho na tela
function renderCart() {
    cartItems.innerHTML = ""; // Limpa a tela antes de renderizar
    let total = 0;

    // Percorre cada item do carrinho
    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");

        // Soma o total
        total += item.price * item.quantity;

        // HTML de cada produto
        div.innerHTML = `
            <h4>${item.name}</h4>
            <p>Tamanho: ${item.size}</p>
            <p>Cor: ${item.color}</p>
            <p>Quantidade: ${item.quantity}</p>
            <p>Preço: R$ ${item.price.toFixed(2)}</p>

            <button class="remove-btn" onclick="removeItem(${index})">
                Remover
            </button>

            <hr>
        `;

        cartItems.appendChild(div);
    });

    // Atualiza o total
    cartTotal.innerText = `R$ ${total.toFixed(2)}`;
}

// Função para remover um item do carrinho
function removeItem(index) {
    cart.splice(index, 1); // Remove o item pelo índice
    localStorage.setItem("cart", JSON.stringify(cart)); // Salva
    renderCart(); // Atualiza a tela
}

// Chama a função assim que a página carrega
renderCart();
