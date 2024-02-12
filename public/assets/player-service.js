$(document).ready(function() {
    document.getElementById('player-service-form').addEventListener('submit', function(event) {
        event.preventDefault();
    
        var name = document.getElementById('name').value;
        var host = document.getElementById('host').value;
        var key = document.getElementById('key').value;
    
        var playerService = {
            name: name,
            key: key
        };
    
        // jquery ajax post request to POST - /api/v1/player to post json data
        $.ajax({
            url: '/api/v1/player-services',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(playerService),
            success: function(response) {
                alert('player Service created successfully');
                //window.location.href = '/player';
                // reload the page to display the new player service
                location.reload();
            },
            error: function(error) {
                alert('Error creating player Service');
            }
        });
    
    });
    
    /*
    fetch('/api/v1/player-services')
    .then(response => response.json())
    .then(playerServices => {
        var tableBody = document.querySelector('#player-service-table tbody');
    
        playerServices.forEach(playerService => {
            var row = document.createElement('tr');
    
            var nameCell = document.createElement('td');
            nameCell.textContent = playerService.name;
            row.appendChild(nameCell);
    
            var keyCell = document.createElement('td');
            keyCell.textContent = playerService.key;
            row.appendChild(keyCell);
    
            tableBody.appendChild(row);
        });
    });
    */

    // jquery ajax request to GET - /api/v1/player to retrieve json data and populate the table
    $.ajax({
        url: '/api/v1/player-services',
        type: 'GET',
        success: function(response) {
            var tableBody = document.querySelector('#player-service-table tbody');
            response.result.forEach(playerService => {
                var row = document.createElement('tr');
    
                var nameCell = document.createElement('td');
                nameCell.textContent = playerService.name;
                row.appendChild(nameCell);

                var hostCell = document.createElement('td');
                hostCell.textContent = playerService.host;
                row.appendChild(hostCell);
    
                var keyCell = document.createElement('td');
                keyCell.textContent = playerService.key;
                row.appendChild(keyCell);
    
                tableBody.appendChild(row);
            });
        },
        error: function(error) {
            alert('Error retrieving player Services');
        }
    });
});


$(document).ready(function () {
    // iterate through li.nav-item elements and append the token to the href attribute. token value is retrieved from url query parameter
    $('li.nav-item').each(function () {
        var href = $(this).find('a').attr('href');
        var token = new URLSearchParams(window.location.search).get('token');
        $(this).find('a').attr('href', href + '?token=' + token);
    });

    $('.navbar-brand').each(function () {
        var href = $(this).attr('href');
        var token = new URLSearchParams(window.location.search).get('token');
        $(this).attr('href', href + '?token=' + token);
    });
});