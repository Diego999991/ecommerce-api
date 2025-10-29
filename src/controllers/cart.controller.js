const prisma = require('../config/prisma');

// Ver carrinho do usuário
const getCart = async (req, res) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.userId },
      include: {
        product: true
      }
    });

    // Calcular total
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    res.json({
      items: cartItems,
      total: total.toFixed(2),
      itemCount: cartItems.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar carrinho' });
  }
};

// Adicionar item ao carrinho
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validar dados
    if (!productId || !quantity) {
      return res.status(400).json({ error: 'ProductId e quantity são obrigatórios' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ error: 'Quantidade deve ser maior que zero' });
    }

    // Verificar se produto existe e tem estoque
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ 
        error: 'Estoque insuficiente',
        available: product.stock 
      });
    }

    // Verificar se item já está no carrinho
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: req.userId,
          productId
        }
      }
    });

    let cartItem;

    if (existingItem) {
      // Atualizar quantidade
      const newQuantity = existingItem.quantity + quantity;
      
      if (product.stock < newQuantity) {
        return res.status(400).json({ 
          error: 'Estoque insuficiente',
          available: product.stock 
        });
      }

      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: newQuantity
        },
        include: {
          product: true
        }
      });
    } else {
      // Criar novo item
      cartItem = await prisma.cartItem.create({
        data: {
          userId: req.userId,
          productId,
          quantity
        },
        include: {
          product: true
        }
      });
    }

    res.status(201).json({
      message: 'Item adicionado ao carrinho',
      cartItem
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar item ao carrinho' });
  }
};

// Atualizar quantidade de item no carrinho
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Quantidade inválida' });
    }

    // Verificar se item pertence ao usuário
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
        userId: req.userId
      },
      include: {
        product: true
      }
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'Item não encontrado no carrinho' });
    }

    // Verificar estoque
    if (cartItem.product.stock < quantity) {
      return res.status(400).json({ 
        error: 'Estoque insuficiente',
        available: cartItem.product.stock 
      });
    }

    // Atualizar
    const updatedItem = await prisma.cartItem.update({
      where: { id },
      data: { quantity },
      include: {
        product: true
      }
    });

    res.json({
      message: 'Carrinho atualizado',
      cartItem: updatedItem
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar carrinho' });
  }
};

// Remover item do carrinho
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se item pertence ao usuário
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
        userId: req.userId
      }
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'Item não encontrado no carrinho' });
    }

    await prisma.cartItem.delete({
      where: { id }
    });

    res.json({ message: 'Item removido do carrinho' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover item do carrinho' });
  }
};

// Limpar carrinho
const clearCart = async (req, res) => {
  try {
    await prisma.cartItem.deleteMany({
      where: { userId: req.userId }
    });

    res.json({ message: 'Carrinho limpo com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao limpar carrinho' });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};