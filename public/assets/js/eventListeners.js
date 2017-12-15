$(document).ready(() => {
	//click events for opening and closing modals
	openModal('sign-in', 'sign-in-modal');
	openModal('create-account', 'create-account-modal');
	openModal('update-account', 'update-account-modal');
	// openModal('inbox', 'inbox-modal');
	openModal('viewAgain', 'viewAgain-modal');
	closeModal('viewAgain-modal');
	closeModal('sign-in-modal');
	closeModal('create-account-modal');
	closeModal('update-account-modal');
	closeModal('inbox-modal');

	

	//click event for submitting login
	$('#login-submit').on('click', (event) =>{
		event.preventDefault();
		loginUser();
	});

	//click event for submitting a newly created user
	$('#create-submit').on('click', (event) =>{
		event.preventDefault();
		createUser();
		/// addUserTable(); 
	});

	//click event for clearing all inputs
	$('#sign-in, #create-account').on('click', (event) => {
		event.preventDefault();
		clearInputs();
	});

	//click event listener for "swiping" on users
	$(document).on('click','.choose', function (event) {
		event.preventDefault();
		console.log($(this));
		userSwipe($(this));
	});

	//click event for updating a user
	$(document).on('click', '#update-submit', function (event) {
		event.preventDefault();
		updateUser($(this));
	});

	//click event for requesting video chat
	$("#requestVideoBtn").on('click', (e) => {
		e.preventDefault();
		console.log("this works");
		// location.replace('http://localhost:3000/' + initialPage);
		requestVideo();
	});

	//click event for declining to request video chat

	//click event for logging user out
	$('#sign-out').on('click', function (event) {
		event.preventDefault();
		signOut();
	});

	//click event for removing a chat window
	$(document).on('click', '.remove', function () {
		removeChatWindow($(this));
		reorderChatWindows();
	});

	//click event for creating a chat window
	$(document).on('click', '.chatUser', function (event) {
		event.preventDefault();
		let user = $(this).text();
		createChatWindow(user);
	});

	//event listener for 
	$(document).on('click','.viewAgain', function (event) {
		event.preventDefault();		
		$('#viewAgain-modal').fadeIn();
		addBackUser($(this));
	});

	//click event for populating modal of user you would like a second chance at

	//commented out in case we want to utilize in the future
	// $(document).on('click', '.modal-close', function (event) {
	// 	event.preventDefault();
	// 	$('#viewAgain-modal').fadeOut();
	// })

	//layers user-tiles in the z-axis when userView loads
	layerTiles();
	$( function() {
    	$( "#chat-accordion" ).accordion({
    		collapsible: true,
    		active: false
    	});
  	});
});//end of document ready function
