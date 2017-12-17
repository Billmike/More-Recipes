import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
	return(
		<div>
			404 - <Link to="/">Return to Homepage</Link>
		</div>
		)
}

export default NotFoundPage;
