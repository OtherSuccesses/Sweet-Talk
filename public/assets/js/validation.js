
		function checkEmpty() {
		let args = Array.prototype.slice.call(arguments);
		let counter = 0;
		args.map(element => {
			let empty;
			if ($(element).is(':radio')) {
				counter+=0.5
				empty = $(element).is(':checked') ? false:true;
			} else {
				empty = $(element).val()!=='' ? false:true;
			}
			if (empty) {
				showError(element, true);
				$(element).val('');
			} else {
				counter++;
				showError(element, false);
			}
		});
		console.log('counter & args.length: '+counter+' '+ args.length);
		console.log(counter)
		return counter===args.length ? true : false;
	}

	function showError(element, bool) {
		let color = ''
		bool ? color = 'red' : 'white';	
		if ($(element).is(':radio')) {
			$(element).siblings('.radio-label').css('color', color)
		} else {
			$(element).css('border-color', color);
		}

	}
