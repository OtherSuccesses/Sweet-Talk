//========================
//Functions for login page
//========================

function openModal(triggerId, modalId) {
	$(document).on('click','#' + triggerId, (event)=>{
		event.preventDefault();
		$('#' + modalId).fadeIn();
	});
}

function closeModal(modalId) {
	$('.close').on('click', (event)=>{
		event.preventDefault();
		$('#' + modalId).fadeOut();
	});
}

function loginUser() {
	console.log('loginUser called');
	let clean = false;
	let user = {};
	user.userName = $('#username').val().trim();
	user.password = $('#password').val().trim();

	clean = checkEmpty('#password', '#username');
	if (clean) {
		console.log("Getting to ajax request", user);
		$.ajax('/login', {
			type:'POST',
			data: user
		}).done((res)=>{
			console.log('User logged in: ', user, " res: ", res);
			$('#sign-in-modal').fadeOut();
			window.location.href="/userView";
			thisUser = user;
		}).fail((res) =>{
			console.log(res.responseText);
			clearInputs();
			$('#username').attr('placeholder', 'Username or password is incorrect.');
			$('#password').attr('placeholder', 'Username or password is incorrect.');
			setTimeout(replacePlaceHolders, 3000);
		});
	}
}

function databaseVolumeCheck(){
	$.ajax("/api/dataCount", {
		type:'GET'
	}).done(function(res){
		if (res<10){
			databasePopulate();
		}
	});
}

function databasePopulate(){
	var namesList = ["Marco", "Principio", "Taliesin", "Cochran", "EJ", "Morgan", "Vytas", "Rudzinskas", "Kate", "Upton", "Minnie", "Mickey", "Mouse", "89", "92", "Whatevs", "Grrl", "Boi", "Captain", "Madame", "Planet", "StarWars", "Burger"];

	function randName(){
		var tempIndex = Math.floor(Math.random()*namesList.length);
		var tempName = namesList[Math.floor(Math.random()*namesList.length)];
		tempName += namesList[tempIndex];
		if (tempName.length < 8){
			tempName += namesList[Math.floor(Math.random()*namesList.length)];
		}
		return tempName;
	}

	function randGen(){
		var tempGen = Math.floor(Math.random()*2);
		if (tempGen < 1){
			tempGen = 'm';
		}
		else{
			tempGen = 'f';
		}
		return tempGen;
	}

	function randAge(){
		var tempAge = Math.floor(Math.random()*42);
		tempAge += 18;
		return tempAge;
	}
	users = []
	for (var i = 0; i < 10; i++) {
		var user = {};
		user.userName = randName();
		user.password = 'password';
		user.gender = randGen();
		user.seeking = randGen();
		user.age = randAge();
		user.bio = "Looking to Mingle!";
		if (user.gender==='m') {
			user.img =  $('#create-img').val()==='' ? '/assets/img/default_man.jpg':$('#create-img').val();
		} else {
			user.img = $('#create-img').val()==='' ? '/assets/img/default_woman.jpg':$('#create-img').val();
		}
		users.push(user);
	}
	for (var i = 0; i < users.length; i++) {
		$.ajax('/create', {
			type:'POST',
			data: users[i]
		}).done((res)=>{
				console.log('User created: ', res);
		}).fail((res) => {
			console.log(res.responseText);
		});
	}
}

function createUser() {
	let user = {},
		rightAge   = checkAge('#create-age'),
	    cleanInput = checkInputs('#create-username','#create-password', '#create-password2'),
	    cleanRadio = checkRadio('input[name="gender"]', 'input[name="seeking"]'),
	    samePswd   = checkPasswordsEqual();
	user.userName = $('#create-username').val().trim();
	user.password = $('#create-password').val().trim();
	user.gender   = $("input[name='gender']:checked").val();
	user.seeking  = $("input[name='seeking']:checked").val();
	user.age      = $('#create-age').val().trim();
	user.bio      = $('#create-bio').val().trim();
	//creates a default image based on gender
	if (user.gender==='m') {
		user.img =  $('#create-img').val()==='' ? '/assets/img/default_man.jpg':$('#create-img').val().trim();
	} else {
		user.img = $('#create-img').val()==='' ? '/assets/img/default_woman.jpg':$('#create-img').val().trim();
	}
//checks if all parameters meet expectations then does post to create the user on the backend
if (rightAge && cleanInput && cleanRadio && samePswd) {
		$.ajax('/create', {
			type:'POST',
			data: user
		}).done((res)=>{
				console.log('User created: ', user)
				$('#create-account-modal').hide();
				$('#sign-in-modal').show();
				$('#username').val(user.userName);
				$('#password').val(user.password);
		}).fail((res) => {
			console.log(res.responseText);
			clearInputs();
			$('input').attr('placeholder', '');
			$('#create-password').attr('placeholder', 'There was a problem with signup. Please try again.');
			$('textarea').attr('placeholder','');
			setTimeout(replacePlaceHolders, 1000 * 3);
		});
	}
}

