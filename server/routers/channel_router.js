const express = require('express');
const router = express.Router();
const { getChannels } = require('../database/channel_data_resources.js');



router.get('/',(req,res)=>{
	getChannels().then((data)=>{
		res.json(data);
	})
});

router.post('/new',(req,res)=>{

});

module.exports = router;