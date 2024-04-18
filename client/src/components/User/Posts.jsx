import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import './cards.css';

const Posts = ({ getPosts }) => {
    const [posts, setPosts] = useState([]); // State to store posts
    const history = useHistory();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get('http://localhost:8000/posts/', {
                    headers: {
                        "x-auth-token": localStorage.getItem('x-auth-token'),
                    }
                });
                if (data.length !== 0) {
                    setPosts(data);
                } else {
                    setPosts([]);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts(); // Call the fetchPosts function when the component mounts
    }, []); // Empty dependency array to run the effect only once

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/posts/${id}`, {
                headers: {
                    "x-auth-token": localStorage.getItem('x-auth-token')
                }
            });
            // After successful deletion, update the posts state to remove the deleted post
            setPosts(posts.filter(post => post._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = (id) => {
        localStorage.setItem("post-id", id);
        history.push('/posts/edit')
    }

    return (
        <div>
            {posts.map((post, index) => (
                <div key={index} className="card">
                    <div className="container">
                        <div className='headings'>
                            <p>Id</p>
                            <p>Image</p>
                            <p>Name</p>
                            <p>Email</p>
                            <p>Mobile </p>
                            <p>Designation</p>
                            <p>Gender</p>
                            <p>Course</p>
                            <p>Date</p>
                        </div>
                        <div className='posts'>
                            <p>{index}</p>
                            <p>{post.image}</p>
                            <p><b>{post.name}</b></p>
                            {/* Add these lines to display other details */}
                            <p>{post.email}</p>
                            <p>{post.mobile}</p>
                            <p>{post.designation}</p>
                            <p>{post.gender}</p>
                            <p>{post.course}</p>
                            <p>{post.createdAt}</p>
                        </div>

                        <div className="button">
                            <button onClick={() => handleUpdate(post._id)} className="btn btn-warning" style={{ marginRight: "5px" }}>Edit</button>
                            <button onClick={() => handleDelete(post._id)} className="btn btn-info">Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Posts;
