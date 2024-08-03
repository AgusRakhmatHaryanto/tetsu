const { prisma } = require("../config/prismaInit");

const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany({
        include: {
            productCategories: {
          category: true,
        },
      },
    });
    return products;
  } catch (error) {
    throw new Error("Gagal mendapatkan semua produk: " + error.message);
  }
};

const getProductById = async (id) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        productCategories: {
          category: true,
        },
      },
    });
    return product;
  } catch (error) {
    throw new Error("Gagal mendapatkan produk berdasarkan id: " + error.message);
  }
};

const createProduct = async (data) => {
  try {
    const { categories, ...productData } = data;
    const newProduct = await prisma.product.create({
        data: {
            ...productData,
            categories: {
              create: categories.map(categoryId => ({
                category: {
                  connect: { id: categoryId },
                },
              })),
            },
          },
    });
    return newProduct;
  } catch (error) {
    throw new Error("Gagal membuat produk: " + error.message);
  }
};

const updateProduct = async (id, data) => {
  try {
    const { categories, ...productData } = data;
  
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...productData,
        categories: {
          deleteMany: {},
          create: categories.map(categoryId => ({
            category: {
              connect: { id: categoryId },
            },
          })),
        },
      },
    });
    return updatedProduct;
  } catch (error) {
    throw new Error("Gagal mengupdate produk: " + error.message);
  }
};

const deleteProduct = async (id) => {
  try {
    await prisma.product.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error("Gagal menghapus produk: " + error.message);
  }
};


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
