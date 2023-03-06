const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../utils/statusCodes.js');
const userService = require('../services/user.service.js');

const secret = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    const { data: { userId } } = jwt.verify(authorization, secret);
    const user = await userService.getById(userId);

    if (!user) {
      return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  validateToken,
};