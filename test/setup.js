global.$ = document.querySelector.bind(document);
global.$$ = document.querySelectorAll.bind(document);

import { Application } from '@hotwired/stimulus';
import DroppableController from 'index';

const application = Application.start();
application.register('droppable', DroppableController);

global.mockEvent = (type, options = {}) => {
  let event = new Event(type, Object.assign({ bubbles: true }, options));
  Object.defineProperty(event, 'pageX', {
    get: () => options.pageX
  });
  Object.defineProperty(event, 'pageY', {
    get: () => options.pageY
  });
  return event;
}
