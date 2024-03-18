import dotenv from "dotenv";
dotenv.config();
import connectdb from "./config/db.js";
import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import Order from "./models/order.model.js";
import { products } from "./datas/products.js";
import users from "./datas/users.js";

connectdb();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const userDatas = await User.insertMany(users);
    const adminUser = userDatas[0]._id;

    const productDatas = products.map((product) => {
      return { user: adminUser, ...product };
    });

    await Product.insertMany(productDatas);

    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.log("Import failed ", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("Data detroyed");
    process.exit();
  } catch (error) {
    console.log("destroy failed ", error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
