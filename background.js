// //runs when extension is installed or you can add some stuff that are general like adding option to right click menu or when seleceting text

// // console.log('hellor from background script')

// // chrome.tabs.executeScript(tabOfInterestId,{
// //     frameId: "tool_content",
// //     file: "./contentScript.js"
// // },function(results){
// //     console.log('yay')
// //     //Handle any results
// // });

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     if (request.action === 'performDOMOperations') {
//       // Trigger DOM operations
//       console.log('Background DOM operations');

//       chrome.tabs.create({ url: 'https://perscholas.instructure.com/courses/1671/users',active: false }, function(newTab) {
//     // Tab is created

//       })
//     }
//   });


// //   chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
// //     if (changeInfo.status == 'complete' && tab.url.includes('https://perscholas.instructure.com/courses/1671/external_tools/12')) {
// //         chrome.tabs.executeScript(tabId, {
// //             code: 'document.body.innerHTML;'
// //         }, function(results) {
// //             // Now you have access to the DOM of the page
// //             console.log(results[0]); // Outputs the innerHTML of the body element.
// //         });
// //     }
// // });


// chrome.runtime.onInstalled.addListener((details)=>{
//     chrome.contextMenus.create({
//         title:"copy email",
//         id:"emailMenu",
//         contexts:["all"]
//     })
// })

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      // Log the request URL
      if (details.requestBody && details.requestBody.raw &&details.initiator === "https://rollcall.instructure.com" && details.url.includes("https://rollcall.instructure.com/statuses")) {
          console.log(details)
        // Convert the raw request body to a string
        var requestBody = String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[0].bytes));
        let {status} = JSON.parse(requestBody) 

        // Log the request body
        console.log("Request Body: ",status);
      }
      if(details.url.includes('https://rollcall.instructure.com/sections/') && details.initiator === "https://perscholas.instructure.com" ){
          console.log("Request URL: " , details);

    //           chrome.tabs.create({ url: details.url,active: true }, function(newTab) {

    //   })
      }
      // Check if the request has a request body
   
  
      // Continue the request
      return { cancel: false };
    },
    { urls: ["<all_urls>"] }, // Intercept all URLs
    ["requestBody"] // Include the request body in the listener
  );