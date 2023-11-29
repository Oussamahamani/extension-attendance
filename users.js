console.log('document','started')
function formatTime() {
    const date = new Date();

    // Obtain hours, minutes, and seconds from the date
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
  
    // Pad with zeros if necessary to maintain double-digit formatting
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
  
    // Return the formatted time string
    return `${hours}:${minutes}:${seconds}`;
  }
  
console.log('document',formatTime());



 async function myMain(evt) {
  
      // Example usage:
      try {
        
          console.log('document',formatTime());
        
         let users= document.querySelectorAll('.rosterUser')
         console.log('document',users)
         let counter = 0
         if(users.length===0){
            const interval = Array.from({ length: 200 }, () => null);
            for (let i of interval){
                users= document.querySelectorAll('.rosterUser')
                if(users.length>0){
                    break;
                }
                counter++
                await new Promise(resolve => setTimeout(resolve, 100));
                
            }
         }
              let students=[]
     users.forEach((user)=>{
        let column = user.children
        if(column[5].innerText==="Student"){
            students.push(column[0].innerText)
        }
     })
    
      console.log(students)
      } catch (error) {
        console.log('document',"🚀 ~ file: users.js:28 ~ myMain ~ error:", error)
        
      }


 }

 window.addEventListener("load", myMain, false);
