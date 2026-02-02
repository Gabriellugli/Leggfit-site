// =======================
// CARRINHO GLOBAL
// =======================

// Carrega carrinho salvo ou cria vazio
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Atualiza número do carrinho no topo
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (!cartCount) return;

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    cartCount.textContent = totalItems;
}

// Salva carrinho
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// =======================
// ADICIONAR AO CARRINHO
// =======================

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    const addButton = document.querySelector(".btn-primary");
    if (!addButton) return;

    addButton.addEventListener("click", () => {
        const name = document.querySelector(".product-name")?.innerText;
        const priceElement = document.querySelector(".product-price");
        const price = Number(priceElement?.dataset.price);

        const size = document.querySelector(".size")?.value;
        const color = document.querySelector(".color")?.value;
        const quantity = Number(
            document.querySelector(".quantity")?.value || 1
        );

        const image = document.querySelector(".produto-imagens img")?.src;

        if (!size || !color) {
            alert("Selecione tamanho e cor");
            return;
        }

        const existingItem = cart.find(
            item =>
                item.name === name &&
                item.size === size &&
                item.color === color
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                name,
                price,
                size,
                color,
                quantity,
                image
            });
        }

        saveCart();
        alert("Produto adicionado ao carrinho!");
    });
});
