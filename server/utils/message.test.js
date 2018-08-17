const expect=require('expect');

var {generateMessage}=require('./message');

describe('generateMessage',()=>{
    it('should generate the correct message',()=>{
        var from='admin';
        var text='message';

        var message=generateMessage(from,text);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,text});
    })
})