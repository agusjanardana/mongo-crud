//kita membutuhkan module router untuk membagi router
var router = require('express').Router();
const { response } = require('express');

//import controller Product
const productController = require('../controllers/productController');

//import models product.
const product = require('../models/product');

//import axios untuk membantu di server
const axios = require('axios');

/**
 *  @description Disini kita buat route untuk endpoint dari frontEndnya.
 *  @method GET /
 */

router.get('/', function (req, res) {
   axios
      .get('http://localhost:3000/api/product')
      .then(function (response) {
         console.log(response.data);
         res.render('index', { product: response.data });
      })
      .catch((err) => {
         res.send(err);
      });
});

router.get('/add-product', (req, res) => {
   res.render('main/add-product');
});

router.get('/update-product', (req, res) => {
   axios
      .get('http://localhost:3000/api/product', {
         params: { id: req.query.id },
      })
      .then(function (response) {
         res.render('main/update-product', {
            product: response.data,
         });
      });
});

/**
 *  @description untuk endpoint API nya
 *  @method GET,POST,PUT,DELETE /
 */

router.post('/api/products', productController.create);
router.get('/api/product', productController.fetch);
router.put('/api/product/:id', productController.update);
router.delete('/api/product/:id', productController.delete);
module.exports = router;
