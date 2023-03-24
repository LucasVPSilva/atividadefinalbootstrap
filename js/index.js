

// CRIACAO DE NOVO USUARIO

const formNewUser = document.getElementById('formNewUser');

let listUsers = JSON.parse(localStorage.getItem('listUsers')) ?? [];

// FUNCOES DO MODAL

const modalCadastro = new bootstrap.Modal('#modalNewUser')

formNewUser.addEventListener('submit', (ev) => {
    ev.preventDefault();

    if (!formNewUser.checkValidity()) {
        formNewUser.classList.add('was-validated');
        return
    }

    const userName = document.getElementById('nameUser').value;
    const userEmail = document.getElementById('mailUser').value;
    const userPassword = document.getElementById('passwordUser').value;

    const exist = listUsers.some((user) => user.userEmail === userEmail);

    if (exist) {
        alert('Ops! Parece que já existe um usuario com esse e-mail, tenta com outro vai ;)')
        // showAlert('danger', 'Ops! Parece que já existe um usuario com esse e-mail, tenta com outro vai ;)')
        // return
        return
    }

    const newUser = {
        id: new Date().getTime(),
        userName,
        userEmail,
        userPassword,
    }

    listUsers.push(newUser)
    alert(`Seja bem vindo ${userName}`)
    localStorage.setItem('listUsers', JSON.stringify(listUsers));
    formNewUser.reset()
    modalCadastro.hide()
    formNewUser.classList.remove('was-validated');


    console.log(listUsers)
})

// SE RECARREGAR O SITE, O DOM CARREGA AS INFORMACOES DO LOCALSTORAGE:
document.addEventListener('DOMContentLoaded', () => {
    listUsers.forEach((contact) => addContact(contact))
})



// LOGIN DE USUARIO

const loginUser = document.getElementById('userLogin');

loginUser.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const userSave = JSON.parse(localStorage.getItem("listUsers") ?? "[]");

    const usuarioCadastrado = userSave.find((usuario) => usuario.userEmail === form.emailLogin.value && usuario.senhaLogin === form.senhaLogin.value);
    if (!usuarioCadastrado) {
        alert("Usuário não Localizado! Verifique e-mail ou senha!");
        form.reset();
        return;
    }



    alert('Login')
})

