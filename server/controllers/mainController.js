module.exports = {
    createPost: (req, res) => {
        const {id, postImage} = req.body,
              db = req.app.get('db');
        
        db.post.create_post(id, postImage)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
    },
    getUserPosts: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.post.get_user_posts(id)
        .then(posts => res.status(200).send(posts))
        .catch(err => res.status(500).send(err));
    }
}