const prisma = require("../config/prisma");

async function getCart(req, res) {
  try {
    const items = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      include: { product: true },
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
}

async function addToCart(req, res) {
  try {
    const { productId, quantity = 1, size } = req.body;

    const existing = await prisma.cartItem.findFirst({
      where: { userId: req.user.id, productId, size },
    });

    let item;
    if (existing) {
      item = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    } else {
      item = await prisma.cartItem.create({
        data: { userId: req.user.id, productId, quantity, size },
      });
    }

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
}

async function updateCartItem(req, res) {
  try {
    const { quantity } = req.body;
    const item = await prisma.cartItem.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!item || item.userId !== req.user.id) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const updated = await prisma.cartItem.update({
      where: { id: Number(req.params.id) },
      data: { quantity },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
}

async function removeCartItem(req, res) {
  try {
    const item = await prisma.cartItem.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!item || item.userId !== req.user.id) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await prisma.cartItem.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
}

module.exports = { getCart, addToCart, updateCartItem, removeCartItem };