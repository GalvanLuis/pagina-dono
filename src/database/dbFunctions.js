const pool = require('./database');

// async function getDB (){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve([{"a":"a1", "b":"a2"},{"a":"a3","b":"a4"}])
//         }, 2000);
//     })
// }

// async function poolDB () {
//     let response = []
//     return new Promise(async (resolve, reject) => {
//         console.log("llamando a la BD")
//         let task = await getDB();
//         console.log("Llamada a la bd terminada")
//         for(let i in task){
//             response.push(task[i]["a"])
//         }

//         resolve(response)
//     })
// }

// async function ejecutarOperaciones() {
//     console.log('Inicio de operaciones previas.');
  
//     let task = poolDB();
//     console.log("TASK")
  
//     console.log('Continuación de operaciones posteriores.');
  
//     console.log('Respuesta:', await task);
// }

const getTableColumns = async (table_name, data_type=false) => {
    let cols = 'column_name';
    if(data_type) cols += ',data_type';
    let names = [];
    
    return new Promise(async (resolve, reject) => {
        try{
            let columns = await pool.query('SELECT ' + cols + ' FROM information_schema.columns WHERE table_name = \'' + table_name + '\'');
            for(let i in columns){
                colData = columns[i];
                if(data_type)
                    names.push([colData["COLUMN_NAME"], colData["DATA_TYPE"]])
                else
                    names.push(colData["COLUMN_NAME"])

            }
            resolve(names);
        } catch (error) { reject(error) }
    });
};


const getUsersByUserType = async (user_type_columns, lower=null, upper=null, order=null, limit=null) => {
    // validacion de los parametros aqui

    /**
     * user_type_columns = {
     *  id_tipo_usuario: ([column1, column2, ...] or null) // if column is null then column will be *
     * }
     */
    let conditions = '';
    if(lower) 
        conditions = ' AND id_usuario >= ' + lower + ' AND ';
    else 
        conditions = ' AND ';
    if(upper) 
        conditions += 'id_usuario <= ' + upper + ' ';
    else 
        conditions = conditions.substring(0, conditions.length - 5);
    if(order) 
        conditions += 'ORDER BY id_usuario ' + order + ' ';
    if(limit) 
        conditions += 'LIMIT ' + limit;
    
    let response = {};
    for(let id in user_type_columns){
        let columns = null;
        if(user_type_columns[id])
            columns = user_type_columns[id].map((val) => val).join(', ');
        else
            columns = '*'
        
        const rows = await pool.query('SELECT ' + columns + ' FROM usuarios ' + 'WHERE id_tipo_usuario = ' + id + conditions + ';');
        let values = []
        for(let rowi of rows){
            values.push(rowi);
        }
        response[id] = values;
    }
    return response;    
};


const getOneUser = async (user_id, columns=null) => {
    return new Promise((resolve, reject) => {
        try{
            if(columns)
                columns = columns.map((val) => val).join(', ')
            else
                columns = '*'
            resolve(pool.query('SELECT ' + columns + ' FROM usuarios ' + 'WHERE id_usuario = ' + user_id));
        } catch (error) {reject(error)}
    });
};

const updateUserData = async (userData) => {
    return new Promise((resolve, reject) => {
        try{
            for(let col in userData){
                
            }
        } catch (error) {reject(error)}
    })
};

const updateUserName = async (user_id, new_name) => {
    return new Promise((resolve, reject) => {
        try {resolve(pool.query('UPDATE usuarios SET nombre = ' + new_name + ' WHERE id_usuario = ' + user_id))}
        catch (error) {reject(error)}
    });
};

const updateUserLastName = async (user_id, new_last_name) => {
    return new Promise((resolve, reject) => {
        try {resolve(pool.query('UPDATE usuarios SET apellido = ' + new_last_name + ' WHERE id_usuario = ' + user_id))}
        catch (error) {reject(error)}
    });
};

module.exports = {
    getTableColumns,
    getUsersByUserType,
    getOneUser,
    updateUserName
}