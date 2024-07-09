const { Image } = require('../models');

module.exports = {
  popular: async () => {
     const images = await Image.find()
     .limit(9)
     .sort({ likes: -1 })
     .lean({ virtuals: true });
     return images;
  }
};