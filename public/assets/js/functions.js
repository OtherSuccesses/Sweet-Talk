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
	let clean = false;
	let user = {}
	user.userName = $('#username').val().trim();
	user.password = $('#password').val().trim();
	user.online   = 1;
	clean = checkEmpty('#password', '#username');
	if (clean) {
		$.ajax('/login', {
			type:'POST',
			data: user
		}).done((res)=>{
			console.log('res from right after /login', res);
			if (res==='OK') {
				console.log('User logged in: ', user)
				$('#sign-in-modal').fadeOut();
				$.get('/userView');
			}
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
	user.online   = 0;
	if (rightAge && cleanInput && cleanRadio && samePswd) {

		$.ajax('/api/create', {
			type:'POST',
			data: user
		}).done((res)=>{
			console.log('User created: ', user)
			$('#create-account-modal').fadeOut();
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
}

function userSwipe(element) {
 	let swipe = $(element).attr('data-swipe'),
 		user  = $(element).data('user'),
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

 	$.ajax('/userView/swipe', {
 		type: 'POST',
 		data: swipeData
 	}).done((result) => {
 		console.log('result from then after userview swipe:', result);
 	})
}


function layerTiles() {
 	$('.userTile').each(function (i, item) {
 		$('.noMore').hide();
 		if ($(this).data('layer')===0) {
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
	updateUser.bio      = $('#update-bio').val().trim() || undefined;

	$.ajax('/api/update/'+userName, {
		type:'GET'
	}).done((res)=>{
		console.log('currentUser object: ', res)
		if (res.password === password) {
			$.ajax('/api/update', {
				type: 'POST',
				data: updateUser
			}).done((result) => {
				console.log('result from done after post to /api/update:', result)
			});
		}
	});
}
