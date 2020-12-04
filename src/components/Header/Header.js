import React from 'react';
import { NavLink } from 'react-router-dom';
import { isAuthenticated, signout } from '../config/authConfig';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary shadow">
            <div className="container">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <NavLink exact activeStyle={{ color: "yellow" }} className="nav-link" to="/"><strong>Books</strong></NavLink>
                    </li>
                    <li className="nav-item active">
                        <NavLink activeStyle={{ color: "yellow" }} className="nav-link" to="/librarian/dashboard"><strong>Librarian Panel</strong></NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {
                        isAuthenticated() && (
                            <li className="nav-item active">
                                <button className="nav-link btn btn-link" onClick={e => signout(() => window.location.reload('/'))}><strong>Logout</strong></button>
                            </li>
                        )
                    }

                    {
                        !isAuthenticated() && (
                            <>
                                <li className="nav-item active">
                                    <NavLink activeStyle={{ color: "yellow" }} className="nav-link" to="/login"><strong>Login</strong></NavLink>
                                </li>

                                <li className="nav-item active">
                                    <NavLink activeStyle={{ color: "yellow" }} className="nav-link" to="/registration"><strong>Registration</strong></NavLink>
                                </li>
                            </>
                        )
                    }
                </ul>

            </div>
        </nav>
    );
};

export default Header;