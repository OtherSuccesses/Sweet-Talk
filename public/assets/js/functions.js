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
	user.online = 1;
	clean = checkEmpty('#password', '#username');
	
	$.ajax('/login', {
		type:'POST',
		data: user
	}).done((res)=>{
		if (res==='OK') 
			console.log('User logged in: ', user){
			$('#sign-in-modal').fadeOut();
			$.get('/userView');
		}
	});
}

function createUser() {
	let clean = false,
		user = {},
		rightAge = checkAge('#create-age'),
	    cleanInput = checkInputs('#create-username','#create-password', '#create-password2'),
	    cleanRadio = checkRadio('input[name="gender"]', 'input[name="seeking"]');
	user.userName = $('#create-username').val().trim();
	user.password = $('#create-password').val().trim();
	user.gender = $("input[name='gender']:checked").val();
	user.seeking = $("input[name='seeking']:checked").val();
	user.age = $('#create-age').val().trim();
	user.online = 0;
	if (rightAge && cleanInput && cleanRadio) {
		
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

function userSwipe() {
	let swipe = $(this).attr('data-swipe'),
		user = $(this).data('user');
}