
//connecting to the database
$servername="localhost";
$username= "root";
$password="";

//create a connection
$conn= mysql_connect(servername,$username, $password);

//die id connection was not successful
if(!$conn){
    dispatchEvent("sorry we failed to connect: ".mysql_connect_error());
}
else{
    echo "connection was successful,."
}