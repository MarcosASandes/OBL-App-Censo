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

    if (user === "" || pass === "") {
        document.querySelector("#registro-msg").innerHTML = "Datos no validos.";
    }
    else {
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
                    PrecargarArry();
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
            PrecargarArry();
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
            if (num === 4) {
                dqs("#errorAddP").innerHTML = "[GetOcups] Ha ocurrido un error: " + error;
            }
            else if (num === 5) {
                dqs("#msj-sec-listadoCensados").innerHTML = "[GetOcups] Ha ocurrido un error: " + error;
            }
        })
        .then(function (datoError) {
            if (datoError != undefined) {
                if (num === 4) {
                    dqs("#errorAddP").innerHTML = "[GetOcups] Ha ocurrido un error: " + datoError;
                }
                else if (num === 5) {
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
        const diferenciaAnios = diferenciaTiempo / (1000 * 60 * 60 * 24 * 365.25);
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

function setnombrebyid(id) {
    let arry = setRet();
    for (let i = 0; i < arry.length; i++) {
        let pos = arry[i];
        if (id === pos.id) {
            return pos.name;
        }
    }
}

/*function getNombreCiudadPorId(id){
    let tok = localStorage.getItem("token");
    let idu = localStorage.getItem("idus");
    fetch(censoAPI + "/ciudades.php", {
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
                if(data.ciudades[i].id === id){
                    return ciudad.nombre;
                }
            }
        })
        .catch(function (error) {
            return error;
        })
        .then(function (datoError) {
            if (datoError != undefined) {
                alert("[getNombreCiudadPorId] Ha ocurrido un error: " + datoError);
            }
        })
}*/

//#region MAPA TODOOOOOOO

class Coordenadas {
    constructor(latitud, longitud) {
        this.lat = latitud;
        this.long = longitud;
    }
}

let ciudadesEncontradas = [];
let coordsCensos = [];

//Obtener la posicion del dispositivo con el que interactua el usuario (censista).
function SetearPosicionDispositivo(position) {
    console.log(position);
    latitudeOrigen = position.coords.latitude;
    longitudeOrigen = position.coords.longitude;
}



//Hace posible la visualizacion del mapa en el HTML.
function MostrarMapa(distancia) {
    if (navigator.geolocation) {
        document.querySelector("#map").style.display = "block";
        var map = L.map('map').setView([-34.903609710179076, -56.190603059985875], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);
        L.marker([latitudeOrigen, longitudeOrigen]).bindPopup("Usted").addTo(map);
        var circle = L.circle([latitudeOrigen, longitudeOrigen], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: distancia
        }).addTo(map);

        for (let i = 0; i < coordsCensos.length; i++) {
            const element = coordsCensos[i];

            let distanciaCensoUsuario = map.distance([latitudeOrigen, longitudeOrigen], [element.lat, element.long]);
            console.log(distanciaCensoUsuario);
            if(distancia >= distanciaCensoUsuario){
                console.log("Cumple");
                L.marker([element.lat, element.long]).bindPopup("Censo").addTo(map);
            }
        }
    }
}




//Obtiene la distancia que seleccione el usuario. Ejecuta MostrarMapa().
function GetDistanciaMapa() {
    let distancia = dqs("#distanciaMapa").value;
    MostrarMapa(distancia);
}

//Informa de error en el parrafo correspondiente.
function MostrarError(error) {
    dqs("#sec-mapa-msg").innerHTML = "Ocurrio un error: " + error;
}




/*La premisa es que dada una distancia (radio) por el usuario, se muestre en el mapa las ciudades
dentro de ese radio en las que el usuario hizo un censo. Por lo tanto debemos obtener los censos de ese user*/
//ObtenerTodasLasCiudadesConCenso();
function ObtenerTodasLasCiudadesConCenso() {
    //PrecargarArry();
    let tok = localStorage.getItem("token");
    let idu = localStorage.getItem("idus");
    //let ubicacionesMapa = [];
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

            //console.log(data.personas[1].ciudad);

            for (let i = 0; data.personas.length; i++) {
                const ciudadCenso = data.personas[i].ciudad;
                console.log(ciudadCenso);
                fetch("https://censo.develotion.com//ciudades.php", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "apikey": tok,
                        "iduser": idu
                    }
                })
                    .then(ConvResp)
                    .then(function (datos) {
                        for (let i = 0; i < datos.ciudades.length; i++) {
                            const ciudad = datos.ciudades[i];
                            if (ciudadCenso === ciudad.id) {
                                console.log(ciudad.id);

                                let nuevaCoords = new Coordenadas(ciudad.latitud, ciudad.longitud);
                                coordsCensos.push(nuevaCoords);
                            }
                        }
                    })
                    .catch(function (error) {
                        //error;
                    })
            }




            //console.log(getNombreCiudadPorId("Montevideo"));

            /*for(let i = 0; i < data.personas.length; i++){
                const ciudadCenso = data.personas[i].ciudad;
                console.log(setnombrebyid(ciudadCenso));
                fetch("https://nominatim.openstreetmap.org/search?city="+setnombrebyid(ciudadCenso)+"&country=Uruguay&format=json")
                .then(function(response){
                    if(response.ok){
                        return response.json();
                    }
                    else{
                        return Promise.reject(response);
                    }
                })
                .then(function(datosCoords){
                    let latitudCenso = datosCoords[0].lat;
                    let longitudCenso = datosCoords[0].lon;
                    let latlonCenso = latitudCenso + "|" + longitudCenso;
                    console.log(latlonCenso);
                    //coordsCensos.push(latlonCenso);
                    let nuevaCoords = new Coordenadas(latitudCenso, longitudCenso);
                    coordsCensos.push(nuevaCoords);
                })
                .catch(function(error){
                    //error;
                })
            }
            
            console.log(data.personas[1].ciudad);
            console.log(setnombrebyid(129833))
            console.log(setnombrebyid(data.personas[1].ciudad))*/
        })
        .catch(function (error) {
            //dqs("").innerHTML = "";
        })
        .then(function (datoError) {
            if (datoError != undefined) {
                dqs("#sec-mapa-msg").innerHTML = "Problemaa";
            }
        })
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

//#endregion
