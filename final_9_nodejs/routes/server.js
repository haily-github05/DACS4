const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); // file User.js bạn gửi
const cors = require('cors');
const app = express();
const ratingRouter = require('./routes/rating'); 
app.use(cors());
app.use(express.json());


// Kết nối MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/yourdbname', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// API lấy thông tin user theo email (hoặc id)
app.get('/api/user/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email });
        if(!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.use("/rating", ratingRouter);

app.listen(3000, () => console.log('Server running on port 3000'));
