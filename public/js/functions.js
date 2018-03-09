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

//=====================================
//Logic for functions on user view page
//=====================================
//logic for when the user swipes left or right on the user
function userSwipe(element) {
 	let swipe = $(element).attr('data-swipe'),
 		userId  = $(element).data('user'),
 		tileArr = [],
 		layer = $(element).data('layer'),
 		swipeData ={};
 		swipeData.userId = userId;
 		swipeData.swipe = swipe;
 	$(element).parent().hide()
 	$(element).parent().next().show()
 	$('.userTile').each(function (i, item) {
 		tileArr.push(item);
 	});
 	if ($(element).parent()==tileArr[tileArr.length-1]){
 		$('.noMore').show();
 	}

	$.ajax({
		url: '/swipe',
		type: 'POST',
		data: swipeData,
		success: function(result) {
			if (result.match){
				addChatUser(result.match.username)
			}
		},
		error: function (err){
			console.log('error from /swipe', err)
		}
	})
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
		updatedUser = {};
	updatedUser.gender   = $("input[name='gender']:checked").val() || undefined;
	updatedUser.seeking  = $("input[name='seeking']:checked").val() || undefined;
	updatedUser.age      = $('#update-age').val().trim() || undefined;
	updatedUser.img      = $('#update-img').val().trim() || undefined;
	updatedUser.img      = $('#update-img').val().trim() || undefined;
	updatedUser.bio      = $('#update-bio').val().trim() || undefined;
		$.ajax('/updateUser', {
			type: 'POST',
			data: updatedUser
		}).done((result) => {
			$('#update-account-modal').hide();
			location.reload();
		});

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

//If the user closes the window with out logging out this calls the logout
// window.onbeforeunload = function() {
//     $.get('/logout')
// };
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
		user.from = thisUser.username;
		user.text = $('.chatInput:focus').val().trim();
	  if(event.keyCode == 13){
	  	socket.emit('new message', user)
  		let myMessage = $('<div class="bubble-right">').text(user.text);
		$('.msgWindow').append(myMessage);
  		$('.chatInput:focus').val('');
  		$(myMessage).parent().scrollTop($(myMessage).offset().top);
	  }
	}
}

function addChatUser(username) {
	let user = $('<p>').addClass('chatUser').text(username).appendTo('#onlineUsers')
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
