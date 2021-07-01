const utils = require("./utils");





//=====================================================================================
//=====================================================================================

async function getAllReviews(req, res) {
  await utils.maskDataByAuth(req).then((result) => {
    info = {
      remark     : "Reviews ordered by timestamp",
      size       : result.data.length,
      auth       : result.type,
      URL        : '/reviews',
      response   : result.data
    };
    return utils.formatResponse(req, res, 200, info); 
  })
}

//=====================================================================================
//=====================================================================================





//=====================================================================================
//=====================================================================================

async function getReviewByID(req, res) {
  await utils.maskDataByAuth(req, getUnique=true).then((result) => {
    info = {
      auth       : result.type,
      URL        : '/reviews' + '/get',
      response   : result.data
    }
    return utils.formatResponse(req, res, 200, info);
  })
}

//=====================================================================================
//=====================================================================================





//=====================================================================================
//=====================================================================================

async function getGeneralInfo(req, res) {
  info = {
    URL        : '/reviews' + '/general',
    response   : {
      Instagram : await utils.getQueryData(req.body.table, "instagram"),
      Netflix   : await utils.getQueryData(req.body.table, "netflix"),
      Prime     : await utils.getQueryData(req.body.table, "prime"),
      Must_Watch: await utils.getQueryData(req.body.table, "must_watch"),
      Foreign   : await utils.getQueryData(req.body.table, "foreign"),
      Genre     : {
        Lighthearted : await utils.getDataByGenre(req.body.table, "Lighthearted"),
        Comedy       : await utils.getDataByGenre(req.body.table, "Comedy"),
        Romance      : await utils.getDataByGenre(req.body.table, "Romance"),
        Horror       : await utils.getDataByGenre(req.body.table, "Horror"),
        Thriller     : await utils.getDataByGenre(req.body.table, "Thriller"),
        Animated     : await utils.getDataByGenre(req.body.table, "Animated"),
        Dark         : await utils.getDataByGenre(req.body.table, "Dark"),
        Meta         : await utils.getDataByGenre(req.body.table, "Meta"),
        War          : await utils.getDataByGenre(req.body.table, "War"),
        Crime        : await utils.getDataByGenre(req.body.table, "Crime"),
        Inspirational: await utils.getDataByGenre(req.body.table, "Inspirational"),
        Sci_Fi       : await utils.getDataByGenre(req.body.table, "Sci_Fi"),
        True_Story   : await utils.getDataByGenre(req.body.table, "True_Story"),
        Drama        : await utils.getDataByGenre(req.body.table, "Drama"),
        Fantasy      : await utils.getDataByGenre(req.body.table, "Fantasy"),
        Action       : await utils.getDataByGenre(req.body.table, "Action"),
        Indie        : await utils.getDataByGenre(req.body.table, "Indie"),
        Mystery      : await utils.getDataByGenre(req.body.table, "Mystery"),
      }
    }
  };
  return utils.formatResponse(req, res, 200, info);
}

//=====================================================================================
//=====================================================================================





module.exports = {
    getAllReviews : getAllReviews,
    getReviewByID : getReviewByID,
    getGeneralInfo: getGeneralInfo
}