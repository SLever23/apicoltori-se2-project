/**

 * Unit testing for the logics of the user resource handling

 */

const users_logic = require('./users_logic.js');

const db = require('../../../db/db.js');



describe('Test users logic module', () => {

    test('Validate correct_email', () => {

        var email = 'tizio.caio@semprogno.com';
        var valid = users_logic.validate_email(email);
        expect(valid).toBe(true);

    });



    test('Validate wrong_email', () => {

        var email = 'tizio.caio@semprognocom';
        var valid = users_logic.validate_email(email);
        expect(valid).toBe(false);
        email = 0;
        valid = users_logic.validate_email(email);
        expect(valid).toBe(false);
        email = 'ciaociao'
        valid = users_logic.validate_email(email);
        expect(valid).toBe(false);
        email = 'tizio..caio@semprognocom'
        valid = users_logic.validate_email(email);
        expect(valid).toBe(false);

    });


    test('Get existing_user', () => {

        var user = db.get_user_obj();
        user.email = 'tizio.caio@semprogno.com';
        db.users[user.email] = user;
        var valid = users_logic.get_user(user.email);
        expect(valid).toBe(user);

    });


    
    test('Get not_existing_user', () => {

        var email = 'nonesisto@semprogno.com';
        let valid = () => { 

            users_logic.get_user(email);

        }
        expect(valid).toThrow();

    });



    test('Validate correct_create_user', () => {

        var user = db.get_user_obj();
        user.name = 'Tizio';
        user.surname = 'Caio';
        user.email = 'tizio.caio@semprogno.com';
        user.password = 'Password123';
        var valid = users_logic.validate_create(user);
        expect(valid).toBe(true);

    });



    test('Validate wrong_create_user', () => {

        var user = db.get_user_obj();
        user.name = null;
        user.surname = null;
        user.email = null;
        user.password = null;
        var valid = users_logic.validate_create(user);
        expect(valid).toBe(false);

        user.name = 'Tizio33';
        user.surname = 'Caio';
        user.email = 'tizio.caio@semprogno.com';
        user.password = 'Password123';
        valid = users_logic.validate_create(user);
        expect(valid).toBe(false);

        user.name = 0;
        user.surname = 'Caio';
        user.email = 'tizio.caio@semprogno.com';
        user.password = 'Password123';
        valid = users_logic.validate_create(user);
        expect(valid).toBe(false);

        user.name = 'Tizio';
        user.surname = 'Caio33';
        user.email = 'tizio.caio@semprogno.com';
        user.password = 'Password123';
        valid = users_logic.validate_create(user);
        expect(valid).toBe(false);

        user.name = 'Tizio';
        user.surname = 0;
        user.email = 'tizio.caio@semprogno.com';
        user.password = 'Password123';
        valid = users_logic.validate_create(user);
        expect(valid).toBe(false);

        user.name = 'Tizio';
        user.surname = 'Caio';
        user.email = 'tizio.caio@semprognocom';
        user.password = 'Password123';
        valid = users_logic.validate_create(user);
        expect(valid).toBe(false);

        user.name = 'Tizio';
        user.surname = 'Caio';
        user.email = 'ciaociao';
        user.password = 'Password123';
        valid = users_logic.validate_create(user);
        expect(valid).toBe(false);

        user.name = 'Tizio';
        user.surname = 'Caio';
        user.email = 0;
        user.password = 'Password123';
        valid = users_logic.validate_create(user);
        expect(valid).toBe(false);

        user.name = 'Tizio';
        user.surname = 'Caio';
        user.email = 'tizio.caio@semprogno.com';
        user.password = 0;
        valid = users_logic.validate_create(user);
        expect(valid).toBe(false);

    });



    test('Validate correct_created_user', () => {

        var user = db.get_user_obj();
        user.name = 'Tizio';
        user.surname = 'Caio';
        user.email = 'tizio.caio@semprogno.com';
        user.password = 'Password123';
        var valid = users_logic.add_user(user);
        expect(valid).toEqual(user);

    });



    test('Validate wrong_created_user', () => {

        var user = db.get_user_obj();
        let valid = () => { 

            users_logic.get_user(user);

        }
        expect(valid).toThrow();

        user.name = 'Tizio33';
        user.surname = 'Caio';
        user.email = 'tizio.caio@semprogno.com';
        user.password = 'Password123';
        valid = () => { 

            users_logic.get_user(user);

        }
        expect(valid).toThrow();

        user.name = 0;
        user.surname = 'Caio';
        user.email = 'tizio.caio@semprogno.com';
        user.password = 'Password123';
        valid = () => { 

            users_logic.get_user(user);

        }
        expect(valid).toThrow();

        user.name = 'Tizio';
        user.surname = 'Caio33';
        user.email = 'tizio.caio@semprogno.com';
        user.password = 'Password123';
        valid = () => { 

            users_logic.get_user(user);

        }
        expect(valid).toThrow();

        user.name = 'Tizio';
        user.surname = 0;
        user.email = 'tizio.caio@semprogno.com';
        user.password = 'Password123';
        valid = () => { 

            users_logic.get_user(user);

        }
        expect(valid).toThrow();

        user.name = 'Tizio';
        user.surname = 'Caio';
        user.email = 'tizio.caio@semprognocom';
        user.password = 'Password123';
        valid = () => { 

            users_logic.get_user(user);

        }
        expect(valid).toThrow();

        user.name = 'Tizio';
        user.surname = 'Caio';
        user.email = 'ciaociao';
        user.password = 'Password123';
        valid = () => { 

            users_logic.get_user(user);

        }
        expect(valid).toThrow();

        user.name = 'Tizio';
        user.surname = 'Caio';
        user.email = 0;
        user.password = 'Password123';
        valid = () => { 

            users_logic.get_user(user);

        }
        expect(valid).toThrow();

        user.name = 'Tizio';
        user.surname = 'Caio';
        user.email = 'tizio.caio@semprogno.com';
        user.password = 0;
        valid = () => { 

            users_logic.get_user(user);

        }
        expect(valid).toThrow();

    });



    test('Validate correct_id', () => {

        var id = 0;
        var valid = users_logic.validate_id(id);
        expect(valid).toBe(true);

    });



    test('Validate wrong_id', () => {

        var id = 'carlino';
        var valid = users_logic.validate_id(id);
        expect(valid).toBe(false);

        id = -7;
        valid = users_logic.validate_id(id);
        expect(valid).toBe(false);

    });



    test('Get existing_user_by_id', () => {

        var user = db.get_user_obj();
        user.id = 0;
        db.users[user.id] = user;
        var valid = users_logic.get_user_by_id(user.id);
        expect(valid).toBe(user);

    });


    
    test('Get not_existing_user_by_id', () => {

        var id = 'carlino';
        let valid = () => { 

            users_logic.get_user_by_id(id);

        }
        expect(valid).toThrow();

        id = -7;
        valid = () => { 

            users_logic.get_user_by_id(id);

        }
        expect(valid).toThrow();

    });

});