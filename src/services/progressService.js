const progressRepository = require("../repositories/progressRepository");

const createProgress = async (data) => {
  try {
    return await progressRepository.createProgress(data);
  } catch (error) {
    throw new Error(`Error membuat progress: ${error.message}`);
  }
};

const getProgressById = async (id) => {
  try {
    return await progressRepository.getProgressById(id);
  } catch (error) {
    throw new Error(`Error mendapatkan progress dengan Id: ${error.message}`);
  }
};

const getAllProgress = async () => {
  try {
    return await progressRepository.getAllProgress();
  } catch (error) {
    throw new Error(`Error mendapatkan semua progress: ${error.message}`);
  }
};

const getProgressByOrderItemId = async (orderItemId) => {
  try {
    return await progressRepository.getProgressByOrderItemId(orderItemId);
  } catch (error) {
    throw new Error(
      `Error mendapatkan progress berdasarkan order item Id: ${error.message}`
    );
  }
};

const updateProgress = async (id, data) => {
  try {
    return await progressRepository.updateProgress(id, data);
  } catch (error) {
    throw new Error(`Error mengupdate progress: ${error.message}`);
  }
};

const deleteProgress = async (id) => {
  try {
    return await progressRepository.deleteProgress(id);
  } catch (error) {
    throw new Error(`Error menghapus progress: ${error.message}`);
  }
};

module.exports = {
  createProgress,
  getProgressById,
  getAllProgress,
  getProgressByOrderItemId,
  updateProgress,
  deleteProgress,
};
