
const Car = require('../models/cars.models');
const { body, validationResult } = require('express-validator');
const { validateCarCreationMiddleware } = require('../middlewares/carvalidation');


//Create car
const createCar = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { brand, model, year, price } = req.body;

        const newCar = new Car({
            brand,
            model,
            year,
            price
        });

        const savedCar = await newCar.save();

        res.status(201).json({
            status: 201,
            success: true,
            message: 'Car created successfully',
            data: savedCar
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
};


// fetch all cars
const fetchAllCars = async (req, res) => {
    try {

       const cars = await Car.find();

       if (cars.length === 0) {
         return res.status(404).json({
           status: 404,
           success: false,
           message: 'No cars found',
           data: [],
         });
       }
   
       res.status(200).json({
         status: 200,
         success: true,
         message: 'Cars fetched successfully',
         data: cars,
       });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: " something went wrong",
            error: error.message
        });
    }
}


// fetch the  car details by id
    const fetchCarById = async (req, res) => {
        try {
        const { id } = req.query;
        const car = await Car.findById(id);
    
        if (!car) {
            return res.status(404).json({
            status: 404,
            success: false,
            message: 'Car not found',
            data: null,
            });
        }
    
        res.status(200).json({
            status: 200,
            success: true,
            message: 'Car fetched successfully',
            data: car,
        });
        } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
            status: 400,
            success: false,
            message: 'Invalid car ID',
            error: error.message,
            });
        }
    
        console.error(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
        }
    };


// Update the car details 
  const updateCar = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const { brand, model, year, price } = req.body;
      const { id } = req.query;
  
      const updatedCar = await Car.findByIdAndUpdate(
        id,
        {
          brand,
          model,
          year,
          price
        },
        { new: true }
      );
  
      if (!updatedCar) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: 'Car not found',
          data: null
        });
      }
  
      res.status(200).json({
        status: 200,
        success: true,
        message: 'Car details updated successfully',
        data: updatedCar
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        success: false,
        message: 'Something went wrong',
        error: error.message
      });
    }
  };
  

// delete car by id
  const deleteCarById = async (req, res) => {
    try {
      const { id } = req.query;
    
      if (!id) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: 'Car ID is missing',
          data: null,
        });
      }
  
      const deletedCar = await Car.findByIdAndDelete(id);
  
      if (!deletedCar) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: 'Car not found',
          data: null,
        });
      }
  
      res.status(200).json({
        status: 200,
        success: true,
        message: 'Car deleted successfully',
        data: [],
      });
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).json({
          status: 400,
          success: false,
          message: 'Invalid car ID',
          error: error.message,
        });
      }
  
      console.error(error);
      res.status(500).json({
        status: 500,
        success: false,
        message: 'Something went wrong',
        error: error.message,
      });
    }
  };
  
  
module.exports = { createCar, validateCarCreationMiddleware, fetchAllCars,fetchCarById ,updateCar,deleteCarById};
