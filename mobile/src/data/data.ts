import { ProductDTO } from "@dtos/ProductDTO";

export const FAKEDATA: ProductDTO[] = [
  {
    name: "Bicicleta Eletrônica",
    is_new: true,
    price: 59.88,
    user: { avatar: "" },
    accept_trade: true,
    id: "5",
    payment_methods: [{ key: "1", name: "pix" }],
    product_images: [{ id: "5", path: "../" }],
  },
  {
    name: "Smartphone Samsung Galaxy S21",
    is_new: true,
    price: 3999.99,
    user: { avatar: "" },
    accept_trade: false,
    id: "6",
    payment_methods: [
      { key: "2", name: "cartão de crédito" },
      { key: "3", name: "boleto bancário" },
    ],
    product_images: [{ id: "6", path: "../" }],
  },
  {
    name: "Livro - A Sutil Arte de Ligar o F*da-se",
    is_new: false,
    price: 29.99,
    user: { avatar: "" },
    accept_trade: true,
    id: "7",
    payment_methods: [
      { key: "1", name: "pix" },
      { key: "2", name: "cartão de crédito" },
    ],
    product_images: [{ id: "7", path: "../" }],
  },
  {
    name: "Headphone Bluetooth JBL",
    is_new: true,
    price: 299.99,
    user: { avatar: "" },
    accept_trade: false,
    id: "8",
    payment_methods: [
      { key: "2", name: "cartão de crédito" },
      { key: "3", name: "boleto bancário" },
    ],
    product_images: [{ id: "8", path: "../" }],
  },
];
