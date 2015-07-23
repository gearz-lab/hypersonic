import express from 'express';
import passport from 'passport';

let router = express.Router();

router.route('*').get(function(req, res) {
    res.send('it works');
});

export default router;