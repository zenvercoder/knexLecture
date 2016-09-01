var express = require('express');
var router = express.Router();
// require query to make sure path is correct
var query = require('../database/query');

router.get('/', function (req, res, next) {
    //res.render('index', { title: 'Express' });
    query.getAllHouses()
        // because it returns a promise , we have to do a .then
        //    data is the data promise returns
        .then(function (data) {
            // then we are res.sending data
            res.send(data);
        })
        // anytime you do a .then, you need to do a .catch
        // if you don't do .catch, you'll get a super generic error
        .catch(function (err) {
            return next(err);
        })
});

// /students, that's the route in the browser
router.get('/students', function (req, res, next) {
    query.getAllStudents()
        .then(function (data) {
            res.send(data)
        })
        .catch(function (err) {
            // next is a method used in middleware saying "handling errors is not my job,
            // send it on. it goes to app.js
            return next(err);
        })
});

// in browser, can do: http://localhost:3000/students/Harry%20Potter
// %20 means space
router.get('/students/:name', function (req, res, next) {
    var name = req.params.name;
    query.getStudentByName(name)
        .then(function (data) {
            // instead of res.send, do an individual page
            // res.render first thing is need a new view
            // student.hbs
            //res.send(data)
            // *****this points to student.hbs in the views file*****
            res.render('student', {
            //     an object with the stuff you want to render
            //     want to point to first and single object in the array
            //    rendering single name b/c looking for a single student
                data: data[0]
            })
        })
        // this will go to app.js app.get app.use res.status err.status || 500
        // development error handler will print stacktrack
        .catch(function (err) {
            return next(err);
        })
});

router.get('/newstudent/:name/:house_id/:year/:patronus',
    function (req, res, next){
        var name = req.params.name,
            house_id = req.params.house_id,
            year = req.params.yes,
            patronus = req.params.patronus;

        // an insert alone does not return anything
        query.insertNewStudent(name, house_id, year, patronus)
            .then(function(){
                 res.redirect('/')
            })
            .catch(function (err) {
                return next(err);
            })
    });

router.get('/patronus/new/:patronus/:name',
    function(req, res, next){
        var patronus = req.params.patronus,
            name = req.params.name;
        query.updateStudentPatronus(patronus, name)
            .then(function(){
                // can also look at js doc to do something other than res.redirect
                res.redirect('/')
            })
            .catch(function(err){
                return next(err);
            })
    }
);

router.get('/professors', function (req, res, next) {
    query.getAllProfessors()
        .then(function (data) {
            res.send(data)
        })
        // anytime you do a .then, you need to do a .catch
        .catch(function (err) {
            return next(err);
        })
});

module.exports = router;



