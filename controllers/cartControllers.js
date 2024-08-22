const Carts = require("../models/Cart");

const addCartItems = async (req, res) => {
    try {
        const {id, name, desc, cost, quantity, image, userId} = req.user;
        const cartitem = await Carts.findOne({name:name});
        if(cartitem){
          try{
            const result = await Carts.updateOne(
                { customerId: userId, name: name },
                {
                  $set: {
                    quantity: cartitem.quantity+1
                  },
                },
              );
            return res.status(200).json({ message: 'Profile data updated successfully', sucess: result });
          } 
          catch (err) {
            return res.status(500).json({ message: 'Error in updtaing users data', error: err.message });
          }
        }
        const newCarts = new Carts({
            customerId: userId,
            id: id,
            name: name,
            desc: desc,
            cost: cost,
            quantity: quantity,
            image: image,
        });
        await newCarts.save();
        return res.status(200).json({message: 'New item added to cart sucessfully' });
      } catch (err) {
        return res.status(500).json({ message: 'Error in adding cart item', error: err.message });
      }
};

const removeCartItems = async (req, res) => {
  try {
      const {cartId, userId} = req.user;
      const result = await Carts.deleteOne({id:cartId, customerId:userId});
      return res.status(200).json({message: 'Item removed from cart sucessfully' });
    } catch (err) {
      return res.status(500).json({ message: 'Error in removing items from cart', error: err.message });
    }
};


const getCartItems = async (req, res) => {
  try {
      const {userId} = req.user;
      const result = await Carts.find({customerId:userId});
      return res.status(200).json({message: 'Cart Items recieved', Cartdatas: result});
    } catch (err) {
      return res.status(500).json({ message: 'Error in recieving Cart items', error: err.message });
    }
};

const updateQuantity = async(req,res)=>{
  try{
      const { userId, username, newQuant } = req.user;
      const result = await Carts.updateOne(
          { customerId: userId, name: username },
          {
            $set: {
              quantity: newQuant
            },
          },
        );
      return res.status(200).json({ message: 'Profile data updated successfully', sucess: result });
  } 
  catch (err) {
  return res.status(500).json({ message: 'Error in updtaing users data', error: err.message });
}
}



const emptyCartitems = async (req, res) => {
  try {
    const {userId} = req.user;
    const result = await Carts.deleteMany({customerId:userId});
    return res.status(200).json({message: 'Cart has been emptied', Cartdatas: result});
  } catch (err) {
    return res.status(500).json({ message: 'Error in empting the cart', error: err.message });
  }
};

module.exports = {addCartItems, removeCartItems, getCartItems, emptyCartitems, updateQuantity};
