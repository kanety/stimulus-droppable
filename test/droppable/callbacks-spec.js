describe('callbacks', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="droppable">
        <p draggable="true">
          <span>Draggable content 1</span>
        </p>
        <p data-droppable-target="drop">
          <span>Droppable content 1</span>
        </p>
      </div>
    `;
  });

  let messages = [];
  beforeEach(() => {
    $('div').addEventListener('droppable:start', e => {
      messages.push('start');
    });
    $('div').addEventListener('droppable:drag', e => {
      messages.push('drag');
    });
    $('div').addEventListener('droppable:enter', e => {
      messages.push('enter');
    });
    $('div').addEventListener('droppable:over', e => {
      messages.push('over');
    });
    $('div').addEventListener('droppable:leave', e => {
      messages.push('leave');
    });
    $('div').addEventListener('droppable:drop', e => {
      messages.push('drop');
    });
    $('div').addEventListener('droppable:end', e => {
      messages.push('end');
    });
  });

  beforeEach(() => {
    $('p[draggable]').dispatchEvent(new CustomEvent('dragstart', { bubbles: true }));
  });

  it('runs callbacks', () => {
    $('p[draggable]').dispatchEvent(new CustomEvent('drag', { bubbles: true }));
    $('p[data-droppable-target]').dispatchEvent(new CustomEvent('dragenter', { bubbles: true }));
    $('p[data-droppable-target]').dispatchEvent(new CustomEvent('dragover', { bubbles: true }));
    $('p[data-droppable-target]').dispatchEvent(new CustomEvent('dragleave', { bubbles: true }));
    $('p[data-droppable-target]').dispatchEvent(new CustomEvent('drop', { bubbles: true }));
    $('p[draggable]').dispatchEvent(new CustomEvent('dragend', { bubbles: true }));

    expect(messages).toEqual(['start', 'drag', 'enter', 'over', 'leave', 'drop', 'end']);
  });
});
