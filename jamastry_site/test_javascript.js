var name = "Mohamed Jama";
var btn = document.getElementById("btn");

function send(){
	//var here = document.getElementById("print");
	console.log("Hello World");
	for(var i=0; i<name.length; i++)
	{
		console.log(name[i]);
	}
	//here.insertAdjacentHTML('beforeend', first);
} 
function decipher(){
	var entered = document.getElementById("element").value;
	console.log(entered[0]);
}
var other_data;
btn.addEventListener("click", function(){
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'https://moeh-jama.github.io/periodic_table.json');

	ourRequest.onload = function(){
		var ourData = JSON.parse(ourRequest.responseText);
		other_data = ourData;
		renderHTML(ourData);
	};
	ourRequest.send();
});


function renderHTML(data)
{
	var element = document.getElementById("element").value;
	console.log(element);
	//console.log(data[0].Element);


	if(parseInt(element, 10))
	{
		alert("Works");
	}
	else{
		alert("No");
	}
}


function getElement(temp_two, subscript)
{

}

