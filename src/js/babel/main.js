// Entry point
'use strict';

const draggableContainer = document.getElementById('main-draggable');
const boxes = new Boxes(12, 4, draggableContainer, '200px');
boxes.init();

document.getElementById('add-new-boxes').addEventListener('click', function() {
    boxes.addBox();
}, false);

document.getElementById('shuffle-boxes').addEventListener('click', function() {
    boxes.shuffleBoxes();
}, false);