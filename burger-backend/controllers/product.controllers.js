const _ = require('lodash')
const formidable = require('formidable')
const { firstValues } = require('formidable/src/helpers/firstValues.js');
const fs = require('fs')
const { Product, validate } = require('../models/product.model')

module.exports.createProduct = async (req, res) => {

      let form = new formidable.IncomingForm();
      form.keepExtensions = true;
      form.multiples = true;

      form.parse(req, async (err, fields, files) => {
            const exceptions = ['thisshouldbeanarray'];
            const fieldsSingle = firstValues(form, fields, exceptions);
            if (err) res.status(400).send("Something went wrong!")

            const { error } = validate(_.pick(fieldsSingle, ['name', 'description', 'price', 'category', 'quantity']))
            if (error) return res.status(400).send(error.details[0].message)

            const product = new Product(fieldsSingle)

            if (files.photo) {
                  //<input type=file name=photo />
                  fs.readFile(files.photo[0].filepath, async (err, data) => {
                        if (err) res.status(400).send("Problem in File data!")

                        console.log(files.photo[0])

                        product.photo.data = data;
                        product.photo.contentType = files.photo[0].mimetype;
                        const result = await product.save()
                        return res.status(201).send({
                              message: 'Product created successfully',
                              data: result
                        })
                  })
            } else {
                  return res.status(400).send("No Image Provided!")
            }
      })
}

module.exports.getProducts = async (req, res) => {

      let order = req.query.order === 'desc' ? -1 : 1;
      let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
      let limit = req.query.limit ? parseInt(req.query.limit) : 10
      const products = await Product.find()
            .select({ photo: 0 })
            .populate('category', 'name')
            .sort({ [sortBy]: order })
            .limit(limit)

      //.sort({ name: -1 }).select({ _id: 1, name: 1 })

      return res.status(200).send(products)
}

module.exports.getProductById = async (req, res) => {
      const productId = req.params.id;
      const product = await Product.findById(productId)
            .select({ photo: 0 })
            .populate('category', 'name')

      if (!product) return res.status(404).send("Not Found")
      return res.status(200).send(product)
}

module.exports.getProductPhoto = async (req, res) => {
      const productId = req.params.id;
      const product = await Product.findById(productId)
            .select({ photo: 1, _id: 0 })
      res.set("content-Type", product.photo.contentType)

      if (!product) return res.status(404).send("Not Found")
      return res.status(200).send(product.photo.data)
}

module.exports.updateProductById = async (req, res) => {
      const productId = req.params.id;
      const product = await Product.findById(productId)

      let form = new formidable.IncomingForm();
      form.keepExtensions = true;
      form.multiples = true;

      form.parse(req, async (err, fields, files) => {

            const exceptions = ['thisshouldbeanarray'];
            const fieldsSingle = firstValues(form, fields, exceptions);

            if (err) res.status(400).send("Something went wrong!")

            const updatedFields = _.pick(fieldsSingle, ['name', 'description', 'price', 'category', 'quantity'])

            _.assignIn(product, updatedFields)

            if (files.photo) {
                  //<input type=file name=photo />
                  fs.readFile(files.photo[0].filepath, async (err, data) => {
                        if (err) res.status(400).send("Problem in File data!")

                        console.log(files.photo[0])

                        product.photo.data = data;
                        product.photo.contentType = files.photo[0].mimetype;
                        const result = await product.save()
                        return res.status(200).send({
                              message: 'Product updated successfully',
                              data: result
                        })
                  })
            } else {
                  const result = await product.save()
                  return res.status(200).send({
                        message: 'Product updated successfully',
                        data: result
                  })
            }

      })
}

//Filter by any fields
/*
const body = {
      order:'desc',
      sortBy:'price',
      limit:6,
      skip:20,
      filters:{
            price:[1000,2000],
            category:['6089sdkjkfnskljgn','60fokdjgs34879','flkdsng;jrje3425']
      }
}
*/

module.exports.filterProducts = async (req, res) => {
      console.log(req.body)
      let order = req.body.order === 'desc' ? -1 : 1;
      let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
      let limit = req.body.limit ? parseInt(req.body.limit) : 10
      let skip = req.body.skip ? parseInt(req.body.skip) : 0
      let filters = req.body.filters;


      let args = {}

      for (let key in filters) {
            if (filters[key].length > 0) {
                  if (key === 'price') {
                        // {price: {$gte: 0, $lte:1000}}
                        args['price'] = { $gte: filters['price'][0], $lte: filters['price'][1] }

                  }

                  if (key === 'category') {
                        category: { $in: [] }
                        args['category'] = {
                              $in: filters['category']
                        }

                  }
            }
      }

      const products = await Product.find(args)
            .select({ photo: 0 })
            .populate('category', 'name')
            .sort({ [sortBy]: order })
            .skip(skip)
            .limit(limit)

      return res.status(200).send(products)
}