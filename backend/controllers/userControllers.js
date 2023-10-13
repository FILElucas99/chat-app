const asyncHandler = require("express-async-handler");
const User = require('../Modelos/userModel');
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
  
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Por favor, preencha todos os campos");
    }
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error("Usuário já existe");
    }
  
    const user = await User.create({
      name,
      email,
      password,
      pic,
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Usuário não encontrado");
    }
  });

  const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Email ou senha inválido");
    }
  });

module.exports = { registerUser, authUser };