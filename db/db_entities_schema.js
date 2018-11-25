module.exports = {
    users:  [],
    user_obj: {
        id: null,
        name: null,
        surname: null,
        email: null,
        password: null
    },
    get_user_obj: () => {
        return user_obj;
    },

    tasks: [],
    task_obj: {
        id: null,
        title: null,
        description: null,
        topics: [],
        type: null,
        answers: []
    },
    get_task_obj: () => {
        return task_obj;
    },
    
    exams: [],
    exam_obj: {
        id: null,
        title: null,
        start_date: null,
        deadline_delivery: null,
        deadline_review: null,
        type: null,
        collaborators: [],
        class: null,
        compulsory_tasks: [],
        task_pool: [],
        user_id: null,
        drawn_tasks: []
    },
    get_exam_obj: () => {
        return exam_obj;
    },

    submissions: [],
    submission_obj: {
        id: null,
        exam: null,
        user: null,
        task: null,
        review: null,
        response: null
    },
    get_submission_obj: () => {
        return submission_obj;
    },

    reviews: [],
    review_obj: {
        id: null,
        exam: null,
        user: null,
        task: null,
        submission: null,
        response: null
    },
    get_review_obj: () => {
        return review_obj;
    },

    topics: [],
    topic_obj: {
        id: null,
        title: null
    },
    get_topic_obj: () => {
        return topic_obj;
    },

    classes: [],
    class_obj: {
        id: null,
        name: null,
        students: []
    },
    get_class_obj: () => {
        return class_obj;
    },

    tokens: [],

    // -------------------------------------------------------------------------- //
    //////////////////////// Esempi di implementazione /////////////////////////////
    // -------------------------------------------------------------------------- //

    /*
    const _ = require('lodash');

    insert_user: (user_obj) => {
        schema.users.push(user_obj);
        user_obj.id = schema.users.length - 1;
        return user_obj;
    },

    get_user: (user_id) => {
        return _.find(schema.users, (o) => { return user_id == o.id; });
    },

    get_user_by_email: (email) => {
        return _.find(schema.users, (o) => { return email == o.email; });
    },

    edit_user: (user_id, user_obj) => {
        user_obj.id = user_id;
        schema.users[user_id] = user_obj;
    }
    */
}