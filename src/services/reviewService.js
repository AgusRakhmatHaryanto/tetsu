
const reviewRepository = require("../repositories/reviewRepository");

const getAllReviews = async () => {
  try {
    return await reviewRepository.getAllReviews();
  } catch (error) {
    throw new Error(`Error mendapatkan semua review: ${error.message}`);
  }
};

const getReviewById = async (id) => {
  try {
    return await reviewRepository.getById(id);
  } catch (error) {
    throw new Error(
      `Error mendapatkan review berdasarkan id: ${error.message}`
    );
  }
};

const createReview = async (reviewData) => {
  try {
    return await reviewRepository.create(reviewData);
  } catch (error) {
    throw new Error(`Error membuat review: ${error.message}`);
  }
};

const updateReview = async (id, reviewData) => {
  try {
    return await reviewRepository.update(id, reviewData);
  } catch (error) {
    throw new Error(`Error mengupdate review: ${error.message}`);
  }
};

const deleteReview = async (id) => {
  try {
    const review = await reviewRepository.getById(id);
    return await reviewRepository.delete(id);
  } catch (error) {
    throw new Error(`Error menghapus review: ${error.message}`);
  }
};

const getAllReviewByProductId = async (productId) => {
  try {
    return await reviewRepository.getAllByProductId(productId);
  } catch (error) {
    throw new Error(
      `Error mendapatkan semua review berdasarkan product id: ${error.message}`
    );
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getAllReviewByProductId,
};
