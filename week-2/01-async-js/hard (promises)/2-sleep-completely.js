/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
   const d1=new Date();
   while(true){
    const d2=new Date();
    if(d2.getTime()-d1.getTime()>milliseconds){
        break;
    }
   }
   return new Promise((resolve,reject)=>{
    resolve();
   })

}

module.exports = sleep;
