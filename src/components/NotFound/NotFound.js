import React from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => {
    return (
        <div className="row">
            <div className="col-md-12 d-flex justify-content-center align-items-center">
                <div>
                    <h2 className="display-3">404 Not Found!</h2>
                    <br />
                    <Link to="/">Go Home</Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;