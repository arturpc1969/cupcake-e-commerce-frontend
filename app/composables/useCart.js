export const useCart = () => {
  // Estado reativo do carrinho
  const cartItems = useState("cart_items", () => []);

  /**
   * Inicializa o carrinho do localStorage
   */
  const initCart = () => {
    if (import.meta.client) {
      const storedCart = localStorage.getItem("shopping_cart");
      if (storedCart) {
        try {
          cartItems.value = JSON.parse(storedCart);
        } catch (error) {
          console.error("Erro ao carregar carrinho:", error);
          cartItems.value = [];
        }
      }
    }
  };

  /**
   * Salva o carrinho no localStorage
   */
  const saveCart = () => {
    if (import.meta.client) {
      localStorage.setItem("shopping_cart", JSON.stringify(cartItems.value));
    }
  };

  /**
   * Adiciona um produto ao carrinho
   */
  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.value.find(
      (item) => item.productUuid === product.uuid
    );

    if (existingItem) {
      // Se o produto já existe, atualiza a quantidade
      existingItem.quantity += quantity;
    } else {
      // Adiciona novo produto
      cartItems.value.push({
        productUuid: product.uuid,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: quantity,
        image: product.image,
      });
    }

    saveCart();
  };

  /**
   * Remove um produto do carrinho
   */
  const removeFromCart = (productUuid) => {
    cartItems.value = cartItems.value.filter(
      (item) => item.productUuid !== productUuid
    );
    saveCart();
  };

  /**
   * Atualiza a quantidade de um produto
   */
  const updateQuantity = (productUuid, quantity) => {
    const item = cartItems.value.find(
      (item) => item.productUuid === productUuid
    );
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productUuid);
      } else {
        item.quantity = quantity;
        saveCart();
      }
    }
  };

  /**
   * Limpa todo o carrinho
   */
  const clearCart = () => {
    cartItems.value = [];
    if (import.meta.client) {
      localStorage.removeItem("shopping_cart");
    }
  };

  /**
   * Calcula o total do carrinho
   */
  const cartTotal = computed(() => {
    return cartItems.value
      .reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
      .toFixed(2);
  });

  /**
   * Quantidade total de itens no carrinho
   */
  const cartItemCount = computed(() => {
    return cartItems.value.reduce((count, item) => count + item.quantity, 0);
  });

  /**
   * Verifica se o carrinho está vazio
   */
  const isCartEmpty = computed(() => cartItems.value.length === 0);

  return {
    // Estado
    cartItems: readonly(cartItems),
    cartTotal,
    cartItemCount,
    isCartEmpty,

    // Métodos
    initCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};
