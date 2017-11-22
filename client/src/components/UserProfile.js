import React from 'react';

const UserProfile = () => {
	return (
		<div className="container">
		  <h1>User Account</h1>
              <form>
                      <fieldset disabled>
                        <div className="form-group">
                          <label htmlFor="disabledTextInput">Username</label>
                          <input type="text" id="disabledTextInput" className="form-control" placeholder="Billmike" />
                        </div>
                        <div className="form-group">
                              <label htmlFor="disabledTextInput">Email Address</label>
                              <input type="text" id="disabledTextInput" className="form-control" placeholder="billmike1994@gmail.com" />
                            </div>
                      </fieldset>
                    </form>
		</div>
	)
}

export default UserProfile;
