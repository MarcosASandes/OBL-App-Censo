class SetNom {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
let setnames = [];
function PrecargarArry(){
    if (localStorage.getItem("token") !== null) {
        SetDeptosA();
        GetCitysA();
        GetOcupsA();
   
    }
}
//#region SETDEPTOS /departamentos.php 
function SetDeptosA() {
    let tok = localStorage.getItem("token");
    let idu = localStorage.getItem("idus");
    let dtp;
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
            for (let i = 0; i < data.departamentos.length; i++) {
                let departamento = data.departamentos[i];
                dtp = new SetNom(departamento.id, departamento.nombre);
                setnames.push(dtp);
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

//#region GETCytis /ciudades.php?idDepartamento=3208
function GetCitysA() {
    let tok = localStorage.getItem("token");
    let idu = localStorage.getItem("idus");
    let city;
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
                city = new SetNom(ciudad.id, ciudad.nombre)
                setnames.push(city);
                console.log(setnames.length);
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

function GetOcupsA() {
    console.log(this);
    let tok = localStorage.getItem("token");
    let idu = localStorage.getItem("idus");
    let ocup;
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
            for (let i = 0; i < data.ocupaciones.length; i++) {
                let ocupacion = data.ocupaciones[i];
                ocup = new SetNom(ocupacion.id, ocupacion.ocupacion);
                setnames.push(ocup);
                console.log(setnames.length);
            }
        })
        .catch(function (error) {
            console.log(Error);
        })
}