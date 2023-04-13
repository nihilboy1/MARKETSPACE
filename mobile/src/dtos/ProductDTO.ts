type paymentMethodsProps = {
  id: number;
  label: string;
  checked: boolean;
  key?: string;
};

export type productImagesProps = {
  id?: string;
  uri?: string;
  path: string;
  name: string;
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
  is_active: boolean;
  is_new: boolean;
  accept_trade: boolean;
  product_images: productImagesProps[];
  payment_methods: paymentMethodsProps[];
  user: userProductProps;
};
