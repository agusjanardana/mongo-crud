var Product = require('../models/product');

exports.create = (req, res) => {
   // validasi apakah body ada atau tidak
   if (!req.body) {
      res.status(400).send({
         message: 'Beberapa content tidak boleh kosong loh',
      });
      return;
   }

   // new Product
   const product = new Product({
      kategori: req.body.kategori,
      name: req.body.name,
      price: req.body.price,
   });

   // save ke DB
   try {
      product.save().then((data) => {
         //  res.send(data);
         res.redirect('/');
      });
   } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Ada error di programmu' });
   }
};

exports.fetch = (req, res) => {
   if (req.query.id) {
      const id = req.query.id;

      Product.findById(id)
         .then((data) => {
            if (!data) {
               res.status(400).send({
                  message: 'Ga ketemu product dengan id tersebut.',
               });
            } else {
               console.log(data);
               res.send(data);
            }
         })
         .catch((err) => {
            res.status(500).send({
               message: 'Ga ketemu user dengan' + id,
            });
         });
   } else {
      Product.find()
         .then((data) => {
            console.log(data);
            res.send(data);
         })
         .catch((err) => {
            res.status(500).send({ message: err.message });
         });
   }
};

exports.update = (req, res) => {
   if (!req.body) {
      return res
         .status(400)
         .send({ message: 'Data to update can not be empty' });
   }

   const id = req.params.id;
   Product.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
   })
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot Update user with ${id}. Maybe user not found!`,
            });
         } else {
            res.send(data);
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Error Update user information',
         });
      });
};

exports.delete = (req, res) => {
   const id = req.params.id;

   Product.findByIdAndDelete(id)
      .then((data) => {
         if (!data) {
            res.status(400).send({
               message: `Kayaknya ada yang salah dari ${id}`,
            });
         } else {
            res.send({
               message: 'Product udah didelete cuy',
            });
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Ada yang salah dari ' + id,
         });
      });
};
