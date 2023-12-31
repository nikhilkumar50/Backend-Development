const User = require("../models/user");

exports.handleUserSignUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
};



exports.handleUserSignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordandGenerateToken(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
};

