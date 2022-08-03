const User = require("../../model/Pataint/auth");
const utils = require("../../utils");
const cryptoJs = require('crypto-js')
const jwt = require("jsonwebtoken");
const fast2sms = require('fast-two-sms')
const bcrypt = require("bcrypt");

const generateJwtToken = (_id, role,) => {
  return jwt.sign({ _id, role, }, process.env.JWT_SECRET);
};

exports.signInWithOtp = async (req, res) => {
  const { fullName, mobileNumber } = req.body;
  const userRes = await User.findOne({ mobileNumber: mobileNumber });
  if (userRes) {
    return res.send(utils.createError("This Mobile Number already registered"));

    // User.findOne({ mobileNumber: mobileNumber }, async (error, user) => {
    //     //console.log(user)
    //     if (error) {
    //         response.send(utils.createError("Some Database error"));
    //     } else if (!user) {
    //         response.send(utils.createError("User Not Found"));
    //     } else {
    //         const otp = utils.randomNumber();
    //         console.log("otp::----", otp)
    //         const OTP = cryptoJs.SHA256(otp);
    //         console.log(user);
    //         const userOtp = cryptoJs.SHA256(otp);
    //         console.log(userOtp);
    //         user.mobileNumber = mobileNumber,
    //             user.fullName = fullName,
    //             user.otp = OTP,

    //             //user.otpVerified = true;
    //             user.save(async (err, data) => {
    //                 console.log(err)
    //                 if (err) {
    //                     return response.send(utils.createError("Otp Not varified"));
    //                 } else {
    //                     var options = {
    //                         authorization: process.env.SMSKey,
    //                         message: `Please Use the following Otp ${otp}`, numbers: [mobileNumber]
    //                     }
    //                     const data = await fast2sms.sendMessage(options) //Asynchronous Function.

    //                     console.log(data)

    //                     return res.send(
    //                         utils.createSuccess("Send Otp Successfully", {
    //                             _id: user._id,
    //                             mobileNumber: user.mobileNumber,
    //                             fullName: user.fullName,
    //                         })
    //                     );
    //                 }
    //             });
    //}
    // });
  } else {
    const otp = utils.randomNumber();
    console.log("otp::----", otp)
    const OTP = cryptoJs.SHA256(otp);
    const saveData = {
      mobileNumber: mobileNumber,
      fullName: fullName,
      otp: OTP,
      role: "patient",
    };
    const resRes = new User(saveData);
    const admin = await resRes.save();
    console.log("user save", admin);
    if (admin) {

      var options = {
        authorization: process.env.SMSKey,
        message: `Please Use the following Otp ${otp}`, numbers: [mobileNumber]
      }
      const data = await fast2sms.sendMessage(options) //Asynchronous Function.

      console.log("Data::-----", data)

      const token = await generateJwtToken(
        admin._id,
        admin.role
      );
      console.log("token", token)

      return res.send(
        utils.createSuccess("Send Otp Successfully", {
          _id: admin._id,
          mobileNumber: admin.mobileNumber,
          fullName: admin.fullName,
          token: token
        })
      );
    } else {
      res.send(utils.createError("Some Database error"));
    }
  }
};


exports.varifyOtp = async (request, response) => {
  const { mobileNumber, otp } = request.body;
  console.log("shubh");
  User.findOne({ mobileNumber: mobileNumber }, async (error, user) => {
    //console.log(user)
    if (error) {
      response.send(utils.createError("Some Database error"));
    } else if (!user) {
      response.send(utils.createError("User Not Found"));
    } else {
      console.log(user);
      const userOtp = cryptoJs.SHA256(otp);
      console.log(userOtp);
      if (userOtp == user.otp) {
        user.otp = "";
        //user.otpVerified = true;
        user.save((err, data) => {
          console.log(err)
          if (err) {
            return response.send(utils.createError("Otp Not varified"));
          } else {
            return response.send(
              utils.createSuccess("Otp Varify successfully")
            );
          }
        });
      } else {
        response.send(utils.createError("Otp Do not match"));
      }
    }
  });
};

