function addJanela2() {
    const mainContainer = document.getElementById('main-container');
    countStructs++;

    // main container
    const mainCol = newElem(
        ['col', 'main-col', 'border', 'border-warning', 'border-w-3', 'border-start-0', 'border-end-0', 'border-top-0', 'px-5', 'pt-3'],
        'div',
        [['id', 'struct-' + countStructs]]
    );

    //? strucutre properties (name, collapse, delete, duplicate)
    const propertiesRow = newElem(['row', 'row-cols-1', 'row-cols-md-3', 'gx-5', 'gy-3', 'properties-row', 'pb-3', 'pt-3']);

    
    const propTitle = newElem(
        ['h1', 'col-8', 'm-0'], 
        'p', 
        [
            ['id', 'janela-title-' + countStructs],
            ['data-bs-toggle', 'modal'],
            ['data-bs-target', '#titleModal']
        ], 
        'Janela ' + countStructs);
    propTitle.appendChild(newElem(['bi', 'bi-pencil-square', 'ms-3', 'text-warning'], 'i'));

    // propTitle.insertBefore(
    //     newElem(['text-muted', 'fw-bold', 'fs-6', 'mb-0'], 'p', [[]], 'Preço: '),
    //     propTitle.childNodes[0]
    // );

    const propBtnGroup = newElem(['col', 'btn-group', 'bg-white', 'px-3', 'm-0']);
    const propBtnCollapse = newElem(
        ['btn', 'btn-outline-secondary', 'fw-bold'],
        'button',
        [
            ['type', 'button'],
            ['data-bs-toggle', 'collapse'],
            ['data-bs-target', '#itemsRow' + countStructs]
        ],
        'Minimizar');
    const propBtnDelete = newElem(
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

    const propDimensions = newElem(
        ['col-12', 'fw-bol', 'fs-5', 'text-muted', 'm-0', 'prop-dimensions'],
        'p',
        [
            ['id', 'janela-dimensions-' + countStructs]
        ]);
    propDimensions.append(
        newElem(['prop-dimensions-altura'], 'span', [['data-altura', '0']], '0'),
        ' x ',
        newElem(['prop-dimensions-largura'], 'span', [['data-largura', '0']], '0'),
        ' m'
    )


    appendChildren(propBtnGroup, [propBtnCollapse, propBtnDelete]);
    appendChildren(propertiesRow, [propTitle, propBtnGroup, propDimensions]);



    const propertiesNameContainer = newElem(['col-md-8', 'col-12', 'ps-4', 'pe-5', 'pt-4']);
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

    //TODO Create event listeners for itemsRow collapsing (to change the buttons' innerText)

    let alu = newSubCategory('alu', titleId);
    let vid = newSubCategory('vid', titleId);
    let ace = newSubCategory('ace', titleId);

    // append everything to main
    // appendChildren(propertiesRow, [propertiesNameContainer, propertiesButtonsGroup]);
    appendChildren(itemsRow, [alu, vid, ace]);
    appendChildren(mainCol, [propertiesRow, itemsRow]);
    appendChildren(mainContainer, [mainCol]);

    // after loading everything, show the titleModal
    var titleModal = new bootstrap.Modal(document.getElementById('titleModal'));
    //! un-comment this when the modal is ready
    // titleModal.show(propTitle);
}