
const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 7000;

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));




app.post('/upload', upload.single('image'), (req, res) => {

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const imageUrl = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;

  res.send({ message: 'File uploaded successfully.', imageUrl: imageUrl });
});



app.get("/", (req,res)=>{
  res.send("sports image uploader is running...")
})

app.listen(port, () => {
  console.log(`Sports Image Uploader Is Running On Port ${port}`);
});
