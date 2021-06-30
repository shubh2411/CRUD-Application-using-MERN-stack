const router = require("express").Router();
const Post = require("../models/Post");

// This is a post page and below url end points are accessible using below links :-
// localhost:port/posts/
// localhost:port/posts/add
// localhost:port/posts/upadate/id_no
// localhost:port/posts/delete/id_no

// View all posts - HTTP GET request
router.get("/", (req, res) => {
	Post.find().exec((err, posts) => {
		if (err) return res.status(400).json({ success: false, err });
		return res.status(200).json({ success: true, posts: posts });
	});
});

router.get("/detail/:id", (req, res) => {
	const id = req.params.id;

	Post.findById(id, function (err, posts) {
		if (err) return res.status(400).json({ success: false, error: err });
		return res.status(200).json({ success: true, posts });
	});
});

// Add new posts
router.post("/add", (req, res) => {
	const post = new Post(req.body);
	post.save((err) => {
		if (err) return res.status(400).json({ success: false, err });
		return res.status(200).json({ success: true });
	});
});

// Update existing posts
router.put("/update/:id", (req, res) => {
	Post.findByIdAndUpdate(
		req.params.id,

		{
			$set: req.body,
		},

		(err, post) => {
			if (err) return res.status(400).json({ success: true, err });
			return res.status(200).json({ success: true });
		}
	);
});

// Delete the posts
router.delete("/delete/:id", (req, res) => {
	Post.findByIdAndRemove(req.params.id).exec((err, deleteItem) => {
		if (err) return res.status(400).send(err);
		return res.json(deleteItem);
	});
});

module.exports = router;

// Mongoose Function used :
// find()
// save()
// findByIdAndUpdate()
// findByIdAndRemove()
