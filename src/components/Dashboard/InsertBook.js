import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../config/authConfig';
import { toast } from 'react-toastify';
import { API } from '../config';
import { useHistory } from 'react-router-dom';

const InsertBook = () => {
    const history = useHistory();
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        bookName: "",
        author: "",
        genre: "",
        active: true,
        formData: "",
        releaseDate: ""
    });
    const { formData } = values;

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
    }, []);

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value })
    }

    const handleInsertBook = e => {
        e.preventDefault();

        fetch(`${API}/book/create/${user._id}`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        }).then(res => res.json())
            .then(data => {
                if (data.error) return toast.error(data.error);
                setValues({
                    bookName: "",
                    author: "",
                    genre: "",
                    active: true,
                    formData: "",
                    releaseDate: ""
                });
                history.push('/librarian/dashboard');
                return toast.success('Product created successfully');
            });
    }

    return (
        <div className="card shadow">
            <div className="card-body">
                <form onSubmit={handleInsertBook}>
                    <div className="form-group">
                        <label>Enter Book Name</label>
                        <input type="text" name="bookName" onChange={handleChange('bookName')} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Enter Author Name</label>
                        <input type="text" name="author" onChange={handleChange('author')} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Pick Release Date</label>
                        <input type="date" name="releaseDate" onChange={handleChange('releaseDate')} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Choose Book Photo</label>
                        <input type="file" onChange={handleChange('photo')} accept="image/*" name="photo" className="form-control-file" />
                    </div>
                    <button className="btn btn-secondary btn-block">Save</button>
                </form>
            </div>
        </div>
    );
};

export default InsertBook;