'use strict';

function foo() {
    var stage = new Kinetic.Stage({
        container: 'container',
        width: 578,
        height: 200
    });

    var layer = new Kinetic.Layer();

    var star = new Kinetic.Star({
        numPoints: 14,
        x: 100,
        y: 100,
        innerRadius: 70,
        outerRadius: 80,
        fill: 'gold',
        stroke: 'black',
        strokeWidth: 2
    });

    var star2 = new Kinetic.Star({
        numPoints: 7,
        x: 100,
        y: 100,
        innerRadius: 60,
        outerRadius: 100,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 2
    });

    // add the shape to the layer
    layer.add(star2);
    layer.add(star);

    // add the layer to the stage
    stage.add(layer);
}

foo();