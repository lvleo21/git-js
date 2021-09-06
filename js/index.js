const urlLogoGit = "https://img.icons8.com/fluency/460/000000/github.png";
const apiUrl = "https://api.github.com/users/";

async function handleApi(username) {
    return await axios.get(`${apiUrl}${username}`);
}

async function getRepositorys(username) {
    return await axios.get(`${apiUrl}${username}/repos`);
}

async function getLenguages(url) {
    return await axios.get(url);
}

const createLine = (repository) => {

    let li = document.createElement("li")

    let divRow = document.createElement("div");
    divRow.className = "row";

    //! Coluna das informações =========================

    let divCol1 = document.createElement("div");
    divCol1.className = "col-md col-sm-12";

    let buttonRepository = document.createElement("a");
    buttonRepository.className = "fs-4 fw-bold text text-decoration-none text-dark"
    buttonRepository.target = "_blank"
    buttonRepository.innerHTML = repository.name;
    buttonRepository.href = repository.html_url

    let descriptionRepository = document.createElement("p");
    descriptionRepository.className = "text-muted";
    descriptionRepository.style.fontSize = "12px";
    descriptionRepository.innerHTML = repository.description ? repository.description : "Sem descrição";

    let lenguagesUsed = document.createElement("small");


    getLenguages(repository.languages_url).then((response) => {
        let data = Object.keys(response.data);
        data.forEach(element => {
            let span = document.createElement("span");
            span.className = "badge bg-success me-1";
            span.innerHTML = element
            lenguagesUsed.appendChild(span);
        })
    })

    divCol1.appendChild(buttonRepository);
    divCol1.appendChild(descriptionRepository);
    divCol1.appendChild(lenguagesUsed);


    //! Coluna dos botões ==============================

    let divCol2 = document.createElement("div");
    divCol2.className = "col-md-3 col-sm-12";
    divCol2.id = "colButton"
    let divButtons = document.createElement("div");
    divButtons.className = "d-grid gap-2";

    let buttonDownload = document.createElement("a")
    buttonDownload.className = "btn btn-primary btn-sm";
    let iconDownload = document.createElement("i");
    iconDownload.className = "fas fa-download me-2";
    buttonDownload.appendChild(iconDownload);
    buttonDownload.appendChild(
        document.createTextNode("Download")
    )


    let buttonClone = document.createElement("a")
    buttonClone.className = "btn btn-outline-secondary btn-sm";
    let iconClone = document.createElement("i");
    iconClone.className = "fas fa-copy me-2";
    buttonClone.appendChild(iconClone);
    buttonClone.appendChild(
        document.createTextNode("Clone")
    )

    divButtons.appendChild(buttonDownload);
    divButtons.appendChild(buttonClone);
    divCol2.appendChild(divButtons);

    //! ================================================

    divRow.appendChild(divCol1);
    divRow.appendChild(divCol2);
    li.appendChild(divRow);

    return li;

}

const handleRepositorys = (data) => {
    let ulRepositorys = document.getElementById("ulRepositorys");


    data.forEach(element => {
        ulRepositorys.appendChild(createLine(element));
    });
}

const handleUser = (data) => {
    let imgProfile = document.getElementById("imgProfile");
    imgProfile.src = data.avatar_url;

    getRepositorys(data.login).then((response) => {
        handleRepositorys(response.data);
    })


}

const handleUsername = (username) => {
    let api = handleApi(username);

    api.then((response) => {
        handleUser(response.data);
    })
}


const changeButtonCondition = () => {
    //TODO
    //! -> Trocar o botão por um de "limpar";
    //! -> dar um clear nos repositórios e na imagem;
    //! -> 

    let buttonCallApi = document.getElementById("buttonCallApi");
    let iconButtonCallApi = document.getElementById("iconButtonCallApi");

    iconButtonCallApi.className = "fas fa-times";
    buttonCallApi.className = "btn btn-danger myRadius";
    buttonCallApi.setAttribute('onclick',  'clearScreen()');
}   

const clearScreen = () => {
    location.reload();
}

const handleInput = () => {
    let inputUsername = document.getElementById("inputUsername");

    if (inputUsername.value === "" || inputUsername.value === null) {
        alert("Digite um nome de usuário válido.")
    } else {
        inputUsername.disabled = true;
        changeButtonCondition();
        handleUsername(inputUsername.value);
    }
}
