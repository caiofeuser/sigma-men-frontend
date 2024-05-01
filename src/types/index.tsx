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

export interface CheckoutItems {
  image: string;
  name: string;
  price: number;
  price_id: string;
  quantity: number;
  product_id: string;
}

export interface CartContextType {
  cartItems: CartItem[];
  handleAddSameToCart: (cartItem: CartItem) => void;
  handleSubtractSameFromCart: (cartItem: CartItem) => void;
  handleRemoveFromCart: (cartItem: CartItem) => void;
  addItem: (cartItem: CartItem) => void;
  addItems: (cartItem: CartItem[]) => void;
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

export interface OptionType {
  id: number;
  option: string;
  question: number;
}

export interface QuestionsType {
  id: number;
  question: string;
  position: number;
  options: OptionType[];
  survey: number;
}

export interface SurveyType {
  id: number;
  name: string;
  number_of_questions: number;
}

export interface RecomendedProductsType {}
