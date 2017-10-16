var DataBaseCore =  require('../core/databaseContext');

class PersonasRepo extends  DataBaseCore{
 
    constructor(){
        super(require('../config'));
    }

    getPersonaPorId(Id){

        var Parameteres =[
            this.newSqlParameter('Id', this.sql.Int, Id)
        ];

       // if(isNaN(Id))
       // {
        //    return  new Promise((resolve, reject)=> reject("El valor no es valido."));
       // } 
       // else
        //{
            return  this.ExcuteQuery(`select * from personas where ID = @Id`, Parameteres)
                        .then(respon => respon.recordset[0]);
       // }
    }

    insertarPersona(persona){
        
                var Parameteres =[
                    this.newSqlParameter('nombre', this.sql.VarChar(100), persona.nombre)
                ];   
              
                    return  this.ExcuteQuery(`
                    insert into personas(nombre)
                    values(@nombre)
                    `, Parameteres)
                    .then(respon => respon.rowsAffected);
                
            }
    getPersonas(){
        
                    return  this.ExcuteQuery(`select * from personas`)
                    .then(respon => respon.recordset);
                
            }

}

module.exports = PersonasRepo;