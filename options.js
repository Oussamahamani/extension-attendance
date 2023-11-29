function submitForm() {
    var instructorName = document.getElementById('instructorName').value;
    var className = document.getElementById('className').value;
    var teacherSupportName = document.getElementById('teacherSupportName').value;

    var formData = {
        instructorName: instructorName,
        className: className,
        teacherSupportName: teacherSupportName
    };

    console.log(formData);
    chrome.storage.sync.set({
        settings: formData,
      });
      document.getElementById('instructorName').value = '';
    document.getElementById('className').value = '';
    document.getElementById('teacherSupportName').value = '';
    // Here, you can do whatever you want with the formData, such as sending it to a server.

    // For now, let's just alert the values.
    // alert("Form Data Submitted:\n" +
    //     "Instructor Name: " + formData.instructorName + "\n" +
    //     "Class Name: " + formData.className + "\n" +
    //     "Teacher Support Name: " + formData.teacherSupportName);
}
let button = document.querySelector('.submit')
button.addEventListener('click',submitForm)

chrome.storage.sync.get("settings", ({settings}) => {

    document.getElementById('instructorName').value = settings.instructorName;
    document.getElementById('className').value = settings.className;
    document.getElementById('teacherSupportName').value = settings.teacherSupportName;
})
