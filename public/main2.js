function addJanela2() {
    let mainContainer = document.getElementById('main-container');
    countStructs++;

    // main container
    let mainRow = newElem(
        ['row', 'main-row', 'border', 'border-warning', 'border-w-3', 'border-start-0', 'border-end-0', 'border-top-0', 'px-4'],
        'div',
        [['id', 'struct-' + countStructs]]
    );

    //? strucutre properties (name, collapse, delete, duplicate)
    let propertiesRow = newElem(['row', 'properties-row', 'ps-3']);
    let propertiesNameContainer = newElem(['col-md-8', 'col-12', 'ps-4', 'pe-5', 'pt-4']);

    let propertiesNameInput = newElem(
        ['name-input-hidden', 'form-control', 'mb-1'],
        'input',
        [
            ['type', 'text']
        ]);
    let titleId = 'propertiesNameTitle' + countStructs;
    let propertiesNameTitle = newElem(['h2'], 'p', [['id', titleId], ['title', 'Clica para mudar']]);
    propertiesNameTitle.innerText = 'Janela ' + countStructs;
    propertiesNameTitle.appendChild(newElem(['bi', 'bi-pencil-square', 'ms-3', 'text-warning'], 'i'));
    propertiesNameTitle.addEventListener('click', (e) => { janelaNameInput(e, propertiesNameInput) });
    //? este listener está aqui para conseguir passar o titulo como arg
    propertiesNameInput.addEventListener('focusout', (e) => { saveJanelaName(e, propertiesNameTitle, countStructs) });

    appendChildren(propertiesNameContainer, [propertiesNameInput, propertiesNameTitle]);

    let propertiesButtonsGroup = newElem(['btn-group', 'col-md-4', 'col-12', 'my-4', 'px-5']);
    let propertiesBtnCollapse = newElem(
        ['btn', 'btn-outline-secondary', 'hover-cl-black', 'ms-5', 'fw-bold'],
        'button',
        [
            ['type', 'button'],
            ['data-bs-toggle', 'collapse'],
            ['data-bs-target', '#itemsRow' + countStructs]
        ]);
    propertiesBtnCollapse.innerText = 'Minimizar';
    propertiesBtnCollapse.addEventListener('click', (e) => {

    })
    let propertiesBtnDelete = newElem(
        ['btn', 'btn-outline-secondary', 'hover-bg-red', 'fw-bold'],
        'button',
        [['type', 'button']]);
    propertiesBtnDelete.innerText = 'Eliminar';
    propertiesBtnDelete.addEventListener('click', (e) => {
        mainRow.classList.remove('fade-in-main');
        mainRow.classList.add('fade-out-main');
        propertiesRow.classList.add('fade-out-main');
        setTimeout(function () {
            mainRow.parentNode.removeChild(mainRow);
            propertiesRow.parentNode.removeChild(propertiesRow);
        }, 800);
    })
    appendChildren(propertiesButtonsGroup, [propertiesBtnCollapse, propertiesBtnDelete])

    //? structure sub-categories (alu + vid + ace)
    let itemsRow = newElem(['row', 'row-cols-lg-3', 'row-cols-1', 'collapse', 'show'], 'div', [['id', 'itemsRow' + countStructs]]);

    let alu = newSubCategory('alu', titleId);
    let vid = newSubCategory('vid', titleId);
    let ace = newSubCategory('ace', titleId);

    // append everything to main
    appendChildren(propertiesRow, [propertiesNameContainer, propertiesButtonsGroup]);
    appendChildren(itemsRow, [alu, vid, ace]);
    appendChildren(mainRow, [propertiesRow, itemsRow]);
    appendChildren(mainContainer, [mainRow]);
}


// TODO
function addItemTo(parent) {

}