function addJanela2() {
    console.log(document.querySelector('.documento-preco').innerText)

    const mainContainer = document.getElementById('main-container');
    countStructs++;

    // main container
    const mainCol = newElem(
        ['col', 'main-col', 'border', 'border-warning', 'border-w-3', 'border-start-0', 'border-end-0', 'border-top-0', 'px-5', 'pt-4'],
        'div',
        [['id', 'struct-' + countStructs]]
    );

    //? strucutre properties (name, collapse, delete, duplicate)
    const propertiesRow = newElem(['row', 'row-cols-1', 'row-cols-md-3', 'gx-5', 'gy-3', 'properties-row', 'pb-3', 'pt-3']);


    let propTitle = newElem(
        ['h2', 'col-8', 'm-0', 'order-first'],
        'p',
        [
            ['id', 'janela-title-' + countStructs],
            ['data-bs-toggle', 'modal'],
            ['data-bs-target', '#titleModal']
        ],
        'Janela ' + countStructs
    );
    propTitle.appendChild(newElem(['bi', 'bi-pencil-square', 'ms-3', 'text-warning'], 'i'));

    const propBtnGroup = newElem(['col', 'btn-group', 'bg-white', 'px-3', 'm-0', 'order-last', 'order-md-2']);
    const propBtnCollapse = newElem(
        ['btn', 'btn-outline-secondary', 'btn-collapse', 'fw-bold'],
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
        ['col-12', 'fw-bol', 'fs-5', 'text-muted', 'm-0', 'my-1', 'prop-dimensions', 'order-md-last'],
        'p',
        [
            ['id', 'janela-dimensions-' + countStructs]
        ]);
    propDimensions.append(
        'Altura: ',
        newElem(['prop-dimensions-altura'], 'span', [['data-altura', '0']], '0'),
        ' m',
        newElem(['janela-spacer', 'mx-3'], 'span'),
        'Largura: ',
        newElem(['prop-dimensions-largura'], 'span', [['data-largura', '0']], '0'),
        ' m',
        newElem(['janela-spacer', 'mx-3'], 'span'),
        'Preço: ',
        newElem(['janela-preco'], 'span', [['data-janela-preco', '0']], '0.00'),
        ' €'
    )
    appendChildren(propBtnGroup, [propBtnCollapse, propBtnDelete]);
    appendChildren(propertiesRow, [propTitle, propBtnGroup, propDimensions]);

    //? structure sub-categories (alu + vid + ace)
    const itemsRow = newElem(['row', 'row-cols-md-3', 'row-cols-1', 'gx-5', 'gy-3', 'pb-4', 'collapse', 'show'], 'div', [['id', 'itemsRow' + countStructs]]);
    itemsRow.addEventListener('show.bs.collapse', (e) => { e.target.parentElement.querySelector('.btn-collapse').innerText = 'Minimizar'; });
    itemsRow.addEventListener('hide.bs.collapse', (e) => { e.target.parentElement.querySelector('.btn-collapse').innerText = 'Maximizar'; });

    // append everything to main
    appendChildren(mainCol, [propertiesRow, itemsRow]);
    appendChildren(mainContainer, [mainCol]);

    const titleId = 'janela-title-' + countStructs;
    itemsRow.append(
        newSubCategory('alu', titleId),
        newSubCategory('vid', titleId),
        newSubCategory('ace', titleId)
    )



    // after loading everything, show the titleModal
    const titleModal = new bootstrap.Modal(document.getElementById('titleModal'));
    //! un-comment this when the modal is ready
    titleModal.show(propTitle);
}