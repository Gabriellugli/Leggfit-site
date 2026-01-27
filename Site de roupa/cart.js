//===CARRINHO BASE===
//Busca carrinho salvo ou cria um novo
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Atualiza o contador do carrinho
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (!cartCount) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

//Salva o Carrinho
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}
//Adicionar ao carrinho
document.addEventListener("DOMContentLoaded", () => {updateCartCount();
    

    const addbutton = document.querySelector(".btn-primary");
    if (!addbutton) return;

    addbutton.addEventListener("click", () => {
        const name = document.querySelector("h1")?.innerText;
        const priceText = document.querySelector(".price")?.innerText;
        const size = document.querySelector(".size")?.value;
        const color = document.querySelector(".color")?.value;
        const quantity = parseInt(document.querySelector(".quantity")?.value || 1);

        if(!size || !color) {
            alert("Selecione qual o tamanho e qual a cor");
            return;
        }

        const price = parseFloat(
            priceText.replace("R$", "").replace(",",".")
        );

        const existing = cart.find(
            item=> item.name === name && item.size === size && item.color === color
        
        );

        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({
                name,
                price,
                size,
                color,
                quantity
            });
        }
        
        saveCart();
        alert("Produto adicionado ao carrinho!");
    });
});

// ===== RENDERIZA CHECKOUT =====
function renderCheckout() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    if (!cartItemsContainer || !totalPriceElement) return;

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>Tamanho: ${item.size}</p>
            <p>Cor: ${item.color}</p>
            <p>Quantidade: ${item.quantity}</p>
            <p>Preço: R$ ${item.price.toFixed(2)}</p>
            <hr>
        `;

        cartItemsContainer.appendChild(div);
    });

    totalPriceElement.innerText = total.toFixed(2);
}

// Chama automaticamente no checkout
document.addEventListener("DOMContentLoaded", renderCheckout);
