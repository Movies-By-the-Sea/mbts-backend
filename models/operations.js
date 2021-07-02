const { db, admin } = require("../firebase");
const auth          = require("../Auth/authorize");
const utils         = require("./utils");





//=====================================================================================
//=====================================================================================

async function updateIGStatus(req, res) {
  const ref = db.collection(String(req.body.table)).doc(req.body.id);
  const doc = await ref.get();
  if (!doc.exists) {
    return utils.formatResponse(req, res, 404, {message:'No such review with given ID found'});
  } else {
    await ref.update({
      "instagram": req.body.instagram,
    });
    info = {
      remark     : 'Review IG status updated successfully',
      requestType: 'PATCH',
      URL        : '/reviews' + '/updateIG'
    }
    return utils.formatResponse(req, res, 200, info);
  }
}

//=====================================================================================
//=====================================================================================





//=====================================================================================
//=====================================================================================

async function updateReview(req, res) {
  const ref = db.collection(req.body.table).doc(req.body.id);
  const doc = await ref.get();
  if (!doc.exists) {
    return utils.formatResponse(req, res, 404, {message:'No such review with given ID found'});
  } else {
    const bool = await auth.sharedAuthorize(req.body.uid, doc.data().author_uid, 3);
    if(bool) {
      await ref.update(req.body.update_data);
      info = {
        remark     : 'Review updated successfully',
        requestType: 'PUT',
        URL        : '/reviews' + '/update'
      }
      return utils.formatResponse(req, res, 200, info);
    } else {
      return utils.formatResponse(req, res, 400, {message:'Do not have permission to update another user posts'});
    }
  }
}

//=====================================================================================
//=====================================================================================





//=====================================================================================
//=====================================================================================

async function uploadReview(req, res) {
    const data = {
        name       : req.body.name,
        director   : req.body.director,
        genre      : req.body.genre,
        instagram  : req.body.instagram,
        poster_name: req.body.poster_name,
        poster_link: req.body.poster_link,
        timestamp  : req.body.timestamp,
        author     : req.body.author,
        author_uid : req.body.uid
    };
    const table = req.body.table;
    if (table == "movie-reviews") {
        data.review     = req.body.review;
        data.year       = req.body.year;
        data.actor      = req.body.actor;
        data.netflix    = req.body.netflix;
        data.amazon     = req.body.amazon;
        data.foreign    = req.body.foreign;
        data.must_watch = req.body.must_watch;
        data.acting     = req.body.acting;
        data.story      = req.body.story;
        data.execution  = req.body.execution;
        data.profundity = req.body.profundity;
        data.overall    = req.body.overall;
        data.trailer    = req.body.trailer;
    } else if (table == "short-film-reviews") {
        data.link        = req.body.link;
        data.description = req.body.description;
        data.duration    = req.body.duration;
    }
    const doc = await db.collection(req.body.table).add(data);
    info = {
      remark     : 'Review uploaded successfully',
      requestType: 'POST',
      URL        : '/reviews' + '/upload',
      response   : doc.id
    }
    return utils.formatResponse(req, res, 200, info);   
}

//=====================================================================================
//=====================================================================================





//=====================================================================================
//=====================================================================================

async function deleteReview(req, res) {
  const bool = await auth.sharedAuthorize(req.body.uid, doc.data().author_uid, 3);
  if(bool) {
    await db.collection(req.body.table).doc(req.body.id).delete();
    info = {
      remark     : 'Review deleted successfully',
      requestType: 'DELETE',
      URL        : '/reviews' + '/delete'
    }
    return utils.formatResponse(req, res, 200, info);
  } else {
    return utils.formatResponse(req, res, 400, {message:'Do not have permission to update another user posts'});
  }
}

//=====================================================================================
//=====================================================================================





module.exports = {
    updateIGStatus: updateIGStatus,
    updateReview  : updateReview,
    uploadReview  : uploadReview,
    deleteReview  : deleteReview
}