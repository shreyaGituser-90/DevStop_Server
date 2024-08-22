const Customer = require("../models/userModel");

const getUser = async (req, res) => {
    try {
        const { userId  } = req.user;
        const customer = await Customer.findOne({ _id: userId });
        if (!customer) {
          return res.status(401).json({ message: 'Customer does not exists' });
        }      
        res.status(200).json({customerDetails: customer });
      } catch (err) {
        res.status(500).json({ message: 'Error during login', error: err.message });
      }
};

module.exports = {getUser};
