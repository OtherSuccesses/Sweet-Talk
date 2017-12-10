$(document).ready(() => {
	//click events for opening and closing modals
	openModal('sign-in', 'sign-in-modal');
	openModal('create-account', 'create-account-modal');
	closeModal('sign-in-modal')
	closeModal('create-account-modal')


	//click event for login
	$('#login-submit').on('click', (event) =>{
		event.preventDefault();
		loginUser();
	});

	$('#create-submit').on('click', (event) =>{
		event.preventDefault();
		createUser();
	});


	//click event for clearing all inputs
	$('#sign-in, #create-account').on('click', (event) => {
		event.preventDefault();
		clearInputs();
	});

	//click event listener for "swiping" on users
	$(document).on('click','.choose', function (event) {
		event.preventDefault();
		userSwipe();
	});


});//end of document ready function 