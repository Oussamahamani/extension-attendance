let currentName 

function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th'; // thanks to exception rules
    switch (day % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
  }
  
  function formatDateToFit(timestamp) {
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
  
  
function createModal(initialAbsences = [], initialLates = []) {
    // Create modal elements
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const closeButton = document.createElement('span');
    closeButton.classList.add('close');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', closeModal);

  
  
    // Create section for absences
    const absenceSection = createSection('Absences', 'absenceDate', 'absenceList', 'submitAbsence', initialAbsences);

    // Create section for lates
    const lateSection = createSection('Lates', 'lateDate', 'lateList', 'submitLate', initialLates);

    
    // Append elements to the modal
    modal.appendChild(closeButton);
    modal.appendChild(absenceSection);
    modal.appendChild(lateSection);

    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.addEventListener('click', closeModal);

    // Append modal and overlay to the body
    document.body.appendChild(modal);
    document.body.appendChild(overlay);

    // Display modal and overlay
    modal.style.display = 'flex';
    overlay.style.display = 'block';
    const title = document.createElement('div');
    title.classList.add('modal-title');
    title.textContent = currentName;
  
    // Append elements to the modal
    modal.appendChild(closeButton);
    modal.appendChild(title); // Add this line to append the title
    modal.appendChild(absenceSection);
    modal.appendChild(lateSection);
  }

  function createSection(title, inputId, listId, buttonId, initialData) {
    const section = document.createElement('div');
    section.classList.add('modal-section');

    const titleLabel = document.createElement('h3');
    titleLabel.textContent = title;

    const dateInput = document.createElement('input');
    dateInput.setAttribute('type', 'date');
    dateInput.setAttribute('id', inputId);

    const submitButton = document.createElement('button');
    submitButton.setAttribute('id', buttonId);
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', () => handleSubmit(inputId, listId));

    const dateList = document.createElement('div');
    dateList.setAttribute('id', listId);
    dateList.classList.add('date-list');

    section.appendChild(titleLabel);
    section.appendChild(dateInput);
    section.appendChild(submitButton);
    section.appendChild(dateList);

    // Populate initial data
    initialData.forEach(date => {
      const dateItem = createInitialDateItem(date, listId);
      dateList.appendChild(dateItem);
    });

    return section;
  }

  function createInitialDateItem(date, listId) {
    const dateItem = document.createElement('div');
    dateItem.classList.add('date-item');

    const dateText = document.createElement('span');
    dateText.textContent = formatDate(date);

    const deleteButton = document.createElement('span');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = '&times;';
    deleteButton.addEventListener('click', () => deleteDate(dateItem, listId, date));

    dateItem.appendChild(dateText);
    dateItem.appendChild(deleteButton);

    return dateItem;
  }

  function closeModal() {
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');

    // Remove modal and overlay from the body
    document.body.removeChild(modal);
    document.body.removeChild(overlay);
  }

  function handleSubmit(inputId, listId) {
    const dateInput = document.getElementById(inputId);
    const dateList = document.getElementById(listId);
    const dateValue = dateInput.value;

    let timeStamp = new Date(dateInput.value).getTime()+25200000
    let formatedDate = formatDateToFit(timeStamp)
    let status = "absent"
    if(inputId !== "absenceDate") status = "late"
    let obj ={
        name:currentName,
        date:dateInput.value,
        timeStamp,
        formatedDate,
        status
    }
    console.log(obj)
    if (dateValue) {
      const dateItem = createInitialDateItem(dateValue, listId);
      console.log(dateItem)
      dateList.appendChild(dateItem);

      dateInput.value = '';
    }
    let data = []
      chrome.storage.sync.get([currentName], (res) => {
        console.log(res);
        if(res[currentName]){
          data = res[currentName]
        }
      data.push(obj)
      chrome.storage.sync.set({
        [currentName]: data,
      });

      });
    
  }

  function deleteDate(dateItem, listId, date) {
    console.log(currentName)
    const dateList = document.getElementById(listId);
    dateList.removeChild(dateItem);


    
    let data = []
    chrome.storage.sync.get([currentName], (res) => {
      if(res[currentName]){
        data = res[currentName]
      }  
    let filteredData = data.filter((item)=>item.date !== date)
    chrome.storage.sync.set({
      [currentName]: filteredData,
    });


    });
    // You may want to handle additional logic when deleting the date

}

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }



  const loadButtons= async()=>{

    let nextDay = document.querySelector("#next-day") 

    nextDay.addEventListener('click',()=>setTimeout(()=> loadButtons(),500))
    let backDay = document.querySelector("#previous-day") 

    backDay.addEventListener('click',()=>setTimeout(()=> loadButtons(),500))

    console.log(document.querySelector("#student-list").children);

    let users = document.querySelector("#student-list").children;
    let counter = 0;
    if (users.length < 5) {
      const interval = Array.from({ length: 200 }, () => null);
      for (let i of interval) {
        users = document.querySelector("#student-list").children;
        if (users.length > 5) {
          console.log("finished", users);
          break;
        }
        counter++;
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
    console.log("last", users);
    for (let user of users) {
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

      const Edit = document.createElement("button");
      Edit.style.position = "absolute";
      Edit.style.top = "0px";
      Edit.style.right = "155px";
      Edit.style.height = "50px";
      Edit.style.width = "100px";
      Edit.innerText = "Edit";
      Edit.style.zIndex = 100;
        
      let name = user.querySelector(".student-name").innerText;

      Edit.addEventListener('click',()=>{
        console.log('hi')
        currentName = name
        chrome.storage.sync.get([name], (res) => {
            console.log(res)
            let data = res[name] || [];
            let absences = data.filter((item)=>item.status ==="absent").map((item)=>item.date)
            let lates = data.filter((item)=>item.status ==="late").map((item)=>item.date)
            console.log(absences,lates)
            createModal(absences,lates)
        })
      })

      email.addEventListener("click", () => {
        console.log(name);
        chrome.storage.sync.get([name, "settings"], (res) => {
          console.log(res);
          if (!res.settings){
         
            return
          }
          let data = res[name];
          let { cycle, support, instructor } = res.settings;
          let absences = data
            .filter((item) => item.status === "absent")
            .sort((a, b) => a.timeStamp + b.timeStamp);

          let left = 2;
          let occurences = "1st";
          if (absences.length === 2) {
            left = 1;
            occurences = "2nd";
          } else if (absences.length === 3) {
            left = 0;
            occurences = "3rd";
          } else if (absences.length > 3) {
            left = 0;
            occurences = absences.length + "th";
          }

          let str = `Hello ${name.split(" ")[0]}, 
This email is to inform you that you have recorded your ${occurences} absence in the course ${cycle}.

You have been absent:
${absences.map((item) => item.formatedDate).join("\n")}

Per your enrollment agreement, you only have ${left} absence${
            left > 1 ? "s" : ""
          } left at your disposal. 

We would like to work with you to help remediate any blockers that are presenting themselves and preventing you from attending class.

Please feel free to reach out to your instructor: 
${instructor}
Or 
${support}`;
console.log(str)
        navigator.clipboard.writeText(str)

        });
      });
      late.addEventListener("click", () => {});
      user.appendChild(email);
      user.appendChild(late);
      user.appendChild(Edit)
    }
  }


window.addEventListener(
  "load",
loadButtons,
  false
);


