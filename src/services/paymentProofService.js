const paymentProofRepository = require("../repositories/paymentProofRepository");
const {
  deleteFromCloudinary,
  uploadToCloudinary,
} = require("../utils/cloudinaryHandler");

const createPaymentProof = async (data, file) => {
  try {
    if (file) {
      const result = await uploadToCloudinary(file);
      data.imageUrl = result.secure_url;
      data.imgId = result.public_id;
    }
    return await paymentProofRepository.createPaymentProof(data);
  } catch (error) {
    throw new Error(`Error membuat bukti pembayaran: ${error.message}`);
  }
};

const getPaymentProofById = async (id) => {
  try {
    return await paymentProofRepository.getPaymentProofById(id);
  } catch (error) {
    throw new Error(
      `Error mendapatkan bukti pembayaran degan Id: ${error.message}`
    );
  }
};

const updatePaymentProof = async (id, data, file) => {
  try {
    if (file) {
      const paymentProof = await paymentProofRepository.getPaymentProofById(id);
      if (paymentProof.imageUrl) {
        await deleteFromCloudinary(paymentProof.imgId);
      }
      const result = await uploadToCloudinary(file);
      data.imageUrl = result.secure_url;
      data.imgId = result.public_id;
    }
    return await paymentProofRepository.updatePaymentProof(id, data);
  } catch (error) {
    throw new Error(`Error mengupdate bukti pembayaran: ${error.message}`);
  }
};

const deletePaymentProof = async (id) => {
  try {
    const paymentProof = await paymentProofRepository.getPaymentProofById(id);
    if (paymentProof.imageUrl) {
      await deleteFromCloudinary(paymentProof.imgId);
    }
    return await paymentProofRepository.deletePaymentProof(id);
  } catch (error) {
    throw new Error(`Error menghapus bukti pembayaran: ${error.message}`);
  }
};

const getPaymentProofs = async () => {
  try {
    return await paymentProofRepository.getAllPaymentProof();
  } catch (error) {
    throw new Error(
      `Error mendapatkan bukti semua pembayaran: ${error.message}`
    );
  }
};

const getPaymentProofByOrder = async (orderId) => {
  try {
    return await paymentProofRepository.getPaymentProofByOrder(orderId);
  } catch (error) {
    throw new Error(
      `Error mendapatkan bukti pembayaran berdasarkan order: ${error.message}`
    );
  }
};

module.exports = {
  createPaymentProof,
  getPaymentProofById,
  updatePaymentProof,
  deletePaymentProof,
  getPaymentProofs,
  getPaymentProofByOrder,
};
