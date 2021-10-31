describe('callbacks', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="droppable">
        <p draggable="true">
          <span>Draggable 1</span>
        </p>
        <p data-droppable-target="drop">
          <span>Droppable 1</span>
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
    $('[draggable]').dispatchEvent(mockEvent('dragstart'));
  });

  it('runs callbacks', () => {
    $('[draggable]').dispatchEvent(mockEvent('drag'));
    $('[data-droppable-target]').dispatchEvent(mockEvent('dragenter'));
    $('[data-droppable-target]').dispatchEvent(mockEvent('dragover'));
    $('[data-droppable-target]').dispatchEvent(mockEvent('dragleave'));
    $('[data-droppable-target]').dispatchEvent(mockEvent('drop'));
    $('[draggable]').dispatchEvent(mockEvent('dragend'));

    expect(messages).toEqual(['start', 'drag', 'enter', 'over', 'leave', 'drop', 'end']);
  });
});
