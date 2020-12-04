import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';
import { API } from '../config';
import { isAuthenticated } from '../config/authConfig';

const Registration = () => {
    const history = useHistory();
    const { user } = isAuthenticated();
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSignUp = e => {
        e.preventDefault();

        fetch(`${API}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        }).then(res => res.json())
            .then(data => {
                if (data.error) return toast.error(data.error);
                setValues({
                    name: "",
                    email: "",
                    password: ""
                });
                history.push('/login');
                toast.success('Registration completed !')
            });
    }

    // prevent access to logged in user
    useEffect(() => {
        user ? history.goBack() : history.replace('/registration');
    }, []);

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <div className="card shadow">
                    <div className="card-body">
                        <form onSubmit={handleSignUp}>
                            <div className="form-group">
                                <label>Enter Your Name</label>
                                <input type="text" name="name" onChange={handleChange} className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label>Enter Email Address</label>
                                <input type="email" name="email" onChange={handleChange} className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label>Enter Password</label>
                                <input type="password" name="password" onChange={handleChange} className="form-control" required />
                            </div>
                            <button className="btn btn-block btn-dark">Register</button>
                            <p className="mb-0 mt-2">Already Registered? <Link to='/login'>Login</Link> </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;