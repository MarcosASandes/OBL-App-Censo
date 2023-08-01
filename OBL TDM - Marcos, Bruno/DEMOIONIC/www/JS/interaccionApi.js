const censoAPI = "https://censo.develotion.com/";
let hayUsuarioLogueado = false;
let Token;

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
                localStorage.setItem("idus", data.id); // todo gestion de errores
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


function logout() {
    localStorage.clear();
}

//#region LOGIN /login.php?&

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
        .then(ConvResp)
        .then(function (data) {
            hayUsuarioLogueado = true;
            localStorage.setItem("token", data.apiKey); // todo gestion de errores
            document.querySelector("#login-msg").innerHTML = "Encontrado";
            localStorage.setItem("idus", data.id); // todo gestion de errores
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
//#endregiond

//#region SETDEPTOS /departamentos.php 
function SetDeptos() {
    let tok = localStorage.getItem("token");
    let idu = localStorage.getItem("idus");

    fetch(censoAPI + "/departamentos.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "apikey": tok,
            "iduser": idu // todo gestion de errores, 
        }
    })
        .then(ConvResp)
        .then(function (data) {
            const selectElement = document.querySelector("#slcDepartamentos");
            selectElement.innerHTML = ""; // Limpiar el select            
            for (let i = 0; i < data.departamentos.length; i++) {
                let departamento = data.departamentos[i];
                const optionElement = document.createElement("ion-select-option");
                optionElement.value = departamento.id;
                optionElement.textContent = departamento.nombre;
                selectElement.appendChild(optionElement);
            }
        })
        .catch(function (error) {
            //  dqs("").innerHTML = "Encontrado";
        })
        .then(function (datoError) {
            if (datoError != undefined) {
                // dqs("").innerHTML = "Encontrado";
            }
        })
}
//#endregion

dqs("#slcDepartamentos").addEventListener("ionChange", GetCitys);
//#region GETCytis /ciudades.php?idDepartamento=3208
function GetCitys() {
    let tok = localStorage.getItem("token");
    let idu = localStorage.getItem("idus");
    const slcDepartamentos = dqs("#slcDepartamentos").value;
    const slcCiudades = document.getElementById("#slcCiudades");
    const selectedDepartamentoId = slcDepartamentos;

    fetch(censoAPI + `/ciudades.php?idDepartamento=${selectedDepartamentoId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "apikey": tok,
            "iduser": idu
        }
    })
        .then(ConvResp)
        .then(function (data) {
            
            for (let i = 0; i < data.ciudades.length; i++) {
                const ciudad = data.ciudades[i];
                const optionElement = document.createElement("ion-select-option");
                optionElement.value = ciudad.id;
                optionElement.textContent = ciudad.nombre;
                slcCiudades.appendChild(optionElement);
            }
        })
        .catch(function (error) {
          //  dqs("").innerHTML = "Encontrado";
        })
        .then(function (datoError) {
            if (datoError != undefined) {
               // dqs("").innerHTML = "Encontrado";
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
                "Content-Type": "application/json",
                "apikey": localStorage.getItem("token")
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
            .then(ConvResp)
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
        dqs("sec-login").innerHTML = "Inicie sesion.";

    }
}
//#endregion

//#region GET PERSONAS /personas.php?idUsuario=6 
//{encargar el id extraido del usuario}
function GetPers() {
    fetch(censoAPI + "/personas.php?idUsuario=6", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "apikey": localStorage.getItem("token")
        }
    })
        .then(ConvResp)
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
            "Content-Type": "application/json",
            "apikey": localStorage.getItem("token")
        }
    })
        .then(ConvResp)
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
            "Content-Type": "application/json",
            "apikey": localStorage.getItem("token")
        }
    })
        .then(ConvResp)
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

        // if(localStorage.getItem("token"!==null)){
        //     <nav>
        //         <input type="button" value="LOGOUT" onClick={Logout}/>
        //     </nav>//cambiarlo por un route
        // }else{
        //     <nav>
        //         <input type="button" value="LOGOUT" onClick={Logout}/>
        //         <input type="button" value="LOGOUT" onClick={Logout}/>
        //     </nav>
        // }
        // function Logout(){
        //     localStorage.clear();
        // }