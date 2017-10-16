const swal  = require('sweetalert');
const remote = require('electron').remote;



debugger
var PersonasRepo =  require('./DataBase/repo/personasRepo');
var __repo = new PersonasRepo(); 

//var data = require('./FireBaseRepo/core/FireBaseCore');
//console.log(process.versions);
//var data = require('./class').data;




Vue.use(VueMaterial);

var app =  new Vue({
     el: '#app',
     data: { 
         id : 0,
         personas : [],
         newPersona: ''
           },
     methods: {
        closeWindows,
        getPersonas,
        insertPersona
     }
});

app.text = 'jose';

function insertPersona(nombre){
    __repo.insertarPersona({nombre: nombre})
    .then(data =>{
        if(data) {
            console.log(data);
            swal("Good job!", "You clicked the button!", "success");
            
        }
        else throw("No se econtraro registros.");
     })
    .catch(err =>  {throw(err)});
}

function getPersonas(id){
    __repo.getPersonas()
    .then(data =>{
        if(data) {
            console.log(data);
            app.personas = data;
            swal("Good job!", "You clicked the button!", "success");
            
        }
        else throw("No se econtraro registros.");
     })
    .catch(err => {throw(err)});
}



function closeWindows(){
    remote.getCurrentWindow().close();
};


