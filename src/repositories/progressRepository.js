const { prisma } = require("../config/prismaInit");

const getAllProgress = async () => {
  try {
    const progress = await prisma.progress.findMany({
      include: {
        orderItem: true,
      },
    });
    return progress;
  } catch (error) {
    throw new Error("Gagal mendapatkan semua progress: " + error.message);
  }
};

const getProgressById = async (id) => {
  try {
    const progress = await prisma.progress.findUnique({
      where: { id },
      include: {
        orderItem: true,
      },
    });
    return progress;
  } catch (error) {
    throw new Error("Gagal mendapatkan progress berdasarkan id: " + error.message);
  }
};

const getProgressByOrderItemId = async (orderItemId) => {
  try {
    const progress = await prisma.progress.findMany({
      where: { orderItemId },
      include: { orderItem: true },
    });
    return progress;
  } catch (error) {
    throw new Error("Gagal mendapatkan progress berdasarkan item order: " + error.message);
  }
};

const createProgress = async (progress) => {
  try {
    const newProgress = await prisma.progress.create({
      data: progress,
    });
    return newProgress;
  } catch (error) {
    throw new Error("Gagal membuat progress: " + error.message);
  }
};

const updateProgress = async (id, progress) => {
  try {
    const updatedProgress = await prisma.progress.update({
      where: { id },
      data: progress,
    });
    return updatedProgress;
  } catch (error) {
    throw new Error("Gagal mengupdate progress: " + error.message);
  }
};

const deleteProgress = async (id) => {
  try {
    await prisma.progress.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error("Gagal menghapus progress: " + error.message);
  }
};

module.exports = {
  getAllProgress,
  getProgressById,
  getProgressByOrderItemId,
  createProgress,
  updateProgress,
  deleteProgress,
};