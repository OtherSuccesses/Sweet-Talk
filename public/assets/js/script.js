function triggerModal(triggerId, modalId) {
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
triggerModal('sign-in', 'sign-in-modal');
triggerModal('create-account', 'create-account-modal');
closeModal('sign-in-modal')
closeModal('create-account-modal')


//click event for login
$('#login-submit').on('click', (event) =>{
	event.preventDefault();
	let user = {}
	user.username = $('#username').val().trim();
	user.password = $('#password').val().trim();
	console.log('User created: ', user)
	$.ajax('/login', {
		type:'POST',
		data: user
	}).done((res)=>{
		$('#sign-in-modal').fadeOut();
	});
	$('#username').val('');
	$('#password').val('');	
})