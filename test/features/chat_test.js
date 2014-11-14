process.env.NODE_ENV = 'test';
var chai = require('chai');
var expect = chai.expect;
var Browser = require('zombie');
var server = require('../../server');

var test_port = 9292;
Browser.localhost('example.com', test_port);

describe('chat page', function() {

  var browser, browser2;

  before(function(done) {
    this.server = server.listen(test_port);
    browser = Browser.create();
    browser2 = Browser.create();

    browser2.visit('/chat');
    browser.visit('/chat', done);
  });

  it('shows an invitation to start chatting', function(){
    expect(browser.text('h1')).to.eql('Let\'s Chat!');
  });

  describe('when I send a chat message', function(){
    beforeEach(function(done){
      browser.fill('#message', 'hello there').
        pressButton("Send", done);
    });

    it('shows a chat message in my browser', function() {
      expect(browser.text('#messages li:first-child')).to.eql('hello there');
    });

    it('shows a chat message in every other connected browser too', function(){
      expect(browser2.text('#messages li:first-child')).to.eql('hello there');
    });
  });
});
