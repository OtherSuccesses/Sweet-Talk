$(document).ready(() => {
	//click events for opening and closing modals
	openModal('sign-in', 'sign-in-modal');
	openModal('create-account', 'create-account-modal');
	openModal('update-account', 'update-account-modal');
	openModal('inbox', 'inbox-modal');
	// openModal('viewAgain', 'viewAgain-modal');
	// closeModal('viewAgain-modal');
	closeModal('sign-in-modal');
	closeModal('create-account-modal');
	closeModal('update-account-modal');
	closeModal('inbox-modal');

	databaseVolumeCheck();	

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
		userSwipe($(this));
	});

	//click event for updating a user
	$(document).on('click', '#update-submit', function (event) {
		event.preventDefault();
		updateUser($(this));
	});

	//commented out for future use

	//click event for requesting video chat
	// $("#requestVideoBtn").on('click', (e) => {
	// 	e.preventDefault();
	// 	console.log("this works");
	// 	// location.replace('http://localhost:3000/' + initialPage);
	// 	requestVideo();
	// });

	//click event for declining to request video chat

	//click event for logging user out
	$('#sign-out').on('click', function (event) {
		event.preventDefault();
		signOut();
	});

	//click event for creating a chat window
	$(document).on('click', '.chatUser', function (event) {
		event.preventDefault();
		let user = $(this).text()
		createChatWindow(user)
	});

	//click event for removing a chat window
	$(document).on('click', '.remove', function () {
		removeChatWindow($(this));
		reorderChatWindows();
	});

	//commented out for future use

	//click event for starting a text chat with a user
	// $('#connect-chat').on('click', function (event) {
	// 	event.preventDefault();
	// 	let user = $(this).parent().attr('data-username');
	// 	console.log('user from front end:',user)
	// 	$(this).parent().fadeOut();
	// 	createChatWindow(user);
	// });

	//click event for starting a video chat with a user
	// $('#connect-video').on('click', function (event) {
	// 	event.preventDefault();
	// 	let user = $(this).parent().attr('data-username');
	// 	$(this).parent().fadeOut();
	// 	//
	// 	//Enter video click event code here
	// 	//
	// });

	//event listener for 
	$(document).on('click','.viewAgain', function (event) {
		event.preventDefault();		
		$('#viewAgain-modal').fadeIn();
		addBackUser($(this));
	});

	//"click" event for enter key on chat inputs
	$(document).keypress(function (event) {
		enterMessage(event);
	});

	//click event that hides chat bubble when nothing is selected
	
	// $(document).on('click', function (event) {
	// 	if($('#connectBubble').css('display') !== 'none') {
	// 		console.log('firing inside where function is called')
	// 		hideChatBubble(event);
	// 	}
	// });
	

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

	//socket message listener
 	socket.on('private message', function (data) {	
		console.log('data from message:',data);
		console.log("thisUser from event listener", thisUser);

			createChatWindow(data.from);
			let message = $('<div class="bubble-left">').text(data.text);
			console.log('msgWindow Im trying to append to eventlisteners:', $('.msgWindow'))
			$('.msgWindow').append(message);
			$(message).parent().scrollTop($(message).offset().top);		
	});

	socket.on('logins', (data) => {
		console.log("logins socket data", data);
		let user = data[0][data[0].length-1];
		console.log("user from logins", user);
		$("#userTileContainer").append(
			`<div class="userTile centered" data-layer="">
				<h2 class="tileTitle">Meet ${user.userName}!</h2>
				<div class="imgContainer">
					<img src="${user.img}" alt="image of ${user.userName}" class="userImage">
				</div>
				<p class="userBio">${user.bio}</p>
				<button class="choose" data-swipe="false" data-user="${user.userName}"><i class="fa fa-times fa-3x" aria-hidden="true"></i></button>
				<button class="choose" data-swipe="true" data-user="${user.userName}"><i class="fa fa-check fa-3x" aria-hidden="true"></i></button>
			</div>`);
	});

	socket.on('add chat user', function (user) {
		$('#chat-accordion').append('<p class="chatUser">'+user+'</p>');
	});	
});//end of document ready function
