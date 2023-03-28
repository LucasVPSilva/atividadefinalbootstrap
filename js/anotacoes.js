// VERIFICAR SE USUARIO ESTA LOGADO

if (localStorage.getItem('usuarioAtivo') === null) {
    alert('Você precisa estar logado para acessar essa pagina');
    window.location.href = "./index.html";
}

//


let idAtualizar = -1
let listaAnotacao = JSON.parse(localStorage.getItem('anotacoes')) ?? [];

const formCadastro = document.getElementById('form-cadastro')
const formAtualizar = document.getElementById('form-atualizar')

const nameUpdate = document.getElementById('name-update')
const descrevaUpdate = document.getElementById('descreva-update')
const dataUpdate = document.getElementById('data-update')


const row = document.getElementById('list-anotacoes')
const containerNotificacao = document.getElementById('container-notificacao')



// MANIPULACAO DO BOOTSTRAP MODAL COM O JS
const modalCadastro = new bootstrap.Modal('#modal-cadastro')
const modalApagar = new bootstrap.Modal('#modal-apagar')
const modalAtualizar = new bootstrap.Modal('#modal-atualizar')

document.addEventListener('DOMContentLoaded', () => {
    listaAnotacao.forEach((anotacoes) => addAnotacao(anotacoes))
})


// RECEBER AS INFORAMAÇÕES PREENCHIDAS PELO USUARIO 


formCadastro.addEventListener('submit', (ev) => {
    ev.preventDefault()


    if (!formCadastro.checkValidity()) {
        formCadastro.classList.add('was-validated')
        return
    }

    const name = document.getElementById('name').value
    const descreva = document.getElementById('descreva').value
    const data = document.getElementById('data').value


    const novaAnotacao = {
        id: new Date().getTime(),
        name,
        descreva,
        data
    }


    listaAnotacao.push(novaAnotacao)
    localStorage.setItem('anotacoes', JSON.stringify(listaAnotacao))
    formCadastro.reset()
    addAnotacao(novaAnotacao)
    modalCadastro.hide()
    formCadastro.classList.remove('was-validated')
    showAlert('success', 'Anotação cadastrada!')
})


// ADICIONAR A ANOTAÇÃO NA TELA:


function addAnotacao(anotacoes) {
    const { id, name, descreva, data } = anotacoes;

    const col = document.createElement('div')
    col.setAttribute('class', 'col-12 col-sm-6 col-lg-4 col-xl-3')
    col.setAttribute('id', `anotacao-${id}`)

    const card = document.createElement('div')
    card.setAttribute('class', 'card')

    const cardBody = document.createElement('div')
    cardBody.setAttribute('class', 'card-body')

    const cardTitle = document.createElement('h5')
    cardTitle.setAttribute('class', 'card-title mb-4')
    cardTitle.innerHTML = name

    const cardText = document.createElement('p')
    cardText.setAttribute('class', 'card-text mt-2')
    cardText.innerHTML = descreva

    const cardData = document.createElement('p')
    cardData.setAttribute('class', 'text-body-secondary')
    cardData.innerHTML = `Prazo para concluir: ${data}`

    const buttonEdit = document.createElement('button')
    buttonEdit.setAttribute('class', 'btn btn-success m-1')
    buttonEdit.addEventListener('click', () => {
        modalAtualizar.show()
        nameUpdate.value = name
        descrevaUpdate.value = descreva
        dataUpdate.value = data
        idAtualizar = id
    })
    buttonEdit.innerHTML = `<i class="bi bi-pencil-square"></i>`


    const buttonDelete = document.createElement('button')
    buttonDelete.setAttribute('class', 'btn btn-danger m-1')
    buttonDelete.addEventListener('click', () => {
        modalApagar.show()
        const confirmar = document.getElementById('confirmar-exclusao')
        confirmar.setAttribute('onclick', `apagar(${id})`)
    })
    buttonDelete.innerHTML = `<i class="bi bi-trash3"></i>`

    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardText)
    cardBody.appendChild(cardData)
    cardBody.appendChild(buttonEdit)
    cardBody.appendChild(buttonDelete)

    card.appendChild(cardBody)
    col.appendChild(card)

    row.appendChild(col)
}

// ATUALIZAR AS ANOTAÇÕES

formAtualizar.addEventListener('submit', (ev) => {
    ev.preventDefault();


    if (!formAtualizar.checkValidity()) {
        formAtualizar.classList.add('was-validated')
        return
    }


    const indiceUpdate = listaAnotacao.findIndex((anotacoes) => anotacoes.id === idAtualizar);
    listaAnotacao[indiceUpdate].name = nameUpdate.value
    listaAnotacao[indiceUpdate].descreva = descrevaUpdate.value
    listaAnotacao[indiceUpdate].data = dataUpdate.value



    localStorage.setItem('anotacoes', JSON.stringify(listaAnotacao))


    const cardTitle = document.querySelector(`#anotacao-${idAtualizar} .card-title`);
    cardTitle.innerHTML = nameUpdate.value

    const cardText = document.querySelector(`#anotacao-${idAtualizar} .card-text`);
    cardText.innerHTML = descrevaUpdate.value

    const cardData = document.querySelector(`#anotacao-${idAtualizar} .text-body-secondary`);
    cardData.innerHTML = dataUpdate.value



    modalAtualizar.hide()
    showAlert('success', 'Anotação atualizada!')
    idAtualizar = -1
    formAtualizar.classList.remove('was-validated')



})


// FUNÇÃO PARA APAGAR AS ANOTAÇÕES


function apagar(idAnotacao) {

    const indice = listaAnotacao.findIndex((anotacoes) => anotacoes.id === idAnotacao)
    listaAnotacao.splice(indice, 1)

    localStorage.setItem('anotacoes', JSON.stringify(listaAnotacao))

    const col = document.getElementById(`anotacao-${idAnotacao}`)
    col.remove()

    modalApagar.hide()
    showAlert('success', 'Anotação excluida!')
}

// FUNÇÃO PARA MOSTRAR OS ALERTAS

function showAlert(modo, mensagem) {


    const toast = document.createElement('div');
    toast.setAttribute('role', 'alert')
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.setAttribute('class', 'toast align-items-center border-0 show');
    toast.classList.add(`text-bg-${modo}`);

    const content = document.createElement('div');
    content.setAttribute('class', 'd-flex');

    const toastBody = document.createElement('div')
    toastBody.setAttribute('class', 'toast-body')
    toastBody.innerHTML = `${mensagem}`

    const butttonDismiss = document.createElement('button')
    butttonDismiss.setAttribute('type', 'button')
    butttonDismiss.setAttribute('class', 'btn-close btn-close-white me-2 m-auto')
    butttonDismiss.setAttribute('data-bs-dismiss', 'toast')
    butttonDismiss.setAttribute('aria-label', 'Fechar notificação')

    content.appendChild(toastBody)
    content.appendChild(butttonDismiss)
    toast.appendChild(content);

    containerNotificacao.appendChild(toast)


    setTimeout(() => {
        containerNotificacao.children[0].remove()
    }, 3000)

}



