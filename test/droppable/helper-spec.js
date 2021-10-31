describe('helper', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="droppable">
        <p draggable="true">
          <span>Draggable 1</span>
        </p>
        <p data-droppable-target="drop">
          <span>Droppable 1</span>
        </p>
        <p data-droppable-target="helper" style="display: none;">
          <span>Dragging...</span>
        </p>
      </div>
    `;
  });

  beforeEach(() => {
    $('[draggable]').dispatchEvent(mockEvent('dragstart'));
  });

  it('shows helper', () => {
    expect($('[data-droppable-target="helper"]').style.display).toEqual('');

    $('[draggable]').dispatchEvent(mockEvent('drag', { pageX: 10, pageY: 10 }));
    $('[data-droppable-target="drop"]').dispatchEvent(mockEvent('dragenter'));
    $('[data-droppable-target="drop"]').dispatchEvent(mockEvent('dragover'));
    $('[data-droppable-target="drop"]').dispatchEvent(mockEvent('dragleave'));
    $('[data-droppable-target="drop"]').dispatchEvent(mockEvent('drop'));
    $('[draggable]').dispatchEvent(mockEvent('dragend'));
    expect($('[data-droppable-target="helper"]').style.display).toEqual('none');
  });
});
