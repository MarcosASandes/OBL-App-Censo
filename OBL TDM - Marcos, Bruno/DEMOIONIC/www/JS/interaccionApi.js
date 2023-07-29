const censoAPI = "https://censo.develotion.com/";
let hayUsuarioLogueado = false;

//#region REGISTRO /usuarios.php
function registrarUsuario() {
    let user = dqs("#txtUser").value;
    let pass = dqs("#txtPass").value;

    try {
        if (user.trim().length == 0 || pass.trim().length == 0) {
            throw new Error("Inconsistencia de datos");
        }
        //Implementacion de la API - Prueba
        //Resultado obtenido: 409 Ya existe un usuario con ese nombre.
        fetch(censoAPI + "/usuarios.php",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "usuario": user,
                    "password": pass
                })
            })
            .then(ConvResp)
            .then(function (data) {
                
                hayUsuarioLogueado = true;
                localStorage.setItem("token", data.apiKey); // todo gestion de errores
                document.querySelector("#registro-msg").innerHTML = "vemos";
            })
            .catch(function (Error) {
                throw Error;
            })
    }
    catch (Error) {
        document.querySelector("#registro-msg").innerHTML = Error.message;
    }
}
//#endregion
/*
localStorage.setItem("token", "token")
*/

//#region LOGIN /login.php?&

function logout() {
    localStorage.clear();
}


function iniciarSesion() {
    let nombreUsuario = dqs("#txtUserLogin").value;
    let password = dqs("#txtPassLogin").value;
    fetch(censoAPI + "/login.php?&", {
        method: "POST",
        Headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "usuario": nombreUsuario,
            "password": password
        })
    })
        .then(ConvResp(response))
        .then(function (data) {
            hayUsuarioLogueado = true;
            localStorage.setItem("token", data.data.token);
            document.querySelector("#login-msg").innerHTML = "Encontrado";
        })
        .catch(function (error) {
            document.querySelector("#login-msg").innerHTML = error;
        })
        .then(function (datoError) {
            if (datoError != undefined) {
                document.querySelector("#login-msg").innerHTML = datoError;
            }
        })

}
//#endregion

//#region AGREGAR CENSO /personas.php
function AddPers(persona) {

    //ID PERSONA
    try {
        if (!hayUsuarioLogueado) {
            ruteo.push("/");
            throw new Error("No estas logueado"); //se tiene que cargar en el párrafo de inicio de sesion
        }
        let name = dqs().value;
        let dpt = dqs().value;
        let city = dqs().value;
        let fchNac = dqs().value;
        let Ocup = dqs().value;
        fetch(censoAPI + "/personas.php", {
            method: "POST",
            Headers: {
                content,
                "x-auth": localStorage.getItem("token")
            },
            body: JSON.stringify({
                "idUsuario": 6,
                "nombre": name,
                "departamento": dpt,
                "ciudad": city,
                "fechaNacimiento": fchNac,
                "ocupacion": Ocup
            })
        })
            .then(ConvResp(response))
            .then(function (data) {
                dqs("").innerHTML = "Encontrado";
            })
            .catch(function (error) {
                dqs("").innerHTML = "Encontrado";
            })
            .then(function (datoError) {
                if (datoError != undefined) {
                    dqs("").innerHTML = "Encontrado";
                }
            })
    } catch {

    }
}
//#endregion

//#region GET PERSONAS /personas.php?idUsuario=6 
//{encargar el id extraido del usuario}
function GetPers() {
    fetch(censoAPI + "/personas.php?idUsuario=6", {
        method: "GET",
        headers: {
            content,
            "x-auth": localStorage.getItem("token")
        }
    })
        .then(ConvResp(response))
        .then(function (data) {
            dqs("").innerHTML = "Encontrado";
        })
        .catch(function (error) {
            dqs("").innerHTML = "Encontrado";
        })
        .then(function (datoError) {
            if (datoError != undefined) {
                dqs("").innerHTML = "Encontrado";
            }
        })
}
//#endregion

//#region MAPA
//#endregion

//#region FIND BY OCUPACIÓN /ocupaciones.php
function FindByOcup() {
    fetch(censoAPI + "/ocupaciones.php", {
        method: "GET",
        headers: {
            content,
            "x-auth": localStorage.getItem("token")
        }
    })
        .then(ConvResp(response))
        .then(function (data) {
            dqs("").innerHTML = "Encontrado";
        })
        .catch(function (error) {
            dqs("").innerHTML = "Encontrado";
        })
        .then(function (datoError) {
            if (datoError != undefined) {
                dqs("").innerHTML = "Encontrado";
            }
        })
}
//#endregion

//#region FINDALLCENSADOS /totalCensados.php
function FindAllCensa2() {
    fetch(censoAPI + "/totalCensados.php", {
        method: "GET",
        headers: {
            content,
            "x-auth": localStorage.getItem("token")
        }
    })
        .then(ConvResp(response))
        .then(function (data) {
            dqs("").innerHTML = "";
        })
        .catch(function (error) {
            dqs("w").innerHTML = "asdad";
        })
        .then(function (datoError) {
            if (datoError != undefined) {
                dqs("w").innerHTML = dqs("w").value + "sdasfasf";
            }
        })
}
//#endregion