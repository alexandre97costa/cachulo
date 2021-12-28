// this is responsible for dinamically changing info on maximizarModal
var maximizarModal = document.getElementById('maximizarModal');
maximizarModal.addEventListener('show.bs.modal', (e) => {
    let button = e.relatedTarget;
    let category = button.getAttribute('data-category');
    let janelaName = document.getElementById(button.getAttribute('data-janela-name')).textContent;

    maximizarModal.querySelector('.modal-title').textContent = janelaName + ' / ' + category;
});



function newElem(classes = [], elementType = 'div', attributes = [], innerTextArg = '') {
    var newElement = document.createElement(elementType);
    for (let i = 0; i < classes.length; i++) {
        newElement.classList.add(classes[i]);
    }
    for (let i = 0; i < attributes.length; i++) {
        newElement.setAttribute(attributes[i][0], attributes[i][1]);
    }
    if (innerTextArg != '') { newElement.innerText = innerTextArg; }

    return newElement;
}

function appendChildren(parentElement, childrenArray = []) {
    for (let i = 0; i < childrenArray.length; i++) {
        parentElement.appendChild(childrenArray[i]);
    }
}

function newSubCategory(categoryType = '', titleId) {
    //? Every category needs a container div for easily
    //? adding space in-between category (margin in .col messes everything)
    let spacerCol = newElem(['col', 'pt-0']);
    let categoryContainer = newElem(['row', 'bg-gray', 'very-rounded', 'me-', 'p-3']);

    let titleContainer = newElem(['col-8']);
    let title = newElem(['h4', 'pt-1'], 'p');
    titleContainer.appendChild(title);

    let addItemContainer = newElem(['col-4', 'd-flex', 'justify-content-end', 'me-0', 'pe-0']);
    let addItem = newElem(
        ['btn', 'btn-secondary', 'pt-0', 'fs-5', 'lh-1'],
        'button',
        [
            ['type', 'button'],
            ['title', 'Adicionar elemento']
        ], '+');
    addItem.addEventListener('click', (e) => {
        categoryContainer.appendChild(
            newItem(categoryType, titleId)
        );
    });
    addItemContainer.appendChild(addItem);

    switch (categoryType) {
        case 'alu':
            title.innerText = 'Alumínios';
            break;
        case 'vid':
            title.innerText = 'Vidros';
            break;
        case 'ace':
            title.innerText = 'Acessórios';
            break;
        default:
            break;
    }

    appendChildren(categoryContainer, [
        titleContainer,
        addItemContainer
    ])

    spacerCol.appendChild(categoryContainer);
    return spacerCol;
}

