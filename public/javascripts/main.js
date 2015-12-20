$('.page-choosen').css('color', '#0d5d36');
$('.page-choosen2').css('color', '#33aa70');

sendToServer = function(name, path) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/' + path + '?name=' + name, false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(null);
    if (xhr.status === 200) {
        // console.log('hi');
        // var text = JSON.parse(xhr.responseText);
        // console.log(xhr.responseText);
    } else
        console.log('XMLHttpRequest failed. Status: ' + xhr.status);
}

hover = function(element, path) {
    console.log(element.id + ' is hovered.');
    element.setAttribute('src', './images/' + path + element.id + '-hover.png');
    var text = element.id + '-text';
    $('#' + text).css('color', '#336E5F');
};

unhover = function(element, path) {
    console.log(element.id + ' is hovered.');
    element.setAttribute('src', './images/' + path + element.id + '.png');
    var text = element.id + '-text';
    $('#' + text).css('color', '#2BB673');
};


change_color = function(element, name, path) {
    console.log(name + ' changes color.');
    if (element.classList.contains('hover')) {
        element.setAttribute('src', './images/' + path + name + '-found.png');
        element.classList.remove("hover");
        var text = element.id + '-text';
        $('#' + text).css('color', '#545454');
    }
    else {
        element.setAttribute('src', './images/' + path + name + '-hover.png');
        element.classList.add("hover");
        var text = element.id + '-text';
        $('#' + text).css('color', '#336E5F');
        document.getElementById("searching").setAttribute('onclick', "javascript:location.href='find'");
        document.getElementById("searching").setAttribute('src',"./images/reminder/searching-hover.png");
        // element.setAttribute('onclick', "change_color(this, '"+name+"','"+path+"')");
    }
};

var turn_mode = new Array(50);
turn_mode.fill(0);

switch_mode = function(element) {
    var id = element.id;
    var i = id[id.length-1];
    if (turn_mode[i] % 2 === 0) {
        element.setAttribute('src', './images/find-my/turn-off.png');
        document.getElementById("light"+i).setAttribute('onclick', "javascript:location.href='reminder'");
        document.getElementById("light"+i).setAttribute('src', './images/find-my/light-off.png');
    } else {
        element.setAttribute('src', './images/find-my/search.png');
        document.getElementById("light"+i).setAttribute('onclick', "");
        document.getElementById("light"+i).setAttribute('src', './images/find-my/light.png');
    }
    turn_mode[i] += 1;
};
