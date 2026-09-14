import express from 'express';
import fs from 'fs';

const app=express();
app.get('/',(req,res)=>{
    fs.readFile('./pages/home.html','utf-8',(err,data)=>{
        if(err){
            res.status(500).send('Error occurred while reading the file');
        } else {
            res.send(data);
        }
    });
});