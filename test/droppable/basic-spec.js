describe('basic', () => {
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

  beforeEach(() => {
    $('[draggable]').dispatchEvent(mockEvent('dragstart'));
  });

  it('drags and drops', () => {
    $('[draggable]').dispatchEvent(mockEvent('drag'));
    expect($('[data-droppable-target="drop"]').matches('.st-droppable__drop')).toEqual(true);

    $('[data-droppable-target="drop"]').dispatchEvent(mockEvent('dragenter'));
    expect($('[data-droppable-target="drop"]').matches('.st-droppable__drop--current')).toEqual(true);

    $('[data-droppable-target="drop"]').dispatchEvent(mockEvent('dragover'));
    $('[data-droppable-target="drop"]').dispatchEvent(mockEvent('dragleave'));
    expect($('[data-droppable-target="drop"]').matches('.st-droppable__drop--current')).toEqual(false);

    $('[data-droppable-target="drop"]').dispatchEvent(mockEvent('drop'));
    $('[draggable]').dispatchEvent(mockEvent('dragend'));
  });
});
