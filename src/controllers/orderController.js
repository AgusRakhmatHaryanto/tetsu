const orderService = require("../services/orderService");
const handleResponse = require("../utils/handleResponse");

const getAllOrders = async (req, res) => {
  handleResponse(res, orderService.getAllOrders(), "Success", 200);
};

const getOrderById = (req, res) => {
  const { id } = req.params;
  handleResponse(res, orderService.getOrderById(id), "Success", 200);
};

const getOrderByUserId = (req, res) => {
  const { id } = req.params;
  handleResponse(
    res,
    orderService.getOrderByUserId(id),
    "Success",
    200
  );
};

const createOrder = (req, res) => {
  const { userId, items } = req.body;
  handleResponse(res, orderService.createOrder(userId, items), "Success", 201);
};

const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  handleResponse(
    res,
    orderService.updateOrderStatus(id, status),
    "Success",
    200
  );
};

const deleteOrder = (req, res) => {
  const { id } = req.params;
  handleResponse(res, orderService.deleteOrder(id), "Success", 200);
};


module.exports = {
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  createOrder,
  updateOrderStatus,
  deleteOrder
};