const censoAPI = "https://censo.develotion.com/";
let Token;
let personasArray = [];
let latitudeOrigen;
let longitudeOrigen;
navigator.geolocation.getCurrentPosition(SetearPosicionDispositivo, MostrarError);

//#region REGISTRO | /usuarios.php
function registrarUsuario() {
    let user = dqs("#txtUser").value;
    let pass = dqs("#txtPass").value;

    if(user === "" || pass === ""){
        document.querySelector("#registro-msg").innerHTML = "Datos no validos.";
    }
    else{
        try {
            if (user.trim().length == 0 || pass.trim().length == 0) {
                throw new Error("Inconsistencia de datos");
            }
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
                    localStorage.setItem("token", data.apiKey);
                    localStorage.setItem("idus", data.id);
                    document.querySelector("#registro-msg").innerHTML = "Registrado correctamente.";
                    OcultarBotones();
                    MostrarBienvenida();
                    ruteo.push("/");
                })
                .catch(function (Error) {
                    throw Error;
                })
        }
        catch (Error) {
            document.querySelector("#registro-msg").innerHTML = Error.message;
        }
    }
}
//#endregion


//#region Logout
function logout() {
    localStorage.clear();
    OcultarBotones();
    MostrarBienvenida();
    ruteo.push("/");
}
//#endregion


//#region LOGIN | /login.php?&
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
            localStorage.setItem("token", data.apiKey);
            document.querySelector("#login-msg").innerHTML = "Login correcto.";
            localStorage.setItem("idus", data.id);
            OcultarBotones();
            MostrarBienvenida();
            ruteo.push("/");
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


//#region SETDEPTOS | /departamentos.php 
function SetDeptos() {
    let tok = localStorage.getItem("token");
    let idu = localStorage.getItem("idus");

    fetch(censoAPI + "/departamentos.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "apikey": tok,
            "iduser": idu 
        }
    })
        .then(ConvResp)
        .then(function (data) {
            const selectElement = document.querySelector("#slcDepartamentos");
            selectElement.innerHTML = "";            
            for (let i = 0; i < data.departamentos.length; i++) {
                let departamento = data.departamentos[i];
                const optionElement = document.createElement("ion-select-option");
                optionElement.value = departamento.id;
                optionElement.textContent = departamento.nombre;
                selectElement.appendChild(optionElement);
            }
        })
        .catch(function (error) {
            dqs("#errorAddP").innerHTML = "[SetDeptos] Ha ocurrido un error: " + error;
        })
        .then(function (datoError) {
            if (datoError != undefined) {
                dqs("#errorAddP").innerHTML = datoError;
            }
        })
}
//#endregion

dqs("#slcDepartamentos").addEventListener("ionChange", GetCitys);

//#region GetCitys | /ciudades.php?idDepartamento=3208
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
            if (data.ciudades.length <= 0) {
                dqs("#errorAddP").innerHTML = "Ha ocurrido un error.";
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
            dqs("#errorAddP").innerHTML = "[GetCitys] Ha ocurrido un error: " + error;
        })
        .then(function (datoError) {
            if (datoError != undefined) {
                dqs("#errorAddP").innerHTML = datoError;
            }
        })
}
//#endregion


//#region | /ocupaciones.php
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
            if (data.ocupaciones.length <= 0) {

            } else if (num === 4) {
                for (let i = 0; i < data.ocupaciones.length; i++) {
                    let ocupacion = data.ocupaciones[i];
                    let optionElement = document.createElement("ion-select-option");
                    optionElement.value = ocupacion.id;
                    optionElement.textContent = ocupacion.ocupacion;
                    slcoCUP.appendChild(optionElement);
                }
            } else if (num === 5) {
                for (let i = 0; i < data.ocupaciones.length; i++) {
                    let ocupacion = data.ocupaciones[i];
                    let optionElement = document.createElement("ion-select-option");
                    optionElement.value = ocupacion.id;
                    optionElement.textContent = ocupacion.ocupacion;
                    slcoCUP2.appendChild(optionElement);
                }
            }
        })
        .catch(function (error) {
            if(num === 4){
                dqs("#errorAddP").innerHTML = "[GetOcups] Ha ocurrido un error: " + error;
            }
            else if(num === 5){
                dqs("#msj-sec-listadoCensados").innerHTML = "[GetOcups] Ha ocurrido un error: " + error;
            }
        })
        .then(function (datoError) {
            if (datoError != undefined) {
                if(num === 4){
                    dqs("#errorAddP").innerHTML = "[GetOcups] Ha ocurrido un error: " + datoError;
                }
                else if(num === 5){
                    dqs("#msj-sec-listadoCensados").innerHTML = "[GetOcups] Ha ocurrido un error: " + datoError;
                }
            }
        })
}
//#endregion


