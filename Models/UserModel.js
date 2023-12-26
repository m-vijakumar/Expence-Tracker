const mongooes = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongooes.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
    },
    username:{
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true,
    },

    Transactions: [
      {
        description: {
          type: String,
          require: true,
        },
        type:{
          type: String,
          required: true
        },
        amount: {
          type: Number,
          require: true,
        },
        category: {
          type: String,
          require: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', function(next){
  var user = this;
  const saltRounds = 12;

  if (!user.isModified('password')) {
    console.log("password not modified ");
    return next();
  }
  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    console.log("password  modified");
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword =  async function(input_password) {
  return await bcrypt.compare(input_password, this.password);
};

UserSchema.statics.checkIfUserExists = async (email) => {
  return await User.findOne({ email: email })
    .then((result) => {
      console.log("result" + result);
      return result;
    })
    .catch(() => {
      throw err;
    });
};

UserSchema.statics.updateUserDetails = ()=>{
  return 
}

const User = (module.exports = mongooes.model("users", UserSchema));
