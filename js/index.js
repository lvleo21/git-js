// const urlLogoGit = "https://img.icons8.com/fluency/460/000000/github.png";
const APIURL = "https://api.github.com/users";



let TIMEOUT = null;


const searchProfile = (e) => {
    clearTimeout(TIMEOUT)

    TIMEOUT = setTimeout(() => {

        if (e.value.length > 0) {
            e.className = "form-control is-valid";

            fetch(`${APIURL}/${e.value}`)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            e.className = "form-control is-invalid";
        }

    }, 500)
}