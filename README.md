# stimulus-droppable

A stimulus controller for simple drag and drop elements.

## Dependencies

* @hotwired/stimulus 3.0

## Installation

Install from npm:

    $ npm install @kanety/stimulus-droppable --save

## Usage

Register controller:

```javascript
import { Application } from '@hotwired/stimulus';
import DroppableController from '@kanety/stimulus-droppable';

const application = Application.start();
application.register('droppable', DroppableController);
```

Import css:

```css
@import '@kanety/stimulus-droppable';
```

Build html as follows:

```html
<div class="st-droppable" data-controller="droppable">
  <p draggable="true">
    <span>Draggable 1</span>
  </p>
  <p draggable="true">
    <span>Draggable 2</span>
  </p>
  <p data-droppable-target="drop">
    <span>Droppable 1</span>
  </p>
  <p data-droppable-target="drop">
    <span>Droppable 2</span>
  </p>
</div>
```

### Options

#### helper

Show helper element while dragging:

```html
<div class="st-droppable" data-controller="droppable">
  <p data-droppable-target="helper" class="st-droppable__helper" style="display: none;">
    <span>Now dragging contents...</span>
  </p>
</div>
```

### Callbacks

Run callbacks when draggable element is dragged or dropped:

```javascript
let element = document.querySelector('[data-controller="droppable"]');
element.addEventListener('droppable:start', e => {
  console.log("dragstart: " + e.detail.drag);
});
element.addEventListener('droppable:drag', e => {
  console.log("drag: " + e.detail.drag);
});
element.addEventListener('droppable:enter', e => {
  console.log("dragenter: " + e.detail.drag);
  console.log("dragenter: " + e.detail.drop);
});
element.addEventListener('droppable:over', e => {
  console.log("dragover: " + e.detail.drag);
  console.log("dragover: " + e.detail.drop);
});
element.addEventListener('droppable:leave', e => {
  console.log("dragleave: " + e.detail.drag);
  console.log("dragleave: " + e.detail.drop);
});
element.addEventListener('droppable:drop', e => {
  console.log("drop: " + e.detail.drag);
  console.log("drop: " + e.detail.drop);
});
element.addEventListener('droppable:end', e => {
  console.log("dragend: " + e.detail.drag);
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
