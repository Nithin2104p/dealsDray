import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Auth from '../Auth';
import { useHistory } from 'react-router';

const EditPost = () => {
    const [postData, setPostData] = useState({
        title: '',
        body: '',
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const id = localStorage.getItem('post-id');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/posts/${id}`, {
                headers: {
                    'x-auth-token': localStorage.getItem('x-auth-token')
                }
            });
            setPostData(res.data);
        } catch (error) {
            setError('Error fetching post data');
            console.log('Error fetching post data:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(`http://localhost:8000/posts/${id}`, postData, {
                headers: {
                    'x-auth-token': localStorage.getItem('x-auth-token')
                }
            });
            if (res.status === 200) {
                setMessage(res.data.message);
                history.push('/home');
            }
        } catch (error) {
            setError('Error updating post');
            console.log('Error updating post:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value
        });
    };

    return (
        <Auth>
            <div>
                <h1>Update Post</h1>
                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>


                    <div className="form-group">
                        <input
                            className="form-control"
                            onChange={handleChange}
                            value={postData.name}
                            name="name"
                            type="text"
                            placeholder="Enter name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            onChange={handleChange}
                            value={postData.email}
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            onChange={handleChange}
                            value={postData.mobile}
                            name="mobile"
                            type="tel"
                            placeholder="Enter mobile"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            onChange={handleChange}
                            value={postData.designation}
                            name="designation"
                            type="text"
                            placeholder="Enter designation"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            onChange={handleChange}
                            value={postData.gender}
                            name="gender"
                            type="text"
                            placeholder="Enter gender"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            onChange={handleChange}
                            value={postData.course}
                            name="course"
                            type="text"
                            placeholder="Enter course"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input className="btn btn-primary" type="submit" name="submit" />
                    </div>
                </form>
            </div>
        </Auth>
    );
};

export default EditPost;
