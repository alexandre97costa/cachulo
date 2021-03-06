// this is responsible for dinamically changing info on maximizarModal
var maximizarModal = document.getElementById('maximizarModal');
maximizarModal.addEventListener('show.bs.modal', (e) => {
    let button = e.relatedTarget;
    let category = button.getAttribute('data-category');
    let janelaName = document.getElementById(button.getAttribute('data-janela-name')).textContent;

    maximizarModal.querySelector('.modal-title').textContent = janelaName + ' / ' + category;
});

var titleModal = document.getElementById('titleModal');
titleModal.addEventListener('show.bs.modal', (e) => {
    // This changes the title when shown
    let titleElement = e.relatedTarget;
    let titleText = titleElement.innerText;
    let modalTitle = titleModal.querySelector('.modal-title');

    let propDimensions = e.relatedTarget.parentElement.querySelector('.prop-dimensions');

    modalTitle.innerHTML = '';
    modalTitle.append(
        newElem(['bi', 'bi-gear-fill', 'me-3'], 'i'),
        'Dados de \'' + titleText + '\''
    );

    // this is for passing through the janela ID to the 'hide' event
    modalTitle.setAttribute('data-janela-id', titleElement.id);
    modalTitle.setAttribute('data-dimensions-id', propDimensions.id);

    // this is for passing info to the inputs values
    let nomeInput = titleModal.querySelector('#janelaNameModal');
    let alturaInput = titleModal.querySelector('#alturaModal');
    let larguraInput = titleModal.querySelector('#larguraModal');

    let propAltura = propDimensions.querySelector('.prop-dimensions-altura')
    let propLargura = propDimensions.querySelector('.prop-dimensions-largura')

    nomeInput.value = titleText;
    alturaInput.value = (parseFloat(propAltura.innerText) == 0) ? '' : propAltura.innerText;
    larguraInput.value = (parseFloat(propLargura.innerText) == 0) ? '' : propLargura.innerText;
})

titleModal.addEventListener('hide.bs.modal', (e) => {
    let janelaName = e.target.querySelector('#janelaNameModal');
    let janelaAltura = e.target.querySelector('#alturaModal');
    let janelaLargura = e.target.querySelector('#larguraModal');

    let titleElement = document.getElementById(e.target.querySelector('.modal-title').getAttribute('data-janela-id'));
    titleElement.innerText = (janelaName.value == '') ? titleElement.innerText : janelaName.value;

    let dimensionsElement = document.getElementById(e.target.querySelector('.modal-title').getAttribute('data-dimensions-id'));

    let propAltura = dimensionsElement.querySelector('.prop-dimensions-altura');
    propAltura.innerText = (parseFloat(janelaAltura.value) == 0 || janelaAltura.value == '') ? propAltura.innerText : janelaAltura.value;
    propAltura.setAttribute('data-altura', janelaAltura.value);

    let propLargura = dimensionsElement.querySelector('.prop-dimensions-largura');
    propLargura.innerText = (parseFloat(janelaLargura.value) == 0 || janelaLargura.value == '') ? propLargura.innerText : janelaLargura.value;
    propLargura.setAttribute('data-largura', janelaLargura.value);

    // put the edit icon afterwards
    titleElement.appendChild(newElem(['bi', 'bi-pencil-square', 'ms-3', 'text-warning'], 'i'));

    // clear the inputs
    janelaName.value = '';
    janelaAltura.value = '';
    janelaLargura.value = '';
});


