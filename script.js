function showForm(formType) {
    document.getElementById('studentForm').style.display = formType === 'student' ? 'block' : 'none';
    document.getElementById('facultyForm').style.display = formType === 'faculty' ? 'block' : 'none';
} 

document.getElementById('register').addEventListener('click', function() {
    window.location.href = 'registration.html';
});

function handleLogin() {
    console.log("handleLogin() function called");
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log("Username: " + username);
    console.log("Password: " + password);
    if (validateLogin(username, password)) {
        console.log("Login successful, redirecting...");
        window.location.href = 'main.html';
        return true;
    } else {
        console.log("Invalid login credentials");
        alert('Invalid login credentials');
        return false; // Prevent form submission
    }
}


function handleStudentRegistration() {
    const roll = document.getElementById('studentRoll').value;
    const name = document.getElementById('studentName').value;
    const branch = document.getElementById('studentBranch').value;
    const dob = document.getElementById('studentDOB').value;
    const mobile = document.getElementById('studentMobile').value;

    // Save student data to localStorage or send to a server
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.push({ roll, name, branch, dob, mobile });
    localStorage.setItem('students', JSON.stringify(students));

    alert('Student registered successfully!');
    window.location.href = 'login.html';
    return false; // Prevent form submission
}

function handleFacultyRegistration() {
    const name = document.getElementById('facultyName').value;
    const branch = document.getElementById('facultyBranch').value;
    const dob = document.getElementById('facultyDOB').value;
    const mobile = document.getElementById('facultyMobile').value;

    // Save faculty data to localStorage or send to a server
    const faculty = JSON.parse(localStorage.getItem('faculty')) || [];
    faculty.push({ name, branch, dob, mobile });
    localStorage.setItem('faculty', JSON.stringify(faculty));

    alert('Faculty registered successfully!');
    window.location.href = 'login.html';
    return false; // Prevent form submission
}

function populateAttendanceList() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const table = document.getElementById('attendanceTable');
    students.forEach(student => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);

        cell1.innerHTML = student.roll;
        cell2.innerHTML = student.name;
        cell3.innerHTML = '<input type="radio" name="attendance_' + student.roll + '" value="present">';
        cell4.innerHTML = '<input type="radio" name="attendance_' + student.roll + '" value="absent">';
    });
}

function saveAttendance() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const attendance = [];

    students.forEach(student => {
        const present = document.querySelector('input[name="attendance_' + student.roll + '"]:checked').value;
        attendance.push({ roll: student.roll, name: student.name, attendance: present });
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(attendance);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');
    XLSX.writeFile(workbook, 'attendance.xlsx');
}

window.onload = function() {
    if (window.location.pathname.endsWith('main.html')) {
        populateAttendanceList();
    }
}
