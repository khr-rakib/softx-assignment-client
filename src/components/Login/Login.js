import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { authenticate, isAuthenticated } from '../config/authConfig';
import { API } from '../config';

const Login = () => {
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const { user } = isAuthenticated();
    console.log(from);
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleLogin = e => {
        e.preventDefault();

        fetch(`${API}/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        }).then(res => res.json())
            .then(user => {
                if (user.error) return toast.error(user.error);
                setValues({
                    email: "",
                    password: ""
                });
                authenticate(user, () => {
                    toast.success("You have successfully LoggedIn !!!");
                    window.location.replace(from.pathname);
                })
            })
            .catch(err => toast.error(err));
    }

    // if user logged in prevent to go login page
    useEffect(() => {
        user && user.email ? history.goBack() : history.replace('/login');
    }, []);

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <div className="card shadow">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label>Enter Email Address</label>
                                <input type="email" name="email" onChange={handleChange} className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label>Enter Password</label>
                                <input type="password" name="password" onChange={handleChange} className="form-control" required />
                            </div>
                            <button className="btn btn-block btn-dark">Login</button>
                            <p className="mt-2 mb-0">Don't Have Account? <Link to="/registration">Register Now</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;