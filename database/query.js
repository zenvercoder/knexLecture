var knex = require('../routes/knex');

function Houses(){
    return knex('houses');
}

function Students(){
    return knex('students');
}

function Professors(){
    return knex('professors');
}



module.exports = {
    // changed it here, will have to change it in index.js
    getAllHouses: Houses,
    getAllStudents: Students,
    getAllProfessors: Professors,
    // look at index.js router.get('/students/:name'
    getStudentByName: function(name){
        // where name = name is pointing to parameter in the function
        return Students().where('name', name)
    },
    // let's write a route that will insert
//    could write it outside of module.export, doing it here b/c as gets more complex, one place to look
    insertNewStudent: function(name, house_id, year, patronus){
        // it will return students table where we are inserting a new record where we are inserting all of these fields
        // then write route handler in index.js for this new function
        return Students().insert({
            name: name,
            house_id: house_id,
            year: year,
            patronus: patronus
        })
    }
};

