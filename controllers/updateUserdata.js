const Customer = require('../models/userModel');

const updateProfile = async(req,res)=>{
    try{
        const { userId, username, emailId, phoneNumber, address } = req.user;
        const result = await Customer.updateOne(
            { _id: userId },
            {
              $set: {
                name: username,
                email: emailId,
                phoneNumber:phoneNumber,
                address: address,
              },
            },
          );
        return res.status(200).json({ message: 'Profile data updated successfully', sucess: result });
    } 
    catch (err) {
    return res.status(500).json({ message: 'Error in updtaing users data', error: err.message });
  }
}

module.exports={updateProfile};