import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { loadImage } from '../config';
import { isAuthenticated } from '../config/authConfig';
import { toast } from 'react-toastify';
import { API } from '../config';

const Books = () => {
    const [books, setBooks] = useState([]);
    const { user } = isAuthenticated();

    useEffect(() => {
        fetch(`${API}/book/active`)
            .then(res => res.json())
            .then(book => {
                if (book.error) return toast.error(book.error);
                setBooks(book)
            })
            .catch(err => toast.error(err))
    }, []);

    return (
        <div className="row mb-5">
            {
                books && books.map((book, i) => (
                    <div className="col-md-4 mt-4" key={i}>
                        <div className="card shadow">
                            <img src={loadImage(book._id)} alt={book.bookName} className="card-img-top book__img" />
                            <div className="card-body">
                                <h3>{book.bookName}</h3>
                                <p className="text-muted m-0">Written By: <strong>{book.author}</strong> - {moment(book.releaseDate).format('MMM-YYYY')} </p>
                            </div>
                            <div className="card-footer m-0 p-0">
                                <Link to={`/book/request/${book._id}/${user && user._id}`} className="btn btn-dark btn-block">Request Book</Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Books;