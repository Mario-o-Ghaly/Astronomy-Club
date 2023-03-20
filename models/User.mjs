import mongoose from "mongoose";
import evalidator from "validator";
import bcrypt from "bcrypt";
import { UserRole } from "./UserType.mjs";
import phoneUtils from "google-libphonenumber";
import { AppError } from "../utils/AppError.mjs";
const phoneUtil = phoneUtils.PhoneNumberUtil.getInstance();

const userScema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    minLength: [2, "username is too short"],
    maxLength: [300, "username is too long"],
  },

  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [5, "password is too short"],
    validate: {
      validator: function () {
        if (Buffer.from(this.password).length > 72) return false;
      },
      message: "password is too long",
    },
  },
  passwordConfirm:{
    type: String,
    required: [true, "password confirmation is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "This email is already in use"],
    validate: {
      validator: function () {
        return evalidator.isEmail(this.email);
      },
      message: "Invalid email format",
    },
  },

  profileImage: {
    type: String,
  },

  phoneNumber: {
    type: String,
    minLength: [10, "invalid phone number,tshort"],
    maxLength: [13, "invalid phone number,tlong"],
    unique: [true, "This phone number is already in use"],
    validate: {
      validator: function () {
        try {
          phoneUtil.isValidNumberForRegion(
            phoneUtil.parse(this.phoneNumber, "EG"),
            "EG"
          );
        } catch (e) {
          return false;
        }
      },
      message: "invalid phone number",
    },
  },

  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserType",
    default: "6417697b843a6c0bf935c86e",
  }
  
});

//check that passwords match
userScema.pre("save", function (next) {
  if (this.password!=this.passwordConfirm) return next(new AppError(400, "passwords doesn't match"));
  this.passwordConfirm=undefined
  next();
});


//check that role foriegn key is valid
userScema.pre("save", async function (next) {
  const data = await UserRole.find({ _id: this.role });
  if (data.length == 0) return next(new AppError(400, "invalid role id"));
  next();
});

//encrypt password before storing it to the database
userScema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 3);
  next();
});

export const User = mongoose.model("User", userScema);
