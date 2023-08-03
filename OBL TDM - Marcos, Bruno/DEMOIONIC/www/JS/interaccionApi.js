const censoAPI = "https://censo.develotion.com/";
let Token;
let personasArray = [];
let latitudeOrigen;
let longitudeOrigen;
navigator.geolocation.getCurrentPosition(SetearPosicionDispositivo, MostrarError);
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

function GetOcups(num) {
    console.log(this);
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
            } else if(num === 4){
                for (let i = 0; i < data.ocupaciones.length; i++) {
                    let ocupacion = data.ocupaciones[i];
                    let optionElement = document.createElement("ion-select-option");
                    optionElement.value = ocupacion.id;
                    optionElement.textContent = ocupacion.ocupacion;
                    slcoCUP.appendChild(optionElement);
                    console.log(optionElement.value);
                }
            }else if(num===5){
                for (let i = 0; i < data.ocupaciones.length; i++) {
                    let ocupacion = data.ocupaciones[i];
                    let optionElement = document.createElement("ion-select-option");
                    optionElement.value = ocupacion.id;
                    optionElement.textContent = ocupacion.ocupacion;
                    slcoCUP2.appendChild(optionElement);
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
            console.log("tabien");
            localStorage.setItem("cantidadCen", data.personas.length)
            MostrarPersonas();
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
function SetearPosicionDispositivo(position) {
    console.log(position);
    latitudeOrigen = position.coords.latitude;
    longitudeOrigen = position.coords.longitude;
}

function MostrarMapa() {
    if (navigator.geolocation) {
        var map = L.map('map').setView([-34.903609710179076, -56.190603059985875], 13);
        L.tileLayer('https://tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);
        L.marker([latitudeOrigen, longitudeOrigen]).bindPopup("Usted").addTo(map);
        //mapaInicializado = true;
    }
}

function MostrarError(){
    alert("ERROR")
}

//#endregion


//#region FINDALLCENSADOS /totalCensados.php totalcens
function FindAllCensa2() {
    let tok = localStorage.getItem("token");
    let idu = localStorage.getItem("idus");
    let q = localStorage.getItem("cantidadCen");
    fetch(censoAPI + "/totalCensados.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "apikey": tok,
            "iduser": idu
        }
    })
        .then(ConvResp)
        .then(function (data) {
            dqs("#totalcens").innerHTML=" Total de censos realizados:  " + data.total;
            dqs("#census").innerHTML= "  Cantidad de personas censadas por este usuario:  " + q;
            dqs("#censMvd").innerHTML= "  Cantidad de personas censadas en Montevideo:  " + q;
        })
        .catch(function (error) {
        })
        .then(function (datoError) {
            if (datoError != undefined) {
            }
        })
}
//#endregion


function MostrarPersonas() {
    let Tabla =
        `<ion-row>
        <ion-col>Nombre</ion-col>
        <ion-col>Departamento</ion-col>
        <ion-col>Ciudad</ion-col>
        <ion-col>Fecha de nacimiento</ion-col>
        <ion-col>Ocupacion</ion-col>
    </ion-row>`

    for (let i = 0; i < personasArray.length; i++) {
        const element = personasArray[i];
        Tabla +=
            `<ion-row>
            <ion-col>${element.nombre}</ion-col>
            <ion-col>${element.departamento}</ion-col>
            <ion-col>${element.ciudad}</ion-col>
            <ion-col>${element.fechaNacimiento}</ion-col>
            <ion-col>${element.ocupacion}</ion-col>
        </ion-row>`;
    }

    document.querySelector("#gridContainer").innerHTML = Tabla;
}

function filtroByOcu() {
    let ret;
    let ocu = document.querySelector("#slcOcupacion2").value;
    let Tabla =
        `<ion-row>
        <ion-col>Nombre</ion-col>
        <ion-col>Departamento</ion-col>
        <ion-col>Ciudad</ion-col>
        <ion-col>Fecha de nacimiento</ion-col>
        <ion-col>Ocupacion</ion-col>
    </ion-row>`

    for (let i = 0; i < personasArray.length; i++) {
        const element = personasArray[i];
        ret =element.ocupacion;
        if (ocu === ret) {

            Tabla +=
                `<ion-row>
                <ion-col>${element.nombre}</ion-col>
                <ion-col>${element.departamento}</ion-col>
                <ion-col>${element.ciudad}</ion-col>
                <ion-col>${element.fechaNacimiento}</ion-col>
                <ion-col>${element.ocupacion}</ion-col>
            </ion-row>`;
        }
    }

    document.querySelector("#gridContainer").innerHTML = Tabla;
}

