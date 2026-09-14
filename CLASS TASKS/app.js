//function in js: block of code
//syntax:
//function fname(){
//}
//fname();
// function add(num1,num2){
// console.log(num1+num2);
// }
// add(2,1);

//arrow function
//syntax:
//fname = (arg1,arg2) =>{}
// const add=(a,b)=>{
//     return a+b;
// }
// console.log(add(1,2));

// //arrow function with arg keyword does not work
// function addN(){
//     console.log(arguments);
// }
// addN(1,2,3,4,5);


//22 JULY
//Synchronous and Asynchronous programming
//Synchronous programming: line by line execution of code
// console.log("Java Script");
// function hello(){
//     console.log("hello world");
// }
// hello();
// console.log("Synchronous");

//Asynchronous programming: execution of code is not in order

// const hi=()=>{
//     setTimeout(()=>{        //delays execution by a given time
//         console.log("hi");
//     },2000);
// }
// hi();
// console.log("asynchronous");


//callback function: function passed as an argument to another function
// function add(num1,num2,callback){
//     console.log(num1+num2);
//     callback();
// }
// let a=10;
// let b=20;

// add(a,b,sayhi);
// add(a,b,hello);

// function sayhi(){
//     console.log("this is a callback function");
// }
// function hello(){
//      console.log("hello world");
// }
//CREATE A FUNCTION DISPLAY(CALLBACK)THAT PRINTS WELCOME TO ABES THEN CALL CALLBACK FUNCTION THAT PRINTS LEARNING FSD IN CSE 21
// function display(callback){
//     console.log("Welcome to ABES");
//     callback();
// }
// display(learning);

// function learning(){
//     console.log("Learning FSD in CSE 21");
// }


//23 JULY

// promise: used to handle asynchronous operations in js
// syntax:

const promiseOne = new Promise((resolve,reject)=>{
    console.log("Promise done");
    resolve("Promise resolved");
});
promiseOne.then((result)=>{
    console.log(result);
}).catch((error)=>{
    console.log(error);
});

//create a promise that will display user name and password using resolve and if data is rejected it displays error


setTimeout(()=>{
    if (!err){
        resolve("")
    }
})



//async and await
//understanding the concept of fetch in console 
// async function test (){
//    console.log("this is asynchronous functionh and we want to fetc")
//    const response=await fetch("./student.json");
//    console.log(response.status);
//    const student=await response.json();
//    return student;
//    console.log("finally data fetched");
// }
// test().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })

