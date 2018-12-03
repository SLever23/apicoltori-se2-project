const reviews_logic = require ('./reviews_logic.js');
const db = require('../../../db/db.js');

//valid eq. classes

test('Retrive valid reviews with all input ', () => {
    db.exams.push({id: 2})
    db.users.push({id: 2})
    db.tasks.push({id: 2})
    db.exams.push({id: 1})
    db.users.push({id: 2})
    db.tasks.push({id: 1})

    db.reviews.push({id: 0,exam: 2, user: 2, task: 2});

    let results = reviews_logic.reviews_get_all(2,2,2);
    expect(Array.isArray(results)).toBe(true);
    
    expect(results.length).toBe(1);

    let correct = false;
    results.forEach(element => {
        if(element.exam == 2 && element.user == 2 && element.task == 2){
            correct = true;
        }
    });
    expect(correct).toBe(true);

});
test('Retrive valid reviews with input required ', () => {
    let results = reviews_logic.reviews_get_all(2,2);
    expect(Array.isArray(results)).toBe(true);
    
    expect(results.length).toBe(1);

    let correct = true;
    results.forEach(element => {
        if(!(element.exam == 2 && element.user == 2)){
            correct = false;
        }
    });
    expect(correct).toBe(true);

});
test('Create valid review ', () => {

    let review = {exam: 1, user: 2, task: 1, response: 'response'};
    let added = reviews_logic.reviews_create(review);

    expect(added).not.toBeUndefined();
    expect(added).not.toBeNull();
    expect(review.exam).toBe(1);
    expect(review.user).toBe(2);
    expect(review.task).toBe(1);
    expect(review.response).toBe('response');
    expect(added.id).toBe(db.reviews.length - 1);

});
test('Retrive valid review by id ', () => {
    let result = reviews_logic.review_get_by_id(0);
    expect(result.id).toBe(0);
    expect(result.exam).toBe(2);
    expect(result.user).toBe(2);
    expect(result.task).toBe(2);
});
//invalid eq. classes 
test('Retrive invalid reviews ', () => {
    expect(() => {reviews_logic.reviews_get_all(null, null)}).toThrow();

    expect(() => {reviews_logic.reviews_get_all("string", "string", "string")}).toThrow();

});

test('Create invalid review ', () => {
    expect(() => {reviews_logic.reviews_create(null)}).toThrow();

    let review = {exam: "string", user: "string", task: "string", response: "response"}
    expect(() => {reviews_logic.reviews_create(review)}).toThrow();

    review = {exam: 0, user: null, task: 0, response: 'response'}
    expect(() => {reviews_logic.reviews_create(review)}).toThrow();

    review = {exam: null, user: 0, task: 0, response: 'response'}
    expect(() => {reviews_logic.reviews_create(review)}).toThrow();

    review = {exam: 0, user: 0, task: null, response: 'response'}
    expect(() => {reviews_logic.reviews_create(review)}).toThrow();
    
    review = {exam: 0, user: 0, task: 0, response: null}
    expect(() => {reviews_logic.reviews_create(review)}).toThrow();

});
test('Retrive invalid review by id ', () => {
    expect(() => {reviews_logic.review_get_by_id(null)}).toThrow();

    expect(() => {reviews_logic.review_get_by_id("ciao")}).toThrow();

    expect(() => {reviews_logic.review_get_by_id(-1)}).toThrow(); 

});

test('Retrive invalid review by id with wrong reference', () => {
    expect(() => {reviews_logic.review_get_by_id(10)}).toThrow(); 
});

