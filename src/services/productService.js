const productRepository = require("../repositories/productRepository");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinaryHandler");

const createProduct = async (data, file) => {
  try {
    if (file) {
      const result = await uploadToCloudinary(file);
      data.imageUrl = result.secure_url;
      data.imgId = result.public_id;
    }
    const newProduct = await productRepository.createProduct(data);
    return newProduct;
  } catch (error) {
    throw new Error("Error membuat produk: " + error.message);
  }
};

const getAllProducts = async () => {
  try {
    const products = await productRepository.getAllProducts();
    return products;
  } catch (error) {
    throw new Error("Error mendapatkan semua produk: " + error.message);
  }
};

const getProductById = async (id) => {
  try {
    const product = await productRepository.getProductById(id);
    return product;
  } catch (error) {
    throw new Error("Error mendapatkan produk dengan Id: " + error.message);
  }
};

const updateProduct = async (id, data, file) => {
  try {
    if (file) {
      const product = await productRepository.getProductById(id);
      if (product.imageUrl) {
        await deleteFromCloudinary(product.imgId);
      }
      const result = await uploadToCloudinary(file);
      data.imageUrl = result.secure_url;
      data.imgId = result.public_id;
    }
    const updatedProduct = await productRepository.updateProduct(id, data);
    return updatedProduct;
  } catch (error) {
    throw new Error("Error mengupdate produk: " + error.message);
  }
};

const deleteProduct = async (id) => {
  try {
    const product = await productRepository.getProductById(id);
    if (product.imageUrl) {
      await deleteFromCloudinary(product.imgId);
    }
    const deletedProduct = await productRepository.deleteProduct(id);
    return deletedProduct;
  } catch (error) {
    throw new Error("Error menghapus produk: " + error.message);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
