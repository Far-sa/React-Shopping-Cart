const express = require('express')
// const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const shortid = require('shortid')

const app = express()
app.use(bodyParser.json())

//* connect to mongodb
mongoose.connect('mongodb://localhost/shopping-cart-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//* define product Model
const Product = mongoose.model(
  'products',
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String]
  })
)
//* use Cors per Route
// app.get('/products/:id', cors(), function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for a Single Route'})
// })

//*  Use Cors globally
// app.use(cors())

//* Routes (create and get Products)
app.get('/api/products', async (req, res) => {
  const products = await Product.find({})
  res.send(products)
})

app.post('/api/products', async (req, res) => {
  const newProduct = new Product(req.body)
  const savedProduct = await newProduct.save()
  res.send(savedProduct)
})

app.delete('/api/products/:id', async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id)
  res.send(deletedProduct)
})

//* lunch server
const port = process.env.PORT || 5000
app.listen(port, () => console.log('Server at http://localhost:5000'))
