var router = require('express').Router();
const { response } = require('express');
const productController = require('../controllers/productController');
const product = require('../models/product');

const axios = require('axios');

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

//untuk API
router.post('/api/product', productController.create);
router.get('/api/product', productController.fetch);
router.put('/api/product/:id', productController.update);
router.delete('/api/product/:id', productController.delete);
module.exports = router;