function newItem(itemType = '', titleId, copyContent = false, contentArray = []) {

    //* Explaining the contentArray argument
    // Used for copying an item, while passing certain values as arguments.
    // We just create another element completely, and replace the placeholders with
    // actual content from the item that ordered the duplication.
    //? The function only uses content from contentArray if copyContent is set to true


    let newItemContainer = newElem(['item-container', 'slim-shady', 'bg-white', 'rounded', 'py-2', 'mt-3']);
    newItemContainer.addEventListener('onmouseout', (e) => { document.body.focus() });
    let categoryName = '';

    switch (itemType) {
        case 'alu':
            categoryName = 'Alumínios';
            countAlus++;
            //* Comprimento
            let aluWidth = newElem(['text-muted', 'fw-bold', 'p-0', 'm-0']);
            aluWidth.innerText = 'Medida: ';
            let aluWidth_value = newElem(['value-child', 'text-warning'], 'span');
            aluWidth_value.innerText = (copyContent) ? contentArray[0].toFixed(2) + 'm' : '0.00m';
            aluWidth.appendChild(aluWidth_value);
            let aluWidth_input = newElem(
                ['input-minimized', 'form-control', 'text-muted', 'fs-5', 'mb-3'],
                'input',
                [
                    ['type', 'number'],
                    ['placeholder', (copyContent) ? contentArray[0] : '0']
                ]);
            aluWidth_input.addEventListener('input', (e) => { updateValue(e, aluWidth_value, 'number') });

            //* Serie
            let aluSerie = newElem(['text-muted', 'fw-bold', 'p-0', 'm-0']);
            aluSerie.innerText = 'Série: ';
            let aluSerie_value = newElem(['value-child', 'text-warning'], 'span');
            aluSerie_value.innerText = (copyContent) ? contentArray[1] : '...';
            aluSerie.appendChild(aluSerie_value);
            let aluSerie_input = newElem(
                ['input-minimized', 'form-control', 'text-muted', 'fs-5', 'mb-3'],
                'input',
                [
                    ['placeholder', 'Escolhe uma série...'],
                    ['list', 'datalistSerie' + countAlus]
                ]);
            let aluSerie_dataList = newElem([], 'datalist', [['id', 'datalistSerie' + countAlus]]);
            aluSerie_input.addEventListener('change', (e) => { updateValue(e, aluSerie_value, 'text') });
            aluSerie_input.addEventListener('focus', (e) => {
                aluSerie_input.value = '';
                updateValue('...', aluSerie_value, 'other');
                updateValue('...', aluRef_value, 'other');
                aluRef_select.innerHTML = '';
                aluRef_select.setAttribute('disabled', 'true');
                aluRef_select.appendChild(newElem([], 'option', [['selected', 'true']], '(vazio)'));
            });

            var obj = cachulo.aluminios;
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    console.log(key);
                    console.log(obj[key]);
                    aluSerie_dataList.appendChild(newElem([], 'option', [['value', key]]));

                }
            }

            //* Referencia
            let aluRef = newElem(['text-muted', 'fw-bold', 'p-0', 'm-0']);
            aluRef.innerText = 'Ref: ';
            let aluRef_value = newElem(['value-child', 'text-warning'], 'span');
            aluRef_value.innerText = (copyContent) ? contentArray[2] : '...';
            aluRef.appendChild(aluRef_value);
            let aluRef_select = newElem(['input-minimized', 'form-select', 'text-muted', 'fs-5', 'mb-3'], 'select', [['disabled', 'true']]);
            aluRef_select.appendChild(newElem([], 'option', [['selected', 'true']], '(vazio)'));
            aluRef_select.addEventListener('input', (e) => { updateValue(e, aluRef_value, 'text') });

            // For syncing the values of both selects (serie + ref)
            aluSerie_input.addEventListener('input', (e) => {
                aluSerie_input.classList.remove('is-invalid');
                aluRef_select.innerHTML = '';

                // will try to get refs from the input value
                try {
                    // Feed the datalist with the values
                    var refArray = cachulo.aluminios[e.target.value];
                    refArray.forEach(ref => {
                        aluRef_select.appendChild(newElem([], 'option', [['value', ref]], ref));
                    });
                    // Add default option to ref
                    aluRef_select.removeAttribute('disabled');
                    aluRef_select.insertBefore(newElem([], 'option', [['selected', 'true'], ['disabled', 'true']], 'Escolhe uma ref...'), aluRef_select.children[0]);
                } catch (error) {
                    if (aluSerie_input != '') { aluSerie_input.classList.add('is-invalid'); }
                    // if the values are not right then it will disable the ref_select and add the (vazio) again
                    aluRef_select.setAttribute('disabled', 'true');
                    aluRef_select.appendChild(newElem([], 'option', [['selected', 'true']], '(vazio)'));
                }

                // Update aluRef_value to show nothing again
                updateValue('...', aluRef_value, 'other');

            });

            appendChildren(newItemContainer,
                [
                    aluWidth, aluWidth_input,
                    aluSerie, aluSerie_input, aluSerie_dataList,
                    aluRef, aluRef_select
                ]);
            break;

        case 'vid':
            categoryName = 'Vidros';
            countVids++;
            // Comprimento
            let vidMeasures = newElem(['text-muted', 'fw-bold', 'p-0', 'm-0']);
            vidMeasures.innerText = 'Altura x Largura: ';
            let vidMeasures_value = newElem(['value-child', 'text-warning'], 'span');
            vidMeasures_value.innerText = '0 x 0 (0m²)';
            vidMeasures.appendChild(vidMeasures_value);
            let vidWidth_input = newElem(
                ['input-minimized', 'form-control', 'text-muted', 'fs-5'],
                'input',
                [
                    ['type', 'number'],
                    ['placeholder', '0']
                ]);

            // Serie
            let vidSerie = newElem(['text-muted', 'fw-bold', 'p-0', 'm-0']);
            vidSerie.innerText = 'Série: ';
            let vidSerie_value = newElem(['value-child', 'text-warning'], 'span');
            vidSerie_value.innerText = '---';
            vidSerie.appendChild(vidSerie_value);

            // Referencia
            let vidRef = newElem(['text-muted', 'fw-bold', 'p-0', 'm-0']);
            vidRef.innerText = 'Ref: ';

            appendChildren(newItemContainer,
                [
                    vidMeasures, vidWidth_input,
                    vidSerie, newElem(['spacer']),
                    vidRef, newElem(['spacer'])
                ]);
            break;

        case 'ace':
            categoryName = 'Acessórios';
            countAces++;
            // Comprimento
            let aceWidth = newElem(['text-muted', 'fw-bold', 'fs-6', 'p-0', 'm-0']);
            aceWidth.innerText = 'Comprimento: ';
            let aceWidth_value = newElem(['value-child', 'text-warning'], 'span');
            aceWidth_value.innerText = '0.00m';
            aceWidth.appendChild(aceWidth_value);
            let aceWidth_input = newElem(
                ['input-minimized', 'form-control', 'text-muted', 'fs-5'],
                'input',
                [
                    ['type', 'number'],
                    ['placeholder', '0']
                ]);

            // Serie
            let aceSerie = newElem(['text-muted', 'fw-bold', 'p-0', 'm-0']);
            aceSerie.innerText = 'Série: ';
            let aceSerie_value = newElem(['value-child', 'text-warning'], 'span');
            aceSerie_value.innerText = 'ABC-12';
            aceSerie.appendChild(aceSerie_value);

            // Referencia
            let aceRef = newElem(['text-muted', 'fw-bold', 'p-0', 'm-0']);
            aceRef.innerText = 'Ref: ';

            appendChildren(newItemContainer,
                [
                    aceWidth, aceWidth_input,
                    aceSerie, newElem(['spacer']),
                    aceRef, newElem(['spacer'])
                ]);
            break;

        default:
            break;
    }


    // botoes de cada item
    let buttonsContainer = newElem(['a', 'input-minimized', 'mt-4', 'mb-2']);
    let btnMaximizar = newElem(
        ['input-minimized', 'col-8', 'btn', 'btn-warning', 'btn-bloc', 'text-50-gray', 'fw-bold', 'fs-6', 'py-1'],
        'button',
        [
            ['type', 'button'],
            ['data-bs-toggle', 'modal'],
            ['data-bs-target', '#maximizarModal'],
            ['data-janela-name', titleId],
            ['data-category', categoryName],
            ['title', 'Maximizar\n(Abre numa janela)']
        ],
        'Maximizar');
    let btnGroup = newElem(['btn-group', 'col-4', 'input-minimized', 'ps-2'], 'div', [['role', 'group']]);
    let btnDuplicate = newElem(
        ['input-minimized', 'btn', 'btn-success', 'py-1'],
        'button',
        [
            ['type', 'button'],
            ['title', 'Duplicar\n(Ainda não funfa)']
        ]);
    btnDuplicate.appendChild(newElem(['bi', 'bi-back'], 'i'));
    btnDuplicate.addEventListener('click', (e) => {
        //TODO : get duplication working for 'select' elements
        switch (itemType) {
            case 'alu':
                newItemContainer.parentNode.appendChild(newItem(itemType, titleId, true, [0, '...', '...']));
                break;
            case 'vid':
                newItemContainer.parentNode.appendChild(newItem(itemType, titleId, true, [0, 0, '...']));
                break;
            case 'ace':
                newItemContainer.parentNode.appendChild(newItem(itemType, titleId, false, [undefined, undefined, undefined]));
                break;

            default:
                break;
        }
    })
    let btnDelete = newElem(
        ['input-minimized', 'btn', 'btn-danger', 'py-1'],
        'button',
        [
            ['type', 'button'],
            ['title', 'Eliminar']
        ]);
    btnDelete.appendChild(newElem(['bi', 'bi-trash-fill'], 'i'))
    btnDelete.addEventListener('click', (e) => {
        newItemContainer.classList.add('fade-out');
        setTimeout(
            function () { newItemContainer.parentNode.removeChild(newItemContainer) },
            550
        );
    })

    appendChildren(btnGroup, [btnDuplicate, btnDelete]);
    appendChildren(buttonsContainer, [btnMaximizar, btnGroup]);
    newItemContainer.appendChild(buttonsContainer);

    return newItemContainer;
}

