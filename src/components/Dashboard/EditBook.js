import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../config/authConfig';
import { toast } from 'react-toastify';
import { API } from '../config';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

const EditBook = () => {
    const history = useHistory();
    const { bookId } = useParams();
    const [values, setValues] = useState({})
    const { formData } = values;
    const { user, token } = isAuthenticated();

    useEffect(() => {
        fetch(`${API}/book/${bookId}`)
            .then(res => res.json())
            .then(data => setValues({
                bookName: data.bookName,
                author: data.author,
                active: data.active,
                releaseDate: data.releaseDate,
                formData: new FormData()
            }))
    }, []);

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value })
    }

    const handleUpdateBook = e => {
        e.preventDefault();

        fetch(`${API}/book/${bookId}/${user._id}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        }).then(res => res.json())
            .then(data => {
                if (data.error) return toast.error(data.error);
                history.push('/librarian/dashboard');
                toast.success('Product Inserted')
            });
    }

    return (
        <div className="card shadow">
            <div className="card-body">
                <form onSubmit={handleUpdateBook}>
                    <div className="form-group">
                        <label>Enter Book Name</label>
                        <input value={values.bookName} type="text" name="bookName" onChange={handleChange('bookName')} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Enter Author Name</label>
                        <input value={values.author} type="text" name="author" onChange={handleChange('author')} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Pick Release Date</label>
                        <input type="date" name="releaseDate" value={values.releaseDate} onChange={handleChange('releaseDate')} className="form-control" />
                        <small>{moment(values.releaseDate).format('MM-DD-YYYY')}</small>
                    </div>
                    <div className="form-group">
                        <label>Choose Book Photo</label>
                        <input type="file" onChange={handleChange('photo')} accept="image/*" name="photo" className="form-control-file" />
                    </div>

                    <button className="btn btn-secondary btn-block">Update</button>
                </form>
            </div>
        </div>
    );
};

export default EditBook;