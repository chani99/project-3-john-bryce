< !DOCTYPE html >
    <
    html >

    <
    head >
    <
    meta charset = "utf-8" >
    <
    title > Building a router < /title> <
    script >
    // Put John's template engine code here...
    // A hash to store our routes:
    var routes = {};
//
function route(path, templateId, controller) {
    routes[path] = {
        templateId: templateId,
        controller: controller
    };
}
var el = null;

function router() {
    // Lazy load view element:
    el = el || document.getElementById('view');
    // Current route url (getting rid of '#' in hash as well):
    var url = location.hash.slice(1) || '/';
    // Get route by url:
    var route = routes[url];
    // Do we have both a view and a route?
    if (el && route.controller) {
        // Render route template with John Resig's template engine:
        el.innerHTML = tmpl(route.templateId, new route.controller());
    }
}
// Listen on hash change:
window.addEventListener('hashchange', router);
// Listen on page load:
window.addEventListener('load', router); <
/script> <
script type = "text/html"
id = "home" >
    <
    h1 > Router FTW! < /h1> <
    /script> <
    script type = "text/html"
id = "template1" >
    <
    h1 > Page 1:
    <%= greeting %> <
    /h1> <
    p >
    <%= moreText %> <
    /p> <
    /script> <
    script type = "text/html"
id = "template2" >
    <
    h1 > Page 2:
    <%= heading %> <
    /h1> <
    p > Lorem ipsum... < /p> <
    /script> <
    /head>

<
body >
    <
    ul >
    <
    li > < a href = "#" > Home < /a></li >
    <
    li > < a href = "#/page1" > Page 1 < /a></li >
    <
    li > < a href = "#/page2" > Page 2 < /a></li >
    <
    /ul> <
    div id = "view" > < /div> <
    script >
    route('/', 'home', function() {});
route('/page1', 'template1', function() {
    this.greeting = 'Hello world!';
    this.moreText = 'Bacon ipsum...';
});
route('/page2', 'template2', function() {
    this.heading = 'I\'m page two!';
}); <
/script> <
/body>

<
/html>