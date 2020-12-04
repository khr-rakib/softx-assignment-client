import React, { useEffect, useState } from 'react';
import { loadImage } from '../config';
import moment from 'moment';
import { API } from '../config';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../config/authConfig';

const AllBook = () => {
    const [books, setBooks] = useState([]);
    const { user, token } = isAuthenticated();

    useEffect(() => {
        fetch(`${API}/books`)
            .then(res => res.json())
            .then(book => setBooks(book));
    }, []);

    const activeBook = (bookId) => {
        fetch(`${API}/book/status/active/${bookId}/${user._id}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        }).then(() => window.location.reload('/librarian/dashboard'))
    }

    const inactiveBook = (bookId) => {
        fetch(`${API}/book/status/inactive/${bookId}/${user._id}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }

        }).then(() => window.location.reload('/librarian/dashboard'))
    }

    const deleteBook = (bookId) => {
        if (window.confirm('Are you sure to delete?')) {
            fetch(`${API}/book/${bookId}/${user._id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            }).then(() => window.location.reload('/librarian/dashboard'))
        }
    }


    return (
        <table className="table table-stripped table-bordered">
            <thead>
                <tr>
                    <th>Book Name</th>
                    <th>Author</th>
                    <th>Realise Date</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    books.map((book, i) => (
                        <tr key={i}>
                            <td>{book.bookName}</td>
                            <td>{book.author}</td>
                            <td>{moment(book.releaseDate).format('DD MMM YYYY')}</td>
                            <td className="text-center"><img src={loadImage(book._id, book)} alt={book.bookName} height="50" /></td>
                            <td className="text-center">
                                {
                                    book.active ? <span onClick={() => inactiveBook(book._id)} className="badge badge-warning">Inactive</span>
                                        : <span onClick={() => activeBook(book._id)} className="badge badge-success">Active</span>
                                }
                            </td>
                            <td>
                                {/* I don't want to use any third party library for only two icons. */}
                                <Link className="btn btn-sm" to={`/librarian/dashboard/book/edit/${book._id}`}>✏</Link>
                                <button onClick={() => deleteBook(book._id)} className="btn btn-sm">❌</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};

export default AllBook;