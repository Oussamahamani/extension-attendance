

window.addEventListener("load", async()=>{
    console.log(document.querySelector('#student-list').children)



    let users= document.querySelector('#student-list').children
    let counter = 0
    if(users.length<5){
       const interval = Array.from({ length: 200 }, () => null);
       for (let i of interval){
        users= document.querySelector('#student-list').children
           if(users.length>5){
            console.log('finished',users)
               break;
           }
           counter++
           await new Promise(resolve => setTimeout(resolve, 100));     
       }
    }
    console.log('last',users)
    for(let user of users){
        const email = document.createElement("button");
        email.style.position = "absolute";
        email.style.top = "0px";
        email.style.right = "55px";
        email.style.height = "25px";
        email.style.width = "100px";
        email.innerText = "absent email";
        email.style.zIndex = 100;
        const late = document.createElement("button");
        late.style.position = "absolute";
        late.style.top = "25px";
        late.style.right = "55px";
        late.style.height = "25px";
        late.style.width = "100px";
        late.innerText = "late email";
        late.style.zIndex = 100;
        user.appendChild(email);
        user.appendChild(late);
    }






}, false);
