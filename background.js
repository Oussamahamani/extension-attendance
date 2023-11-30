chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason === "install") {
    // Open the options page on installation
    chrome.runtime.openOptionsPage();
  }
});


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
