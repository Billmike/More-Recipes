import { expect } from 'chai';
import validatesignin from '../../validators/validatesignin';

const helper = validatesignin;

describe('Validate signin function', () => {
  it('should return an error if no email is passed in the data', () => {
    const data = {
      password: 'qwertyuiop'
    };
    const invalidInput = validatesignin(data);
    expect(invalidInput.errors.email).to
      .equal('Input an email address to sign-in.');
  });
  it('should return an error if no password is passed in', () => {
    const data = {
      email: 'qwertyuiop@gmail.com'
    };
    const invalidInput = validatesignin(data);
    expect(invalidInput.errors.password).to
      .equal('Input a password to sign-in.');
  });
});
