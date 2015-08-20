var buttons = require("ui/button")

var W = 150;
var H = 150;
var count = 8;
var duration = 4000;
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
        animate(idx, 1);
    };
}

function animate(index, direction) {
    var v = views[index];
    var x = direction * Math.cos(piFract * index) * W;
    var y = direction * Math.sin(piFract * index) * H;

    v.animate({
        translate: { x: x, y: y },
        duration: duration,
        iterations: 1,
        curve: v.ios ? UIViewAnimationCurve.UIViewAnimationCurveEaseInOut : new android.view.animation.AccelerateDecelerateInterpolator()
    }).then(function () { animate(index, -direction); });
}

exports.pageLoaded = pageLoaded;
