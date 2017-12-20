//=============================================
//Validation functions for sign in and sign up. 
//=============================================
function showError(element, bool) {
	let color = '';
	bool ? color = 'red' : 'white';	
	if ($(element).is(':radio')) {
		$(element).siblings('.radio-label').css('color', color)
	} else {
		$(element).css('border-color', color);
	}
}

function checkEmpty(element) {
	let empty;
	empty = $(element).val()!=='' ? false:true;
	if (empty) {
		showError(element, true);
		return 0;
	} else {
		showError(element, false);
		return 1;
	}
}

function checkRadioEmpty(element) {
	let empty = true;
	if ($(element).is(':checked')) {
		showError(element, false);
		return 1;
	}else {
		showError(element, true);
		return 0;
	}
}
function checkAlphaNumeric(element) {
	let input = $(element).val(),
		regex = /^[a-z0-9]+$/i;
		placeholder = $(element).attr('placeholder'),
		clean = regex.test(input) ? true:false;
	if (clean) {
		showError(element, false);
		return 1;
	} else {
		showError(element, true)
		$(element).val('').attr('placeholder', 'Can only contain letters and numbers');
		setTimeout(replacePlaceHolders, 1000 * 3);
		return 0;
	}
}

function checkLength(element) {
	let input = $(element).val(),
		placeholder = $(element).attr('placeholder'),
		rightLength = input.length>=8 ? true:false;
	if (rightLength) {
		showError(element, false);
		return 1;
	} else {
		showError(element, true)
		$(element).val('').attr('placeholder', 'Must be at least 8 characters');
		setTimeout(replacePlaceHolders, 1000 * 3);
		return 0;
	}
}

function mapInputs(array, counter, validation) {
	array.map(element => {
		counter+=checkEmpty(element);
	});
}

function checkInputs() {
	let args = Array.prototype.slice.call(arguments);
	let go = false,
		counter = 0;
	args.map(element => {
		if (checkEmpty(element)) {
			go = true;
			counter++;
		} else {
			go = false
		}
		if (go) {
			if (checkLength(element)) {
				go=true;
				counter++;
			} else {
				go = false
			}
		}
		if (go) {
			if (checkAlphaNumeric(element)) {
				go=true;
				counter++;
			} else {
				go = false
			}
		}
	});
	return counter===args.length*3 ? true:false;
}

function checkRadio() {
	let args = Array.prototype.slice.call(arguments),
		counter = 0;
	args.map(element => {
		if ($(element).is(':radio')) {
			counter+=checkRadioEmpty(element)
		}
	});
	return counter===args.length?true:false;
}

function checkAge(element) {
	let input = $(element).val(),
		placeholder = $(element).attr('placeholder');
	if (input==='') {
		showError(element, true);
		return false;
	} else if ( isNaN(input)) {
		$(element).val('').attr('placeholder', 'Your input must be a number');
		setTimeout(()=>{$(element).attr('placeholder', placeholder);}, 1000 * 3);
		showError(element, true);
		return false;
	} else if (parseInt(input) < 18) {
		$(element).val('').attr('placeholder', 'You must be older than 18');
		setTimeout(()=>{$(element).attr('placeholder', placeholder);}, 1000 * 3);
		showError(element, true);
		return false;
	} else {
		showError(element, false);
		return true;
	}
}

function checkPasswordsEqual() {
	let pass1 = $('#create-password').val().trim(),
		pass2 = $('#create-password2').val().trim(),
		placeholder = $('#create-password2').attr('placeholder');
	if (pass1!==pass2) {
		showError('#create-password', true);
		showError('#create-password2', true)
		$('#create-password2').val('').attr('placeholder', 'Passwords don\'t match');
		setTimeout(()=>{

			$('#create-password2').attr('placeholder', placeholder);

		}, 1000 * 3);
		return false;
	} else {
		showError('#create-password', false);
		showError('#create-password2', false);
		return true;
	}
}

