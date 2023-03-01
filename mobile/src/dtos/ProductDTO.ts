type paymentMethods = {
  key: string;
  name: string;
};

type productImages = {
  path: string;
  id: string;
};

export type ProductDTO = {
  id: string;
  name: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  product_images: productImages[];
  payment_methods: paymentMethods;
  user: {
    avatar: string;
  };
};
