import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allBlogs: [],
};

export const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlog: (state, action) => {
      state.allBlogs.push(action.payload);
    },
    deleteBlog: (state, action) => {
      state.allBlogs = state.allBlogs.filter(blog => blog.id !== action.payload);
    },
    update:(state,action)=>{
      console.log(action.payload)
        const { id,newTitle,newAuthor,newContent } = action.payload;
        console.log(state.allBlogs);
        
        const blog = state.allBlogs.find(blog => blog.id === id);    
        blog.title=newTitle
        blog.author=newAuthor
        blog.content=newContent
    }
  },
});

export const { addBlog, deleteBlog ,update} = blogsSlice.actions;
export const selectAllBlogs = state => state.blogs.allBlogs;
export default blogsSlice.reducer;
