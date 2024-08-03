const OrderItemsRepository = require('../repositories/orderItemsRepository');

const createOrderItem = async(orderItemData, orderId)=>{
    try {
        return await OrderItemsRepository.createOrderItem(orderItemData, orderId)
    } catch (error) {
        throw new Error(`Error membuat item pesanan: ${error.message}`)
    }
}

const getOrderItem = async(orderId)=>{
    try {
        return await OrderItemsRepository.getOrderItemsByOrderId(orderId)
    } catch (error) {
        throw new Error(`Error mendapatkan item pesanan: ${error.message}`)
    }
}

const updateOrderItem = async(id, data)=>{
    try {
        return await OrderItemsRepository.updateOrderItem(id, data)
    } catch (error) {
        throw new Error(`Error mengupdate item pesanan: ${error.message}`)
    }
}

const deleteOrderItem = async(id)=>{
    try {
        return await OrderItemsRepository.deleteOrderItem(id)
    } catch (error) {
        throw new Error(`Error menghapus item pesanan: ${error.message}`)
    }
}

module.exports = {
    createOrderItem,
    getOrderItem,
    updateOrderItem,
    deleteOrderItem
}