exports.addEmail = async (req, res) => {
  try {
    const { user_id } = req.params;
    const {
      email
    } = req.body;
    if (!user_id) return res.send(utils.createError("User id  is required."));
    User.findOne(
      { _id: user_id },
      { deleted: 0, __v: 0, createdOn: 0 },
      async (err, userDB) => {
        if (err) return res.send(utils.createError("Database Eror."));
        if (!userDB) return res.send(utils.createError("User Not Found"));
        const otp = utils.randomNumber();
        console.log("otp::----", otp)
        const OTP = cryptoJs.SHA256(otp);
        userDB.otp = OTP;
        if (email) userDB.email = email;
        userDB.save(async (error, data) => {
          if (error) {
            return res.send(utils.createError("database error"));
          }

          const body = " ";
          const user = `<h3 style="font-size:18px; font-weight:600;">Please use the following Otp for Set Password </h3>
        <h4 style="font-size:14px; color:#000; font-weight:600;">otp : <strong style="color:#13bb37; font-weight:500;">${otp}</strong></h4> `;

          const msg = await utils.sendEmail(
            email,
            "Email Varify requested",
            body,
            user
          );
          return res.send(
            utils.createSuccess("email added Successfuuly", data)
          );
        });
      }
    );
  } catch (ex) {
    console.log(ex);
    res.send(utils.createError("Unauthorized: invalid token"));
  }

}


exports.emailVarifyOtp = async (request, response) => {
  const { email, otp } = request.body;
  console.log("shubh");
  User.findOne({ email: email }, async (error, user) => {
    //console.log(user)
    if (error) {
      response.send(utils.createError("Some Database error"));
    } else if (!user) {
      response.send(utils.createError("User Not Found"));
    } else {
      console.log(user);
      const userOtp = cryptoJs.SHA256(otp);
      console.log(userOtp);
      if (userOtp == user.otp) {
        user.otp = "";
        user.isEmailVarified = true;
        user.save((err, data) => {
          console.log(err)
          if (err) {
            return response.send(utils.createError("Otp Not varified"));
          } else {
            return response.send(
              utils.createSuccess("Email Otp Varify successfully")
            );
          }
        });
      } else {
        response.send(utils.createError("Otp Do not match"));
      }
    }
  });
}



exports.setPassword = async (req, res) => {

  const { password } = req.body;
  const userRes = await User.findOne({ _id: req.params.user_id })
  console.log(userRes.isEmailVarified)

  if (userRes.isEmailVarified === true) {
    const Password = await bcrypt.hash(password, 10);

    const data = await User.findOneAndUpdate(
      { _id: req.params.user_id },
      { $set: { password: Password } },
      { new: true }
    )
    if (data) {
      return res.send(
        utils.createSuccess("Set Password successfully", data)
      );
    } else {
      res.send(utils.createError("data not found"));
    }
  } else {
    res.send(utils.createError("Please Varify Your Email Address"));
  }
}


exports.login = async (req, res) => {
  var { email, password, deviceToken } = req.body;
  var { email, password } = req.body;
  User.findOne({ email: email }, async (err, result) => {
    if (!result) {
      return res.send(
        utils.createError(
          "email does not exist. Please Sign Up"
        )
      );
    }
    console.log(result.password === password);

    const resPass = await bcrypt.compare(password, result.password);
    if (resPass) {
      result.deviceToken = deviceToken;
      await User.findByIdAndUpdate(
        { _id: result._id },
        {
          $set: {
            deviceToken: deviceToken,
          },
        }
      );

      const token = generateJwtToken(result._id, result.role);

      return res.send(
        utils.createSuccess("Login Successfully", {
          _id: result._id,
          fullName: result.fullName,
          mobileNumber: result.mobileNumber,
          email: result.email,
          role: result.role,
          deviceToken: result.deviceToken,
          location: result.location,
          token: token,
        })
      );
    } else {
      return res.send(utils.createError("Password Does not match"));
    }
  });
};


exports.updateLocation = async (req, res) => {
  const user = await User.findById({ _id: req.params.user_id })
  console.log(user, "users")
  if (user) {

    const user = {
      isOnline: req.body.isOnline,
      language: req.body.language,
      address: req.body.address,
      location: {
        type: 'Point',
        coordinates: [req.body.longitude, req.body.latitude]
      },
    }
    //console.log(user)
    await User.findByIdAndUpdate({ _id: req.params.user_id }, { $set: user }, { new: true }, (err, data) => {
      console.log(data)
      if (err) {
        return res.status(200).json({
          status: 400,
          message: "User not found"
        });
      }
      res.status(200).json({
        message: "user update location Successfully",
        status: 200, data: {
          _id: data._id,
          fullName: data.fullName,
          mobileNumber: data.mobileNumber,
          email: data.email,
          role: data.role,
          location: data.location,
          deviceToken: data.deviceToken,
        }
      })
      console.log(data)
    })
  } else {
    res.json({
      status: 401,
      message: "Please Register "
    })
  }
}


