//Creation of the database


function addAccount()
{

	//Variables
		var Username = document.getElementById('Username').value;
		var Name=document.getElementById('Name').value;
		var PNumber=document.getElementById('Number').value;
		var Password=document.getElementById('Password').value;
		var VPassword=document.getElementById('VPassword').value;


	// Validation
		if(Username==""|| Name=="" ||PNumber==""|| Password=="" || VPassword=="")
		{

			document.getElementById('Username').style.border="1px solid red";
			document.getElementById('Name').style.border="1px solid red";
			document.getElementById('Number').style.border="1px solid red";
			document.getElementById('Password').style.border="1px solid red";
			document.getElementById('VPassword').style.border="1px solid red";
			alert("Sorry, All fields are required!!");
			return false;


		}

		if(Password!=VPassword){

			document.getElementById("Password").style.border="1px solid red";
			document.getElementById("VPassword").style.border="1px solid red";
			alert("Sorry, Password are invalid");
			return false;
		}


              var PersonalInfo={
					_id:Username,
					Username:Username,
					Name: Name,
					Goals:[],
					PNumber:PNumber,
					Password:Password

				};
			//put all information gather for login.html into the database
			 db.put(PersonalInfo, function callback(err, result)
			 {
			   if (!err)
			   {
				  //if there are no error  then the user will get this alert
				   alert ( "Your account has been CREATED!");
				}else{

					alert("Failed to CREATE the Account");
					window.location = "login.html";
				}
			 }
			 );
    }



     function Login()
     {

       db.allDocs({include_docs:true}, function(err,docs)
        {
			if(err)
			{
				return console.log(err);
			}else
			{
				var num_records= docs.total_rows;
				for(var i = 0; i < num_records; i++)
				{


				   var  Username= docs.rows[i].doc.Username;

				   var  Password= docs.rows[i].doc.Password;
				   var  PNumber= docs.rows[i].doc.PNumber;

				   var  Name= docs.rows[i].doc.Name;
				   var userName=document.getElementById("userName").value;
				   var password=document.getElementById("password").value;

				   localStorage.clear();
				   //checking to see if the user enter the username and password correctly and if it is correct then relocates the user to the index page
					if(Username == userName && Password == password)
					{
						alert(Username + " you have successfully logged in ");
							//username and name are pass into localstorage
							localStorage.setItem("Username", Username);
							localStorage.setItem("Name", Name);

							window.location = "index.html";
							return false;

					}else
					{
						alert('Failed to login,please try again');
						window.location="login.html";
					}


				}
			}
		});

	}



function store()
{

	//Variables
	var goalName= document.getElementById("goalName").value;
	var goalAmount= document.getElementById("goalAmount").value;
	var goalType= document.getElementById("goalType").value;
	var complete = document.getElementById("complete").value;
	var currentSavings= document.getElementById("currentSavings").value;
	//validation
	//LocalStorage
	localStorage.setItem("currentSavings", currentSavings);
	localStorage.setItem("goalType", goalType);
	localStorage.setItem("goalAmount",goalAmount);
	localStorage.setItem("goalName", goalName);
	localStorage.setItem("complete", complete);



	//currency format
	const converter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	})
	var username = localStorage.getItem("Username");
	//GoalValues Array
	var goalvalues = [goalName,converter.format(goalAmount),goalType,complete,converter.format(currentSavings)];


		db.get(username).then(function (docs) {
		//pushes the goal values into goals[]
		docs.Goals.push(goalvalues);
		return db.put(docs);
		})
		.then(function () {
		return db.get(username);
		})
		.then(function (docs) {
			//alerts the user that the goal has been saved
			alert("Goal has been saved");

		})
		.catch(function (err) {
		console.log(err);
			//alerts the user that  goal has not been have and to try again
		alert("Sorry, fail to save data");
		});


		}

		function addUpdate(){


			//Validation
			if( Name=="" ||PNumber==""|| Password=="")
			{


				document.getElementById('Name').style.border="1px solid red";
				document.getElementById('Number').style.border="1px solid red";
				document.getElementById('Password').style.border="1px solid red";

				alert("Sorry, All fields are required!!");
				return false;
			}

				//Variables

					var Name=document.getElementById('Name').value;
					var PNumber=document.getElementById('Number').value;
					var Password=document.getElementById('Password').value;


				var username = localStorage.getItem("Username");

			  db.get(username, function(err, doc)
				  {
					if (err){
						return console.log(err);
					}else{
					//updating the database with the new personal information that the user entered in the update.html
					
						var PersonalInfo = {
						_id:username ,
						_rev:doc._rev,
						Name :Name,
						PNumber: PNumber,
						Password:Password,
						Username:username,
						Goals:doc.Goals
					};

						db.put(PersonalInfo, function callback(err, result){
							if (!err)
							{
								localStorage.setItem("Name", Name);
								alert ( " Your information has been updated!");
							}else{
								//if there are any errors this message will displayed 
								alert("Sorry, Failed to update the data ");
							}
						}
						);
						//Allowing the user to comfirm their decision about the update they want to make
						return confirm("Please confirm, Do you want to change your personal information");

					}
				});
		}



function deposit() {
	var percentage=document.getElementById('percentage').value;
		 var amount=document.getElementById('amount').value;


	// currency format
	const converter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	})
	// the user enters percentage and amount this will display the totol discount which is calculated by amount * percentage/100
	//this also displays the discount total by subtracting amount and total
				var discount=(percentage/100);
				var  total= amount * discount;
				var discountTotal = amount - total;
					 alert("The down payment for the loan is " + converter.format(total) );
		alert("The Balance is " +  converter.format(discountTotal));

}
		 //local Variables


 function bye(){
     document.write("Thank you for your transaction, GOODBYE!!!");
 }


 function display(){
	var details;
	var Username = localStorage.getItem('Username');
	body = document.getElementById('ShowRecords');
	body.innerHTML = "";


	// This will display all goal for the user that is loggout in
	db.get(Username, function(err, doc) {
		if (err) { return console.log(err); }
			//detaila = get all records in the goals array in the database
			details = doc["Goals"];

			//details.lenght count the an=mount records in the array

			//these for loops are uses to display all  goal within the database within a table 
			for (var i = 0; i < details.length; i++) {
				//Creates an the element tr in the table to show each record
				var tr = document.createElement("tr");
			
				var info = details[i];
				//this for loop goes through each cell in each record e.g it will display  goalname in one td.A td is made evenrytime a loop is made
				//this ensure that eachv value has its know td.
				for (var count = 0; count < info.length; count++) {
						//creates a td for each values
						var newtd = document.createElement('td');
						var newcontent = document.createTextNode(info[count]);
						newtd.appendChild(newcontent);
						tr.appendChild(newtd);
					}
					body.appendChild(tr);


			}
	});


	}

 function SignOut()
     {

        localStorage.clear();
		//making the user unavailable
		var User="Unavailable";

		localStorage.setItem("Username", User);
		;

		alert("GoodBye!");
		window.location="login.html";
     }
