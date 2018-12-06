const db = require('../../db/db.js');

const logic = require('./classes_logic/classes_logic.js');







module.exports = {

    classes_get: (req, res) => {

        res.status(200).json(db.classes);

    },


    classes_post: (req, res) => {

        var clas = req.body;

        try {

            clas = logic.add_class(clas);
            res.status(201).json(clas);

        } catch (e) {

            res.status(e.status).send(e.text);

        }

    },


    classes_id_get: (req, res) => {

        try {

            var id = req.params.id;
            var clas = logic.get_class_by_id(id);
            res.status(200).send(clas);

        } catch (e) {

            res.status(e.status).send(e.text);

        }

    }, 

}