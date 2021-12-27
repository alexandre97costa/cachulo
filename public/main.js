// const { promiseProps } = require("firebase-tools/lib/utils");







// change icons on hover
var addNew = document.getElementById('add-new');
addNew.addEventListener('mouseenter', (e) => {
    e.target.children[0].classList.remove('bi-plus-square');
    e.target.children[0].classList.add('bi-plus-square-fill');
});
addNew.addEventListener('mouseleave', (e) => {
    e.target.children[0].classList.remove('bi-plus-square-fill');
    e.target.children[0].classList.add('bi-plus-square');
});
addNew.addEventListener('click', addJanela2);


var countStructs = 0;
var countAlus = 0;
var countVids = 0;
var countAces = 0;

function addJanela() {
    countStructs++;
    countAlus++;
    countVids++;
    countAces++;

    // ### HIERARQUIA ###
    // .row-struct
    //      - descriçao
    //      - dimensoes
    //      - dupe & delete
    //      - col-12
    //          - row-container-n
    //              - aluminios
    //              - vidros
    //              - acessorios

    let row = document.createElement('div');
    row.classList.add('row', 'row-struct', 'border', 'border-warning', 'border-start-0', 'border-end-0', 'border-top-0', 'px-4', 'mb-');
    row.setAttribute('id', 'struct-' + countStructs);

    // caret
    let caretContainer = document.createElement('a');
    caretContainer.classList.add('col-', 'caret-container', 'text-secondary', 'px-3');
    caretContainer.setAttribute('data-bs-toggle', 'collapse');
    caretContainer.setAttribute('href', '#row-container-' + countStructs);
    let caretIcon = document.createElement('i'); //for collapsing shit
    caretIcon.classList.add('caret-icon', 'bi', 'bi-caret-down', 'fs-4');
    caretContainer.appendChild(caretIcon);
    addHoverToThisCaret(caretContainer);
    // Nova Janela
    let wrapperDesc = document.createElement('div');
    wrapperDesc.classList.add('col-8', 'my-5', 'position-relative');
    let janelaDesc = document.createElement('div');
    janelaDesc.classList.add('input-group', 'rounded');
    let inputDesc = document.createElement('input');
    inputDesc.classList.add('form-control');
    inputDesc.setAttribute('type', 'text');
    inputDesc.setAttribute('placeholder', 'Nova Janela');
    let buttonDesc = document.createElement('button');
    buttonDesc.classList.add('btn', 'btn-outline-warning', 'text-dark');
    buttonDesc.innerText = 'Guardar';
    buttonDesc.setAttribute('type', 'button');
    buttonDesc.setAttribute('id', 'buttonDesc' + countStructs);
    janelaDesc.appendChild(inputDesc);
    janelaDesc.appendChild(buttonDesc);
    wrapperDesc.appendChild(janelaDesc);
    //
    wrapperDesc.appendChild(caretContainer);

    // Dimensoes
    let wrapperDimensoes = document.createElement('div');
    wrapperDimensoes.classList.add('col-3', 'my-5');
    let janelaDimensoes = document.createElement('div');
    janelaDimensoes.classList.add('input-group', 'rounded');
    let larguraJanela = document.createElement('input');
    larguraJanela.classList.add('form-control');
    larguraJanela.setAttribute('type', 'number');
    larguraJanela.setAttribute('min', '0');
    larguraJanela.setAttribute('step', '0.01');
    let timesDimensoes = document.createElement('span');
    timesDimensoes.classList.add('input-group-text');
    timesDimensoes.innerText = 'x';
    let alturaJanela = document.createElement('input');
    alturaJanela.classList.add('form-control');
    alturaJanela.setAttribute('type', 'number');
    alturaJanela.setAttribute('min', '0');
    alturaJanela.setAttribute('step', '0.01');
    let metrosDimensoes = document.createElement('span');
    metrosDimensoes.classList.add('input-group-text');
    metrosDimensoes.innerText = 'metros';
    janelaDimensoes.appendChild(larguraJanela);
    janelaDimensoes.appendChild(timesDimensoes);
    janelaDimensoes.appendChild(alturaJanela);
    janelaDimensoes.appendChild(metrosDimensoes);
    wrapperDimensoes.appendChild(janelaDimensoes);

    // Duplicar + Eliminar
    let colJanelaOptions = document.createElement('div');
    colJanelaOptions.classList.add('col-1', 'my-5');
    let buttonGroupOptions = document.createElement('div');
    buttonGroupOptions.classList.add('btn-group');
    let dupButton = document.createElement('button');
    dupButton.classList.add('btn', 'btn-outline-primary');
    dupButton.setAttribute('title', 'Duplicar Janela');
    let dupIcon = document.createElement('i');
    dupIcon.classList.add('bi', 'bi-back');
    dupButton.appendChild(dupIcon);
    let delButton = document.createElement('button');
    delButton.classList.add('btn', 'btn-outline-danger');
    delButton.setAttribute('title', 'Eliminar Janela');
    let delIcon = document.createElement('i');
    delIcon.classList.add('bi', 'bi-trash-fill');
    delButton.appendChild(delIcon);
    deleteButtonFunctionality(delButton);
    buttonGroupOptions.appendChild(dupButton);
    buttonGroupOptions.appendChild(delButton);
    colJanelaOptions.appendChild(buttonGroupOptions);

    // col-12 + row to encampsule the alu,vid & ace columns (and later be able to minimize them)
    let col12 = document.createElement('div');
    col12.classList.add('col-12', 'my-0', 'py-0');
    let rowContainer = document.createElement('div');
    rowContainer.classList.add('row', 'row-container', 'collapse', 'multi-collapse', 'show', 'mb-5', 'g-1');
    rowContainer.setAttribute('id', 'row-container-' + countStructs);
    col12.appendChild(rowContainer);

    //Aluminios
    let aluDiv = document.createElement('div');
    aluDiv.classList.add('aluDiv', 'bg-gray', 'col-12', 'col-lg-4', 'rounded', 'ps-4', 'pt-3');
    let aluTitle = document.createElement('p');
    aluTitle.classList.add('h4');
    aluTitle.innerText = 'Alumínios';
    let addAluButton = document.createElement('button');
    addAluButton.classList.add('addAluButton', 'btn', 'btn-outline-warning', 'btn-sm', 'rounded-pill', 'ms-3', 'pt-0', 'px-2', 'fs-4', 'border-1');
    addAluButton.innerText = '+';
    addAluButton.setAttribute('title', 'Acrescentar aluminio a esta janela');
    addAluButton_SetFunction(addAluButton);
    // let addAluIcon = document.createElement('i');
    // addAluIcon.classList.add('bi', 'bi-plus', 'text-dark', 'fs-5');
    // addAluButton.appendChild(addAluIcon);
    aluTitle.appendChild(addAluButton);
    aluDiv.appendChild(aluTitle);

    addAluTo(aluDiv);

    // Vidros
    let vidDiv = document.createElement('div');
    vidDiv.classList.add('col-12', 'col-lg-4', 'rounded', 'pt-3');
    let vidTitle = document.createElement('p');
    vidTitle.classList.add('h4');
    vidTitle.innerText = 'Vidros';
    vidDiv.appendChild(vidTitle);

    // Acessorios
    let aceDiv = document.createElement('div');
    aceDiv.classList.add('col-12', 'col-lg-4');
    let aceTitle = document.createElement('p');
    aceTitle.classList.add('h4');
    aceTitle.innerText = 'Acessórios';
    aceDiv.appendChild(aceTitle);


    // ## appendChild gallore ##
    // always do appends after everythings done, to prevent some elements from missing. 
    // ~ show up on stage when you have pants on ~
    row.appendChild(wrapperDesc);
    row.appendChild(wrapperDimensoes);
    row.appendChild(colJanelaOptions);


    rowContainer.appendChild(aluDiv);
    rowContainer.appendChild(vidDiv);
    rowContainer.appendChild(aceDiv);
    row.appendChild(col12);

    let mainContainer = document.getElementById('main-container');
    mainContainer.appendChild(row);
}






