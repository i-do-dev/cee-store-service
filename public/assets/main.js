$(document).ready(function() {

    // check 'token' in url query string
    var urlParams = new URLSearchParams(window.location.search);
    var token = urlParams.get('token');
    // if token does not exist, redirect to login page
    if (!token) {
        window.location.href = '/login';
    }

    console.log('main.js loaded');
});