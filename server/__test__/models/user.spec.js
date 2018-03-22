import { expect } from 'chai';
import models from '../../models';

const { User } = models;

describe('User model', () => {
  describe('Create User', () => {
    it(
      'should throw an error if no username is provided when during creation',
      (done) => {
        User.create({
          email: 'somerandom@gmail.com',
          password: 'qwertyuiop'
        }).catch((error) => {
          expect(error.errors[0].message).to.equal('username cannot be null');
          expect(error.errors[0].type === 'notNull Violation');
        });
        done();
      }
    );
    it('should throw an error if no password is provided', (done) => {
      User.create({
        username: 'anyrandomname',
        email: 'anyrandomemail@gmail.com'
      }).catch((error) => {
        expect(error.errors[0].message).to.equal('password cannot be null');
        expect(error.errors[0].type).to.equal('notNull Violation');
      });
      done();
    });
    it('it should throw an error if password length is less than 8', (done) => {
      User.create({
        username: 'brandnew',
        email: 'brandnew@gmail.com',
        password: 'qwer'
      }).catch((error) => {
        expect(error.errors[0].message)
          .to.equal('Enter a password greater than 8 characters');
        expect(error.errors[0].type).to.equal('Validation error');
      });
      done();
    });
    it('Should throw an error if the email is of an invalid format', (done) => {
      User.create({
        username: 'william',
        email: 'williamgates',
        password: 'qwertyuiop'
      }).catch((error) => {
        expect(error.errors[0].message).to
          .equal('Validation isEmail on email failed');
        expect(error.errors[0].type).to.equal('Validation error');
        expect(error.errors[0].value).to.equal('williamgates');
      });
      done();
    });
    it('should create a user if all information is valid', (done) => {
      User.create({
        username: 'williamsshakespear',
        email: 'williamsshakespear@gmail.com',
        password: 'qwertyuiop'
      }).then((user) => {
        expect(user.dataValues.username).to.be.a('string');
        expect(user.dataValues.email).to.be.a('string');
        expect(user.dataValues.password).to.be.a('string');
        expect(user.dataValues.username).to.equal('williamsshakespear');
        expect(user.dataValues.email).to.equal('williamsshakespear@gmail.com');
        expect(user.dataValues.password).to.equal('qwertyuiop');
      });
      done();
    });
    it('should throw an error if the username already exists', (done) => {
      User.create({
        username: 'williamsshakespear',
        email: 'quantity@gmail.com',
        password: 'qwertyuiop'
      }).catch((error) => {
        expect(error.errors[0].message).to.equal('username must be unique');
        expect(error.errors[0].type).to.equal('unique violation');
        expect(error.errors[0].value).to.equal('williamsshakespear');
      });
      done();
    });
    it('Should throw an error if the email already exists', (done) => {
      User.create({
        username: 'zxcvbnmasd',
        email: 'williamsshakespear@gmail.com',
        password: 'qwertyuiop'
      }).catch((error) => {
        expect(error.errors[0].message).to.equal('email must be unique');
        expect(error.errors[0].type).to.equal('unique violation');
        expect(error.errors[0].value).to.equal('williamsshakespear@gmail.com');
      });
      done();
    });
  });
});
