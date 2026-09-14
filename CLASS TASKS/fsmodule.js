const fs=require("fs")

//create a file

fs.writeFileSync("student.txt", "Name: Gauri \nRollno : 508");
console.log("File created successfully");

//read a file
let data=fs.readFileSync("student.txt","utf-8");
console.log(data);

//update a file
fs.appendFileSync("student.txt", "\nYear : 2");
console.log("File updated successfully");

fs.unlinkSync("student.txt");
console.log("File deleted successfully");