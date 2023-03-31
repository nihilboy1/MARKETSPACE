export type paymentMethodsProps = {
  id: number;
  label: string;
  checked: boolean;
  key?: string;
};

export type productImagesProps = {
  path: string;
  id: string;
  type: string;
};

export type userProductProps = {
  avatar: string;
  name: string;
  tel: string;
};

export type ProductDTO = {
  id: string;
  name: string;
  price: number;
  description: string;
  is_new: boolean;
  accept_trade: boolean;
  product_images: productImagesProps[];
  payment_methods: paymentMethodsProps[];
  user: userProductProps;
};
