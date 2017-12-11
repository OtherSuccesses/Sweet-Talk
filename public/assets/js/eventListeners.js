$(document).ready(() => {
	//click events for opening and closing modals
	openModal('sign-in', 'sign-in-modal');
	openModal('create-account', 'create-account-modal');
	openModal('update-account', 'update-account-modal');
	closeModal('sign-in-modal')
	closeModal('create-account-modal')
	closeModal('update-account-modal')

	//click event for submitting login
	$('#login-submit').on('click', (event) =>{
		event.preventDefault();
		loginUser();
	});

	//click event for submitting a newly created user
	$('#create-submit').on('click', (event) =>{
		event.preventDefault();
		createUser();
		// addUserTable();
	});

	//click event for clearing all inputs
	$('#sign-in, #create-account').on('click', (event) => {
		event.preventDefault();
		clearInputs();
	});

	//click event listener for "swiping" on users
	$(document).on('click','.choose', function (event) {
		event.preventDefault();
		userSwipe($(this));
	});

	//click event for updating a user
	$(document).on('click', '#update-submit', function (event) {
		event.preventDefault();
		updateUser($(this));
	});

	//layers user-tiles in the z-axis when userView loads
	layerTiles();

});//end of document ready function
