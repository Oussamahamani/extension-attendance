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
    // Here, you can do whatever you want with the formData, such as sending it to a server.

    // For now, let's just alert the values.
    // alert("Form Data Submitted:\n" +
    //     "Instructor Name: " + formData.instructorName + "\n" +
    //     "Class Name: " + formData.className + "\n" +
    //     "Teacher Support Name: " + formData.teacherSupportName);
}
let button = document.querySelector('.submit')
button.addEventListener('click',submitForm)