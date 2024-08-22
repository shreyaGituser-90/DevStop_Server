const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const getUserDetails = require("../controllers/getUserDetails");
const orderController = require("../controllers/orderController");
const AuthenticateUser = require("../middlewares/authenticateUser");
const  updateUserdata  = require("../controllers/updateUserdata");
const cartControllers = require("../controllers/cartControllers");

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.post("/logout", userController.logout);
router.post("/forgotpassword", userController.forgotpassword);

router.get("/getuserdata",AuthenticateUser.verifytoken,getUserDetails.getUser);
router.post("/updateprofile",AuthenticateUser.verifytoken,updateUserdata.updateProfile);

router.post("/addtocart",AuthenticateUser.verifytoken,cartControllers.addCartItems);
router.post("/removecartitems",AuthenticateUser.verifytoken,cartControllers.removeCartItems);
router.get("/getcartitems",AuthenticateUser.verifytoken,cartControllers.getCartItems);
router.get("/emptycart",AuthenticateUser.verifytoken,cartControllers.emptyCartitems);
router.post("/updateQuantity",AuthenticateUser.verifytoken,cartControllers.updateQuantity);

router.post("/addorders",AuthenticateUser.verifytoken,orderController.addOrderItems);
router.post("/removeorders",AuthenticateUser.verifytoken,orderController.removeOrderItems);
router.get("/getorders",AuthenticateUser.verifytoken,orderController.getOrderItems);

module.exports = router;