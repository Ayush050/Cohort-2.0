const fs=require('fs'); 

fs.readFile('b.txt','utf-8',(err,data)=>{
    let storedData=data;
   let arr=storedData.split(' ');
   let newdata='';
   arr.forEach((item)=>{ 
      if(item.length>0){
        newdata=newdata+item+' ';
      }
   }) 
   newdata+='tomorrow';
   fs.writeFile('b.txt',newdata,(err)=>{
        console.log("done");
   })
})

