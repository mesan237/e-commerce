import bcrypt from "bcrypt";

const users = [
  {
    name: "Abed",
    email: "negokamgaing@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Junior",
    email: "abdiek@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Armelle",
    email: "armelle@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
