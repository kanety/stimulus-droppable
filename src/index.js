import { Controller } from '@hotwired/stimulus';
import '@kanety/stimulus-static-actions';
import './index.scss';

export default class extends Controller {
  static targets = ['drop', 'helper'];
  static actions = [
    ['element', 'dragstart@document->start']
  ];
  static dragActions = [
    ['element', 'dragenter@document->enter'],
    ['element', 'dragover@document->over'],
    ['element', 'dragleave@document->leave'],
    ['element', 'drag@document->drag'],
    ['element', 'drop@document->drop'],
    ['element', 'dragend@document->end']
  ];

  get draggers() {
    return this.scope.findAllElements('[draggable="true"]');
  }

  start(e) {
    this.currentDrag = this.draggers.find(drag => drag.contains(e.target));
    if (this.currentDrag) {
      this.toggleClass(true);
      this.showHelper(e.pageX, e.pageY);
      this.dispatch('start', { detail: { dataTransfer: e.dataTransfer, drag: this.currentDrag } });
      this.context.actionSet.add(this.constructor.dragActions);
    }
  }

  enter(e) {
    let drop = this.findCurrentDrop(e.target);
    if (drop) {
      this.toggleOverClass(drop, true)
      this.dispatch('enter', { detail: { dataTransfer: e.dataTransfer, drag: this.currentDrag, drop: drop } });
    }
    e.preventDefault();
  }

  over(e) {
    let drop = this.findCurrentDrop(e.target);
    if (drop) {
      this.dispatch('over', { detail: { dataTransfer: e.dataTransfer, drag: this.currentDrag, drop: drop } });
    }
    e.preventDefault();
  }

  leave(e) {
    let drop = this.findCurrentDrop(e.target);
    if (drop) {
      this.toggleOverClass(drop, false)
      this.dispatch('leave', { detail: { dataTransfer: e.dataTransfer, drag: this.currentDrag, drop: drop } });
    }
  }

  drag(e) {
    this.moveHelper(e.pageX, e.pageY);
    this.dispatch('drag', { detail: { dataTransfer: e.dataTransfer, drag: this.currentDrag } });
  }

  drop(e) {
    let drop = this.findCurrentDrop(e.target);
    if (drop) {
      this.dispatch('drop', { detail: { dataTransfer: e.dataTransfer, drag: this.currentDrag, drop: drop } });
    }
  }

  end(e) {
    this.toggleClass(false);
    this.hideHelper();
    this.dispatch('end', { detail: { dataTransfer: e.dataTransfer, drag: this.currentDrag } });
    this.context.actionSet.remove(this.constructor.dragActions);
  }

  findCurrentDrop(target) {
    return this.dropTargets.find(drop => drop.contains(target));
  }

  toggleClass(dragging) {
    if (dragging) {
      this.dropTargets.forEach(drop => {
        drop.classList.add('st-droppable__drop--ok');
      });
    } else {
      this.dropTargets.forEach(drop => {
        drop.classList.remove('st-droppable__drop--ok');
        drop.classList.remove('st-droppable__drop--over');
      });
    }
  }

  toggleOverClass(drop, dragging) {
    if (dragging) {
      drop.classList.add('st-droppable__drop--over');
    } else {
      drop.classList.remove('st-droppable__drop--over');
    }
  }

  showHelper(x, y) {
    if (this.hasHelperTarget) {
      this.helperTarget.style.display = '';
      this.moveHelper(x, y);    
    }
  }

  moveHelper(x, y) {
    if (this.hasHelperTarget && x && y) {
      this.helperTarget.style.top = y + 10 + 'px';
      this.helperTarget.style.left = x + 'px';
    }
  }

  hideHelper() {
    if (this.hasHelperTarget) {
      this.helperTarget.style.display = 'none';
    }
  }
}
