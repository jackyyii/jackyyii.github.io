console.log('Javascript working');

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

var displayName = getParameterByName("inputName");
console.log(displayName);
if (displayName) {
    document.getElementById("hello").innerHTML = "Hello " + displayName
    document.getElementById("login").innerHTML = "Logout <span class='fa fa-sign-in-alt'></span>"
} else {
    document.getElementById("hello").innerHTML = "Hello World"
};