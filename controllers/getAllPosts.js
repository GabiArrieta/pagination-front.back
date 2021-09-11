const Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {
    try {
        let query = Post.find();

        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 50; //limit of documents on a page
        const skip = (page - 1) * pageSize; 
        const total = await Post.countDocuments();

        const pages = Math.ceil(total / pageSize); //500 / 50

        if(page > pages){
            return res.status(404).json({
                status: 'fail',
                msg: 'no page found'
            })
        }

        query = query.skip(skip).limit(pageSize);

        const result = await query;

        res.status(200).json({
            status: 'success',
            count: result.length,
            pages,
            page,
            data: result
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        })
    }
}