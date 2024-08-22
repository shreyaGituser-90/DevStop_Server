const jwt = require("jsonwebtoken");
const Customer = require("../models/userModel");
const CustomerSession = require("../models/userSession");
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');



const login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const customer = await Customer.findOne({ email });
        if (!customer) {
          return res.status(401).json({ message: 'Customer does not exists*' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, customer.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid password*' });
        }
        const JWT_SECRET = process.env.JWT_SECRET;

        const newToken = jwt.sign(
          { userId: customer._id, userEmail: customer.email },JWT_SECRET,{ expiresIn: '7d' });

        const newCustomerSession = new CustomerSession({
          customerId: customer._id,
          accessToken: newToken,
          accessTokenExpiry: '7d',
        });
        await newCustomerSession.save();
    
        return res.status(200).json({ message: 'Login successful', CustomerToken: newToken });
      } catch (err) {
        return res.status(500).json({ message: 'Error during login', error: err.message });
      }
};




const signup = async (req, res) => {
    try {
        const {name,email,address,phoneNumber,password} = req.body;
        const existingUser = await Customer.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Customer already exists*' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newCustomer = new Customer({
          name: name,
          email:email,
          address: address,
          phoneNumber: phoneNumber,
          password: hashedPassword,
        });
        await newCustomer.save();
        return res.status(201).json({ message: 'Customer added successfully', Customer: newCustomer });
    } catch (err) {
        return res.status(500).json({ message: 'Error adding new Customer', error: err.message });
    }
};



const logout = async(req,res) =>{
  try {
    const {token} = req.body;
    const result = await CustomerSession.deleteOne({accessToken:token});
    return res.status(201).json({ message: 'Customer Logged out successfully'});
  } 
  catch (err) {
    return  res.status(500).json({ message: 'Error adding new Customer', error: err.message });
  }
}



const resetPassword = async(name,email,token)=>{
  try {
    const transporter = nodemailer.createTransport({
      host:'smtp.gmail.com',
      port:587,
      secure:false,
      requireTLS:true,
      auth:{
        user:'therohitpandey007@gmail.com',
        pass:'vmcr hanz oxau ofgq'
      }
    })
    const mailOptions = {
      from:'therohitpandey007@gmail.com',
      to:email,
      subject: 'DevStop password reset',
      html:`<p> Hello ${name}, Please copy the link and <a href='http://127.0.0.1:8000/api/users/forgotpassword?token=${token}'>click here</a> and reset your password`,
    }

    transporter.sendMail(mailOptions,function(error,info){
      if(error){
        return console.log(error.message);
      }
      console.log("Mail has been sent: ");
    })
  } catch (err) {
    res.status(500).json({ message: 'Error in sending email', error: err.message });
  }
}

const forgotpassword = async (req, res) => {
  try {
    const {email} = req.body;
    const existingUser = await Customer.findOne({ email });
    if(!existingUser){
      return res.status(400).json({ message: 'Customer does not exists' });
    }
    const randomString = randomstring.generate();
    const data = await Customer.updateOne({email:email},{$set:{token:randomString}});
    resetPassword(existingUser.name,existingUser.email,randomString);
    res.status(200).json({ message: 'Please check your inbox and reset password'});
  } catch (err) {
    res.status(500).json({ message: 'Error in password reset', error: err.message });
  }
};

module.exports = {
  login,
  signup,
  logout,
  forgotpassword,
};
