var Product = require('../models/product');

exports.create = (req, res) => {
   // validasi apakah body ada atau tidak
   console.log(req.body);
   if (!req.body) {
      res.status(400).send({
         message: 'Beberapa content tidak boleh kosong loh',
      });
      return;
   }

   // new Product
   var product = new Product();
   product.kategori = req.body.kategori;
   product.name = req.body.name;
   product.price = req.body.price;

   // save ke DB
   try {
      product.save().then((data) => {
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
            res.send(data);
         })
         .catch((err) => {
            res.status(500).send({ message: err.message });
         });
   }
};

exports.update = (req, res) => {
   //validasi apakah req body ada atau tidak
   if (!req.body) {
      return res.status(400).send({ message: 'Ga boleh kosong' });
   }

   //ambil params idnya
   const id = req.params.id;

   //gunakan method findByIdAndUpdate ditentukan dari id dan req bodynya.
   Product.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
   })
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Ga ketemu usernya dengan ${id}!`,
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
   //request paramsnya
   const id = req.params.id;

   //findByID and Delete dari product
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
