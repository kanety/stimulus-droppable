describe('basic', () => {
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

  beforeEach(() => {
    $('p[draggable]').dispatchEvent(new CustomEvent('dragstart', { bubbles: true }));
  });

  it('drags and drops', () => {
    $('p[draggable]').dispatchEvent(new CustomEvent('drag', { bubbles: true }));
    expect($('p[data-droppable-target="drop"]').matches('.st-droppable__drop')).toEqual(true);

    $('p[data-droppable-target="drop"]').dispatchEvent(new CustomEvent('dragenter', { bubbles: true }));
    expect($('p[data-droppable-target="drop"]').matches('.st-droppable__drop--current')).toEqual(true);

    $('p[data-droppable-target="drop"]').dispatchEvent(new CustomEvent('dragover', { bubbles: true }));
    $('p[data-droppable-target="drop"]').dispatchEvent(new CustomEvent('dragleave', { bubbles: true }));
    expect($('p[data-droppable-target="drop"]').matches('.st-droppable__drop--current')).toEqual(false);

    $('p[data-droppable-target="drop"]').dispatchEvent(new CustomEvent('drop', { bubbles: true }));
    $('p[draggable]').dispatchEvent(new CustomEvent('dragend', { bubbles: true }));
  });
});
