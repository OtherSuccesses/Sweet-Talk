var expect = require("chai").expect;
var Nightmare = require("nightmare");

var allFunctions = require("../public/assets/js/functions");
var local = 'localhost:3000'

describe("functions", function(){
	it("Should have a username, password and online status on login", function(){
		new Nightmare({show:true})
		.goto('http://localhost:3000')
		.click('#sign-in')
		.type('#username', 'CashMoney')
		.type('#password', 'CashMoney')
		.click('#login-submit')
		.end()
		.then(function(user){
			expect(user.userName).to.equal(true);
			expect(user.password).to.equal(true);
			expect(user.online).to.equal(1);
			done();
		});
	});

	it("Should allow for a new user to be created", function(){
		new Nightmare({show:true})
		.goto('http://localhost:3000')
		.click('#create-account')
		.type('#create-username', "RandomUser")
		.type('#create-age', '23')
		.type('#create-password', "password")
		.type('#create-password2', "password")
	})
});
