const express = require('express');
const router = express.Router();
const { ensureAuthenticated} = require('../config/auth');

router.get('/', (req, res) => res.render('index'));

router.get('/about', (req, res) => res.render('about'));
router.get('/contact', (req, res) => res.render('contact'));

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));
router.get('/edit', (req, res) => res.render('edit'));
router.get('/add', (req, res) => res.render('add'));
router.get('/index1', (req, res) => res.render('index1'));


router.get('/dashboard', ensureAuthenticated, (req, res) =>
 res.render('dashboard',{
     name:req.user.name
 }));
module.exports = router;
