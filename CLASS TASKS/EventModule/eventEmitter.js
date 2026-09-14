const EventEmitter=require("events");
const event =new EventEmitter();
// event.on("greet",()=>{
//     console.log("event emitter");
// })
// event.emit("greet");
// event.emit("greet");
// event.emit("greet");

// class Button extends EventEmitter{
//     click(){
//         console.log("/n call button click event");
//         this.emit("click");
//     }

//     mouseover(){
//         console.log("/n call button mouseover event");
//         this.emit("mouseover");
//     }
// }

const promiseOne = new Promise((resolve,reject)=>{
    console.log("Promise done");
    resolve("Promise resolved");
});
promiseOne.then((result)=>{
    console.log(result);
}).catch((error)=>{
    console.log(error);
});

setTimeout(()=>{
    if (!err){
        resolve("")
    }
})