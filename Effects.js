	//LOGIN AND REGISTER SCREEN EFFECT
	
	//variables 
	let x = document.getElementById('Login');
	let y = document.getElementById('Register');
	let z = document.getElementById('btn');
	

	function Register(){
		x.style.left='-70vw';
		y.style.left='5px';
		z.style.left='50%';
		
	}
	function login(){
		x.style.left='5px';
		y.style.left='-70vw';
		z.style.left='0px';
		
	}
	
	
	/*  for this Side Bar */
	// this is for the opening of the side bar, it will push the main section to the left by 250px and also give the sidebar a width 250px.
	function openSlideMenu(){
		document.getElementById('side-menu').style.width='75%';
		// document.getElementById('container').style.marginLeft='250px';
		
	}
	/* this code is to close the sidebar with button with the class 'btn-close' by making the sidebar width 0px and the 
	main section will go back normal width no margin. */
	
	function closeSlideMenu(){
		document.getElementById('side-menu').style.width='0';
		document.getElementById('container').style.marginLeft='0';
		
	}
	

	// Number counter
	
	// $(".gauge-cover").counterUp({delay:10,time:1000});
	
	
	