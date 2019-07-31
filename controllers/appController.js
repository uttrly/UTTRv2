require("dotenv").config();
const db = require("../models");
const axios = require("axios");
const SparkPost = require('sparkpost');
const client = new SparkPost("2b862987dfc382161bbc77bf1bf8d6773db93dba");
const apiai = require('apiai')(APIAI_TOKEN);

const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;


// Defining methods for the appController
module.exports = {
    dashboard: (req, res) => {
    
        // return(console.log(req.query))

        addRefToUserGoals(req,res)
        let reqID = req.query.id
        switch (req.query.status) {
            case "referee":
                runSearch(reqID, 0, "Referee")
                break;
            case "complete":
                runSearch(reqID, 1, "Owner")
                break;
            default:
                runSearch(reqID, 0, "Owner")
        }
    
        function runSearch(id, status, relationship) {
            db.User.findAll({
                attributes: [],
                where: {
                    Id: id
                },
                include: [{
                    model: db.Goal,
                    where: {
                        status: status
                    },
                    through: {
                        where: {
                            UserId: id,
                            relationship: relationship
                        }
    
                    }
                }],
                raw: true
            }).then(function (data) {
    
                var dataArray = [];
                var owner = 0;
                if (relationship === "Owner") {
                    owner = 1
                }
                for (var i = 0; i < data.length; i++) {
    
                    var duration = data[i]["Goals.duration"]
                    var startDate = new Date(data[i]["Goals.startDate"]);
    
                    //var diffWeek = parseInt((date2 - date1) / (24 * 3600 * 1000 * 7)); //gives day difference 
    
                    var diffWeek = calculateWeek(startDate);
    
                    var object = {
                        id: data[i]["Goals.id"],
                        name: data[i]["Goals.goalName"],
                        description: data[i]["Goals.description"],
                        createDate: data[i]["Goals.createdAt"].toISOString().replace(/T/, " ").replace(/\..+/, '').replace(/\d\d:\d\d:\d\d/, ''),
                        duration: diffWeek + "/" + duration
                    }
                    dataArray.push(object)
                }
    
                var hbsObject = {
                    goals: dataArray,
                    // userName: req.user.firstName + " " + req.user.lastName,
                    owner: owner
                };
    
                db.User.findAll({
                    attributes: {
                        include: [[db.sequelize.fn('sum', db.sequelize.col('points')), "points"]]
                    },
                    where: {
                        Id: id
                    },
                    include: [{
                        model: db.Goal,
                        through: {
                            where: { UserId: id, relationship: "Owner" }
                        }
                    }], raw: true
                }).then(function (results) {
                    console.log(results[0].points)
                    hbsObject.points = results[0].points;
                    console.log(hbsObject)
                    res.json(hbsObject)
                })
    
            });
        }
    },


    challenge: (req, res) => {
        var goalId = req.query.goalId

        console.log(res.query)
        console.log("/challenge/:id gets rendered")
        db.Goal.findAll({
            where: {
                id: goalId
            },
            include: [{ model: db.Report }],
    
            raw: true
        }).then((data) => {
            console.log(data);
            var refereeEmail = data[0].refereeEmail
            var oneTime = data[0].oneTime
            var report = []
    
            var userId = req.query.id
    
            var duration = parseInt(data[0]["duration"])
            var startDate = new Date(data[0]["startDate"]);
            var todayDate = new Date(new Date());
    
            var diffWeek = calculateWeek(startDate) //gives weeks difference

            if (diffWeek > duration) {
                diffWeek = duration + 1
            }
            //var diffWeek = 4
            var progressperc;
                progressperc = diffWeek / duration * 100

            console.log(diffWeek)
            console.log(duration)
    
            for (var i = 0; i < data.length; i++) {
    
                if (data[i]["Reports.id"] !== null) {
                    var reportObj = {
                        week: data[i]["Reports.week"],
                        successfull: data[i]["Reports.sucess"]
                    }
                    report.push(reportObj)
                }
    
            }
    
    
            var hbsObject = {
                goal:
                {
                    id: data[0].id,
                    goalName: data[0].goalName,
                    description: data[0].description,
                    startDate: startDate.toISOString().replace(/T/, " ").replace(/\..+/, '').replace(/\d\d:\d\d:\d\d/, ''),
                    refereeEmail: data[0].refereeEmail
                },
                report,
                // comment,
                // userName: req.user.firstName + " " + req.user.lastName,
                progressperc: progressperc
            };
    
            console.log(hbsObject)
            db.Report.findAll({
                attributes:
                    ['week'],
    
                where: {
                    GoalId: goalId
                }, raw: true,
                order: ['week']
            }).then(function (data) {
                var done = 1;
                for (var i = 1; i <= diffWeek; i++) {
                    pos = data.map(function (e) { return e.week; }).indexOf(i);
    
                    if (pos == "-1" && i < diffWeek) {
    
                        var report = {
                            sucess: 0,
                            authorType: 1,
                            userId: userId,
                            week: i,
                            GoalId: goalId
                        }
                        db.Report.create(report).then(function () {
                            res.redirect("/challenge/" + goalId)
                        })
                    } else if ((pos == "-1" && i == diffWeek && refereeEmail == req.query.email) || oneTime == 1) {
                        done = 0
                    }
    
                }
    
                if (oneTime == "1" && startDate <= todayDate && refereeEmail == req.query.email && (data == null || data == "")) {
                    console.log("testing00000000000000000")
                    done = 0
                }
    
                hbsObject.done = done;
    
                // comment ===================================================================
    
                db.Comment.findAll({
                    where: {
                        GoalId: goalId
                    }
                }).then(function (data) {
                    var comment = []
                    console.log("====================================")
                    console.log(data)
                    for (var i = 0; i < data.length; i++) {
                        var commentOBJ = {
                            text: data[i].text,
                            username: data[i].username,
                            createdAt: data[i].createdAt,
                            // GoalId: goalId
                        }
                        comment.push(commentOBJ);
                    }
                    hbsObject.comment = comment;
                    console.log("====================================")
                    // console.log(comment)
                    console.log(hbsObject)
                    res.json(hbsObject);
    
                })
            })
        })
    },

    // ========================== comment =====================
    addComment: (req, res) => {
        // return(console.log(req.body))
        console.log(req.body)
        var GoalId = req.body.goalID;

        console.log(GoalId)
        var username = req.body.email
        var body = {
            text: req.body.comment,
            username: username,
            GoalId: GoalId
        }

        db.Goal.findOne({
            where: {
                id: GoalId
            }
        }).then(function (data) {
            console.log(data);
            if (data !== "" || data !== null) {
                body.username = username
                db.Comment.create(body).then(function (commentdb) {
                    console.log("okay")
                    // res.send({
                    //     redirect: "/challenge/" + GoalId
                    // })
                    //res.json(commentdb);

                })
            }

        })
    },
// end =========================================================


report: (req, res) => {
    // return(console.log(req.body))
    var userId = req.body.id
    var userEmail = req.body.email
    var success = req.body.success
    var goalId = req.body.goalID
    var authorType = 1

    db.Goal.findOne({
        where: {
            refereeEmail: userEmail,
            id: goalId
        }
    }).then(function (data) {
        console.log(data)

        var week = calculateWeek(data.startDate)
        var duration = data.duration
        var points = data.points
        var oneTime = data.oneTime

        if (oneTime == 1) {
            week = 1
        }

        var report = {
            sucess: success,
            authorType: authorType,
            userId: userId,
            week: week,
            GoalId: goalId
        }



        if (data !== "" || data !== null) {
            if (success == "1") {
                db.Goal.update({
                    points: points + 7,
                }, {
                        where: {
                            id: goalId
                        },
                        returning: true,
                        plain: true
                    })
                    .then(function (result) {
                        console.log("updated")
                        console.log(result);

                    });
            }



            db.Report.create(report).then(function () {

                if (week == duration || oneTime == 1) {
                    db.Report.findAll({
                        attributes:
                            ['sucess'],

                        where: {
                            GoalId: goalId
                        }, raw: true
                    }).then(function (data) {
                        console.log(data)
                        if (oneTime == 1) {
                            duration = 1
                        }
                        var totalSuccess = 0;
                        var overallPer = 0;
                        for (var i = 0; i < data.length; i++) {
                            currentSuccess = data[i].sucess
                            if (currentSuccess == 1) {
                                totalSuccess += currentSuccess
                            }
                        }

                        overallPer = parseInt(totalSuccess) / parseInt(duration) * 100

                        console.log("overall" + overallPer)

                        if (overallPer < 80) {
                            console.log("Sending out email")
                            sendEmail.emailQueryUponFail(goalId)
                        }

                        db.Goal.update({
                            status: 1,
                        }, {
                                where: {
                                    id: goalId
                                },
                                returning: true,
                                plain: true
                            })
                    });

                }
                res.send({
                    redirect: "/challenge/" + goalId
                })
            })
        }
    });
}


};









exports.newChallenge = function (req, res) {
    console.log("now you can save data to db ------------------- ");
    console.log(req);
    // db.Goal.create(req.body)


    // dialogflow--------------- --------------------------- 

    // var goal = req.body.comment;
    // var duration = "";
    // var startTime = "";

    // console.log("********"
    //     , req.body);

    // console.log(goal);

    // let apiaiReq = apiai.textRequest(goal, {
    //     sessionId: APIAI_SESSION_ID
    // });

    // // console.log(apiaiReq);

    // apiaiReq.on('response', (response) => {
    //     const aiText = response.result;

    //     console.log(aiText);

    //     console.log("Goal:" + aiText.parameters.goal);
    //     console.log("Duration: " + aiText.parameters.duration.amount + aiText.parameters.duration.unit);
    //     console.log("Start Date: " + aiText.parameters.startTime);

    //     duration = aiText.parameters.duration.amount + aiText.parameters.duration.unit;
    //     startTime = aiText.parameters.startTime;

    //     console.log(aiText.fulfillment);
    //     let json = response.result.parameters
    //     console.log("json" + json);

    //     db.Goal.create({
    //         goal: goal,
    //         correct: 0,
    //         duration: duration,
    //         startTime: startTime
    //     },
    //         function (err, inserted) {
    //             if (err) {
    //                 // Log the error if one is encountered during the query
    //                 console.log(err);
    //             } else {
    //                 // Otherwise, log the inserted data
    //                 // console.log(
    //                 //   "ID-------" + inserted);
    //                 let json = response.result.parameters
    //                 json.id = inserted._id
    //                 console.log(
    //                     "ID-------" + json.id);
    //                 res.json(response.result.parameters)
    //             }
    //         }
    //     ).then((goal) => {
    //         console.log(req);
    //         console.log(`goal added`)
    //         // var relationshipData = {
    //         //     GoalId: goal.dataValues.id,
    //         //     UserId: req.user.id,
    //         //     relationship: "Owner"
    //         // }
    //         // db.userGoals.create(relationshipData)
    //     }).then(() => {
    //         console.log("callback function  ------");
    //         res.send({

    //             redirect: "/dashboard"
    //         })
    //     })
    // });

    // apiaiReq.on('error', error => console.log(error));
    // apiaiReq.end();
}