function clearInputs() {
	$(':input').each((i, item) => {
		let type = $(item).attr('type');
		if (type==='radio') {
			$(item).prop('checked', false).siblings('.radio-label').css('color', 'white')
		} else if(type==='text' || type === 'password') {
			$(item).val('').css('border-color', 'white');
		}
		$('#create-bio').val('');
	});
}
//if there is an error on login or signup, this will fire after the error message to repopulate the placeholders
function replacePlaceHolders () {
	$('#create-username').attr('placeholder', "Enter Your User Name");
	$('#create-password').attr('placeholder', "Enter Password");
	$('#create-password2').attr('placeholder', "Re-enter Password");
	$('#create-age').attr('placeholder', 'Age');
	$('#create-img').attr('placeholder', 'Enter image url');
	$('#create-bio').attr('placeholder', 'Input user Bio');
	$('#username').attr('placeholder', 'User Name');
	$('#password').attr('placeholder', 'Password');


}
//=====================================
//Logic for functions on user view page
//=====================================
//logic for when the user swipes left or right on the user
function userSwipe(element) {
 	let swipe = $(element).attr('data-swipe'),
 		user  = $(element).data('user'),
 		userName = $(element).data('login'),
 		tileArr = [],
 		layer = $(element).data('layer'),
 		swipeData ={}; 
 		swipeData.user = user;
 		swipeData.swipe = swipe;
 	$(element).parent().hide()
 	$(element).parent().next().show()
 	$('.userTile').each(function (i, item) {
 		tileArr.push(item);
 	});
 	if ($(element).parent()==tileArr[tileArr.length-1]){
 		$('.noMore').show();
 	}		
	if (swipe==="true") {
 		socket.emit('swipe right', swipeData)
 	}
 	$.post('/userView/swipe', swipeData).done((res) => {
 	
 	});
}
//This function layers the user tiles as they are populated
function layerTiles() {
	let first = true;
 	$('.userTile').each(function (i, item) {
 		$('.noMore').hide();
 		if (first) {
 			$(this).show();
 			first = false;
 		} else {
 			$(this).hide();
 		}
 	});
 }

function updateUser(element) {
	let userName = $(element).data('user'),
		updateUser = {};
	updateUser.gender   = $("input[name='gender']:checked").val() || undefined;
	updateUser.seeking  = $("input[name='seeking']:checked").val() || undefined;
	updateUser.age      = $('#update-age').val().trim() || undefined;
	updateUser.img      = $('#update-img').val().trim() || undefined;
	updateUser.img      = $('#update-img').val().trim() || undefined;
	updateUser.bio      = $('#update-bio').val().trim() || undefined;

	// $.ajax('/api/update/'+userName, {
	// 	type:'GET'
	// }).done((res)=>{

		$.ajax('/api/update', {
			type: 'POST',
			data: updateUser
		}).done((result) => {
			$('#update-account-modal').hide();
			location.reload();
		});
	// });
}
//===================================
//In the future we hope to add video
//===================================
function requestVideo() {
	console.log("Getting initiator ID...");
    const Peer = require("simple-peer");
    const peer = new Peer({
      	initiator: location.hash === "#init",
      	trickle: false,
    });

	peer.on('signal', (data) => {
		let id = data;
		console.log("Initiator ID", id);
		$.post("/video", id);
	});

    peer.on('error', function (err) { console.error('error', err) });
};
//===============================
//Functions dealing with signout
//===============================
//Calls logout
function signOut() {
	$.ajax('/logout', {type: 'GET'}).done( function(results) {
		console.log('logged out', results);
 		window.location.href = `/`;
	});
}
//If the user closes the window with out logging out this calls the logout
window.onbeforeunload = function() {
    $.get('/logout')    
};
//=========================================
//Functions to deal with the chat windows.
//=========================================
function reorderChatWindows() {
	let num = 0;
	$('.chat-container .chat-accordion').each((i, item)=>{
		num+=15;
		$(item).css('right', num+'%');
	});
}

function createChatWindow(user) {
	if($("#" + user).length == 0) {
		let accordion = $('<div id="'+user+'">');
		let header = $('<h3>');
		let chatUser = $('<span class="chatUserName">').text(user)
		let remove = $('<span class="remove">');
		let chatBox = $('<div class="chatBox">')
		let msgWindow = $('<div class="msgWindow">');
		let chatInput = $('<input type="text" class="chatInput" data-username="'+user+'" >');
		remove.append('<i class="fa fa-times" aria-hidden="true"></i>')
		header.append(chatUser, remove).appendTo(accordion);
		chatBox.append(msgWindow, chatInput);
		accordion.append(chatBox);
		accordion.addClass('chat-accordion chats')
				 .appendTo('.chat-container');
		reorderChatWindows();
		$(accordion).accordion({
			collapsible:true,
			heightStyle: 'content'
		});
	}
}


function removeChatWindow(element) {
	element.closest('.chat-accordion').remove();
}

function enterMessage(event) {

	if (typeof $('.chatInput:focus').val() !== 'undefined') {
		let user = {};
		user.to = $('.chatInput:focus').data('username');
		user.from = thisUser;
		user.text = $('.chatInput:focus').val().trim();
	  if(event.keyCode == 13){
	  	socket.emit('send message', user)
  		let myMessage = $('<div class="bubble-right">').text(user.text);
		$('.msgWindow').append(myMessage);
  		$('.chatInput:focus').val('');
  		$(myMessage).parent().scrollTop($(myMessage).offset().top);
	  }
	}
}

//commented out for future use

// function showChatBubble(element) {
// 	let x = $(element).offset();
// 	let height = parseInt($(element).css('height'));
// 	let pos = x.top - 100 + (height/2);
// 	let user = $(element).text();

// 	$('#connectBubble').css({
// 		'top': pos,			
// 	}).fadeIn().attr('data-username', user);
// }

// function hideChatBubble(event) {
// 	console.log(!$(event.target).closest('#bubble-container').length)
// 	if(!$(event.target).closest('#bubble-container').length) {
//    		console.log('firing inside where fadeout is called')
//         $('#connectBubble').fadeOut();
//     }  
// }

// function addBackUser(element) {
// 	let userName = $(element).attr('data-username');
// 	let img = $(element).attr('data-img');
// 	$('.modal-body .userTile').show();
// 	$('#viewAgain-userName').text(`Meet ${userName}!`)
// 	$('#viewAgain-img').attr('src', img);
// 	$('#left').attr('data-user', userName);
// 	$('#right').attr('data-user', userName);
// }
