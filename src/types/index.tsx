﻿export interface CartItem {
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

export interface ContactInformationType {
  phone: string;
  instagram: string;
  email: string;
  address: string;
}

export interface ContactInfo {
  name: string;
  href: string;
  icon: JSX.Element;
  content: string;
  key: string;
}

export interface User {
  pk: number;
  email: string;
  first_name: string;
  last_name: string;
  age?: number;
}
export interface AuthTokens {
  access: string;
  refresh: string;
  user: User;
}

export interface OrderType {
  order: {
    id: string;
    date: string;
    amount_total: number;
    payment_status: string;
    line_items: {
      data: {
        description: string;
        amount_total: number;
        quantity: number;
      }[];
    };
  };
}
