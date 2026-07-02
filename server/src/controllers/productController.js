const prisma = require("../config/prisma");

async function getProducts(req, res) {
  try {
    const { category, search } = req.query;
    const where = {};

    if (category) where.category = category;
    if (search) where.name = { contains: search };

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
}

async function getProductById(req, res) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
}

async function createProduct(req, res) {
  try {
    const { name, description, price, stock, category, imageUrl } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        category,
        imageUrl,
      },
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
}

async function updateProduct(req, res) {
  try {
    const product = await prisma.product.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
}

async function deleteProduct(req, res) {
  try {
    await prisma.product.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };