$(document).ready(function() {
    document.getElementById('publisher-service-form').addEventListener('submit', function(event) {
        event.preventDefault();
    
        var name = document.getElementById('name').value;
        var host = document.getElementById('host').value;
        var key = document.getElementById('key').value;
        var clientId = document.getElementById('clientId').value;
    
        var publisherService = {
            name: name,
            host: host,
            key: key,
            clientId: clientId
        };
    
        // jquery ajax post request to POST - /api/v1/publisher to post json data
        $.ajax({
            url: '/api/v1/publisher-services',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(publisherService),
            success: function(response) {
                alert('publisher Service created successfully');
                //window.location.href = '/publisher';
                // reload the page to display the new publisher service
                location.reload();
            },
            error: function(error) {
                alert('Error creating publisher Service');
            }
        });
    
    });
    
    /*
    fetch('/api/v1/publisher-services')
    .then(response => response.json())
    .then(publisherServices => {
        var tableBody = document.querySelector('#publisher-service-table tbody');
    
        publisherServices.forEach(publisherService => {
            var row = document.createElement('tr');
    
            var nameCell = document.createElement('td');
            nameCell.textContent = publisherService.name;
            row.appendChild(nameCell);
    
            var keyCell = document.createElement('td');
            keyCell.textContent = publisherService.key;
            row.appendChild(keyCell);
    
            tableBody.appendChild(row);
        });
    });
    */

    // jquery ajax request to GET - /api/v1/publisher to retrieve json data and populate the table
    $.ajax({
        url: '/api/v1/publisher-services',
        type: 'GET',
        success: function(response) {
            var tableBody = document.querySelector('#publisher-service-table tbody');
            response.result.forEach(publisherService => {
                var row = document.createElement('tr');
    
                var nameCell = document.createElement('td');
                nameCell.textContent = publisherService.name;
                row.appendChild(nameCell);

                var hostCell = document.createElement('td');
                hostCell.textContent = publisherService.host;
                row.appendChild(hostCell);
    
                var keyCell = document.createElement('td');
                keyCell.textContent = publisherService.key;
                row.appendChild(keyCell);

                var clientIdCell = document.createElement('td');
                clientIdCell.textContent = publisherService.clientId;
                row.appendChild(clientIdCell);
    
                tableBody.appendChild(row);
            });
        },
        error: function(error) {
            alert('Error retrieving publisher Services');
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