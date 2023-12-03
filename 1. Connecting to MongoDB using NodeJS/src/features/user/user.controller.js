import UserModel from './user.model.js';
import jwt from 'jsonwebtoken';
import UserRepository from './user.repository.js';
import bcrypt from 'bcrypt';

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  // Here Start the user signUp
  async signUp(req, res) {
    const { name, email, password, type } = req.body;
    // Hash Password :password always be string combination
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new UserModel(name, email, hashedPassword, type);
    await this.userRepository.signUp(user);

    res.status(201).send(user);
  }
  //  Here  Start the user signIn
  async signIn(req, res) {
    try {
      // 1. Find user by the email
      const user = await this.userRepository.findByEmail(req.body.email);
      if (!user) {
        return res.status(400).send('Incorrect Credentials');
      } else {
        // 2.compare password with hashedPassword
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          // 3. Create token.
          const token = jwt.sign(
            {
              userID: user._id,
              email: user.email,
            },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: '1h',
            }
          );

          // 4. Send token.
          return res.status(200).send(token);
        } else {
          return res.status(400).send('Incorrect Credentials');
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(401).sens('Something went wrong');
    }
  }
}
