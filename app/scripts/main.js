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
        stage.draw();
    });
};

var bar = function() {

    var totalWidth = window.innerWidth;
    var totalHeight = window.innerHeight;
    var minSize = Math.min(totalWidth, totalHeight);

    var stage = new Kinetic.Stage({
        container: 'container',
        width: totalWidth,
        height: totalHeight
    });

    var pointLayer = new Kinetic.Layer({});
    var blobLayer = new Kinetic.Layer({});

    var initCount = 10;
    var count = 0;
    var points = [];

    var pointsize = minSize / 2 - 50;
    for (var i = 0; i < initCount; i++) {
        points[i] = new Kinetic.Circle({
            x: Math.random() * totalWidth,
            y: Math.random() * totalHeight,
            radius: 5,
            fill: 'lightblue'
        });
        count++;
        pointLayer.add(points[i]);
    }

    var calculateBorders = function() {
        blobLayer.destroyChildren();
        for (var i = 0; i < count; i++) {
            var centerX = points[i].getX();
            var centerY = points[i].getY();
            var surfacePoints = [];
            var sampleSize = 16;
            for (var j = 0; j < sampleSize; j++) {
                surfacePoints[j] = {
                    x: centerX - 50 + Math.cos(2 * Math.PI * (j/sampleSize)) * 100,
                    y: centerY - 50 + Math.sin(2 * Math.PI * (j/sampleSize)) * 100
                };
            }
            var blob = new Kinetic.Blob({
                points: surfacePoints,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 5
            });
            blobLayer.add(blob);
        }
        blobLayer.batchDraw();
    };

    var anim = new Kinetic.Animation(function(frame) {
        for (var i = 0; i < count; i++) {
            var point = points[i];
            var oldX = point.getX();
            var oldY = point.getY();
            var newX = oldX + Math.random() * 10 - 5;
            var newY = oldY + Math.random() * 10 - 5;
            point.setX(newX % totalWidth);
            point.setY(newY % totalHeight);
        }
        calculateBorders();
    }, pointLayer);

    // add the layer to the stage
    stage.add(pointLayer);
    stage.add(blobLayer);

    anim.start();
};

var baz = function() {

    var totalWidth = window.innerWidth;
    var totalHeight = window.innerHeight;
    // var minSize = Math.min(totalWidth, totalHeight);
    var texWidth = 500;
    var texHeight = 500;

    var initCount = 10;
    var count = 0;
    var points = [];

    for (var i = 0; i < initCount; i++) {
        points[i] = {
            x: Math.random() * texWidth << 0,
            y: Math.random() * texHeight << 0,
            vx: (Math.random() + .2) * 10 - 5.1,
            vy: (Math.random() + .2) * 10 - 5.1,
            size: (Math.random() * 200 + 200) << 0
        };
        count++;
    }

    var canvas = $('#container2 canvas').get(0);

    canvas.width = totalWidth;
    canvas.height = totalHeight;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, totalWidth, totalHeight);
    var img = ctx.createImageData(texWidth, texHeight);

    var colorStep = 0.5;
    var colorize = function() {
        colorStep = (colorStep + 0.01) % 1;
        var valuer = Math.sin(2 * Math.PI * colorStep) * 127 + 128;
        var valueg = Math.cos(2 * Math.PI * colorStep + 2) * 127 + 128;
        var valueb = Math.sin(2 * Math.PI * colorStep + 4) * 127 + 128;
        return {r: valuer << 0,
                g: valueg << 0,
                b: valueb << 0};
    };

    var drawImage = function() {
        var data = img.data;
        var color = colorize();
        for (var j = 0; j < texHeight; j++) {
            for (var i = 0; i < texWidth; i++) {
                var yOffset = j * 4 * texWidth;
                var pos = yOffset + i * 4;
                data[pos + 0] = 0;
                data[pos + 1] = 0; //Math.random() * 128;
                data[pos + 2] = 0;
                data[pos + 3] = 255;

                for (var k = 0; k < count; k++) {
                    var distX = Math.abs(points[k].x - i);
                    var distY = Math.abs(points[k].y - j);
                    var size = points[k].size;
                    if (distX < size * 0.5 && distY < size * 0.5) {
                        var maxDist = Math.sqrt(distX*distX + distY*distY);
                        var relDist = maxDist / (size * 0.1);
                        var g = 1.2 / (relDist * relDist);
                        var oldData = data[pos + 2];
                        var infr = g * color.r;
                        var infg = g * color.g;
                        var infb = g * color.b;
                        data[pos + 0] = Math.min(255, data[pos + 0] + infr) << 0;
                        data[pos + 1] = Math.min(255, data[pos + 1] + infg) << 0;
                        data[pos + 2] = Math.min(255, data[pos + 2] + infb) << 0;
                        data[pos + 3] = 255;
                    }
                }
            }
        }
        ctx.putImageData(img, 10, 10);
    };

    var movePoints = function () {
        for (var i = 0; i < count; i++) {
            points[i].x = (points[i].x + points[i].vx) % texWidth;
            points[i].y = (points[i].y + points[i].vy) % texHeight;
        }
    };

    var step = function() {
        movePoints();
        drawImage();
    };

    //step();
    window.setInterval(step, 30);

    // var anim = new Kinetic.Animation(function(frame) {
    //     for (var i = 0; i < count; i++) {
    //         var point = points[i];
    //         var oldX = point.getX();
    //         var oldY = point.getY();
    //         var newX = oldX + Math.random() * 10 - 5;
    //         var newY = oldY + Math.random() * 10 - 5;
    //         point.setX(newX % totalWidth);
    //         point.setY(newY % totalHeight);
    //     }
    //     calculateBorders();
    // }, pointLayer);
};

baz();