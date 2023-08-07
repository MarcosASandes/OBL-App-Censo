class SetNom {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
let setnames = [];
function PrecargarArry() {
    if (setnames.length < 149) {
        SetDeptosA();
        GetCitysA();
        GetOcupsA();
    }
}

function setRet() {
    return setnames;
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
            "iduser": idu
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
            return error;
        })
        .then(function (datoError) {
            if (datoError != undefined) {
                alert("[SetDeptosA] Ha ocurrido un error: " + datoError);
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
            }
        })
        .catch(function (error) {
            return error;
        })
        .then(function (datoError) {
            if (datoError != undefined) {
                alert("[GetCitysA] Ha ocurrido un error: " + datoError);
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
            }
        })
        .catch(function (error) {
            return error;
        })
        .then(function (datoError) {
            if (datoError != undefined) {
                alert("[GetOcupsA] Ha ocurrido un error: " + datoError);
            }
        })
}