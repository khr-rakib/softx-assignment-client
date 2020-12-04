import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../config';
import { isAuthenticated } from '../config/authConfig';

const RequestBook = () => {
    const history = useHistory();
    const { _id } = useParams();
    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        name: user.name,
        email: user.email,
        phone: "",
        book: _id
    })

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        fetch(`${API}/book/request/${_id}/${user._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(values)
        }).then(res => res.json())
            .then(data => {
                toast.success('Done !')
                history.push('/');
            })

    }


    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <div className="card shadow">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Enter Your Name</label>
                                <input name="name" value={user.name} onChange={handleChange} type="text" className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Enter Your Email</label>
                                <input name="email" value={user.email} onChange={handleChange} type="email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Enter Your Phone</label>
                                <input type="text" name="phone" onChange={handleChange} className="form-control" />
                            </div>
                            <button className="btn btn-secondary btn-block">Send Request</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestBook;