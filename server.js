require('dotenv').config({ path: './.env'});
const path = require('path');
const express = require('express');
const db = require('./config/db');
const postRoutes = require('./routes/postsRoutes');

db();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use('/api/posts', postRoutes);

if(process.env.NODE_ENV === "production"){
 app.use(express.static(path.join(__dirname, '/client/build')));

 app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
 })
} else {
   app.get('/', (req,res) => {
       res.send('Api running');
   });
}

app.listen(PORT, () => {
    console.log(`Server running on PORT: `, PORT);
})