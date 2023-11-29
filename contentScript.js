//runs on specfic page

window.addEventListener("load", myMain, false);


function openNewTab(url) {
    chrome.runtime.sendMessage({ action: 'performDOMOperations' });
    console.log("hellor world", "running");
    // chrome.tabs.create({ url: url, active: false })
    //     console.log("hellor world", "created");
  }
  
  // Function to perform DOM operations
  function performDOMOperations(tabId) {
    // Use chrome.tabs.executeScript to run scripts in the context of the new tab
    chrome.tabs.executeScript(tabId, { code: 'console.log("DOM operations in the new tab");' });
  }


async function myMain(evt) {
 openNewTab('https://perscholas.instructure.com/courses/1671/users');
  try {
    // let l = document.querySelector("#student-list li");
    // console.log("hellor world", l);
    // var newElement = document.createElement("a");
    // newElement.style.position = "absolute";
    // newElement.style.top = "0";
    // newElement.style.right = "0";
    // newElement.style.width = 50;
    // newElement.style.height = 20;
    // newElement.style.innerText = "copy";
    // newElement.style.zIndex = 10;
    // l.appendChild(newElement);
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
