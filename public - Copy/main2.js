function addJanela2() {
    let mainContainer = document.getElementById('main-container');

    // mainRow
    // janela properties
    // collapser 
    // row + 3 cols
    // cada uma com alu, vid e ace

    countStructs++;
    countAlus++;
    countVids++;
    countAces++;

    // main container
    let mainRow = newElem(
        ['row', 'main-row', 'border', 'border-warning', 'border-w-3', 'border-start-0', 'border-end-0', 'border-top-0', 'px-4'],
        'div',
        [['id', 'struct-' + countStructs]]
    );

    //? strucutre properties (name, collapse, delete, duplicate)
    let propertiesRow = newElem(['row','properties-row', 'ps-4']);
    let propertiesNameContainer = newElem(['col-8', 'ps-4', 'pe-5', 'pt-4']);

    let propertiesNameInput = newElem(
        ['name-input-hidden', 'form-control', 'mb-1'],
        'input',
        [
            ['type', 'text']
        ]);
    let titleId = 'propertiesNameTitle' + countStructs;
    let propertiesNameTitle = newElem(['h3'], 'p', [['id', titleId], ['title', 'Clica para mudar']]);
    propertiesNameTitle.innerText = 'Nova Janela';
    propertiesNameTitle.appendChild(newElem(['bi', 'bi-pencil-square', 'ms-3', 'text-warning'], 'i'));
    propertiesNameTitle.addEventListener('click', (e) => { janelaNameInput(e, propertiesNameInput) });
    //? este listener está aqui para conseguir passar o titulo como arg
    propertiesNameInput.addEventListener('focusout', (e) => { saveJanelaName(e, propertiesNameTitle) });

    appendChildren(propertiesNameContainer, [propertiesNameInput, propertiesNameTitle]);

    let propertiesButtonsGroup = newElem(['btn-group', 'col-4', 'd-flex', 'justify-content-end', 'my-4', 'px-5']);
    let propertiesBtnCollapse = newElem(
        ['btn', 'btn-outline-secondary', 'hover-cl-black', 'ms-5', 'fw-bold'],
        'button',
        [['type', 'button']]);
    propertiesBtnCollapse.innerText = 'Minimizar';
    propertiesBtnCollapse.addEventListener('click', (e) => {
        alert('Este botão ainda não funfa');
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
        setTimeout( function() {
            mainRow.parentNode.removeChild(mainRow);
            propertiesRow.parentNode.removeChild(propertiesRow);
        }, 800);
    })
    appendChildren(propertiesButtonsGroup, [propertiesBtnCollapse, propertiesBtnDelete])

    //? structure sub-categories (alu + vid + ace)
    let itemsRow = newElem(['row', 'row-cols-md-3']);

    let alu = newSubCategory('alu', titleId);
    let vid = newSubCategory('vid', titleId);
    let ace = newSubCategory('ace', titleId);

    // append everything to main
    appendChildren(propertiesRow, [propertiesNameContainer, propertiesButtonsGroup]);
    appendChildren(itemsRow, [alu, vid, ace]);
    appendChildren(mainRow, [propertiesRow, itemsRow]);
    appendChildren(mainContainer, [propertiesRow, mainRow]);

    console.log('Finished addJanela2().');

}


// TODO
function addItemTo(parent) {

}