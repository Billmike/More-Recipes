import { expect } from 'chai';
import validatesignup from '../../validators/validatesignup';

describe('Sign-up validator', () => {
  it('Should throw an error if the data does not contain an email', () => {
    const inputData = {
      username: 'billy',
      password: 'qwertyuiop'
    };
    const invalidInput = validatesignup(inputData);
    expect(invalidInput.errors.email).to
      .equal('Please provide a valid email address.');
  });
  it(
    'should return an error is no username is passed in the input data',
    () => {
      const inputData = {
        email: 'qwertyuiop@gmail.com',
        password: 'qwertyuiop'
      };
      const invalidInput = validatesignup(inputData);
      expect(invalidInput.errors.username).to.equal('Username is required.');
    }
  );
  it('should return an error if no password is passed in', () => {
    const inputData = {
      email: 'qwertyuiop@gmail.com',
      username: 'qwerty'
    };
    const invalidInput = validatesignup(inputData);
    expect(invalidInput.errors.password).to
      .equal('Please provide a password greater than 8 characters.');
  });
  it('should throw an error if the email is of a wrong format', () => {
    const inputData = {
      email: 'qwertyuiop',
      username: 'qwertyuip',
      password: 'qwertyuiop'
    };
    const invalidInput = validatesignup(inputData);
    expect(invalidInput.errors.email).to
      .equal('Please provide a valid email address.');
  });
  it(
    'should return an error if the length of' +
    ' the password is less than or equal to 8',
    () => {
      const inputData = {
        email: 'qwerty@gmail.com',
        username: 'qwertyuiop',
        password: 'qwert'
      };
      const invalidInput = validatesignup(inputData);
      expect(invalidInput.errors.password).to
        .equal('Please provide a password greater than 8 characters.');
    }
  );
});
