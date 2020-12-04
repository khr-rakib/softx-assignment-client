import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../config/authConfig';


const LibrarianRoute = ({ children, ...rest }) => {
    console.log(isAuthenticated());

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated() && isAuthenticated().user.role === 1 ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export default LibrarianRoute;
