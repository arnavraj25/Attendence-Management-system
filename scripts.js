function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const attendanceDate = document.getElementById("attendanceDate").value;

    if (!attendanceDate) {
        alert("Please select a date.");
        return;
    }

    if (username === "teach01" && password === "t001") {
        const selectedSubject = document.getElementById("subject").value;
        localStorage.setItem("selectedSubject", selectedSubject);
        localStorage.setItem("attendanceDate", attendanceDate);
        window.location.href = "attendance.html";
    } else {
        alert("Invalid username or password. Try again.");
    }
}

let students = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" },
    { id: 5, name: "Ella" },
    { id: 6, name: "Frank" },
    { id: 7, name: "Grace" },
    { id: 8, name: "Hannah" },
    { id: 9, name: "Ian" },
    { id: 10, name: "Jack" }
];

document.addEventListener("DOMContentLoaded", () => {
    const selectedSubject = localStorage.getItem("selectedSubject");
    const attendanceDate = localStorage.getItem("attendanceDate");

    document.getElementById("subjectHeader").textContent = `Subject: ${selectedSubject}`;
    document.getElementById("dateHeader").textContent = `Date: ${attendanceDate}`;
    populateTable();
});

function populateTable() {
    const studentTable = document.getElementById("studentTable");
    studentTable.innerHTML = "";
    students.forEach(student => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td id="name-${student.id}">${student.name}</td>
            <td id="status-${student.id}">Not Marked</td>
            <td class="actions">
                <button onclick="markAttendance(${student.id}, 'Present')">Present</button>
                <button onclick="markAttendance(${student.id}, 'Absent')">Absent</button>
                <button onclick="editStudent(${student.id})">Edit Name</button>
                <button onclick="removeStudent(${student.id})">Remove</button>
            </td>
        `;

        studentTable.appendChild(row);
    });
}

function markAttendance(id, status) {
    const statusCell = document.getElementById(`status-${id}`);
    statusCell.textContent = status;
    statusCell.style.color = status === 'Present' ? 'green' : 'red';
}

function addStudent() {
    const studentName = document.getElementById("studentName").value.trim();
    if (studentName === "") {
        alert("Please enter a valid student name.");
        return;
    }
    const newId = students.length + 1;
    students.push({ id: newId, name: studentName });
    populateTable();
    document.getElementById("studentName").value = "";
}

function editStudent(id) {
    const currentName = document.getElementById(`name-${id}`).textContent;
    const newName = prompt("Edit student name:", currentName);
    if (newName && newName.trim() !== "") {
        students = students.map(student => 
            student.id === id ? { ...student, name: newName.trim() } : student
        );
        populateTable();
    } else {
        alert("Invalid name. No changes made.");
    }
}

function removeStudent(id) {
    students = students.filter(student => student.id !== id);
    populateTable();
}

function searchStudent() {
    const searchId = document.getElementById("searchStudent").value.trim();
    const rows = document.querySelectorAll("tbody tr");
    
    rows.forEach(row => {
        const studentId = row.cells[0].textContent;
        if (studentId === searchId) {
            row.classList.add("highlight");
        } else {
            row.classList.remove("highlight");
        }
    });
}

function saveAttendance() {
    let presentCount = 0;
    let absentCount = 0;

    const attendanceData = students.map(student => {
        const statusCell = document.getElementById(`status-${student.id}`);
        const status = statusCell ? statusCell.textContent : "Not Marked";
        if (status === "Present") presentCount++;
        if (status === "Absent") absentCount++;
        return {
            id: student.id,
            name: student.name,
            status
        };
    });

    const totalStudents = students.length;
    const attendancePercentage = totalStudents > 0 ? ((presentCount / totalStudents) * 100).toFixed(2) : 0;

    const summaryDiv = document.getElementById("summary");
    summaryDiv.innerHTML = `
        <p>Total Students: ${totalStudents}</p>
        <p>Present: ${presentCount}</p>
        <p>Absent: ${absentCount}</p>
        <p>Attendance Percentage: ${attendancePercentage}%</p>
    `;

    console.log("Attendance Data:", attendanceData);
    alert("Attendance has been saved. Check the summary for details.");
}
