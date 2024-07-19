// const filePath = process.platform !== "linux" ? "./test.txt" : "dev/stdin";

// let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

// let n = input.shift();

let str = `I think Ruth's dog is cuter than your dog!.jpg`;

let tmp = str.slice(str.lastIndexOf(".") - str.length);

console.log(str.length);
console.log(str.lastIndexOf("."));
console.log(tmp);
