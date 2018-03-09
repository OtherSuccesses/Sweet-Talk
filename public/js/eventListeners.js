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
		console.log('firing:', $(this))
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
	if (typeof socket!=='undefined') {//conditional avoids program throwing errors if socket is undefined
		socket.on('private message', function (data) {
				createChatWindow(data.from);
				let message = $('<div class="bubble-left">').text(data.text);
				$('.msgWindow').append(message);
				$(message).parent().scrollTop($(message).offset().top);
		});

		socket.on('add match', function (username){
			addChatUser(username)
		});

		socket.on('delete match', function (username){
			$('#onlineUsers>p:contains('+username+')').remove();
		});
	}

});//end of document ready function
