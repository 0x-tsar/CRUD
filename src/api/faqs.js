const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');

// const db = monk('localhost/faqs');
const db = monk('127.0.0.1:27017');
const faqs = db.get('faqs');

// console.log('ok');
// (async()=>{
//     const value = await db;
//     console.log(value);
//     console.log('qwe');
// })()


// Monk is like mongoose and joi/happi is like a check schema for the db
// db or mongodb is not install that why monk is not connecting to localhost/faqs


const schema = Joi.object({
    question: Joi.string().trim().required(),
    anwser: Joi.string().trim().required(),
    video_url: Joi.string().uri(),
});

const router = express.Router();

//READ ALL
router.get('/',  async (req, res, next) => {
    // res.json({
    //     message: 'Hello READ ONE',
    // });
    try {
        console.log(faqs);
        const items =  await faqs.find({});
        console.log(items);
        res.json(items);
    } catch (error) {
        next(error);
    }
});

//READ ONE
router.get('/:id', async (req, res, next) => {
   try {
    
    const { id } = req.params;
    const item = await faqs.find({ _id: id})
    if(!item) return next();
    return res.json(item);
    
   } catch (error) {
       next(error);
   }
});

//CREATE ONE
router.post('/', async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body);
        const inserted = await faqs.insert(value);
        console.log(inserted);
        res.json(inserted);
    } catch (error) {
        next(error);
    }
    
    // res.json({
    //     message: 'Hello create one',
    // });
});

//UPDATE ONE
router.put('/:id', (req, res, next) => {
    res.json({
        message: 'Hello update one',
    });
});

//DELETE ONE
router.delete('/:id', (req, res, next) => {
    res.json({
        message: 'Hello DELETE ONE',
    });
});


//SEND HTML
// router.get('/', (req, res, next) => {
//     // res.sendFile('./index.html');
//     // console.log(__dirname);
//     // res.sendFile(__dirname+'/index.html');

//     res.json({
//         message: 'HI THERE',
//     });
// });




module.exports = router;