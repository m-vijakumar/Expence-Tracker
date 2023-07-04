const User = require("../models/UserModel");

exports.getAllTranscations = async (req, res) => {
  await User.findOne({ _id: req.session.user.id }, { password: 0, __v: 0 })
    .then((result) => {
      res.json({
        error: false,
        data: result.Transactions,
      });
    })
    .catch((err) => {
      res.json({
        error: true,
        msg: "err  :" + err,
      });
    });
};

exports.create = async (req, res) => {
  const { description, amount, category, date } = req.body;

  const transcationData = {
    description: description,
    amount: amount,
    category: category,
    date: date,
  };

  console.log(transcationData);
  await User.findOneAndUpdate(
    { _id: req.session.user.id },
    {
      $push: {
        Transactions: {
          $each: [transcationData],
          $sort: { name: 1 },
          collation: { locale: "en" },
        },
      },
    },
    { new: true, password: 0, __v: 0 }
  )
    .collation({ locale: "en" })
    .then((result) => {
      res.json({
        error: false,
        msg: "Transcation Added",
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: true,
        msg: "internal Error...!!!",
      });
    });
};

exports.deleteTranscation = async (req, res) => {
    console.log( "Wefaef" + req.body.postId  )
    await User.updateOne(
      { _id: req.session.user.id},
      { $pull: {Transactions: { _id: req.body.postId  }  } } )
      .then((result) => {
        console.log(result)
        res.json({
          error: false,
          msg: "Transaction Deleted",
        });
      })
      .catch((err) => {
        console.log(err);
        res.json({
          error: true,
          msg: "internal Error...!!!",
        });
      });
}