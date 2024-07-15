const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const password = bcrypt.hashSync("123456");
const userData = [
  {
    firstName: "Koloy",
    lastName: "Lui",
    username: "kol",
    password,
    email: "km@gmail.com",
  },
  {
    firstName: "Soy",
    lastName: "Loy",
    username: "saloy",
    password,
    email: "sl@gmail.com",
  },
  {
    firstName: "Neko",
    lastName: "Momo",
    username: "nemo",
    password,
    email: "nm@gmail.com",
  },
  {
    firstName: "Adam",
    lastName: "Aso",
    username: "asall",
    password,
    email: "aa@gmail.com",
  },
  {
    firstName: "Miko",
    lastName: "Loke",
    username: "miloy",
    password,
    email: "ml@gmail.com",
  },
  {
    firstName: "admin1",
    lastName: "1",
    username: "admin1",
    password,
    email: "admin1@gmail.com",
    isAdmin: true,
  },
  {
    firstName: "admin2",
    lastName: "2",
    username: "admin2",
    password,
    email: "admin2@gmail.com",
    isAdmin: true,
  },
  {
    firstName: "admin3",
    lastName: "3",
    username: "admin3",
    password,
    email: "admin3@gmail.com",
    isAdmin: true,
  },
  {
    firstName: "admin4",
    lastName: "4",
    username: "admin4",
    password,
    email: "admin4@gmail.com",
    isAdmin: true,
  },
];

const productData = [
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593293/fesakdngfqhabgfnmgjh.png",
    productType: "TOP",
    productName: "Shirt 1",
    productDetail: "This is Shirt 1",
    price: 590,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593293/fesakdngfqhabgfnmgjh.png",
    productType: "TOP",
    productName: "Shirt 2",
    productDetail: "This is Shirt 2",
    price: 590,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593293/fesakdngfqhabgfnmgjh.png",
    productType: "TOP",
    productName: "Shirt 3",
    productDetail: "This is Shirt 3",
    price: 590,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593293/fesakdngfqhabgfnmgjh.png",
    productType: "TOP",
    productName: "Shirt 4",
    productDetail: "This is Shirt 4",
    price: 590,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593588/jz1xkmjbkuznktt3bdo2.png",
    productType: "TOP",
    productName: "Shirt 5",
    productDetail: "This is Shirt 5",
    price: 590,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593588/jz1xkmjbkuznktt3bdo2.png",
    productType: "TOP",
    productName: "Shirt 6",
    productDetail: "This is Shirt 6",
    price: 590,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593588/jz1xkmjbkuznktt3bdo2.png",
    productType: "TOP",
    productName: "Shirt 7",
    productDetail: "This is Shirt 7",
    price: 590,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593588/jz1xkmjbkuznktt3bdo2.png",
    productType: "TOP",
    productName: "Shirt 8",
    productDetail: "This is Shirt 8",
    price: 590,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593627/csppz32rjdumjv3i3otu.png",
    productType: "BOTTOM",
    productName: "Pants 1",
    productDetail: "This is Pants 1",
    price: 990,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593627/csppz32rjdumjv3i3otu.png",
    productType: "BOTTOM",
    productName: "Pants 2",
    productDetail: "This is Pants 2",
    price: 990,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593627/csppz32rjdumjv3i3otu.png",
    productType: "BOTTOM",
    productName: "Pants 3",
    productDetail: "This is Pants 3",
    price: 990,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593627/csppz32rjdumjv3i3otu.png",
    productType: "BOTTOM",
    productName: "Pants 4",
    productDetail: "This is Pants 4",
    price: 990,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593695/ixnfnigckaqgvlxiifzh.png",
    productType: "BOTTOM",
    productName: "Pants 5",
    productDetail: "This is Pants 5",
    price: 990,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593695/ixnfnigckaqgvlxiifzh.png",
    productType: "BOTTOM",
    productName: "Pants 6",
    productDetail: "This is Pants 6",
    price: 990,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593695/ixnfnigckaqgvlxiifzh.png",
    productType: "BOTTOM",
    productName: "Pants 7",
    productDetail: "This is Pants 7",
    price: 990,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593695/ixnfnigckaqgvlxiifzh.png",
    productType: "BOTTOM",
    productName: "Pants 8",
    productDetail: "This is Pants 8",
    price: 990,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593236/k3ldh65or5ykvzbdyctm.png",
    productType: "ACCESSORIES",
    productName: "Hat 1",
    productDetail: "This is Hat 1",
    price: 390,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593236/k3ldh65or5ykvzbdyctm.png",
    productType: "ACCESSORIES",
    productName: "Hat 2",
    productDetail: "This is Hat 2",
    price: 390,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593236/k3ldh65or5ykvzbdyctm.png",
    productType: "ACCESSORIES",
    productName: "Hat 3",
    productDetail: "This is Hat 3",
    price: 390,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593236/k3ldh65or5ykvzbdyctm.png",
    productType: "ACCESSORIES",
    productName: "Hat 4",
    productDetail: "This is Hat 4",
    price: 390,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593236/k3ldh65or5ykvzbdyctm.png",
    productType: "ACCESSORIES",
    productName: "Hat 5",
    productDetail: "This is Hat 5",
    price: 390,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593236/k3ldh65or5ykvzbdyctm.png",
    productType: "ACCESSORIES",
    productName: "Hat 6",
    productDetail: "This is Hat 6",
    price: 390,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593236/k3ldh65or5ykvzbdyctm.png",
    productType: "ACCESSORIES",
    productName: "Hat 7",
    productDetail: "This is Hat 7",
    price: 390,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593236/k3ldh65or5ykvzbdyctm.png",
    productType: "ACCESSORIES",
    productName: "Hat 8",
    productDetail: "This is Hat 8",
    price: 390,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593188/witkz6ukr7wcnxqjeknn.png",
    productType: "ACCESSORIES",
    productName: "Sunglasses 1",
    productDetail: "This is Sunglasses 1",
    price: 390,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593188/witkz6ukr7wcnxqjeknn.png",
    productType: "ACCESSORIES",
    productName: "Sunglasses 2",
    productDetail: "This is Sunglasses 2",
    price: 390,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593188/witkz6ukr7wcnxqjeknn.png",
    productType: "ACCESSORIES",
    productName: "Sunglasses 3",
    productDetail: "This is Sunglasses 3",
    price: 390,
  },
  {
    productImage:
      "https://res.cloudinary.com/dfvn9ksbl/image/upload/v1718593188/witkz6ukr7wcnxqjeknn.png",
    productType: "ACCESSORIES",
    productName: "Sunglasses 4",
    productDetail: "This is Sunglasses 4",
    price: 390,
  },
];

const run = async () => {
  await prisma.user.createMany({ data: userData });
  await prisma.product.createMany({ data: productData });
};

run();