//#region AGREGAR CENSO | /personas.php
function AddPers() {
    let tok = localStorage.getItem("token");
    let idu = localStorage.getItem("idus");
    //ID PERSONA

    if (tok === null) {
        ruteo.push("/");
        dqs("#login-msg").innerHTML = "Debe loguearse.";
    }
    let name = dqs("#nombrePersona").value;
    let dpto = dqs("#slcDepartamentos").value;
    let city = dqs("#slcCiudades").value;
    let fchNac = dqs("#dateFechaNac").value;
    let Ocup = dqs("#slcOcupacion").value;

    if (name == "" || fchNac == "" || dpto == null || city == null || Ocup == null) {
        dqs("#errorAddP").innerHTML = "Chequear datos";
    } else if (Ocup !== 5 || Ocup !== 8) {
        const fechaNacimiento = new Date(fchNac);
        const tiempoActual = Date.now();
        const tiempoNacimiento = fechaNacimiento.getTime();
        const diferenciaTiempo = tiempoActual - tiempoNacimiento;
        const diferenciaAnios = diferenciaTiempo/ (1000 * 60 * 60 * 24 * 365.25);
        if (diferenciaAnios < 18) {
            dqs("#errorAddP").innerHTML = "Como menor solo puedes ser estudiante o no trabajar";
        } else {
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
                dqs("#errorAddP").innerHTML = "Censo creado correctamente.";
            })
            .catch(function (error) {
                dqs("#errorAddP").innerHTML = "[AddPers] Ha ocurrido un error inesperado: " + error;
            })
        }
    }
}
//#endregion


//#region GET PERSONAS | /personas.php?idUsuario=6 
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
            localStorage.setItem("cantidadCen", data.personas.length)
            let qM = 0;
            for (let i = 0; i < data.personas.length; i++) {
                //3218 (Id Montevideo).
                let dp = data.personas[i];
                if (dp.departamento == 3218) {
                    qM++;
                }
            }
            localStorage.setItem("cantidadMvd", qM);
            MostrarPersonas();
            dqs("#msj-sec-listadoCensados").innerHTML = "Censados encontrados: ";
        })
        .catch(function (error) {
            dqs("#msj-sec-listadoCensados").innerHTML = "[GetPers] Ha ocurrido un error: " + error;
        })
        .then(function (datoError) {
            if (datoError != undefined) {
                dqs("#msj-sec-listadoCensados").innerHTML = datoError;
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

function MostrarError() {
}
//#endregion


//#region FINDALLCENSADOS | /totalCensados.php totalcens
function FindAllCensa2() {
    let tok = localStorage.getItem("token");
    let idu = localStorage.getItem("idus");
    let q = localStorage.getItem("cantidadCen");
    let qM = localStorage.getItem("cantidadMvd");
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
            dqs("#totalcens").innerHTML = " Total de censos realizados:  " + data.total;
            dqs("#census").innerHTML = "  Cantidad de personas censadas por este usuario:  " + q;
            dqs("#censMvd").innerHTML = "  Cantidad de personas censadas en Montevideo:  " + qM;
        })
        .catch(function (error) {
            dqs("#sec-totcens-msj").innerHTML = "[TotalCensados] Ha habido un error " + error;
        })
        .then(function (datoError) {
            if (datoError != undefined) {
                dqs("#sec-totcens-msj").innerHTML = datoError;
            }
        })
}
//#endregion


//#region Imprimir personas
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
            <ion-col>${setnombrebyid(element.departamento)}</ion-col>
            <ion-col>${setnombrebyid(element.ciudad)}</ion-col>
            <ion-col>${element.fechaNacimiento}</ion-col>
            <ion-col>${setnombrebyid(element.ocupacion)}</ion-col>
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
        ret = element.ocupacion;
        if (ocu === ret) {
            Tabla +=
                `<ion-row>
                <ion-col>${element.nombre}</ion-col>
                <ion-col>${setnombrebyid(element.departamento)}</ion-col>
                <ion-col>${setnombrebyid(element.ciudad)}</ion-col>
                <ion-col>${element.fechaNacimiento}</ion-col>
                <ion-col>${setnombrebyid(element.ocupacion)}</ion-col>
            </ion-row>`;
        }
    }
    document.querySelector("#gridContainer").innerHTML = Tabla;
}
function setnombrebyid(id) {
    let arry = setRet();
    for (let i = 0; i < arry.length; i++) {
        let pos = arry[i];
        if (id === pos.id) {
            return pos.name;
        }
    }
}
//#endregion
