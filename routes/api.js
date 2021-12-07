// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://mongouser:prisma2021@bingomongo:27017/bingoMongo?authSource=admin';

// Connect to mongodb
mongoose.connect(dbHost);

var connection = mongoose.connection;


/* GET api listing. */
router.get('/', (req, res) => {
		res.send('api works');
});

/* GET all bingoItems. */
router.get('/bingoItems', (req, res) => {
	/*bingoItems.find({}, (err, bingoItems) => {
		if (err) res.status(500).send(error)

		res.status(200).json(bingoItems);
	});*/
    connection.db.collection("bingoItems", function(err, collection){
        collection.find({}).toArray(function(err, data){
            if (err) res.status(500).send(error)
            res.status(200).json(data); //console.log(data); // it will print your collection data
        })
    });
});


ObjectID = require('mongodb').ObjectID;
router.get("/bingoItems/:id", (req, res) => {
	//const post = await Post.findOne({ _id: req.params.id })
	//res.send(post) req.para.id  req.params.id
    objId = new ObjectID(req.params.id); 
    connection.db.collection("bingoItems", function(err, collection){
        collection.findOne({ "_id": objId }, function(err, data){
            if (err) res.status(500).send(error) 
            res.status(200).json(data); 
        });
    });
}); 

router.put('/updatebingoItem/:id', express.json({type: '*/*'}), function(req, res, next) {
    objId = new ObjectID(req.params.id); 
    var updateVal = req.body;
    /* {
        "_id":"6138edffda4902008f9c694f",
        "name":"Coding / IaC","items":
        [{"item":"Github (Code Repo)",
            "description":"teststestestestewtsete.",
            "iconUrl":"assets/svg/github.svg",
            "prsimafit":"TEST TEST TEST.","links":"https://paloaltonetworks.com"},
            {"item":"Gitlab (Code Repo)","description":"TEST TEST TEST.","iconUrl":"assets/svg/gitlab.svg","prsimafit":"TEST TEST TEST.","links":"https://paloaltonetworks.com"},
            {"item":"Bitbucket (Code Repo)","description":"TEST TEST TEST.","iconUrl":"assets/svg/bitbucket.svg","prsimafit":"TEST TEST TEST.","links":"https://paloaltonetworks.com"},
            {"item":"IDE","description":"TEST TEST TEST.","iconUrl":"assets/svg/ide.svg","prsimafit":"TEST TEST TEST.","links":"https://paloaltonetworks.com"},
            {"item":"Azure DevOps (Code Repo)","description":"TEST TEST TEST.","iconUrl":"assets/svg/azure-devops.svg","prsimafit":"TEST TEST TEST.","links":"https://paloaltonetworks.com"},
            {"item":"Terraform","description":"TEST TEST TEST.","iconUrl":"assets/svg/terraform.svg","prsimafit":"TEST TEST TEST.","links":"https://paloaltonetworks.com"},
            {"item":"Pulumi","description":"TEST TEST TEST.","iconUrl":"assets/svg/pulumi.svg","prsimafit":"TEST TEST TEST.","links":"https://paloaltonetworks.com"},
            {"item":"Ansible","description":"TEST TEST TEST.","iconUrl":"assets/svg/ansible.svg","prsimafit":"TEST TEST TEST.","links":"https://paloaltonetworks.com"},
            {"item":"Cloudformation","description":"TEST TEST TEST.","iconUrl":"assets/svg/cloudformation.svg","prsimafit":"TEST TEST TEST.","links":"https://paloaltonetworks.com"}
        ] };
    */
    connection.db.collection("bingoItems", function(err, collection){
        collection.updateOne({ "_id": objId }, updateVal, function(err, post){
            console.log("1 document updated");
            if (err) return next(err);
            res.json(post)
        });
    });
});


module.exports = router;