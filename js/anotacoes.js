// PAGINA CADASTRO ANOTACOES


// VERIFICAR SE USUARIO ESTA LOGADO

if (localStorage.getItem('usuarioAtivo') === null) {
    alert('Você precisa estar logado para acessar essa pagina');
    window.location.href = "./index.html";
}


// RECEBER AS ANOTACOES



let listaAnotacoes = JSON.parse(localStorage.getItem('listaAnotacoes')) ?? [];

document.addEventListener('DOMContentLoaded', () => {
    listaAnotacoes.forEach((anotacao) => addAnotacao(anotacao))
})




const formAnotacoes = document.getElementById('formAnotacoes');

const modalCadastro = new bootstrap.Modal('#modal-cadastro')
const modalApagar = new bootstrap.Modal('#modal-apagar')




const row = document.getElementById('list-anotacoes')



// FUNCOES DO MODAL

formAnotacoes.addEventListener('submit', (ev) => {
    ev.preventDefault();


    if (!formAnotacoes.checkValidity()) {
        formAnotacoes.classList.add('was-validated');
        return
    }

    const nameIdea = document.getElementById('nameIdea').value;
    const descriptionIdea = document.getElementById('descriptionIdea').value;
    const dataIdea = document.getElementById('dataIdea').value;

    // const exist = listUsers.some((user) => user.userEmail === userEmail);



    const newIdea = {
        id: new Date().getTime(),
        nameIdea,
        descriptionIdea,
        dataIdea,
    }

    listaAnotacoes.push(newIdea)
    console.log(listaAnotacoes);
    alert('Anotação Criada com sucesso!')
    localStorage.setItem('listaAnotacoes', JSON.stringify(listaAnotacoes));
    formAnotacoes.reset();
    addAnotacao(newIdea);
    modalCadastro.hide()
    // formNewUser.classList.remove('was-validated');

})


// FUNCAO PARA ADICIONAR A ANOTACAO NA TELA

function addAnotacao(anotacao) {


    const { id, nameIdea, descriptionIdea, dataIdea } = anotacao;

    const col = document.createElement('div')
    // col.classList.add(['col-12', 'col-sm-6', 'col-lg-4', 'col-xl-3'])  - esse salva sem apagar
    col.setAttribute('class', 'col-12 col-sm-6 col-lg-4 col-xl-3')
    col.setAttribute('id', `${id}`)

    const card = document.createElement('div')
    card.setAttribute('class', 'card')

    const cardBody = document.createElement('div')
    cardBody.setAttribute('class', 'card-body')

    const cardTitle = document.createElement('h5')
    cardTitle.setAttribute('class', 'card-title')
    cardTitle.innerHTML = nameIdea

    const cardText = document.createElement('p')
    cardText.setAttribute('class', 'card-text')
    cardText.innerHTML = descriptionIdea

    const cardDate = document.createElement('p')
    cardDate.setAttribute('class', 'card-text')
    cardDate.innerHTML = dataIdea

    const buttonEdit = document.createElement('button')
    buttonEdit.setAttribute('class', 'btn btn-success')
    buttonEdit.addEventListener('click', () => {
        modalAtualizar.show()

        // arrumar

        idAtualizar = id

    })
    buttonEdit.innerHTML = `<i class="bi bi-pencil-square"></i>`

    const buttonDelete = document.createElement('button')
    buttonDelete.setAttribute('class', 'btn btn-danger')
    buttonDelete.addEventListener('click', () => {
        modalApagar.show()

        // arrumar

    })
    buttonDelete.innerHTML = `<i class="bi bi-trash3"></i>`


    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardText)
    cardBody.appendChild(cardDate)
    cardBody.appendChild(buttonEdit)
    cardBody.appendChild(buttonDelete)

    card.appendChild(cardBody)
    col.appendChild(card)


    row.appendChild(col)

}