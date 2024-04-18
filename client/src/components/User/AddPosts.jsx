import axios from 'axios';
import React, { useState } from 'react';
import Auth from '../Auth';
import { useHistory } from 'react-router';
import './Addtoposts.css'
const AddPosts = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('');
    const [course, setCourse] = useState([]);
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare form data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('designation', designation);
        formData.append('gender', gender);
        formData.append('course', course.join(','));
        formData.append('image', image);

        try {
            const res = await axios.post('http://localhost:8000/posts/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "x-auth-token": localStorage.getItem("x-auth-token"),
                },
            });

            if (res.status === 200) {
                setMessage(res.data.message);
                setTitle('');
                setBody('');
                setName('');
                setEmail('');
                setMobile('');
                setDesignation('');
                setGender('');
                setCourse([]);
                setImage(null);
                history.push('/home');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Auth>
            <h1>Add New Story</h1>
            {message ? <div>{message}</div> : null}
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Enter name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">mobile</label>
                    <input className="form-control" onChange={(e) => setMobile(e.target.value)} value={mobile} type="tel" placeholder="Enter mobile number" required />
                </div>
                <div className="form-group">
                    <label htmlFor="designation">Designation</label>
                    <select className="form-control" onChange={(e) => setDesignation(e.target.value)} value={designation} required>
                        <option value="">Select designation</option>
                        <option value="HR">HR</option>
                        <option value="MANAGER">MANAGER</option>
                        <option value="SALES">SALES</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Gender </label>
                    <br />
                    <label>
                        <input type="radio" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} /> Male
                    </label>
                    <label>
                        <input type="radio" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} /> Female
                    </label>
                    <label>
                        <input type="radio" value="other" checked={gender === 'other'} onChange={(e) => setGender(e.target.value)} /> Other
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        <label>Course</label>
                        <br />
                        <input type="checkbox" value="MCA" checked={course.includes('MCA')} onChange={(e) => {
                            const { value, checked } = e.target;
                            if (checked) {
                                setCourse((prevCourses) => [...prevCourses, value]);
                            } else {
                                setCourse((prevCourses) => prevCourses.filter((course) => course !== value));
                            }
                        }} /> MCA
                    </label>
                    <label>
                        <input type="checkbox" value="BCA" checked={course.includes('BCA')} onChange={(e) => {
                            const { value, checked } = e.target;
                            if (checked) {
                                setCourse((prevCourses) => [...prevCourses, value]);
                            } else {
                                setCourse((prevCourses) => prevCourses.filter((course) => course !== value));
                            }
                        }} /> BCA
                    </label>
                    <label>
                        <input type="checkbox" value="BSC" checked={course.includes('BSC')} onChange={(e) => {
                            const { value, checked } = e.target;
                            if (checked) {
                                setCourse((prevCourses) => [...prevCourses, value]);
                            } else {
                                setCourse((prevCourses) => prevCourses.filter((course) => course !== value));
                            }
                        }} /> BSC
                    </label>
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="form-group">
                    <input className="btn btn-primary" type="submit" name="submit" value="Submit" />
                </div>
            </form>
        </Auth>
    );
};

export default AddPosts;
