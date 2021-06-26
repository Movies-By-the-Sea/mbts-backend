const instagram   = require('./Instagram/insights');
const accountInfo = require("./Instagram/account_general_info");
const utils       = require('./Instagram/utils');
require('dotenv').config





async function getLatestPost(req, res) {
    let params = utils.getCreds();
    await instagram
    .getUserMedia(params)
    .then((resp) => {
        return res
            .status(200)
            .json({
                message: 'query successful',
                request: {
                    type: "GET",
                    url : process.env.SERVER + "/instagram" + "/latest",
                    body: {
                        uid: req.body.uid
                    }
                },
                response: resp['data']['data'][0]
            });
    });
};





async function getBusinessInfo(req, res) {
    let params = utils.getCreds();
    await accountInfo(params)
    .then((resp) => {
        return res
            .status(200)
            .json({
                message: 'query successful',
                request: {
                    type: "GET",
                    url : process.env.SERVER + "/instagram" + "/",
                    body: {
                        uid: req.body.uid
                    }
                },
                response: resp['data']['business_discovery']
            });
    });
};





async function getAllPosts() {
    let   params = utils.getCreds();
    const result = [];
    await instagram
    .getUserMedia(params)
    .then((resp) => {
        posts = resp['data']['data'];
        posts.forEach((item, i) => {
            result.push({
                id       : item['id'],
                timestamp: item['timestamp']
            });
        });
    });
    return result
};





async function getPostInsights(req, res) {
    let posts    = await getAllPosts();
    let insights = [];
    for(const item of posts) {
        let params = utils.getCreds();
        params['latest_media_id'] = item['id'];
        await instagram
        .getMediaInsights(params)
        .then((resp) => {
            insights.push({
                id       : item['id'],
                timestamp: item['timestamp'],
                insights : {
                    engagement: {
                        period     : resp['data']['data'][0]['period'],
                        description: resp['data']['data'][0]['description'],
                        values     : resp['data']['data'][0]['values']
                    },
                    impressions: {
                        period     : resp['data']['data'][1]['period'],
                        description: resp['data']['data'][1]['description'],
                        values     : resp['data']['data'][1]['values']
                    },
                    reach: {
                        period     : resp['data']['data'][2]['period'],
                        description: resp['data']['data'][0]['description'],
                        values     : resp['data']['data'][2]['values']
                    },
                    saved: {
                        period     : resp['data']['data'][3]['period'],
                        description: resp['data']['data'][3]['description'],
                        values     : resp['data']['data'][3]['values']
                    }
                }
            });
        });
    };
    return res
        .status(200)
        .json({
            message: "query successful",
            request: {
                type: "GET",
                url : process.env.SERVER + "/instagram" + "/insights",
                body: {
                    uid: req.body.uid
                }
            },
            response : {
                size    : insights.length,
                insights: insights
            }
        });
};





async function getDailyUserInsights(req, res) {
    let params = utils.getCreds();
    await instagram
    .getUserInsights(params)
    .then((resp) => {
        return res
            .status(200)
            .json({
                message: "query successful",
                request: {
                    type: "GET",
                    url : process.env.SERVER + "/instagram" + "/users",
                    body: {
                        uid: req.body.uid
                    }
                },
                response: resp['data']['data']
            })
    })
}





module.exports = {
    getLatestPost       : getLatestPost,
    getBusinessInfo     : getBusinessInfo,
    getPostInsights     : getPostInsights,
    getDailyUserInsights: getDailyUserInsights
}