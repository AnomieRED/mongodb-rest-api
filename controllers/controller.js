import Template from '../model/product.js';
import SaveFiles from '../upload/files.js';

class Controller {
   async addOne(req, res) {
      try {
         const { name, price, balance } = req.body;
         const fileName = SaveFiles.uploadFiles(req.files.picture);
         const temp = await Template.create({ name, price, balance, picture: fileName });
         res.json(temp);
      } catch (error) {
         res.status(500).json(error);
      }
   }

   async getOne(req, res) {
      try {
         const id = req.params.id;
         if (!id) {
            res.status(404).json('id not specified');
         }
         const temp = await Template.findById(id);
         return res.json(temp);
      } catch (error) {
         res.status(500).json(error);
      }
   }

   async getAll(req, res) {
      try {
         const { page = 1, limit = 10 } = req.query;
         const temp = await Template.find().limit(limit * 1).skip((page - 1) * limit);
         return res.json(temp);
      } catch (error) {
         res.status(500).json(error);
      }
   }

   async update(req, res) {
      try {
         const temp = req.body;
         if (!temp._id) {
            res.status(404).json('id not specified');
         }
         const updated = await Template.findByIdAndUpdate(temp._id, temp, { new: true });
         return res.json(updated);
      } catch (error) {
         res.status(500).json(error);
      }
   }

   async delete(req, res) {
      try {
         const id = req.params.id;
         const findProduct = await Template.findById(id);

         if (!id) {
            res.status(404).json('id not specified');
         }
         const temp = await Template.findByIdAndDelete(id);
         SaveFiles.removeFile(findProduct.picture);
         return res.json(temp);
      } catch (error) {
         res.status(500).json(error);
      }
   }

   async filterProduct(req, res) {
      try {
         const userPrice = Number(req.params.price);
         if (!userName) {
            res.status(404).json('there is no such product');
         }
         const regEx = /w+/gi
         const temp = await Template.find({ $and: [{ name: userName }, { price: { $lte: userPrice } }], balance: { $exists: true } }).sort({ 'price': 1 });
         return res.json(temp);
      } catch (error) {
         res.status(500).json(error);
      }
   }
}

export default new Controller();