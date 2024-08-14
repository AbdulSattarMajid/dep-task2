const express = require('express');
const cors = require('cors');
const UserModel=require('./mongo')
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/blogs",async function(req,res){
  const allBlogs = await UserModel.find({});
  res.send(allBlogs)
})

app.post("/create", async function(req, res) {
  const { id, title, author, content } = req.body
  const createdUser = await UserModel.create({
    id,
    title,
    author,
    content,
  });
  res.json(createdUser); 

});

app.delete("/delete", async (req, res) => {
  const { id } = req.body;
  try {
      const deleteResult = await UserModel.findOneAndDelete({ id });
      if (deleteResult) {
          res.status(200).json({ message: 'Blog successfully deleted', data: deleteResult });
      } else {
          res.status(404).json({ message: 'Blog not found' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
  }
});

app.post("/update", async (req, res) => {
  const { id, new_title, new_author, new_content } = req.body;
  try {
      const updatedBlog = await UserModel.findOneAndUpdate(
          { id: id },
          { $set: { title: new_title, author: new_author, content: new_content } },
          { new: true } 
      );

      if (updatedBlog) {
          res.status(200).json({ message: 'Blog successfully updated', data: updatedBlog });
      } else {
          res.status(404).json({ message: 'Blog not found' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
