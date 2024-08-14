import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog, deleteBlog, selectAllBlogs } from '../features/blogs/blogsSlice';
import '../App.css';

function Blogs() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [titleErr, setTitleErr] = useState('');
    const [authorErr, setAuthorErr] = useState('');
    const [contentErr, setContentErr] = useState('');
    const allBlogs = useSelector(selectAllBlogs);
    const dispatch = useDispatch();
   
    const validate = () => {
        if (!title) {
            setTitleErr('Please fill the title section');
        } else {
            setTitleErr('');
        }
        if (!author) {
            setAuthorErr('Please fill the author section');
        } else {
            setAuthorErr('');
        }
        if (!content) {
            setContentErr('Please fill the content section');
        } else {
            setContentErr('');
        }

        if (title && author && content) {
            addNewBlog();
        }
    };

    const addNewBlog = async () => {
        const blogData = {
            id: '_' + Math.random().toString(36).substr(2, 9),
            title,
            content,
            author
        };

        try {
            const response = await fetch('http://localhost:5000/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blogData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Blog successfully added:', result);
                dispatch(addBlog(blogData));
                clearAll();
            } else {
                console.error('Failed to add blog');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleDeleteBlog = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/delete`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id
                })
            });
            if (response.ok) {
                console.log('Blog successfully deleted');
                dispatch(deleteBlog(id));
            } else {
                console.error('Failed to delete blog');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



    const clearAll = () => {
        setTitle('');
        setAuthor('');
        setContent('');
        setTitleErr('');
        setAuthorErr('');
        setContentErr('');
    };

    const update = () => {
        alert("Editing can only be made in Read page")
    }

    return (
        <>
            <div className="myblogs">
                <h1>My Blogs</h1>
                <div className="blogs">
                    <div className="content">
                        <label>Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                        />
                        <p className="error">{titleErr}</p>
                        <label>Author</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                        <p className="error">{authorErr}</p>
                        <label>Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className='blog'
                            placeholder='Write your content here'
                        ></textarea>
                        <p className="error">{contentErr}</p>
                        <div className="button1">
                            <button onClick={validate} className="btn1">
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="actual-blogs">
                {allBlogs.map((blog) => (
                    <div className="new" key={blog.id}>
                        <h1>{blog.title}</h1>
                        <p>{blog.content}</p>
                        <h5>{"Written by" + " " + blog.author}</h5>
                        <button onClick={() => handleDeleteBlog(blog.id)} className="delete">
                            Delete
                        </button>
                        <button onClick={update} className="update">Edit</button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Blogs;
