export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total?: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  handleAddSameToCart: (cartItem: CartItem) => void;
  handleSubtractSameFromCart: (cartItem: CartItem) => void;
  handleRemoveFromCart: (cartItem: CartItem) => void;
  addItem: (cartItem: CartItem) => void;
  removeItem: (cartItem: CartItem) => void;
  clearCart: () => void;
  handleTotalQuantity: () => number;
  // Adicione outras funções ou propriedades do contexto, se necessário
}

export interface ProductCardProps {
  title: string;
  price: number;
  cardData?: CartItem;
  id?: number | undefined;
  stripeId?: string;
}
