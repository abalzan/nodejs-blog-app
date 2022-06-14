const {validationResult} = require('express-validator');

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{
            _id: 'abc123',
            title: 'First post',
            content: 'This is the first post',
            imageUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            creator: {
                name: 'John Doe',
            },
            createdAt: new Date()
        }]
    });
}

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Invalid request data',
            errors: errors.array()
        });
    }

    const title = req.body.title;
    const content = req.body.content;

    res.status(201).json({
        message: 'Post created successfully',
        post: {
            _id: new Date().toISOString(),
            title: title,
            content: content,
            creator: {
                name: 'John Doe',
                crateAt: new Date()
            }
        }
    });
}