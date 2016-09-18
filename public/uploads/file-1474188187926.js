module.exports = function(imitator) {
    // 返回一个json
    imitator({
    	url: '/json',
    	result: {name: 'hello world'}
    });

    imitator({
    	url: '/json2',
    	result: {name: 'hello world world'}
    });

}