exports.forgotPassword = async (request, response) => {

  const { email } = request.body;
  if (email.split(" ").length > 1) {
    return response.send(utils.createError("Invalid email"));
  } else
    User.findOne({ email: email }, (error, user) => {
      if (error) {
        return response.send(utils.createError("Database error"));
      } else if (!user) {
        return response.send(utils.createError("User not found"));
      } else {
        const otp = utils.randomNumber();
        user.otp = cryptoJs.SHA256(otp);
        user.otpVerified = false;
        user.save(async (error, data) => {
          if (error) {
            console.log(error);
            return response.send(utils.createError("Database error"));
          }
          console.log("run");

          const body = " ";
          const user = `<h3 style="font-size:18px; font-weight:600;">Please use the following Otp to Reset your Password</h3>
        <h4 style="font-size:14px; color:#000; font-weight:600;">Otp: <strong style="color:#13bb37; font-weight:500;">${otp}</strong></h4>`;

          const msg = await utils.sendEmail(
            email,
            "Forgot Password requested",
            body,
            user
          );

          return response.send(
            utils.createSuccess("password reset otp sent to your email account")
          );
        });
      }
    });
}





exports.forgotPasswordOtpVarified = async (request, response) => {
  const { email, otp } = request.body;
  console.log("shubh");
  User.findOne({ email: email }, async (error, user) => {
    //console.log(user)
    if (error) {
      response.send(utils.createError("Some Database error"));
    } else if (!user) {
      response.send(utils.createError("User Not Found"));
    } else {
      console.log(user);
      const userOtp = cryptoJs.SHA256(otp);
      console.log(userOtp);
      if (userOtp == user.otp) {
        user.otp = "";
        user.otpVerified = true;
        user.save((err, data) => {
          if (err) {
            return response.send(utils.createError("Password not changed"));
          } else {
            return response.send(
              utils.createSuccess("Otp Varify successfully")
            );
          }
        });
      } else {
        response.send(utils.createError("Otp Do not match"));
      }
    }
  });
};

exports.change_password = async (request, response) => {
  const { email, new_password, confirm_password } = request.body;
  console.log("shubh");
  User.findOne({ email: email }, async (error, user) => {
    //console.log(user)
    if (error) {
      response.send(utils.createError("Some Database error"));
    } else if (!user) {
      response.send(utils.createError("User Not Found"));
    } else {
      if (user.otpVerified === true) {
        if (new_password === confirm_password) {
          user.password = await bcrypt.hash(new_password, 10);
          user.otpVerified = false;

          user.save((err, data) => {
            if (err) {
              return response.send(utils.createError("Password not changed"));
            } else {
              return response.send(
                utils.createSuccess("Reset Password successfully", {
                  _id: data._id,
                  fullName: data.fullName,
                  mobileNumber: data.mobileNumber,
                  email: data.email,
                  role: data.role,
                  deviceToken: data.deviceToken,
                })
              );
            }
          });
        } else {
          response.send(
            utils.createError(
              "New Password and Confirm Password Does Not Match"
            )
          );
        }
      } else {
        response.send(utils.createError("Otp Not Varified"));
      }
    }
  });
};


exports.editProfile = async (req, res) => {
  try {
    const { user_id } = req.params;
    const {
      fullName,
    } = req.body;
    if (!user_id) return res.send(utils.createError("User id  is required."));
    User.findOne(
      { _id: user_id },
      { deleted: 0, __v: 0, createdOn: 0 },
      async (err, userDB) => {
        if (err) return res.send(utils.createError("Database Eror."));
        if (!userDB) return res.send(utils.createError("User Not Found"));
        if (fullName) userDB.fullName = fullName;
        if (req.file) {
          userDB.image = "/profile/" + req.file.filename;
        }
        userDB.save(async (error, data) => {
          if (error) {
            return res.send(utils.createError("database error"));
          }
          return res.send(
            utils.createSuccess("Profile Updated Successfuuly", data)
          );
        });
      }
    );
  } catch (ex) {
    console.log(ex);
    res.send(utils.createError("Unauthorized: invalid token"));
  }
};

exports.profileDetail = async (req, res) => {
  const user = await User.findOne({ _id: req.params.user_id });
  if (user) {
    await User.findOne({ _id: req.params.user_id })

      .exec((err, userDB) => {
        if (err) return res.send(utils.createError("Database Eror."));
        res.send(
          utils.createResult(err, "Profile Details Successfully", userDB)
        );
      });
  } else {
    return res.send(utils.createError("User Not Found"));
  }
}