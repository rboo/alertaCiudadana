(function () {
    login()
})();

function login() {
    let btnLogin = document.querySelector('#btnLogin');
    let localStorage = window.localStorage;

    if (btnLogin !== null) {
        btnLogin.addEventListener('click', () => {
            let email = $.trim($('#dni').val());
            let password = $.trim($('#password').val());
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log("correcto");
                    var user = userCredential.user;
                    localStorage.setItem("usuario", JSON.stringify(user));
                    window.location.href = "index.html";
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(`Error ${errorCode} - ${errorMessage}`)
                });
        });
    }
}

