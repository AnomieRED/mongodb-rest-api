import Template from '../model/product.js';
import SaveFiles from '../upload/files.js';

class Controller {
   async addOne(req, res) {
      try {
         const { name, price, balance } = req.body;
         if (!name || name.length < 4 || name.length > 15) res.status(400).send({error: ''}); // Если обязательный параметр не передан какой смысл принимать фото
         const fileName = SaveFiles.uploadFiles(req.files.picture); // а если файл не передан?
         const temp = await Template.create({ name, price, balance, picture: fileName });
         res.json(temp);
      } catch (error) {
         res.status(500).send({error: error.message}); // и так на всех остальных
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
         const { page = 1, limit = 10, name, price } = req.query;
         const query = {};
         if (name) {
            query.name = name;
         } // и так далее со всем параметрами, выносить отдельный метод для поиска нет необходимости, точно не в этом случае
         const temp = await Template.find(query).limit(limit * 1).skip((page - 1) * limit);
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
         SaveFiles.removeFile(findProduct.picture); // как только у нас продукт без изображения прилка крашится
         return res.json(temp);
      } catch (error) {
         res.status(500).json(error);
      }
   }

   async filterProduct(req, res) {
      try {
         const userPrice = Number(req.params.price);
         if (!userName) {  //дальше этой строчки метод работать никогда не будет
            res.status(404).json('there is no such product');
         }
         const temp = await Template.find({ $and: [{ name: userName }, { price: { $lte: userPrice } }], balance: { $exists: true } }).sort({ 'price': 1 });
         return res.json(temp);
      } catch (error) {
         res.status(500).json(error);
      }
   }
}

export default new Controller();