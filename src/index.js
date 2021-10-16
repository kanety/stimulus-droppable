import { Controller } from '@hotwired/stimulus';
import '@kanety/stimulus-static-actions';
import './index.scss';

export default class extends Controller {
  static targets = ['drop'];
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
    this.currentDrag = this.draggers.find(drag => drag == e.target);
    if (this.currentDrag) {
      this.toggleClass(true);
      this.dispatch('start', { detail: { event: e, drag: this.currentDrag } });
      this.context.actionSet.add(this.constructor.dragActions);
    }
  }

  enter(e) {
    let drop = this.findCurrentDrop(e.target);
    if (drop) {
      drop.classList.add('st-droppable__drop--current');
      this.dispatch('enter', { detail: { event: e, drag: this.currentDrag, drop: drop } });
    }
    e.preventDefault();
  }

  over(e) {
    let drop = this.findCurrentDrop(e.target);
    if (drop) {
      this.dispatch('over', { detail: { event: e, drag: this.currentDrag, drop: drop } });
    }
    e.preventDefault();
  }

  leave(e) {
    let drop = this.findCurrentDrop(e.target);
    if (drop) {
      drop.classList.remove('st-droppable__drop--current');
      this.dispatch('leave', { detail: { event: e, drag: this.currentDrag, drop: drop } });
    }
  }

  drag(e) {
    this.dispatch('drag', { detail: { event: e, drag: this.currentDrag } });
  }

  drop(e) {
    let drop = this.findCurrentDrop(e.target);
    if (drop) {
      this.dispatch('drop', { detail: { event: e, drag: this.currentDrag, drop: drop } });
    }
  }

  end(e) {
    this.toggleClass(false);
    this.dispatch('end', { detail: { event: e, drag: this.currentDrag } });
    this.context.actionSet.remove(this.constructor.dragActions);
  }

  findCurrentDrop(target) {
    return this.dropTargets.find(drop => drop.contains(target));
  }

  toggleClass(dragging) {
    if (dragging) {
      this.dropTargets.forEach(drop => {
        drop.classList.add('st-droppable__drop');
      });
    } else {
      this.dropTargets.forEach(drop => {
        drop.classList.remove('st-droppable__drop');
        drop.classList.remove('st-droppable__drop--current');
      });
    }
  }
}
