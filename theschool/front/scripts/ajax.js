    "use static";
    var SendAJAX = function() {
        return {
            sendFileToServer: function(data, callback) {
                $.ajax({
                    dataType: "text", // what to expect back from the PHP script, if anything
                    url: "back/api/fileAPI.php", // point to server-side PHP script 
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: data,
                    type: "POST",
                    success: function(response_text) {
                        callback(JSON.parse(response_text));
                    }
                });
            },
            sendLoginAjax: function(user, callback) {
                $.ajax({
                    type: "GET",
                    url: "back/api/loginAPI.php",
                    data: { Loginarray: user },
                    success: function(response_text) {
                        callback(JSON.parse(response_text));
                    }
                });
            },
            sendAJAX: function(method, url, data, callback) {
                $.ajax({
                    type: method,
                    url: url,
                    data: { activitiesArray: data },
                    success: function(response_text) {
                        callback(JSON.parse(response_text));
                    }

                });
            },
            sendlogoutAJAX: function(method, url, callback) {
                $.ajax({
                    type: method,
                    url: url,
                    success: callback()

                });
            },

            sendFileToCrop: function(image_sizes, callback) {
                $.ajax({

                    type: "POST",
                    url: "back/api/cropAPI.php",
                    data: { activitiesArray: image_sizes },
                    success: function(response_text) {
                        callback(JSON.parse(response_text));
                    }
                });
            }


        }
    }