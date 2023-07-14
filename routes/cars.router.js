const auth = require("../middlewares/auth");
const router = require("express").Router();


const {createCar,fetchAllCars,fetchCarById,updateCar,deleteCarById}=require("../controllers/cars.controllers")

// Create a new car
router.post('/create-car', auth, createCar);

//fetchAllCars
router.get("/fetchAllCars", auth, fetchAllCars);

//fetchCarById
router.get("/fetchCarById", auth, fetchCarById)

//updateCar
router.patch("/updateCar", auth, updateCar)

//deleteCarById
router.delete("/deleteCarById", auth, deleteCarById)

module.exports = router