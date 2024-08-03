const categoryRepository = require("../repositories/categoryRepository");

const createCategory = async (data) => {
  try {
    const newCategory = await categoryRepository.createCategory(data);
    return newCategory;
  } catch (error) {
    throw new Error("Error membuat kategori: " + error.message);
  }
};

const getCategoryById = async (id) => {
  try {
    const category = await categoryRepository.getCategoryById(id);
    return category;
  } catch (error) {
    throw new Error("Error mendapatkan kategori dengan Id: " + error.message);
  }
};

const getAllCategories = async () => {
  try {
    const categories = await categoryRepository.getCategories();
    return categories;
  } catch (error) {
    throw new Error("Error mendapatkan semua data kategori: " + error.message);
  }
};

const updateCategory = async (id, data) => {
  try {
    const updatedCategory = await categoryRepository.updateCategory(id, data);
    return updatedCategory;
  } catch (error) {
    throw new Error("Error mengupdate kategori: " + error.message);
  }
};

const deleteCategory = async (id) => {
  try {
    const deletedCategory = await categoryRepository.deleteCategory(id);
    return deletedCategory;
  } catch (error) {
    throw new Error("Error menghapus kategori: " + error.message);
  }
};

module.exports = {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
