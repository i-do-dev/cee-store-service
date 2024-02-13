const express = require("express");
const pagesRouter = express.Router();
const path = require('path');

pagesRouter.get('/', (req, res) => {
    // render the index page from assets folder
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

pagesRouter.get('/login', (req, res) => {
    // render the login page from assets folder
    res.sendFile(path.join(__dirname, '../../public/login.html'));
});

pagesRouter.get('/register', (req, res) => {
    // render the register page from assets folder
    res.sendFile(path.join(__dirname, '../../public/register.html'));
});

pagesRouter.get('/dashboard', (req, res) => {
    // render the dashboard page from assets folder
    res.sendFile(path.join(__dirname, '../../public/dashboard.html'));
});

pagesRouter.get('/apikeys', (req, res) => {
    // render the apikeys page from assets folder
    res.sendFile(path.join(__dirname, '../../public/apikeys.html'));
});

pagesRouter.get('/addpublisher', (req, res) => {
    // render the addpublisher page from assets folder
    res.sendFile(path.join(__dirname, '../../public/addpublisher.html'));
});

pagesRouter.get('/settings', (req, res) => {
    // render the settings page from assets folder
    res.sendFile(path.join(__dirname, '../../public/settings.html'));
});

module.exports = pagesRouter;