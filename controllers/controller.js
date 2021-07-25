import Template from '../model/product.js';
import SaveFiles from '../upload/files.js';

class Controller {
   async addOne(req, res) {
      try {
         const { name, price, balance } = req.body;
         if (!name || name.length < 4 || name.length > 15) res.status(400).send({ error: 'check your name' });
         if (!req.files) res.status(400).send({ error: 'file is empty' });
         const fileName = SaveFiles.uploadFiles(req.files.picture);
         const temp = await Template.create({ name, price, balance, picture: fileName });
         res.json(temp);
      } catch (error) {
         res.status(500).send({ error: error.message });
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
         res.status(500).send({ error: error.message });
      }
   }

   async getAll(req, res) {
      try {
         const { page = 1, limit = 10, name, price } = req.query;
         const query = {};
         if (name) query.name = name;
         if (price) query.price = price;
         const temp = await Template.find({ $and: [{ name: query.name }, { price: { $lte: query.price } }], balance: { $exists: true } }).limit(limit * 1).skip((page - 1) * limit).sort({ 'price': 1 });
         return res.json(temp);
      } catch (error) {
         res.status(500).send({ error: error.message });
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
         res.status(500).send({ error: error.message });
      }
   }

   async delete(req, res) {
      try {
         const id = req.params.id;
         const findProduct = await Template.findById(id);
         if (!findProduct.picture) {
            res.status(500).send({ error: error.message });
         }
         if (!id) {
            res.status(404).json('id not specified');
         }
         const temp = await Template.findByIdAndDelete(id);
         SaveFiles.removeFile(findProduct.picture);
         return res.json(temp);
      } catch (error) {
         res.status(500).send({ error: error.message });
      }
   }
}

export default new Controller();