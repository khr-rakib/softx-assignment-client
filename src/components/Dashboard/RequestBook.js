import React, { useEffect, useState } from 'react';
import { API } from '../config';
import { isAuthenticated } from '../config/authConfig';

const RequestBook = () => {
    const [requests, setRequests] = useState([]);
    const { user, token } = isAuthenticated();

    const loadAllRequest = () => {
        fetch(`${API}/book/request/all/${user._id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json())
            .then(data => setRequests(data));
    }

    useEffect(() => {
        loadAllRequest();
    }, []);

    return (
        <table className="table table-stripped table-bordered">
            <thead>
                <tr>
                    <th>Book Name</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                {
                    requests && requests.map((item, i) => (
                        <tr key={i}>
                            <td>{item.book && item.book.bookName}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};

export default RequestBook;