function addAluTo(parent) {
    // Aluminios > Grouping (div .row)
    let aluGroupRow = document.createElement('div');
    aluGroupRow.classList.add('row', 'aluGroupRow', 'me-2', 'mb-3', 'pt-4', 'pb-2', 'px-3', 'bg-white', 'rounded', 'slim-shady');

    // Aluminios > Grouping > Comprimento (input-group)
    let aluInputGroupComp = document.createElement('div');
    aluInputGroupComp.classList.add('input-group', 'rounded', 'mb-3', 'p-0');
    let aluInputCompTextPrefix = document.createElement('span');
    aluInputCompTextPrefix.classList.add('input-group-text');
    aluInputCompTextPrefix.innerText = 'Comprimento:';
    let aluInputComp = document.createElement('input');
    aluInputComp.classList.add('form-control');
    aluInputComp.setAttribute('type', 'number');
    aluInputComp.setAttribute('min', '0');
    aluInputComp.setAttribute('value', '0');
    aluInputComp.setAttribute('step', '0.01');
    let aluInputCompTextSuffix = document.createElement('span');
    aluInputCompTextSuffix.classList.add('input-group-text');
    aluInputCompTextSuffix.innerText = 'metros';
    aluInputGroupComp.appendChild(aluInputCompTextPrefix);
    aluInputGroupComp.appendChild(aluInputComp);
    aluInputGroupComp.appendChild(aluInputCompTextSuffix);

    // Aluminios > Grouping > Serie (input-group)
    let aluInputGroupSerie = document.createElement('div');
    aluInputGroupSerie.classList.add('input-group', 'rounded', 'mb-3', 'p-0');
    let aluSelectSerieLabel = document.createElement('label');
    aluSelectSerieLabel.classList.add('aluSelectSerieLabel', 'input-group-text');
    aluSelectSerieLabel.setAttribute('for', 'aluSelectSerie' + countAlus);
    aluSelectSerieLabel.innerText = "Série";
    let aluSelectSerie = document.createElement('select');
    aluSelectSerie.classList.add('aluSelectSerie', 'form-select');
    aluSelectSerie.setAttribute('id', 'aluSelectSerie' + countAlus);
    let option1 = document.createElement('option');
    option1.setAttribute('value', 'One');
    option1.innerText = 'Option 1';
    let option2 = document.createElement('option');
    option2.setAttribute('value', 'Two');
    option2.innerText = 'Option 2';
    aluSelectSerie.appendChild(option1);
    aluSelectSerie.appendChild(option2);
    aluInputGroupSerie.appendChild(aluSelectSerieLabel);
    aluInputGroupSerie.appendChild(aluSelectSerie);

    // Aluminios > Grouping > Referência (input-group)
    let aluInputGroupRef = document.createElement('div');
    aluInputGroupRef.classList.add('input-group', 'rounded', 'mb-3', 'p-0');
    let aluSelectRefLabel = document.createElement('label');
    aluSelectRefLabel.classList.add('aluSelectRefLabel', 'input-group-text');
    aluSelectRefLabel.setAttribute('for', 'aluSelectRef' + countAlus);
    aluSelectRefLabel.innerText = 'Referência';
    let aluSelectRef = document.createElement('select');
    aluSelectRef.classList.add('aluSelectRef', 'form-select', 'text-muted');
    aluSelectRef.setAttribute('id', 'aluSelectRef' + countAlus);
    aluSelectRef.setAttribute('disabled', 'true');
    let option3 = document.createElement('option');
    option3.setAttribute('value', 'Three');
    option3.innerText = 'Escolhe uma série primeiro';
    aluSelectRef.appendChild(option3);
    aluInputGroupRef.appendChild(aluSelectRefLabel);
    aluInputGroupRef.appendChild(aluSelectRef);

    aluGroupRow.appendChild(aluInputGroupComp);
    aluGroupRow.appendChild(aluInputGroupSerie);
    aluGroupRow.appendChild(aluInputGroupRef);

    parent.appendChild(aluGroupRow);
}

function addAluButton_SetFunction(button) {
    button.addEventListener('click', (event) => {
        // adiciona a aluDiv
        addAluTo(button.parentElement.parentElement);
    });
}
// caret that collapes some info of a struct
function addHoverToThisCaret(caret) {
    caret.addEventListener('mouseenter', (e) => {
        e.target.children[0].classList.remove('bi-caret-down');
        e.target.children[0].classList.add('bi-caret-down-fill');
    });
    caret.addEventListener('mouseleave', (e) => {
        e.target.children[0].classList.remove('bi-caret-down-fill');
        e.target.children[0].classList.add('bi-caret-down');
    });
}

function deleteButtonFunctionality(deleteButton) {
    deleteButton.addEventListener('click', (e) => {
        deleteButton.parentElement.parentElement.parentElement.remove();
    })
}