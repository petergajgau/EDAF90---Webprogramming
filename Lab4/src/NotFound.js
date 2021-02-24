import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div class="text-center">
    <h3>404 - Not Found!</h3>
    <Link to='/composeSalad' className="btn btn-primary">
      Go Home
    </Link>
  </div>
);

export default NotFound;