// var pizza;

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
	console.log('loginUser called')
	let clean = false;
	let user = {}
	user.userName = $('#username').val().trim();
	user.password = $('#password').val().trim();
	user.online   = 1;
	clean = checkEmpty('#password', '#username');
	if (clean) {
		console.log("Getting to ajax request", user);
		$.ajax('/login', {
			type:'POST',
			data: user
		}).done((res)=>{

			// if (res = "OK") {
				console.log('User logged in: ', user, " res: ", res);
				$('#sign-in-modal').fadeOut();
				window.location.href="/userView";
				// var socket = io.connect();
				// pizza = socket
				// console.log("socket", socket);
			// }
		})
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

	if (user.gender==='m') {
		user.img =  $('#create-img').val()==='' ? '/assets/img/default_man.jpg':$('#create-img').val().trim();
	} else {
		user.img = $('#create-img').val()==='' ? '/assets/img/default_woman.jpg':$('#create-img').val().trim();
	}
	user.online   = 0;
	console.log('user object as it exists on creation' + user);
	if (rightAge && cleanInput && cleanRadio && samePswd) {
		console.log(user)
		$.ajax('/api/create', {
			type:'POST',
			data: user
		}).done((res)=>{
			console.log(res);
			// if (res==='OK') {
				console.log('User created: ', user)
				$('#create-account-modal').hide();
				$('#sign-in-modal').show();
				$('#username').val(user.userName);
				$('#password').val(user.password);
			// } 
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

 	$.post('/userView/swipe', swipeData).done((res) => {
 		if (res) {
 			console.log('res from /userview/swipe', res);
 			window.location.href = `/${res.userName}/video`
 		}
 	});
}

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

	$.ajax('/api/update/'+userName, {
		type:'GET'
	}).done((res)=>{

		$.ajax('/api/update', {
			type: 'POST',
			data: updateUser
		}).done((result) => {
			$('#update-account-modal').hide();
			location.reload();
		});
	});
}

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

function signOut() {
	$.ajax('/logout', {type: 'GET'}).done( function(results) {
		console.log('logged out', results);
 		window.location.href = `/`;

	});
}

function reorderChatWindows() {
	let num = 0;
	$('.chat-container .chat-accordion').each((i, item)=>{
		num+=15;
		$(item).css('right', num+'%');
	});
}

function createChatWindow(user) {
	if($("#" + user).length == 0) {
		let mockText = `<div class="bubble-left">Hey man, what's going on? Long time no see!</div>
<div class="bubble-right">I know right?  It's been ages...How's the family?</div>
<div class="bubble-left">Everyone is doing great.  No teen pregnancies, Timmy just graduated from space architect surgeon school.</div>
<div class="bubble-right">That's Awesome! Ok man, I have to run, but it's been great talking to you.  Say hello to my wife for me.</div>`
		let accordion = $('<div id="'+user+'">');
		let header = $('<h3>');
		let chatUser = $('<span class="chatUserName">').text(user)
		let remove = $('<span class="remove">');
		let chatBox = $('<div class="chatBox">')
		let msgWindow = $('<div class="msgWindow">');
		let chatInput = $('<input type="text" class="chatInput">');
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



// function addBackUser(element) {
// 	let userName = $(element).attr('data-username');
// 	let img = $(element).attr('data-img');
// 	$('.modal-body .userTile').show();
// 	$('#viewAgain-userName').text(`Meet ${userName}!`)
// 	$('#viewAgain-img').attr('src', img);
// 	$('#left').attr('data-user', userName);
// 	$('#right').attr('data-user', userName);
// }

function removeChatWindow(element) {
	element.closest('.chat-accordion').remove();
}

function enterMessage(event) {
	let user = {};
	if (typeof $('.chatInput:focus').val() !== 'undefined') {
		user.input = $('.chatInput:focus').val().trim();
	  if(event.keyCode == 13){
	  	socket.emit('send message', user.input)
	  	console.log('socket in chat:', socket)
	  	$.ajax('/chatInput', {
	  		type:'POST',
	  		data: user
	  	}).then((res)=>{
	  		$('.chatInput:focus').val('');
	  	});
	  }
	}
}

function showChatBubble(element) {
	let x = $(element).offset();
	let height = parseInt($(element).css('height'));
	let pos = x.top - 100 + (height/2);
	let user = $(element).text();

	$('#connectBubble').css({
		'top': pos,			
	}).fadeIn().attr('data-username', user);
}

function hideChatBubble(event) {
// 	let e = event.originalEvent,
// 		elem = $('#connectBubble'),
// 		height = elem.height(),
// 		width = elem.width(),
// 		position = elem.position(),
// 		top = elem.position().top,
// 		bottom = elem.position().top - height,
// 		left = elem.position().left,
// 		right = elem.position().left - width;
// 		console.log('params:',top,right, bottom, left);
// 		console.log(elem);
// 		console.log(position);
// 	if (e.x < left || e.x > right) {
// 		console.log('firing inside x')
// 		if (e.y < top || e.y > bottom) {
// 			console.log('firing inside y')
// 			$('#connectBubble').fadeOut();
// 		}	
// 	}
	console.log(!$(event.target).closest('#bubble-container').length)
   if(!$(event.target).closest('#bubble-container').length) {
   	console.log('firing inside where fadeout is called')
        $('#connectBubble').fadeOut();
    }  
}
// console.log(pizza)
// socket.on('new message', function (data) {
// 	alert(data)
// });