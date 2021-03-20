const express = require('express')
const app = express()
const port = 3000

const goodsRouter = require('./routes/goods');
const userRouter = require('./routes/user');

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'));

app.use('/goods', goodsRouter)
app.use('/user', userRouter)

app.use((req, res, next) => {
  console.log(req);
  next();
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/test', (req, res) => {
  let name = req.query.name;
  res.render('test', {name});
})

const mongoose = require('mongoose');

app.get('/mongodb', async (req, res) => {
    await mongoose.connect('mongodb://localhost/voyage', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    });

    const { Schema } = mongoose;
    const goodsSchema = new Schema({
      goodsId: {
        type: Number,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
        unique: true,
      },
      thumnailUrl:{
        type: String       
      },
      category: {
        type: String
      },
      price: {
        type: Number,
      }
    })

    let Goods = mongoose.model("Goods", goodsSchema)

    await Goods.create({
      goodsId: 1,
      name: "맛있는 저녁",
      thumnailUrl: "http://asia-mart.co.kr/web/product/big/asiamart_2379.jpg",
      category: "food",
      price: 5000
    });

		res.send('ok');
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})