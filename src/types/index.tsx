export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total?: number;
  stripeID?: string;
  image?: string[];
}

export interface ProductType {
  name: string;
  object: string;
  type: string;
  description: string;
  price_monetary: number;
  stripeID: string;
  image: string[];
  id: string;
}

export interface TreatmentType {
  cardData: {
    name: string;
  };
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
  name: string;
  price: number;
  cardData?: CartItem;
  id?: number | undefined;
  stripeID?: string;
}
