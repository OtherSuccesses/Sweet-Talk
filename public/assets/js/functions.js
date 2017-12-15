function openModal(triggerId, modalId) {
	$('#' + triggerId).on('click', (event)=>{
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

			if (res = "OK") {
				console.log('User logged in: ', user);
				$('#sign-in-modal').fadeOut();
				$.ajax('/userInfo', {
					type: 'POST',
					data: res
				});
				window.location.href="/userView";
			}
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
	if (user.gender==='m') {
		user.img =  $('#create-img').val()==='' ? '/assets/img/default_man.jpg':$('#create-img').val().trim();
	} else {
		user.img = $('#create-img').val()==='' ? '/assets/img/default_woman.jpg':$('#create-img').val().trim();
	}
	user.online   = 0;
	if (rightAge && cleanInput && cleanRadio && samePswd) {
		console.log(user)
		$.ajax('/api/create', {
			type:'POST',
			data: user
		}).done((res)=>{
			// console.log(res);
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
	});
	$('#create-bio').val('');
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
 	$.ajax('/userView/swipe/'+userName, {
 		type: 'GET'
 	}).done(function (res) {
 		var test = false;
 		for(var i = 0; i < res.result.length; i++) {
 			if(user === res.result[i].userName) {
 				test = true;
 				return test;
 			}
 		}
 		if(!test) {
	 		console.log("done response: ", res.result[0].userName);
		 	$.ajax('/userView/swipe', {
		 		type: 'POST',
		 		data: swipeData
		 	}).done( function (result) {
		 		// console.log('result from then after userview swipe:', result);
		 	});
		}
	}); 	


 	$.ajax('/userView/swipe', {
 		type: 'POST',
 		// data: swipeData
 	}).done((result) => {
 		console.log('result from then after userview swipe:', result);
 		window.location.href = `/${result.recUserName}/video`;
 	})
}

function layerTiles() {
 	$('.userTile').each(function (i, item) {
 		$('.noMore').hide();
 		if ($(this).data('layer')===1) {
 			$(this).show();
 		} else {
 			$(this).hide();
 		}
 	});
 }

function updateUser(element) {
	let userName = $(element).data('user'),
		password = $('#update-password').val().trim(),
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
		console.log('currentUser object: ', res)

		$.ajax('/api/update', {
			type: 'POST',
			data: updateUser
		}).done((result) => {
			
			console.log('result from done after post to /api/update:', result);
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
	$.ajax('/logout', {type: 'GET'});
}

function reorderChatWindows() {
	let num = 0;
	$('.chat-container .chat-accordion').each((i, item)=>{
		num+=15;
		console.log(item)
		$(item).css('right', num+'%');
	});
}

function createChatWindow(user) {	
	if($("#" + user).length == 0) {
		let accordion = $('<div id="'+user+'">');
		let header = $('<h3>');
		let remove = $('<span class="remove">');
		let chatBox = $('<div class="chatBox">')
		let msgWindow = $('<div class="msgWindow">');
		let chatInput = $('<input type="text" class="chatInput">');
		remove.append('<i class="fa fa-times" aria-hidden="true"></i>')
		header.text(user).append(remove).appendTo(accordion);
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