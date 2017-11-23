"use strict";

$(document).ready(function() {
    let login = new main_screen();
    login.login_screen();
});

$(function() {
    // Remove the # from the hash, as different browsers may or may not include it
    var hash = location.hash.replace('#', '');

    if (hash != '') {
        // Show the hash if it's set
        alert(hash);

        // Clear the hash in the URL
        location.hash = '';
    }
});

$(document).bind("hashchange", function() {
    // Anchor has changed.
});