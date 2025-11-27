const express = require('express');
const router = express.Router();
const Rating = require('../models/Rating');

router.post('/', async (req, res) => {
    try {
        const { userEmail, stars, review } = req.body;
        if (!userEmail || !stars || !review) {
            return res.status(400).json({ status: 'error', message: 'Thiếu thông tin' });
        }

        const newRating = await Rating.create({
            userEmail,
            rating: stars,
            message: review
        });

        res.json({ status: 'success', message: 'Đã lưu đánh giá', data: newRating });
    } catch (err) {
        console.error("LỖI SERVER:", err);
        res.status(500).json({ status: 'error', message: 'Lỗi server' });
    }
});

module.exports = router;
