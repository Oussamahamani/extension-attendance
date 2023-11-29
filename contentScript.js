//runs on specfic page





async function myMain(evt) {
//  openNewTab('https://perscholas.instructure.com/courses/1671/users');

  try {

    // let section= window.router.sectionId
    // console.log('document start')
    // let counter = 0
    // if(!section){
    //    const interval = Array.from({ length: 200 }, () => null);
    //    for (let i of interval){
    //     section= window.router.sectionId
    //     console.log('document nothing yet',counter)
    //        if(section){
        
    //         console.log('document got it',section,' after ',counter)
    //            break;
    //        }
    //        counter++
    //        await new Promise(resolve => setTimeout(resolve, 100));
           
    //    }
    // }
    // let l = document.querySelector("#tool_content");
    // l.style.position="relative"
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
    users[0].appendChild(email);
    users[0].appendChild(late);
        // Select the iframe element by its ID
    //     var iframe = document.getElementById('tool_content');
    //     console.log("hellor world","frame",iframe);
    //     var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    //     // Wait until the iframe has loaded its content
    //   let l=  iframeDoc.querySelector("#student-list li")
            
    //            // let l = document.querySelector("#student-list li");
    // console.log("hellor world", l);
     

 
  } catch (err) {
    console.log("hellor world", err);
  }
}


// window.addEventListener("load", myMain, false);
