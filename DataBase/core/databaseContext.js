
                               class DataBaseCore {
    constructor(config){
    
      this.sql =  require('mssql');
      if(!config) throw 'No hay configuracion de DB.'
      this.config = config;
    }
    
    newSqlParameter(name, type, value){
      return { name : name, type : type, value: value } ;
    }
    
    ExcuteQuery (query, parameters = [])  {
        var sql = this.sql;
        var scope = this;
        var data =[];

        return  new Promise(function(resolve, reject){

            scope.con(function(){
                var request = new  sql.Request();
                var x;

                if(parameters.length > 0){
                    for(x=0;x<parameters.length;x++){
                    request.input(parameters[x].name, parameters[x].type, parameters[x].value);
                    }
                }

                request.query(query, function (err, recordset) {
                       
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    // send records as a response
                    sql.close();
                        resolve(recordset);
                    });
            });

        });
   
    }

    con(callback){   
        var scope = this;     
        return scope.sql.connect(this.config, function (err) {
                if (err) console.log(err);
                callback();
        });
                
    }

}
 


module.exports = DataBaseCore;