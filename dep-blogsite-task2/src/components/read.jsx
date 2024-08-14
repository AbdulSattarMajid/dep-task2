import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBlog } from '../features/blogs/blogsSlice';
import '../App.css';

function Read() {
    const [flag, setFlag] = useState(true);
    const [editingBlogId, setEditingBlogId] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newContent, setNewContent] = useState('');
    const [datafromDB, setDatafromdb] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetch('http://localhost:5000/blogs');
            if (response.ok) {
                const data = await response.json();
                setDatafromdb(data);

            } else {
                console.error('Failed to fetch blogs');
                setError('Failed to fetch blogs');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error fetching blogs');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBlog = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/delete`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (response.ok) {
                console.log('Blog successfully deleted');
                dispatch(deleteBlog(id));
                await fetchBlogs(); 
            } else {
                console.error('Failed to delete blog');
                setError('Failed to delete blog');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error deleting blog');
        }
    };

    const handleEditClick = (blog) => {
        setFlag(false);
        setEditingBlogId(blog.id);
        setNewTitle(blog.title);
        setNewAuthor(blog.author);
        setNewContent(blog.content);
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch('http://localhost:5000/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    id: editingBlogId, 
                    new_title: newTitle, 
                    new_author: newAuthor, 
                    new_content: newContent 
                })
            });

            if (response.ok) {
                console.log('Blog successfully updated');
                await fetchBlogs();
                setEditingBlogId(null);
                setFlag(true);
                setNewTitle('');
                setNewAuthor('');
                setNewContent('');
            } else {
                console.error('Failed to update blog');
                setError('Failed to update blog');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error updating blog');
        }
    };

    const handleCancel = () => {
        setFlag(true);
        setEditingBlogId(null);
        setNewTitle('');
        setNewAuthor('');
        setNewContent('');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <div className="Read-blogs">
                {flag && datafromDB.map((blog) => (
                    <div className="new" key={blog.id}>
                        <h1>{blog.title}</h1>
                        <p>{blog.content}</p>
                        <h5>{"Written by " + blog.author}</h5>
                        <button onClick={() => handleDeleteBlog(blog.id)} className="delete">
                            Delete
                        </button>
                        <button onClick={() => handleEditClick(blog)} className="update">
                            Edit
                        </button>
                    </div>
                ))}

                {editingBlogId !== null && (
                    <div className="update-form">
                        <input 
                            type="text" 
                            placeholder='Write updated title name here' 
                            value={newTitle} 
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder='Write updated author name here' 
                            value={newAuthor}
                            onChange={(e) => setNewAuthor(e.target.value)}
                        />
                        <textarea 
                            placeholder='Write new content here'
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                        ></textarea>
                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Read;
