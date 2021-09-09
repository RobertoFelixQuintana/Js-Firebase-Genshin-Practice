const firebaseConfig = {
    apiKey: "AIzaSyAvJQhzQdhoMMNcyc1-NJF_XjjEqSksouY",
    authDomain: "basededatos-49510.firebaseapp.com",
    databaseURL: "https://basededatos-49510-default-rtdb.firebaseio.com",
    projectId: "basededatos-49510",
    storageBucket: "basededatos-49510.appspot.com",
    messagingSenderId: "138318968681",
    appId: "1:138318968681:web:cab21097f1b71700ffeff8",
    measurementId: "G-RGJ5KEFZY6"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='selecciona';
    document.getElementById("Input4").value='selecciona';
    document.getElementById("Input5").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var elemento = document.getElementById("Input3").value;
    var zona = document.getElementById("Input4").value;
    var tipo = document.getElementById("Input5").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var personaje = {
            id, //matricula:id
            nombre,
            elemento,
            zona,
            tipo,
        }

        //console.log(alumno);

        firebase.database().ref('Personajes/' + id).update(personaje).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Personajes');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(personaje){
    
    if(personaje!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = personaje.id;
        cell2.innerHTML = personaje.nombre; 
        cell3.innerHTML = personaje.elemento;
        cell4.innerHTML = personaje.zona; 
        cell5.innerHTML = personaje.tipo; 
        cell6.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${personaje.id})">Eliminar</button>`;
        cell7.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+personaje.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Personajes/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Personajes/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(personaje){
    if(personaje!=null)
    {
        document.getElementById("Input1").value=personaje.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=personaje.nombre;
        document.getElementById("Input3").value=personaje.elemento;
        document.getElementById("Input4").value=personaje.zona;
        document.getElementById("Input5").value=personaje.tipo;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Personajes");
    ref.orderByChild("zona").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(personaje){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4)
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = personaje.id;
    cell2.innerHTML = personaje.nombre; 
    cell3.innerHTML = personaje.elemento;
    cell4.innerHTML = personaje.zona; 
    cell5.innerHTML = personaje.tipo; 
}