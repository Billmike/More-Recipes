import jwt from 'jsonwebtoken';

const userOneId = '1';
const userTwoId = '2';
const userThree = '3';

const users = [{
  id: userOneId,
  email: 'drakethegoat@email.com',
  password: 'somepassword',
  username: 'drakethegoat',
  tokens: jwt.sign({ id: userOneId }, process.env.SECRET).toString(),
}, {
  id: userTwoId,
  email: 'someemailtwo@email.com',
  password: 'somepassword',
  username: 'anotherusername',
  tokens: jwt.sign({ id: userTwoId }, process.env.SECRET).toString(),
}, {
  id: userThree,
  email: 'someemailthree@email.com',
  password: 'somepassword',
  username: 'someotheremail',
  tokens: jwt.sign({ id: userThree }, process.env.SECRET).toString(),
}];

export default users;
