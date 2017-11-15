    "use static";

    function sendLoginAjax(user, callback) {
        $.ajax({
            type: 'GET',
            url: "back/api/loginAPI.php",
            data: { activitiesArray: user },
            success: function(response_text) {
                callback(JSON.parse(response_text));
            }
        });
    }

    function sendAJAX(method, url, data, callback) {
        $.ajax({
            type: method,
            url: url,
            data: { activitiesArray: data },
            success: function(response_text) {
                callback(JSON.parse(response_text));
            }

        });
    }

    function sendFileToServer(data, callback) {
        $.ajax({
            dataType: 'text', // what to expect back from the PHP script, if anything
            url: "back/api/fileAPI.php", // point to server-side PHP script 
            cache: false,
            contentType: false,
            processData: false,
            data: data,
            type: 'POST',
            success: function(response_text) {
                callback(JSON.parse(response_text));
            }
        });
    }