const Orders = require("../models/Order");

const addOrderItems = async (req, res) => {
    try {
        const {id, name, desc, cost, quantity, image, userId} = req.user;
        const newOrders = new Orders({
          customerId: userId,
          id: id,
          name: name,
          desc: desc,
          cost: cost,
          quantity: quantity,
          image: image,
        });
        await newOrders.save();
        return res.status(200).json({message: 'Orders added sucessfully' });
      } catch (err) {
        return res.status(500).json({ message: 'Error in adding Orders', error: err.message });
      }
};

const removeOrderItems = async (req, res) => {
  try {
      const {orderId, userId} = req.user;
      const result = await Orders.deleteOne({_id:orderId, customerId:userId});
      return res.status(200).json({message: 'Order cancelled sucessfully' });
    } catch (err) {
      return res.status(500).json({ message: 'Error in removing items from Orders', error: err.message });
    }
};

const getOrderItems = async (req, res) => {
  try {
      const {userId} = req.user;
      const result = await Orders.find({customerId:userId});
      return res.status(200).json({message: 'Order Items recieved', Orderdatas: result});
    } catch (err) {
      return res.status(500).json({ message: 'Error in recieving Order items', error: err.message });
    }
};

module.exports = {addOrderItems,removeOrderItems,getOrderItems};
