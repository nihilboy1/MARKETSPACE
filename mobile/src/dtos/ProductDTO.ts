export type paymentMethodsProps = {
  id: number;
  label: string;
  checked: boolean;
};

export type productImages = {
  path: string;
  id: string;
  type: string;
};

export type ProductDTO = {
  id: string;
  name: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  product_images: productImages[];
  payment_methods: paymentMethodsProps[];
  user: {
    avatar: string;
  };
};
