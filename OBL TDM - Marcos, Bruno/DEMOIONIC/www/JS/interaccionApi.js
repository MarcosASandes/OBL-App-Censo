const censoAPI = "https://censo.develotion.com/";
let Token;
let personasArray = [];

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
                localStorage.setItem("token", data.apiKey); // todo gestion de errores
                localStorage.setItem("idus", data.id); // todo gestion de errores
                document.querySelector("#registro-msg").innerHTML = "vemos";
                GetOcups();
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
            localStorage.setItem("token", data.apiKey); // todo gestion de errores
            document.querySelector("#login-msg").innerHTML = "Encontrado";
            localStorage.setItem("idus", data.id); // todo gestion de errores
            GetOcups();
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
    const slcCiudades = document.querySelector("#slcCiudades");

    fetch(censoAPI + `/ciudades.php?idDepartamento=${slcDepartamentos}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "apikey": tok,
            "iduser": idu
        }
    })
        .then(ConvResp)
        .then(function (data) {
            console.log("llego");
            if (data.ciudades.length <= 0) {//tirar error
            } else {
                console.log(data.ciudades);
                slcCiudades.innerHTML = "";
                for (let i = 0; i < data.ciudades.length; i++) {
                    const ciudad = data.ciudades[i];
                    const optionElement = document.createElement("ion-select-option");
                    optionElement.value = ciudad.id;
                    optionElement.textContent = ciudad.nombre;
                    slcCiudades.appendChild(optionElement);
                }
            }
        })
        .catch(function (error) {
            //  dqs("").innerHTML = "Encontrado";
            console.log(Error);
        })
        .then(function (datoError) {
            if (datoError != undefined) {
                // dqs("").innerHTML = "Encontrado";
            }
        })
}
//#endregion

//#region /ocupaciones.php

function GetOcups() {
    let tok = localStorage.getItem("token");
    let idu = localStorage.getItem("idus");
    const slcoCUP = document.querySelector("#slcOcupacion");
    const slcoCUP2 = document.querySelector("#slcOcupacion2");
    fetch(censoAPI + "/ocupaciones.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "apikey": tok,
            "iduser": idu
        }
    })
        .then(ConvResp)
        .then(function (data) {
            console.log("llego");
            if (data.ocupaciones.length <= 0) {
                console.log(data.ocupaciones);
            } else {
                console.log(data.ocupaciones);
                for (let i = 0; i < data.ocupaciones.length; i++) {
                    let ocupacion = data.ocupaciones[i];
                    let optionElement = document.createElement("ion-select-option");
                    optionElement.value = ocupacion.id;
                    optionElement.textContent = ocupacion.ocupacion;
                    slcoCUP.appendChild(optionElement);
                    slcoCUP2.appendChild(optionElement.cloneNode(true));
                    console.log(optionElement.value);
                }
            }
        })
        .catch(function (error) {
            //  dqs("").innerHTML = "Encontrado";
            console.log(Error);
        })
        .then(function (datoError) {
            if (datoError != undefined) {
            }
        })
}

//#endregion

//#region AGREGAR CENSO /personas.php
function AddPers() {
    let tok = localStorage.getItem("token");
    let idu = localStorage.getItem("idus");
    //ID PERSONA

    if (localStorage.getItem("token") === null) {
        ruteo.push("/");
        throw new Error("No estas logueado"); //se tiene que cargar en el párrafo de inicio de sesion
    }
    let name = dqs("#nombrePersona").value;
    let dpto = dqs("#slcDepartamentos").value;
    let city = dqs("#slcCiudades").value;
    let fchNac = dqs("#dateFechaNac").value;
    let Ocup = dqs("#slcOcupacion").value;
    fetch(censoAPI + "/personas.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apikey": tok,
            "iduser": idu
        },
        body: JSON.stringify({
            "idUsuario": idu,
            "nombre": name,
            "departamento": dpto,
            "ciudad": city,
            "fechaNacimiento": fchNac,
            "ocupacion": Ocup
        })
    })
        .then(ConvResp)
        .then(function (data) {
            // dqs("").innerHTML = "Encontrado";
        })
        .catch(function (error) {
            // dqs("").innerHTML = "Encontrado";
        })

}
//#endregion

//#region GET PERSONAS /personas.php?idUsuario=6 
function GetPers() {
    let tok = localStorage.getItem("token");
    let idu = localStorage.getItem("idus");
    fetch(censoAPI + "/personas.php?idUsuario=" + `${idu}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "apikey": tok,
            "iduser": idu
        }
    })
        .then(ConvResp)
        .then(function (data) {
            personasArray = data.personas;
            console.log("tabien")
            recargarPersonas();
        })
        .catch(function (error) {
            console.log("tamal")

            //dqs("").innerHTML = "Encontrado";
        })
        .then(function (datoError) {
            if (datoError != undefined) {

                //dqs("").innerHTML = "Encontrado";
            }
        })
}
//#endregion

//#region MAPA


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


function FiltroByOcup() {
    alert("")
    let Ocup = dqs("#slcOcupacion2").value;
    const gridContainer = document.querySelector("#gridcont");

    gridContainer.innerHTML = "";
    for (let i = 0; i < personasArray.length; i++) {
        const persona = personasArray[i]; // Accedemos a la persona actual en el bucle

        if (persona.ocupacion === Ocup) {
            const newRow = document.createElement("ion-row");

            nombreCol.textContent = persona.nombre;

            departamentoCol.textContent = persona.departamento;

            ciudadCol.textContent = persona.ciudad;

            fechaNacimientoCol.textContent = persona.fechaNacimiento;

            ocupacionCol.textContent = persona.ocupacion;

            // Agregamos las celdas a la fila
            newRow.appendChild(nombreCol);
            newRow.appendChild(departamentoCol);
            newRow.appendChild(ciudadCol);
            newRow.appendChild(fechaNacimientoCol);
            newRow.appendChild(ocupacionCol);

            // Agregamos la fila al grid
            gridContainer.appendChild(newRow);
        }
    }
    // if (personasArray.ocupacion === Ocup) {

    //     }
}

function recargarPersonas() {
    const gridContainer = document.querySelector("#gridcont");
    gridContainer.innerHTML = "";
    for (let i = 0; i < personasArray.length; i++) {
        const persona = personasArray[i]; // Accedemos a la persona actual en el bucle

        const newRow = document.createElement("ion-row");

        const nombreCol = document.createElement("ion-col");
        nombreCol.textContent = persona.nombre;

        const departamentoCol = document.createElement("ion-col");
        departamentoCol.textContent = persona.departamento;

        const ciudadCol = document.createElement("ion-col");
        ciudadCol.textContent = persona.ciudad;

        const fechaNacimientoCol = document.createElement("ion-col");
        fechaNacimientoCol.textContent = persona.fechaNacimiento;

        const ocupacionCol = document.createElement("ion-col");
        ocupacionCol.textContent = persona.ocupacion;

        newRow.appendChild(nombreCol);
        newRow.appendChild(departamentoCol);
        newRow.appendChild(ciudadCol);
        newRow.appendChild(fechaNacimientoCol);
        newRow.appendChild(ocupacionCol);

        // Agregamos la fila al grid
        gridContainer.appendChild(newRow);

    }
}