function addJanela2() {
    let mainContainer = document.getElementById('main-container');
    countStructs++;

    // main container
    let mainCol = newElem(
        ['col', 'main-col', 'border', 'border-warning', 'border-w-3', 'border-start-0', 'border-end-0', 'border-top-0', 'px-5'],
        'div',
        [['id', 'struct-' + countStructs]]
    );

    //? strucutre properties (name, collapse, delete, duplicate)
    let propertiesRow = newElem(['row', 'row-cols-1', 'row-cols-md-3', 'gx-5', 'gy-3', 'properties-row', 'pb-4', 'pt-5']);

    let propTitle = newElem(
        ['h2', 'col-8', 'm-0'], 
        'p', 
        [
            ['data-bs-toggle', 'modal'],
            ['data-bs-target', '#titleModal']
        ], 
        'Janela ' + countStructs);
    propTitle.appendChild(newElem(['bi', 'bi-pencil-square', 'ms-3', 'text-warning'], 'i'));

    let propMeasuresContainer = newElem(['col', 'px-3']);
    propMeasuresContainer.appendChild(newElem(['row', 'row-cols-2', 'gx-3']));
    propMeasuresContainer.children[0]
        .appendChild(newElem(['col']))
        .append(
            newElem(['form-label', 'fw-bold', 'text-muted', 'mb-0'], 'label', [['for', 'alturaJanela' + countStructs]], 'Altura: '),
            newElem(
                ['form-control'],
                'input',
                [
                    ['type', 'number'],
                    ['id', 'alturaJanela' + countStructs],
                    ['placeholder', 0]
                ]));
    propMeasuresContainer.children[0]
        .appendChild(newElem(['col']))
        .append(
            newElem(['form-label', 'fw-bold', 'text-muted', 'mb-0'], 'label', [['for', 'larguraJanela' + countStructs]], 'Largura: '),
            newElem(
                ['form-control'],
                'input',
                [
                    ['type', 'number'],
                    ['id', 'larguraJanela' + countStructs],
                    ['placeholder', 0]
                ]));

    let propAltura = newElem(['form-control'], 'input', [['type', 'number'], ['id', 'alturaJanela' + countStructs]]);
    let propLargura = newElem(['form-control'], 'input', [['type', 'number'], ['id', 'larguraJanela' + countStructs]]);
    // appendChildren(propMeasuresContainer, [propAltura, propLargura]);

    let propBtnGroup = newElem(['col', 'btn-group', 'bg-white', 'px-3', 'm-0']);
    let propBtnCollapse = newElem(
        ['btn', 'btn-outline-secondary', 'fw-bold'],
        'button',
        [
            ['type', 'button'],
            ['data-bs-toggle', 'collapse'],
            ['data-bs-target', '#itemsRow' + countStructs]
        ],
        'Minimizar');
    let propBtnDelete = newElem(
        ['btn', 'btn-outline-secondary', 'hover-bg-red', 'fw-bold'],
        'button',
        [['type', 'button']],
        'Eliminar');
    propBtnDelete.addEventListener('click', (e) => {
        mainCol.classList.remove('fade-in-main');
        mainCol.classList.add('fade-out-main');
        propertiesRow.classList.add('fade-out-main');
        setTimeout(function () {
            mainCol.parentNode.removeChild(mainCol);
            propertiesRow.parentNode.removeChild(propertiesRow);
        }, 800);
    })


    appendChildren(propBtnGroup, [propBtnCollapse, propBtnDelete]);
    appendChildren(propertiesRow, [propTitle, propBtnGroup]);



    let propertiesNameContainer = newElem(['col-md-8', 'col-12', 'ps-4', 'pe-5', 'pt-4']);
    let propertiesNameInput = newElem(
        ['name-input-hidden', 'form-control', 'mb-1', 'col-6'],
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
        ],
        'Minimizar');
    propertiesBtnCollapse.addEventListener('click', (e) => {

    })
    let propertiesBtnDelete = newElem(
        ['btn', 'btn-outline-secondary', 'hover-bg-red', 'fw-bold'],
        'button',
        [['type', 'button']],
        'Eliminar');
    propertiesBtnDelete.addEventListener('click', (e) => {
        mainCol.classList.remove('fade-in-main');
        mainCol.classList.add('fade-out-main');
        propertiesRow.classList.add('fade-out-main');
        setTimeout(function () {
            mainCol.parentNode.removeChild(mainCol);
            propertiesRow.parentNode.removeChild(propertiesRow);
        }, 800);
    })
    appendChildren(propertiesButtonsGroup, [propertiesBtnCollapse, propertiesBtnDelete])

    //? structure sub-categories (alu + vid + ace)
    let itemsRow = newElem(['row', 'row-cols-md-3', 'row-cols-1', 'gx-5', 'gy-3', 'pb-4', 'collapse', 'show'], 'div', [['id', 'itemsRow' + countStructs]]);

    let alu = newSubCategory('alu', titleId);
    let vid = newSubCategory('vid', titleId);
    let ace = newSubCategory('ace', titleId);

    // append everything to main
    // appendChildren(propertiesRow, [propertiesNameContainer, propertiesButtonsGroup]);
    appendChildren(itemsRow, [alu, vid, ace]);
    appendChildren(mainCol, [propertiesRow, itemsRow]);
    appendChildren(mainContainer, [mainCol]);
}


// TODO
function addItemTo(parent) {

}