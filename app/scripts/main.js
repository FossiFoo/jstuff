'use strict';

function foo() {

    var totalWidth = window.innerWidth;
    var totalHeight = window.innerHeight;
    var minSize = Math.min(totalWidth, totalHeight);

    var stage = new Kinetic.Stage({
        container: 'container',
        width: totalWidth,
        height: totalHeight
    });

    var layer = new Kinetic.Layer({
        clearBeforeDraw: true
    });

    var starCount = 3;
    var stars = [];

    for (var i = 0; i < starCount; i++) {
        var starSize = minSize / 2 - 50;
        stars[i] = new Kinetic.Star({
            numPoints: 14,
            x: totalWidth / 2,
            y: totalHeight / 2,
            innerRadius: starSize - 60 - i * 80,
            outerRadius: starSize - i * 80,
            fill: i%2 === 0 ? 'yellow' : 'red',
            stroke: 'black',
            strokeWidth: 2
        });
        layer.add(stars[i]);
    }

    // add the layer to the stage
    stage.add(layer);

    var angularSpeed = Math.PI / 8;
    var anim = new Kinetic.Animation(function(frame) {
        var angleDiff = frame.timeDiff * angularSpeed / 1000;
        var scale = Math.sin(frame.time * 2 * Math.PI / 2000) /10 + 1;
        for (var i = 0; i < starCount; i++) {
            stars[i].rotate(i%2 === 0 ? angleDiff : -angleDiff);
            stars[i].setScale(i%2 === 0 ? 1 : scale);
        }
    }, layer);

    anim.start();
}

foo();