// JavaScript source code
//const api_url = "<heroku_app_url>"
const api_url = "http://localhost:5000/food"
function loadData(records = []) {
	var table_data = "";
	for (let i = 0; i < records.length; i++) {
		table_data += `<tr>`;
		table_data += `<td>${records[i].UserId}</td>`;
		table_data += `<td>${records[i].FirstName}</td>`;
		table_data += `<td>${records[i].LastName}</td>`;
		table_data += `<td>${records[i].Phone_no}</td>`;
		table_data += `<td>${records[i].EmailId}</td>`;
		table_data += `<td>${records[i].Department}</td>`;
		table_data += `<td>${records[i].studentcode}</td>`;
		table_data += `<td>${records[i].Year}</td>`;
		table_data += `<td>${records[i].FeesStatus}</td>`;
		table_data += `<td>${records[i].ResultStatus}</td>`;
		table_data += `<td>`;
		table_data += `<a href="/edit?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
		table_data += '&nbsp;&nbsp;';
		table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i]._id}')>Delete</button>`;
		table_data += `</td>`;
		table_data += `</tr>`;
	}
	//console.log(table_data);
	document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
	fetch(api_url)
		.then((response) => response.json())
		.then((data) => {
			console.table(data);
			loadData(data);
		});
}


function getDataById(id) {
	fetch(`${api_url}/${id}`)
		.then((response) => response.json())
		.then((data) => {

			console.log(data);
			document.getElementById("id").value = data._id;
			document.getElementById("UserId").value = data.UserId;
			document.getElementById("FirstName").value = data.FirstName;
			document.getElementById("LastName").value = data.LastName;
			document.getElementById("Phone_no").value = data.Phone_no;
			document.getElementById("EmailId").value = data.EmailId;
			document.getElementById("Department").value = data.Department;
			document.getElementById("studentcode").value = data.studentcode;
			document.getElementById("Year").value = data.Year;
			document.getElementById("FeesStatus").value = data.FeesStatus;
			document.getElementById("ResultStatus").value = data.ResultStatus;
		})
}


function postData() {

	var UserId = document.getElementById("UserId").value;
	var FirstName = document.getElementById("FirstName").value;
	var LastName = document.getElementById("LastName").value;
	var Phone_no = document.getElementById("Phone_no").value;
	var EmailId = document.getElementById("EmailId").value;
	var Department = document.getElementById("Department").value;
	var studentcode = document.getElementById("studentcode").value;
	var Year = document.getElementById("Year").value;
	var FeesStatus = document.getElementById("FeesStatus").value;
	var ResultStatus = document.getElementById("ResultStatus").value;

	data = {UserId: UserId, FirstName: FirstName, LastName: LastName, Phone_no: Phone_no, EmailId: EmailId, Department: Department, studentcode: studentcode, Year: Year, FeesStatus: FeesStatus, ResultStatus: ResultStatus};

	fetch("http://localhost:5000/add", {
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			window.location.href = "/dashboard";
		})
}


function putData() {
	var _id = document.getElementById("id").value;
	var UserId = document.getElementById("UserId").value;
	var FirstName = document.getElementById("FirstName").value;
	var LastName = document.getElementById("LastName").value;
	var Phone_no = document.getElementById("Phone_no").value;
	var EmailId = document.getElementById("EmailId").value;
	var Department = document.getElementById("Department").value;
	var studentcode = document.getElementById("studentcode").value;
	var Year = document.getElementById("Year").value;
	var FeesStatus = document.getElementById("FeesStatus").value;
	var ResultStatus = document.getElementById("ResultStatus").value;

	
	data = { _id: _id, UserId: UserId, FirstName: FirstName, LastName: LastName, Phone_no: Phone_no, EmailId: EmailId, Department: Department, studentcode: studentcode, Year: Year, FeesStatus: FeesStatus, ResultStatus: ResultStatus };

	fetch("http://localhost:5000/edit", {
		method: "PUT",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
		.then((response) => response.json())
		.then((data) => {
			console.table(data);
			window.location.href = "/dashboard";
		})
}


function deleteData(id) {
	user_input = confirm("Are you sure you want to delete this record?");
	if (user_input) {
		fetch(api_url, {
			method: "DELETE",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ "_id": id })
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				window.location.reload();
			})
	}
}

