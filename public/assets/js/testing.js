var chai = require("chai")
var expect = require("chai").expect;
var Nightmare = require("nightmare");
var nightmare = Nightmare({show:true});

var allFunctions = require("../public/assets/js/functions");
var local = 'localhost:3000'

describe("functions", function(){
	it("Should have a username, password and online status on login", function(){
		nightmare
		.goto(local)
		.click('#sign-in')
		.type('#username', 'CashMoney')
		.type('#password', 'CashMoney')
		.then(function(user){
			expect(user.userName).to.equal(true);
			expect(user.password).to.equal(true);
			expect(user.online).to.equal(1);
			done();
		})
		.end();
	});
});
