const userService = require('.userService');
const tokenService = require('.tokenService');

const register = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    const token = await tokenService.createToken({ id: user._id, role: user.role });
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    const token = await tokenService.createToken({ id: user._id, role: user.role });
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const validateToken = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    const payload = await tokenService.decryptToken(token);
    res.status(200).json({ valid: true, payload });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

/**
 * processAuthRequest:
 * This method will be used by the Kafka consumer to handle an incoming auth request.
 * It takes email and password, tries to authenticate and returns role and token.
 */
const processAuthRequest = async (email, password) => {
  const user = await userService.loginUser(email, password);
  const token = await tokenService.createToken({ id: user._id, role: user.role });
  return { role: user.role, token };
};

module.exports = { register, login, validateToken, processAuthRequest };
