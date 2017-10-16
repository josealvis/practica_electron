
debugger
var path =  require.resolve('firebase-admin');

var admin = require('firebase-admin');


var serviceAccount = require("./key/key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sample-31b6b.firebaseio.com"
});




// Get a database from https://sample-31b6b.firebaseio.com/cliente
var db = admin.database();
var ref = db.ref("/RamonEM");// crea una refencia si no existe.
var userReference = ref.child("people");
var comentReference = ref.child("coments");
//set() sutituye los datos de la ruta por el valor especificado.
//ref.set(null); //borra la referencia

//userReference.set({
// '1':{nombre: "Jose", sexo: 'M', anoNacimiento:1991},
//'2':{nombre: "Carlos", sexo: 'M', anoNacimiento:1991}
//});


//userReference.child('2').update({anoNacimiento:1992});// se le pasa la propiedad y el valor nuevo.

//el metodo update se puede usar para agregar propiadas  y se pueden especificar rutas.
/*userReference.update({
  '1/propiedadNueva': 'esto es un texto',//agrega propiedad a la ruta 1
  '2/propiedadNueva': 'otro texto',// agrega la propiedad a la ruta 2
}, function(err){
if(err)console.log(err);
else console.log('Success update')

})*/
// tomar en cuenta que se sobreescribe donde especificas cuando haces update 


//comentReference.push().set({autor: "Algodon", message:"Wuba duba dup dup!"});
//shorthand refrence.push(object);

//var newComentRef = comentReference.push(); 
 //console.log(newComentRef.key/*devuelve el hash*/); 


 comentReference.update({'-Ksoj99BI-KVWPfnNChc/upVote' : 0});

 var upVoteRef = comentReference.child('-Ksoj99BI-KVWPfnNChc/upVote');
 upVoteRef.transaction(old_val => (old_val || 0 ) +1);//usar transaction para hacer incrementos.


/*
// to retrive data
// Attach an asynchronous callback to read the data at our posts reference
ref.on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


comentReference.on("value", 
                    snapshot => console.log(snapshot.val()),
                  errorObject => console.log(errorObject));*/

var data = [];
// Retrieve new posts as they are added to our database
comentReference.on("child_added", (snapshot, prevChildKey)=>{
  var newPost = snapshot.val();
  data.push(newPost);
  console.log(newPost);
  console.log("Previous Post ID: " + prevChildKey);

})


module.exports = data;
