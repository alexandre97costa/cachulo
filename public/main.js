var addNew = document.getElementById('add-new');
addNew.addEventListener('mouseenter', (e) => {
    e.target.children[0].classList.remove('bi-plus-square');
    e.target.children[0].classList.add('bi-plus-square-fill');
});
addNew.addEventListener('mouseleave', (e) => {
    e.target.children[0].classList.remove('bi-plus-square-fill');
    e.target.children[0].classList.add('bi-plus-square');
});

var countStructs = 0;
addNew.addEventListener('click', (e) => {
    countStructs++;

    let row = document.createElement('div');
    row.classList.add('row', 'row-struct', 'border', 'rounded', 'px-3', 'py-4', 'mb-3');
    row.setAttribute('id', 'struct-' + countStructs);

    // Aluminios
    let aluDiv = document.createElement('div');
    aluDiv.classList.add('col-12', 'col-lg-4');
    let aluTitle = document.createElement('p');
    aluTitle.classList.add('h4');
    aluTitle.innerText = 'Alumínios';
    aluDiv.appendChild(aluTitle);
    // Paraste aqui ó
    let aluSelectSerieLabel = document.createElement('p');
    aluSelectSerieLabel.classList.add('aluSelectLabel');
    aluSelectSerieLabel.innerText = "Série";
    aluDiv.appendChild(aluSelectSerieLabel);
    let aluSelectSerie = document.createElement('select');


    // Vidros
    let vidDiv = document.createElement('div');
    vidDiv.classList.add('col-12', 'col-lg-4', 'border-end', 'border-start',);
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

    row.appendChild(aluDiv);
    row.appendChild(vidDiv);
    row.appendChild(aceDiv);

    let mainContainer = document.getElementById('main-container');
    mainContainer.appendChild(row);
});