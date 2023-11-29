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
function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return 'th'; // thanks to exception rules
  switch (day % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
  }
}

function formatDate(timestamp) {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const date = new Date(timestamp);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = monthsOfYear[date.getMonth()];
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();
  const ordinalSuffix = getOrdinalSuffix(dayOfMonth);

  return `${dayOfWeek}, ${month} ${dayOfMonth}${ordinalSuffix}, ${year}`;
}

chrome.webRequest.onBeforeRequest.addListener(
  async function (details) {
    // if the request is for marking student attendance
    if (
      details.requestBody &&
      details.requestBody.raw &&
      details.initiator === "https://rollcall.instructure.com" &&
      details.url.includes("https://rollcall.instructure.com/statuses")
    ) {
      // Convert the raw request body to a string
      var requestBody = String.fromCharCode.apply(
        null,
        new Uint8Array(details.requestBody.raw[0].bytes)
      );
      let { status } = JSON.parse(requestBody);
      const { class_date: date, attendance,student } = status;

      console.log(details);
      console.log("Request Body: ", status);

      let data = []
      chrome.storage.sync.get([student.name], (res) => {
        // console.log(res);
        if(res[student.name]){
          data = res[student.name]
        }
        let timeStamp = new Date(date).getTime()+25200000
        let formatedDate = formatDate(timeStamp)
        let obj = {
          status: attendance,
          timeStamp ,
          date,
          name:student.name,
          formatedDate
      };
      let filteredData = data.filter((item)=>item.date !== obj.date)
      filteredData.push(obj)
      console.log('final',filteredData)
      chrome.storage.sync.set({
        [student.name]: filteredData,
      });


      });
 
    }

    return { cancel: false };
  },
  { urls: ["<all_urls>"] }, // Intercept all URLs
  ["requestBody"] // Include the request body in the listener
);