const addRefToUserGoals = (req, res, next) => {
    console.log("adding ref to user")
    var userEmail = req.query.email

    db.Goal.findAll({
        where: {
            refereeEmail: userEmail
        }
    }).then(function (data) {
        console.log(data)
        data.forEach(element => {
            var userGoalData = {
                GoalId: element.dataValues.id,
                UserId: req.query.id,
                relationship: "Referee"
            }

            console.log(userGoalData)
            db.userGoals.findOrCreate({
                where: userGoalData
            })
        });
        next();
    })
}

const calculateWeek = (startDate) => {
    var date1 = new Date(startDate);
    var date2 = new Date(new Date());
    var diffWeek = parseInt((date2 - date1) / (24 * 3600 * 1000 * 7)); //gives day difference 
    return diffWeek;
}

const emailQueryUponFail = (id) => {
    var goalId = id
    db.Goal.findOne({
        attributes: ['goalName', 'stake', 'refereeEmail'],
        where: { id: goalId },
    })
        .then((data) => {
            let goalName = data.dataValues.goalName
            let stakeURL = data.dataValues.stake
            let refEmail = data.dataValues.refereeEmail

            sendEmailOnFail(goalName, stakeURL, refEmail)
        })
}

const sendEmailOnFail = (goalName, stakeURL, refEmail) => {
    client.transmissions.send({
        options: {
            sandbox: true
        },
        content: {
            from: 'testing@sparkpostbox.com', // needs to be updated
            subject: 'Your friend has UTTRly failed at ' + goalName + '.', //Should query to get the goal owner's name but meh
            html: '<html><body><p>This is what was put on stake. Do what you will with it.</p><br><img src="' + stakeURL + '"></body></html>'
        },
        recipients: [
            { address: refEmail }
        ]
    })
        .then(data => {
            console.log('Woohoo! You just sent your first mailing!');
            console.log(data);
        })
        .catch(err => {
            console.log('Whoops! Something went wrong');
            console.log(err);
        });
}
