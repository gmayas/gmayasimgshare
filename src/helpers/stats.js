const { Comment, Image } = require('../models');

const imgCounter = async () => {
    try {
        return await Image.countDocuments()
    }
    catch (e) {
        console.error(e);
        return 0;
    };
};

const cmntsCounter = async () => {
    try {
        return await Comment.countDocuments()
    }
    catch (e) {
        console.error(e);
        return 0;
    };
};

const imgTotalViewCounter = async () => {
    try {
        const result = await Image.aggregate([
            {
                $group: {
                    _id: "1",
                    viewsTotal: { $sum: "$views" },
                },
            },
        ]);
        let viewsTotal = 0;
        if (result.length > 0) {
            viewsTotal += result[0].viewsTotal;
        }
        return viewsTotal;
    }
    catch (e) {
        console.error(e);
        return 0;
    };
};

const likesTotalViewCounter = async () => {
    try {
        const result = await Image.aggregate([
            {
              $group: {
                _id: "1",
                likesTotal: { $sum: "$likes" },
              },
            },
          ]);
          let likesTotal = 0;
          if (result.length > 0) {
            likesTotal += result[0].likesTotal;
          }
          return likesTotal;
    }
    catch (e) {
        console.error(e);
        return 0;
    };
};

module.exports = async () => {
    const results = await Promise.all([
        imgCounter(),
        cmntsCounter(),
        imgTotalViewCounter(),
        likesTotalViewCounter(),
      ]);
      return {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3],
      };
};