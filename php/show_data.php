<?php

require_once('connection.php');

$conn = OpenCon();
$query = "SELECT * FROM userdata ORDER BY lastname";
$result = $conn->query($query);
if (!$result) die  ("Сбой при доступе к базе данных: " . $conn->error());
$rows = $result-> num_rows;
$counter = 1;

echo "<table class='tt'><tr> <th>№</th> <th>First Name</th> <th>Last Name</th><th>Photo</th> <th>Role</th> <th>Delete<th></tr>";
while ($row = mysqli_fetch_array($result))
{
    echo"<tr class='tr' id = '" . $row['id'] . "'>";
    echo"<td>" . $counter . "</td>";
    echo"<td>" . $row['firstname'] . "</td>";
    echo"<td>" . $row['lastname'] . "</td>";
    echo"<td>" . "<img class='timg' src='" . $row['url'] . "' ></img>" . "</td>";
    echo"<td>" . $row['role'] . "</td>";
    echo"<td>" . " <button class='delete_button' type='submit' name='" . $row['id'] . "'><img class='delete_bi' alt='nothing' src='http://s1.iconbird.com/ico/2013/12/505/w450h4001385925290Delete.png'></button>" . "</td>";
    echo"</tr>";
	$counter++;
}
echo "</table>";

CloseCon($conn);

?>