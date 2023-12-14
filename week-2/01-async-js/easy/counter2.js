let counter=0; 

const before=new Date(); 
while(true){
    const now=new Date();
    if(before.getTime()+(counter*1000)+1000===now.getTime()){
        counter++;
        console.log(counter);
    }
}