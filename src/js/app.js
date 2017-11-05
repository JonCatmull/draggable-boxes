'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Boxes = function () {
    /**
     * Represents Boxes
     * @constructor
     * @param  {number}  numberOfBoxes   The number of boxes to be created
     * @param  {number}  boxesPerRow     Number of boxes per row
     * @param  {HTMLElement} targetContainer The target container where boxes will be created
     * @return                           Doesn't return nothing
     */
    function Boxes(numberOfBoxes, boxesPerRow, targetContainer) {
        _classCallCheck(this, Boxes);

        /**
         * Class property for number of boxes
         * @type {number}
         */
        this.numberOfBoxes = numberOfBoxes;
        /**
         * Class property for boxes per row
         * @type {number}
         */
        this.boxesPerRow = boxesPerRow;
        /**
         * Class property for box each box dimensions
         * @type {number}
         */
        this.boxDimensions = (100 / boxesPerRow).toFixed(4);
        /**
         * Class property for element reference to container where boxes will be created
         * @type {HTMLElement}
         */
        this.targetContainer = targetContainer;
        /**
         * Class property for predefined boxes properties ( name and color ). Should be array of objects
         * @type {Array}
         * @example {name: 'Alpha', color: '#FFFFFF'}
         */
        this.boxesProperties = [{
            name: 'Alpha',
            color: '#CD6155'
        }, {
            name: 'Bravo',
            color: '#EC7063'
        }, {
            name: 'Charlie',
            color: '#AF7AC5'
        }, {
            name: 'Delta',
            color: '#5499C7'
        }, {
            name: 'Echo',
            color: '#5DADE2'
        }, {
            name: 'Foxtrot',
            color: '#48C9B0'
        }, {
            name: 'Golf',
            color: '#45B39D'
        }, {
            name: 'Hotel',
            color: '#52BE80'
        }, {
            name: 'Indigo',
            color: '#58D68D'
        }, {
            name: 'Juliet',
            color: '#F4D03F'
        }, {
            name: 'Kilo',
            color: '#F5B041'
        }, {
            name: 'Lima',
            color: '#DC7633'
        }, {
            name: 'Mike',
            color: '#F0F3F4'
        }, {
            name: 'November',
            color: '#CACFD2'
        }, {
            name: 'Oscar',
            color: '#AAB7B8'
        }, {
            name: 'Papa',
            color: '#641E16'
        }];
        /**
         * Class property for storing the initialized properties number
         * @type {number}
         * @default 0
         */
        this.initializedPropertiesCounter = 0;
        /**
         * Class property to hold all names of initialized properties
         * @type {Array}
         */
        this.initializedProperties = [];
        /**
         * Class property for storing the last order number
         * @type {number}
         * @default 0
         */
        this.boxesOrderCounter = 0;
        /**
         * Class property to hold all active boxes
         * @type {Array}
         */
        this.boxesPlaceholder = [];
        /**
         * Class property for reference to the box which is dragged now
         * @type {HTMLElement}
         * @default null
         */
        this.draggingNowBox = null;
    }
    /**
     * Creates all required elements and adds boxes
     * @memberof Boxes
     * @namespace Boxes.init
     * @return Doesn't return nothing
     */


    _createClass(Boxes, [{
        key: 'init',
        value: function init() {
            // Create DIV element with class 'main-draggable-delete'
            var deleteBoxesContainerElement = document.createElement('div');
            deleteBoxesContainerElement.classList.add('main-draggable-delete');

            // Create SPAN element with classes 'icon', 'hovered'
            var iconSpanElement = document.createElement('span');
            iconSpanElement.classList.add('icon', 'hovered');

            // Create IMG element with src pointing to 'img/trash.svg'
            var trashImgElement = document.createElement('img');
            trashImgElement.src = 'img/trash.svg';

            // Create DIV element with class 'overlay'
            var iconOverlayElement = document.createElement('div');
            iconOverlayElement.classList.add('overlay');

            // Append iconSpanElement to deleteBoxesContainerElement
            deleteBoxesContainerElement.appendChild(iconSpanElement);

            // Append iconOverlayElement to deleteBoxesContainerElement
            deleteBoxesContainerElement.appendChild(iconOverlayElement);

            // Append trashImgElement to iconSpanElement
            iconSpanElement.appendChild(trashImgElement);

            // Append deleteBoxesContainerElement to the target container for boxesOrderCounter
            this.targetContainer.appendChild(deleteBoxesContainerElement);

            // Start loop to create boxes
            for (var x = 0; x < this.numberOfBoxes; x++) {

                // Create DIV element with clas 'main-draggable-box'
                var box = document.createElement('div');
                box.classList.add('main-draggable-box');

                // Set the width and height to be equal
                box.style.width = 'calc(' + this.boxDimensions + '% - 20px)';
                box.style.height = 'calc(' + this.boxDimensions + '% - 20px)';

                // Set data-order attribute with value of current boxesOrderCounter numberOfBoxes
                box.setAttribute('data-order', this.boxesOrderCounter);

                // Set background color, innerHTML and dara-name attribute to the ones from current box property
                box.style.backgroundColor = this.boxesProperties[this.initializedPropertiesCounter]['color'];
                box.innerHTML = '<p>' + this.boxesProperties[this.initializedPropertiesCounter]['name'] + '</p>';
                box.setAttribute('data-name', this.boxesProperties[this.initializedPropertiesCounter]['name']);

                // Update array of initializedProperties pushing the name of the property and increase initializedPropertiesCounter and boxesOrderCounter with 1
                this.initializedProperties.push(this.boxesProperties[this.initializedPropertiesCounter]['name']);
                this.initializedPropertiesCounter++;
                this.boxesOrderCounter++;

                // Push the box to boxesPlaceholder array
                this.boxesPlaceholder.push(box);

                // Append the box to targetContainer
                this.targetContainer.appendChild(box);
                box.style.width = box.getBoundingClientRect().width - 1.5 + 'px';
                box.style.height = box.getBoundingClientRect().height - 1.5 + 'px';
            }

            // After the loop finish call addDraggable to apply functionality
            this.addDraggable();
        }
        /**
         * Applies event listeners for events like: mousedown, mousemove, mouseup to window object and adds functions to controll interactions with boxes
         * @memberof Boxes
         * @namespace Boxes.addDraggable
         */

    }, {
        key: 'addDraggable',
        value: function addDraggable() {
            // Create reference to this for localscope
            var that = this;
            // initialize variable for the cloned dragged element - default null
            var draggedClone = null;
            // Save the index of the currently dragged element
            var draggingNowIndex = null;

            /**
             * Function to handle mousedown event listener
             * @param  {Object} evt The event object
             * @memberof Boxes.addDraggable
             */
            function onMouseDown(evt) {
                // Set evt.target to variable target
                var target = evt.target;
                // Check if target class list contains main-draggable-box and check if it's left mouse button
                if (target.classList.contains('main-draggable-box') && evt.which === 1) {
                    // clone the selected box and add class 'dragged'
                    draggedClone = target.cloneNode(true);
                    draggedClone.classList.add('dragged');
                    // Add class 'dragging-now' to the selected box from the grid and set instance draggingNow property to the target
                    target.classList.add('dragging-now');
                    that.draggingNowBox = target;
                    // Set position absolute to cloned element and width and height to tergets width and height
                    draggedClone.style.position = 'absolute';
                    draggedClone.style.width = target.getBoundingClientRect().width + 'px';
                    draggedClone.style.height = target.getBoundingClientRect().height + 'px';
                    // Append the cloned element to instance property targetContainer
                    that.targetContainer.appendChild(draggedClone);
                    // Add display block to show deleteBoxesContainerElement
                    that.targetContainer.querySelector('.main-draggable-delete').style.display = "block";
                    // Add mousemove event listener to window object
                    window.addEventListener('mousemove', moveBox, true);
                }
            };

            /**
             * Function to handle the movement of the boxes
             * @param  {Object} evt The event object
             * @memberof Boxes.addDraggable
             */
            function moveBox(evt) {
                // Check if we have draggedClone and draggingNowBox set
                if (that.draggingNowBox != null && draggedClone != null) {
                    // Get current boxes from targetContainer
                    var currentBoxes = that.targetContainer.querySelectorAll('.main-draggable-box');
                    // Update the cloned element top and left positions
                    draggedClone.style.top = evt.clientY - draggedClone.getBoundingClientRect().height / 1.5 + 'px';
                    draggedClone.style.left = evt.clientX - draggedClone.getBoundingClientRect().width / 2 + 'px';
                    // Check if the cloned(dragged) box is over delete icon
                    if (document.elementFromPoint(evt.clientX, evt.clientY) == document.querySelector('.main-draggable-delete .overlay')) {
                        // If it is add class 'hovered' to the icon and class 'delete' to cloned(dragged) box - this is for styling
                        document.querySelector('.main-draggable-delete .icon').classList.add('hovered');
                        draggedClone.classList.add('delete');
                    } else {
                        // Else remove the above classes applied
                        document.querySelector('.main-draggable-delete .icon').classList.remove('hovered');
                        draggedClone.classList.remove('delete');
                    }
                    // Loop through currentBoxes and check if the cloned(dragged) box is at least 1/3 from its width or height over another box and if it is swap their places
                    for (var i = 0; i < currentBoxes.length; i++) {
                        var box = currentBoxes[i];
                        var rectBox = box.getBoundingClientRect();
                        var rectDragged = draggedClone.getBoundingClientRect();
                        if (rectBox.top + rectBox.height / 3 <= rectDragged.bottom && rectBox.bottom + rectBox.height / 3 >= rectDragged.top && rectBox.left + rectBox.width / 3 <= rectDragged.right && rectBox.right + rectBox.width / 3 >= rectDragged.left && box.classList.contains('dragged') === false) {
                            draggingNowIndex = i;
                            that.targetContainer.insertBefore(that.draggingNowBox, box.nextSibling);
                            that.reorderBoxes(0);
                        }
                    }
                }
            };

            // Add mousedown event listener to window element with onMouseDown function as argument
            window.addEventListener('mousedown', onMouseDown, false);

            // Add mousedown event listener to window element with callback function as argument, or with other words when the left mouse button is released
            window.addEventListener('mouseup', function (evt) {
                // Set event variable to evt
                var event = evt;
                // Check if draggedClone exist and if have class 'dragged' and if is left button of the mouse
                if (draggedClone != null && draggedClone.classList.contains('dragged') && evt.which === 1) {
                    // Check if the targetContainer have the cloned element already existing
                    if (that.targetContainer.contains(draggedClone)) {
                        // If it is there remove it from targetContainer
                        that.targetContainer.removeChild(draggedClone);
                        // Remove class 'dragging-now' from the element which was dragged and set the width and height to 0px
                        that.draggingNowBox.classList.remove('dragging-now');
                        // Hide deleteBoxesContainerElement
                        document.querySelector('.main-draggable-delete').style.display = 'none';
                        // Check if draggingNowBox is set and if the event target is overlay div ( it is set to be invisible div with higher index, so when clonned element is on top of it to simulate that is on top of delete icon )
                        if (that.draggingNowBox != null && event.target.classList.contains('overlay')) {
                            // Add class 'deleted' to the elemnt to be deleted
                            that.draggingNowBox.classList.add('deleted');
                            // Remove the box from the boxesPlaceholder array and initializedProperties array
                            that.boxesPlaceholder.splice(parseInt(that.draggingNowBox.getAttribute('data-order')), 1);
                            that.initializedProperties.splice(parseInt(that.draggingNowBox.getAttribute('data-order')), 1);
                            // Decrease the initializedPropertiesCounter with 1
                            that.initializedPropertiesCounter--;
                            // Call reorderBoxes with passing the order number from which to start reordering the boxes
                            // Set draggingNowBox back to null
                            that.draggingNowBox = null;
                            // Decrease boxesOrderCounter with 1
                            that.boxesOrderCounter--;
                            // Timeout for removing the box from the DOM
                            setTimeout(function () {
                                document.querySelector('.deleted').remove();
                                that.reorderBoxes(0);
                            }, 301);
                        } else if (that.draggingNowBox != null && event.target.classList.contains('main-draggable-box')) {
                            // Else if we are over a box with class 'main-draggable-box' means we need to reorder boxes and call reorderBoxes with starting index of 0
                            that.reorderBoxes(0);
                        } else {
                            // else if non of the above unset draggedClone and draggingNowBox
                            draggedClone = null;
                            that.draggingNowBox = null;
                        }
                    }
                }
                // Remove the event listeners
                window.removeEventListener('mousemove', moveBox, true);
                window.removeEventListener('mousedown', onMouseDown, true);
            }, true);
        }
        /**
         * Reorders the boxes in the grid
         * @param  {number} start Index from which to start reordering
         * @memberof Boxes
         * @namespace Boxes.reorderBoxes
         */

    }, {
        key: 'reorderBoxes',
        value: function reorderBoxes(start) {
            // Set startFrom variable to start
            var startFrom = start;
            // Empty initializedProperties array
            this.initializedProperties = [];
            // Get current boxes from targetContainer
            var currentBoxes = this.targetContainer.querySelectorAll('.main-draggable-box');
            // Loop through currentBoxes with starting index of start
            for (var i = start; i < currentBoxes.length; i++) {
                var thisBox = currentBoxes[i];
                // If startFrom index is 0
                if (startFrom === 0) {
                    // Set new data-order atteribute to equal the loop index
                    thisBox.setAttribute('data-order', i);
                } else {
                    // Else means its reordering from other index and we are setting data-order attribute to current value -1
                    thisBox.setAttribute('data-order', parseInt(thisBox.getAttribute('data-order')) - 1);
                }
            }
            // Recreate initializedProperties array with new boxes order
            for (var _i = 0; _i < currentBoxes.length; _i++) {
                var _thisBox = currentBoxes[_i];
                this.initializedProperties.push(_thisBox.getAttribute('data-name'));
            }
        }
        /**
         * Adds new boxes to targetContainer
         * @memberof Boxes
         * @namespace Boxes.addBox
         */

    }, {
        key: 'addBox',
        value: function addBox() {
            // Create new box and set properties for it
            var box = document.createElement('div');
            box.classList.add('main-draggable-box');
            box.style.width = 'calc(' + this.boxDimensions + '% - 20px)';
            box.style.height = 'calc(' + this.boxDimensions + '% - 20px)';
            box.setAttribute('data-order', this.boxesOrderCounter);
            // Check if we already have a box with this properties and if not set them and break the loop
            for (var i = 0; i < this.boxesProperties.length; i++) {
                if (this.initializedProperties.indexOf(this.boxesProperties[i]['name']) == -1) {
                    this.boxesPlaceholder.push(box);
                    box.setAttribute('data-name', this.boxesProperties[i]['name']);
                    box.style.backgroundColor = this.boxesProperties[i]['color'];
                    box.innerHTML = '<p>' + this.boxesProperties[i]['name'] + '</p>';
                    this.initializedPropertiesCounter++;
                    this.boxesOrderCounter++;
                    this.targetContainer.appendChild(box);
                    this.reorderBoxes(0);
                    break;
                }
            }
        }
        /**
         * Shuffles the boxes and updates arrays
         * @memberof Boxes
         * @namespace Boxes.shuffleBoxes
         */

    }, {
        key: 'shuffleBoxes',
        value: function shuffleBoxes() {
            // Call the shuffler function and pass boxesPlaceholder and initializedProperties arrays
            this.shuffler(this.boxesPlaceholder, this.initializedProperties);
            var oldDimensions = void 0;
            // Remove all current boxes
            for (var i = this.targetContainer.children.length - 1; i >= 0; i--) {
                if (this.targetContainer.children[i].classList.contains('main-draggable-box')) {
                    this.targetContainer.children[i].classList.add('deleted');
                    if (i === 0) {
                        oldDimensions = this.targetContainer.children[i].getBoundingClientRect.width;
                    }
                }
            }
            var that = this;
            var boxesToDelete = document.querySelectorAll('.deleted');
            setTimeout(function () {
                for (var _i2 = 0; _i2 < boxesToDelete.length; _i2++) {
                    boxesToDelete[_i2].remove();
                }
                // Recreate boxes from new boxesPlaceholder array order and set proper data-order attributes
                for (var _i3 = 0; _i3 < that.boxesPlaceholder.length; _i3++) {
                    that.targetContainer.appendChild(that.boxesPlaceholder[_i3]);
                    that.boxesPlaceholder[_i3].setAttribute('data-order', _i3);
                    that.boxesPlaceholder[_i3].classList.remove('deleted');
                }
            }, 300);
        }
    }, {
        key: 'shuffler',

        /**
         * Takes 2 arrays and shuffles their elements
         * @param  {Array} arr1     Array 1 to shuffle
         * @param  {Array} arr2     Array 2 to shuffle
         * @memberof Boxes
         * @namespace Boxes.shuffler
         */
        value: function shuffler(arr1, arr2) {
            for (var j, x, y, z, i = arr1.length, y = arr2.length; i, y; j = parseInt(Math.random() * i), x = arr1[--i], arr1[i] = arr1[j], arr1[j] = x, z = arr2[--y], arr2[y] = arr2[j], arr2[j] = z) {}
        }
    }]);

    return Boxes;
}();
// Entry point


'use strict';

var draggableContainer = document.getElementById('main-draggable');
// create new instance of Boxes class and init() to create boxes
var boxes = new Boxes(12, 4, draggableContainer, '200px');
boxes.init();

document.getElementById('add-new-boxes').addEventListener('click', function () {
    boxes.addBox();
}, false);

document.getElementById('shuffle-boxes').addEventListener('click', function () {
    boxes.shuffleBoxes();
}, false);