const { prisma } = require("../config/prismaInit");


const getOrderByUser = async (userId) => {
  try {
    return await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        paymentProof: true,
      },
    });
  } catch (error) {
    throw new Error(`Gagal mendapatkan order berdasarkan user: ${error.message}`);
  }
}


const getAllOrder = async () => {
  try {
    return await prisma.order.findMany({
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
        paymentProof: true,
      },
    });
  } catch (error) {
    throw new Error(`Gagal mendapatkan semua order: ${error.message}`);
  }
}

const getOrderById = async (id) => {
  try {
    return await prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
        paymentProof: true,
      },
    });
  } catch (error) {
    throw new Error(`Gagal mendapatkan order berdasarkan id: ${error.message}`);
  }
}

const createOrder = async (orderData) => {
  try {
    return await prisma.order.create({
      data: orderData,
      include: {
        items: true,
      },
    });
  } catch (error) {
    throw new Error(`Gagal membuat order: ${error.message}`);
  }
}

const updateOrder = async (id, orderData) => {
  try {
    return await prisma.order.update({
      where: { id },
      data: orderData,
    });
  } catch (error) {
    throw new Error(`Gagal mengupdate order: ${error.message}`);
  }
}

const deleteOrder = async (id) => {
  try {
    return await prisma.order.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error(`Gagal menghapus order: ${error.message}`);
  }
}

module.exports = {
  getOrderByUser,
  getAllOrder,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
    