$(document).ready(() => {

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

	//click events for opening and closing modals
	openModal('sign-in', 'sign-in-modal');
	openModal('create-account', 'create-account-modal');
	closeModal('sign-in-modal')
	closeModal('create-account-modal')


	//click event for login
	$('#login-submit').on('click', (event) =>{
		event.preventDefault();
		let clean = false;
		let user = {}
		user.userName = $('#username').val().trim();
		user.password = $('#password').val().trim();
		user.online = 1;
		clean = checkEmpty('#password', '#username');
		console.log('User logged in: ', user)
		$.ajax('/login', {
			type:'POST',
			data: user
		}).done((res)=>{
			console.log('response from login:',res)
			if (res==='OK') {
				$('#sign-in-modal').fadeOut();
				$.get('/userView');
			}
		});
	});

	$('#create-submit').on('click', (event) =>{
		event.preventDefault();
		let clean = false;
 		let user = {};
 		user.userName = $('#create-username').val().trim();
 		user.password = $('#create-password').val().trim();
 		user.gender = $("input[name='gender']:checked").val();
 		user.seeking = $("input[name='seeking']:checked").val();
		user.age = $('#create-age').val().trim();
		user.online = 0;
		let rightAge = checkAge('#create-age'),
 			cleanInput = checkInputs('#create-username','#create-password', '#create-password2'),
 			cleanRadio = checkRadio('input[name="gender"]', 'input[name="seeking"]');
		if (rightAge && cleanInput && cleanRadio) {
			console.log('User created: ', user)
			$.ajax('/api/create', {
				type:'POST',
				data: user
			}).done((res)=>{
				$('#create-account-modal').fadeOut();
			});
		}
	});


	//click event for clearing all inputs
	$('#sign-in, #create-account').on('click', (event) => {
		$(':input').each((i, item) => {
			let type = $(item).attr('type');
			if (type==='radio') {
				$(item).prop('checked', false).siblings('.radio-label').css('color', 'white')
			} else if(type==='text' || type === 'password') {
				$(item).val('').css('border-color', 'white');
			}
		});
	});
});//end of document ready function 
