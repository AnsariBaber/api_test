var express = require('express');
var router = express.Router();
const Trade = require('../models/trades');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<p>HTML Data</p>');
});

router.post('/trade', function(req, res, next) {
  res.send('<p>HTML Data</p>');
});


// {
//   "id":1,
//   "type": "buy",
//   "user_id": 23,
//   "symbol": "ABX",
//   "shares": 30,
//   "price": 134,
//   "timestamp": 1531522701000
// }

router.post("/tradeupload", async (req, res) => {
  try {
    const newUser = new Trade({
      id:req.body.id,
      type: req.body.type,
      user_id: req.body.Types.ObjectId(req.userId),
      Symbol: req.body.Symbol,
      shares: req.body.shares,
      price: req.body.price,
      timestamp: req.body.timestamp,
    });
    await newUser.save();
    res.status(200).json({
      message: "Data saved successfully",
    });
  } catch (error) {
    console.log(error);
  }
});



router.get("/trades", async (req, res) => {
  try {
    const allcollections = await Trade.find({ author: req.userId });
    console.log(allcollections);

    res.status(200).json({
      data: allcollections,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get('/trades/:id', async (req, res) => {

  try {
    
  const { id } = req.params;
  const tradesData = await Trade.find(t => t.id === parseInt(id));

  if (!tradesData) {
    return res.status(404).json({ error: 'Data not found' });
  }

  res.json(tradesData);
  } catch (error) {
    console.log(error);
  }


});

module.exports = router;
