'use strict';

var foo = function() {

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

    var initCount = 1;
    var starCount = 0;
    var stars = [];
    var rainbow = ['purple', 'blue', 'green', 'yellow', 'orange', 'red'];

    var makeAStar = function() {
        var i = starCount;
        var radius = starSize - i * 60;
        stars[starCount] = new Kinetic.Star({
            numPoints: 14,
            x: totalWidth / 2,
            y: totalHeight / 2,
            innerRadius: radius - 80,
            outerRadius: radius,
            fillRadialGradientStartPoint: 0,
            fillRadialGradientStartRadius: radius - 80,
            fillRadialGradientEndPoint: 0,
            fillRadialGradientEndRadius: radius,
            fillRadialGradientColorStops: [1, rainbow[i], 0, rainbow[i+1]],
            stroke: 'black',
            strokeWidth: 2
        });
        layer.add(stars[starCount]);
        // stars[i].moveToTop();
        starCount++;
    };

    var starSize = minSize / 2 - 50;
    for (var i = 0; i < initCount; i++) {
        makeAStar();
    }

    // add the layer to the stage
    stage.add(layer);

    var angularSpeed = Math.PI / 8;
    var anim = new Kinetic.Animation(function(frame) {
        var angleDiff = frame.timeDiff * angularSpeed / 1000;
        var scale = Math.sin(frame.time * 2 * Math.PI / 2000) /10 + 1;
        for (var i = 0; i < starCount; i++) {
            stars[i].rotate(i%2 === 0 ? angleDiff : -angleDiff);
            //stars[i].setScale(i%2 === 0 ? scale : scale);
        }
    }, layer);

    $('#button1').click(function() {
        var isRunning = anim.isRunning();
        if (isRunning) {
            $(this).text('Weiter');
            anim.stop();
        } else {
            $(this).text('STOP!');
            anim.start();
        }
    });

    $('#button2').click(function() {
        makeAStar();
    });
};
foo();