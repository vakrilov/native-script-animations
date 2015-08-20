var buttons = require("ui/button")

var W = 150;
var H = 150;
var count = 12;
var duration = 2000;
var delay = (duration / count);
var piFract = Math.PI / count;

var views = [];
function pageLoaded(args) {
    var page = args.object;
    var plot = page.getViewById("plot");

    for (var i = 0; i < count; i++) {
        views[i] = new buttons.Button();
        views[i].cssClass = "circle";
        plot.addChild(views[i]);
    }

    for (var i = 0; i < count; i++) {
        setTimeout(createStarter(i), delay * (i + 1));
    }
}

function createStarter(idx) {
    return function () {
        animate(idx, 1, 0);
    };
}

var reset = 6;
function animate(index, direction, count) {
    var v = views[index];
    var x = 0;
    var y = 0;
    if (count < reset) {
        x = direction * Math.cos(piFract * index) * W;
        y = direction * Math.sin(piFract * index) * H;
    }
    
    if(count === reset) { count = 0; }

    v.animate({
        translate: { x: x, y: y },
        duration: duration,
        iterations: 1,
        curve: v.ios ? UIViewAnimationCurve.UIViewAnimationCurveEaseInOut : new android.view.animation.AccelerateDecelerateInterpolator()
    }).then(function () { animate(index, -direction, count + 1); });
}

exports.pageLoaded = pageLoaded;
