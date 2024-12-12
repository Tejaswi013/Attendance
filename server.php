<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$database = "attendance";

// Create connection
$con = mysqli_connect($servername, $username, $password, $database);

// Check connection
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

// Check the action type based on URL or POST parameter
$action = $_GET['action'] ?? null;

switch ($action) {
    case 'insert':
        insertStudent($con);
        break;
    case 'retrieve':
        retrieveStudents($con);
        break;
    case 'delete':
        deleteStudent($con);
        break;
    default:
        echo "Invalid action.";
        break;
}

// Insert student data
function insertStudent($con) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $rollNumber = $_POST['studentRoll'];
        $name = $_POST['studentName'];
        $branch = $_POST['studentBranch'];
        $dob = $_POST['studentDOB'];
        $mobile = $_POST['studentMobile'];

        // Validate inputs
        if (empty($rollNumber) || empty($name) || empty($branch) || empty($dob) || empty($mobile)) {
            echo "All fields are required.";
            return;
        }

        // SQL query to insert student data
        $sql = "INSERT INTO students (roll_number, name, branch, dob, mobile) 
                VALUES ('$rollNumber', '$name', '$branch', '$dob', '$mobile')";

        if (mysqli_query($con, $sql)) {
            echo "Student registered successfully!";
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($con);
        }
    } else {
        echo "Invalid request method.";
    }
}

// Retrieve student data
function retrieveStudents($con) {
    $sql = "SELECT * FROM students";
    $result = mysqli_query($con, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            echo "Roll Number: " . $row['roll_number'] . "<br>";
            echo "Name: " . $row['name'] . "<br>";
            echo "Branch: " . $row['branch'] . "<br>";
            echo "Date of Birth: " . $row['dob'] . "<br>";
            echo "Mobile: " . $row['mobile'] . "<br><br>";
        }
    } else {
        echo "No records found.";
    }
}

// Delete student data
function deleteStudent($con) {
    if (isset($_GET['rollNumber'])) {
        $rollNumber = $_GET['rollNumber'];

        // SQL query to delete student data
        $sql = "DELETE FROM students WHERE roll_number='$rollNumber'";

        if (mysqli_query($con, $sql)) {
            echo "Student record deleted successfully!";
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($con);
        }
    } else {
        echo "Roll number is required to delete.";
    }
}

// Close the connection
mysqli_close($con);
?>