function newElem(classes = [],
    tag = 'div',
    attributes = [],
    innerTxt = '') {

    var newElement = document.createElement(tag);
    for (let i = 0; i < classes.length; i++) {
        newElement.classList.add(classes[i]);
    }
    for (let i = 0; i < attributes.length; i++) {
        newElement.setAttribute(attributes[i][0], attributes[i][1]);
    }
    if (innerTxt != '') { newElement.innerText = innerTxt; }

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
            title.innerText = 'Alum??nios';
            break;
        case 'vid':
            title.innerText = 'Vidros';

            break;
        case 'ace':
            title.innerText = 'Acess??rios';
            break;
        default:
            break;
    }

    appendChildren(categoryContainer, [
        titleContainer,
        addItemContainer,
        // newItem(categoryType, titleId)
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


    const newItemContainer = newElem(['item-container', 'slim-shady', 'bg-white', 'rounded', 'py-2', 'mt-3']);
    let categoryName = '';

    switch (itemType) {
        case 'alu':
            categoryName = 'Alum??nios';
            countAlus++;
            //* Comprimento
            const aluWidth = newElem(['text-muted', 'fw-bold', 'p-0', 'm-0']);
            aluWidth.innerText = 'Medida: ';
            const aluWidth_value = newElem(['value-child', 'text-warning'], 'span');
            aluWidth_value.innerText = (copyContent) ? contentArray[0].toFixed(2) + 'm' : '0.00m';
            aluWidth.appendChild(aluWidth_value);
            const aluWidth_input = newElem(
                ['input-minimized', 'form-control', 'text-muted', 'fs-5', 'mb-3'],
                'input',
                [
                    ['type', 'number'],
                    ['placeholder', (copyContent) ? contentArray[0] : '0']
                ]);
            aluWidth_input.addEventListener('input', (e) => {
                updateValue(e, aluWidth_value, 'number');
                calculatePrice({
                    itemType: 'alu', 
                    valueType: 'multiplier',
                    inputValue: e.target.value,
                    parent: newItemContainer
                })
                updateJanelaPrice();
            });

            //* Serie
            const aluSerie = newElem(['text-muted', 'fw-bold', 'p-0', 'm-0']);
            aluSerie.innerText = 'S??rie: ';
            const aluSerie_value = newElem(['value-child', 'text-warning'], 'span');
            aluSerie_value.innerText = (copyContent) ? contentArray[1] : '...';
            aluSerie.appendChild(aluSerie_value);
            const aluSerie_input = newElem(
                ['input-minimized', 'form-control', 'text-muted', 'fs-5', 'mb-3'],
                'input',
                [
                    ['type', 'text'],
                    ['placeholder', 'Escolhe uma s??rie...'],
                    ['list', 'datalistSerie' + countAlus]
                ]);
            const aluSerie_dataList = newElem([], 'datalist', [['id', 'datalistSerie' + countAlus]]);
            aluSerie_input.addEventListener('focus', (e) => {
                aluSerie_input.value = '';
                updateValue('...', aluSerie_value, 'other');
                updateValue('...', aluRef_value, 'other');
                aluRef_select.innerHTML = '';
                aluRef_select.setAttribute('disabled', 'true');
                aluRef_select.appendChild(newElem([], 'option', [['selected', 'true']], '(vazio)'));
            });

            // feeding the options from the cachulo object
            cachulo.aluminios.forEach((aluminio) => {
                aluSerie_dataList.appendChild(newElem([], 'option', [['value', aluminio.id]]));
            });


            //* Referencia
            const aluRef = newElem(['text-muted', 'fw-bold', 'p-0', 'm-0']);
            aluRef.innerText = 'Ref: ';
            const aluRef_value = newElem(['value-child', 'text-warning'], 'span');
            aluRef_value.innerText = (copyContent) ? contentArray[2] : '...';
            aluRef.appendChild(aluRef_value);
            const aluRef_select = newElem(['input-minimized', 'form-select', 'text-muted', 'fs-5', 'mb-3'], 'select', [['disabled', 'true']]);
            aluRef_select.appendChild(newElem([], 'option', [['selected', 'true']], '(vazio)'));
            aluRef_select.addEventListener('input', (e) => {
                updateValue(e, aluRef_value, 'text');
                aluRef_select.setAttribute('title', e.target.value);

                calculatePrice({
                    itemType: 'alu',
                    valueType: 'preco',
                    inputValue: e.target.value,
                    parent: newItemContainer
                });
                updateJanelaPrice();
            });

            // For syncing the values of both selects (serie + ref)
            aluSerie_input.addEventListener('input', (e) => {
                updateValue(e, aluSerie_value, 'text');
                aluSerie_input.classList.remove('is-invalid');
                aluSerie_input.setAttribute('title', e.target.value);
                aluRef_select.innerHTML = '';

                let validIndex = cachulo.aluminios.findIndex((aluminio) => { return (aluminio.id === e.target.value) });

                if (validIndex != -1) {
                    aluRef_select.removeAttribute('disabled');
                    aluRef_select.appendChild(newElem([], 'option', [['selected', 'true'], ['disabled', 'true']], 'Escolhe uma ref...'));
                    cachulo.aluminios[validIndex].referencias.forEach((ref) => {
                        aluRef_select.appendChild(newElem([], 'option', [['value', ref.id]], ref.id));
                    })
                } else {
                    updateValue(e, aluSerie_value, 'text', true);
                    if (aluSerie_input.value != '') { aluSerie_input.classList.add('is-invalid'); }
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
            // Composi????o
            const vidComposicao = newElem(['text-muted', 'fw-bold', 'p-0', 'm-0']);
            vidComposicao.innerText = 'Composi????o: ';
            vidComposicao.appendChild(
                newElem(['value-child', 'text-warning'], 'span', [[]], '...')
            );

            const vidComp_input = newElem(
                ['input-minimized', 'form-control', 'text-muted', 'fs-5', 'mb-3'],
                'input',
                [
                    ['type', 'text'],
                    ['placeholder', 'Escolhe uma composi????o...'],
                    ['list', 'datalistVid' + countVids]
                ]);
            const vidComp_dataList = newElem([], 'datalist', [['id', 'datalistVid' + countVids]]);

            cachulo.vidros.forEach((vidro) => {
                vidComp_dataList.appendChild(newElem([], 'option', [['value', vidro.id]]));
            })

            vidComp_input.addEventListener('input', (e) => {
                updateValue(e, vidComposicao.children[0], 'text')
                vidComp_input.classList.remove('is-invalid');
                vidComp_input.setAttribute('title', e.target.value);

                if (cachulo.vidros.findIndex((vidro) => { return (vidro.id === e.target.value) }) == -1) {
                    vidComp_input.classList.add('is-invalid');
                    updateValue(e, vidComposicao.children[0], 'text', true);
                }

                calculatePrice({
                    itemType: 'vid',
                    valueType: 'preco',
                    inputValue: e.target.value,
                    parent: newItemContainer
                });
                updateJanelaPrice();
            })

            // Medidas
            // Buscar as medidas primeiro
            let altura = document.getElementById(titleId).parentElement.querySelector('.prop-dimensions-altura').innerText;
            let largura = document.getElementById(titleId).parentElement.querySelector('.prop-dimensions-largura').innerText;

            const vidMeasures = newElem(['text-muted', 'fw-bold', 'p-0', 'm-0']);
            vidMeasures.innerText = 'Altura x Largura: ';
            vidMeasures.appendChild(
                newElem(['value-child', 'text-muted', 'fw-normal'], 'span')
            ).append(
                altura + ' x ' + largura + ' = ',
                newElem(['text-warning', 'fw-bold'], 'span', [[]], (altura * largura).toFixed(2) + 'm??')
            );
            const vidMeasuresRowOfInputs = newElem(['input-group']);
            vidMeasuresRowOfInputs.append(
                newElem(
                    ['input-minimized', 'input-vidro-medidas', 'form-control', 'text-muted', 'fs-5', 'mb-2'],
                    'input',
                    [
                        ['type', 'number'],
                        ['value', altura],
                        ['disabled', 'true']
                    ]),
                newElem(
                    ['input-minimized', 'input-vidro-medidas', 'form-control', 'text-muted', 'fs-5', 'mb-2'],
                    'input',
                    [
                        ['type', 'number'],
                        ['value', largura],
                        ['disabled', 'true']
                    ])
            )

            const nota = newElem(['input-minimized', 'text-muted', 'mb-0'], 'span', [[]],
                'Edita as dimens??es clicando no titulo da janela.');







            appendChildren(newItemContainer, [
                vidComposicao, vidComp_input, vidComp_dataList,
                vidMeasures, vidMeasuresRowOfInputs,
                nota
            ]);
            break;

        case 'ace':
            categoryName = 'Acess??rios';
            countAces++;
            // Acess??rio basicamente
            const acessorio = newElem(['text-muted', 'fw-bold', 'fs-6', 'p-0', 'm-0']);
            acessorio.innerText = 'Acess??rio: ';
            acessorio.appendChild(
                newElem(['value-child', 'text-warning'], 'span', [[]], '...')
            );
            const acessorio_input = newElem(
                ['input-minimized', 'form-control', 'text-muted', 'fs-5', 'mb-3'],
                'input',
                [
                    ['type', 'text'],
                    ['placeholder', 'Escolhe um acess??rio...']
                ]);

            const aceQuantidade_input = newElem(
                ['input-minimized', 'form-control', 'text-muted', 'fs-5', 'mb-3'],
                'input',
                [
                    ['type', 'number'],
                    ['placeholder', '0']
                ]);


            appendChildren(newItemContainer,
                [
                    acessorio, acessorio_input, aceQuantidade_input
                ]);
            break;

        default:
            break;
    }


    // footer de cada item
    // inclui o pre??o do item, duplicar e eliminar

    const buttonsContainer = newElem(['input-minimized', 'mt-4', 'mb-2']);
    const footerPreco = newElem(
        ['footer-preco', 'pe-none', 'input-minimized', 'col-8', 'bg-warning', 'fw-bold', 'fs-6', 'text-center', 'rounded', 'py-1', 'btn'],
        'span',
        [
            ['data-multiplier', '0']
            ['data-preco', '0']
            ['data-resultado', '0']
        ])
    footerPreco.innerText = '0.00???';

    // legacy, dont delete in case you need it in the future
    let btnMaximizar = newElem(
        ['input-minimized', 'col-8', 'btn', 'btn-warning', 'text-50-gray', 'fw-bold', 'fs-6', 'py-1'],
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
            ['title', 'Duplicar\n(Ainda n??o funfa)']
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
    appendChildren(buttonsContainer, [footerPreco, btnGroup]);
    newItemContainer.appendChild(buttonsContainer);

    return newItemContainer;
}

function updateValue(event, spanElement, inputType = '', isError = false) {
    if (isError) {
        spanElement.classList.remove('text-warning');
        spanElement.classList.add('text-danger');
        spanElement.parentElement.parentElement.classList.add('wrong');
    } else {
        spanElement.classList.remove('text-danger');
        spanElement.classList.add('text-warning');
        spanElement.parentElement.parentElement.classList.remove('wrong');
    }
    switch (inputType) {
        case 'number':
            spanElement.innerText = sanitizeNumber(event.target.value) + 'm';
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

function sanitizeNumber(numberToSanitize) {
    //? This will do a series of things to sanitize input:
    //?   - Erase 'e', '+' and '-' (they are accepted by the input)
    //?   - Convert that string into a float
    //?   - Round the float to 2 decimal places 
    return parseFloat(numberToSanitize.replace(/[e\+\-]/gi, '')).toFixed(2)
}

function calculatePrice(options = {
    itemType: '',       // 'alu' | 'vid' | 'ace'
    valueType: '',      // 'multiplier' | 'preco'
    inputValue: '',        // nome da refer??ncia, composi????o, etc (s?? usado se value=preco)
    parent: ''          // para conseguir chegar at?? ao .footer-preco 
}) {
    if (options.itemType == '' &&
        options.itemType != 'alu' &&
        options.itemType != 'vid' &&
        options.itemType != 'ace') {
        throw Error('itemType is not declared, or is wrongly typed (itemType: \'' + options.itemType + '\')');
    }
    if (options.parent == '') throw Error('Bruh, you need to indicate a parent element.')

    let footerPreco = options.parent.querySelector('.footer-preco');


    switch (options.valueType) {
        case 'multiplier':
            // provavlemnete preciso de mais um argumento para o valor do multiplier
            footerPreco.setAttribute('data-multiplier', options.inputValue);
            break;
        case 'preco':
            footerPreco.setAttribute('data-preco', fetchPrice(options.itemType, options.inputValue));
            break;
        default:
            break;
    }

    // get the multiplier (area do vidro)
    if (options.itemType == 'vid') {
        let area = 1;
        let inputs = options.parent.querySelectorAll('.input-vidro-medidas');
        inputs.forEach((input) => { area = area * input.value; })
        footerPreco.setAttribute('data-multiplier', area);
    }
    updateItemsPrice(footerPreco);
}



function fetchPrice(itemType, priceId) {
    let preco = 0;
    switch (itemType) {
        case 'alu':
            cachulo.aluminios.forEach((aluminio) => {
                aluminio.referencias.forEach((referencia) => {
                    if (referencia.id == priceId) preco = referencia.preco
                })
            })
            return preco;
            break;
        case 'vid':
            cachulo.vidros.forEach((vidro) => {
                if (vidro.id == priceId) preco = vidro.preco 
            })
            return preco
            break;

        //! Falta fazer os acessorios, mas a estrutura 
        //! cachulo.acessorios ainda nem est?? feita sequer

        default:
            break;
    }
}

function updateItemsPrice(footerPreco) {
    let multiplier = footerPreco.getAttribute('data-multiplier');
    let preco = footerPreco.getAttribute('data-preco');
    let resultado = multiplier * preco;
    footerPreco.setAttribute('data-resultado', resultado.toFixed(2));
    footerPreco.innerText = footerPreco.getAttribute('data-resultado') + '???'
}

function updateJanelaPrice() {
    let janelas = document.querySelectorAll('.main-col');

    janelas.forEach((janela) => {
        let precoItems = janela.querySelectorAll('.footer-preco');
        let floatPrecoItems = Array.from(precoItems, (item) => {
            return parseFloat(item.innerText.replace('???', ''));
        })
        let sumPrecoItems = floatPrecoItems.reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        }).toFixed(2);

        let precoJanela = janela.querySelector('.janela-preco');
        precoJanela.innerText = sumPrecoItems;
    });

    let precosJanelas = Array.from(document.querySelectorAll('.janela-preco'), (preco) => {
        return parseFloat(preco.innerText);
    })
    let precoTotalDocumento = precosJanelas.reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
    }).toFixed(2);
    
    let precoDocumentoElement = document.querySelector('.documento-preco');
    precoDocumentoElement.setAttribute('data-documento-preco', precoTotalDocumento);
    precoDocumentoElement.innerText = precoTotalDocumento + '???';

}