function updateValue(event, spanElement, inputType = '') {
    switch (inputType) {
        case 'number':
            //? This will do a series of things to sanitize input:
            //?   - Erase 'e', '+' and '-' (they are accepted by the input)
            //?   - Convert that string into a float
            //?   - Round the float to 2 decimal places 
            spanElement.innerText = parseFloat(event.target.value.replace(/[e\+\-]/gi, '')).toFixed(2) + 'm';
            break;
        case 'text':
            spanElement.innerText = event.target.value.toLowerCase();
            break;
        case 'other':
            spanElement.innerText = event.toLowerCase();

        default:
            break;
    }
}

function janelaNameInput(event, inputElement) {
    let titleH3 = (event.path[0].nodeName == 'P') ? event.path[0] : event.path[1];
    titleH3.style.display = 'none';
    inputElement.setAttribute('placeholder', titleH3.textContent);
    inputElement.classList.remove('name-input-hidden');
    inputElement.focus();
}

function saveJanelaName(event, titleElement, count) {
    let inputElement = event.path[0];
    titleElement.innerText = (inputElement.value == '') ? 'Janela ' + count : inputElement.value;
    inputElement.classList.add('name-input-hidden');
    titleElement.style.display = 'block';
    titleElement.appendChild(newElem(['bi', 'bi-pencil-square', 'ms-3', 'text-warning'], 'i'));
}