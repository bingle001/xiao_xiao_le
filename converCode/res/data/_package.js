var FileCount = 297;
var obj = {};

var fs = require("fs");
for (let i = 1; i <= FileCount; i++){
    let fileName = i + '.txt';
    let data = fs.readFileSync(fileName);
    obj[i] = data.toString();
    console.log("读取文件：" + fileName);
}

let fileName = "classic.txt";
let data = fs.readFileSync(fileName);
obj["classic"] = data.toString();
console.log("读取文件：" + fileName);

fs.writeFile('_data.json', JSON.stringify(obj),  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据打包成功！");
});