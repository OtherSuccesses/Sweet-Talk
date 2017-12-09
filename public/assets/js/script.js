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
	let user = {}
	user.username = $('#username').val().trim();
	user.password = $('#password').val().trim();
	console.log('User logged in: ', user)
	$.ajax('/login', {
		type:'POST',
		data: user
	}).done((res)=>{
		$('#sign-in-modal').fadeOut();
	});
	$('#username').val('');
	$('#password').val('');
});

$('#create-submit').on('click', (event) =>{
	event.preventDefault();
	let user = {}
	user.username = $('#create-username').val().trim();
	user.password = $('#create-password').val().trim();
	user.gender = $("input[name='gender']:checked").val();
	user.seeking = $("input[name='seeking']:checked").val();
	console.log('User created: ', user)
	$.ajax('/api/create', {
		type:'POST',
		data: user
	}).done((res)=>{
		$('#create-account-modal').fadeOut();
	});
	$('#username').val('');
	$('#password').val('');
})


	//click event for clearing all inputs
	$('#sign-in, #create-account').on('click', (event) => {
		$(':input').each((i, item) => {
			console.log(item);
			let type = $(item).attr('type');
			if (type==='radio') {
				console.log(item)
				$(item).prop('checked', false).siblings('.radio-label').css('color', 'white')
			} else if(type==='text' || type === 'password') {
				$(item).val('').css('border-color', 'white');
			}
		});
	})
});//end of document ready function 
