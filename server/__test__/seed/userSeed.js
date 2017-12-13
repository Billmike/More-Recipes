import jwt from 'jsonwebtoken';

const userOneId = '1';
const userTwoId = '2';

const users = [{
  id: userOneId,
  email: 'someemail@email.com',
  password: 'somepassword',
  username: 'someusername',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ id: userOneId }, process.env.SECRET).toString(),
  }],
}, {
  id: userTwoId,
  email: 'someemailtwo@email.com',
  password: 'somepassword',
  username: 'anotherusername',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ id: userTwoId }, process.env.SECRET).toString(),
  }],
}];

export default users;
