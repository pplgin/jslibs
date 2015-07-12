/*学习：ajax 的原理
1. 通过创建 XMLHttpRequest  or ActiveXObject(老版本的IE,ie5,ie6)
2. 监听返回处理时间 responseXML、responseText;
3. 注意get和post的传参数 都是通过url字符串拼接
4. 启发jquery.ajax
author : johnny.jiang 2015-7-4
*/
var $ = (function() {

	function ajax(opts) {
		var _opts = {
				url: '/',
				type: 'get', //get,post,put
				dataType: 'json', //xml,json,text,html,jsonp,script
				data: null,
				async: true, // 异步请求
				cache: true, //缓存机制
				timeout: 5, //请求超时
				loading: function() {},
				error: function() {},
				success: function() {},
				complete: function() {}
			},
			aborted = false,
			key,
			xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

		function params(data) {
			//数据处理
			//data={key:value}
			var i, str = '';
			for (i in data) {
				str += i + '=' + data[i] + '&';
			}
			return str;
		};

		//合并参数 object.extend 原理
		for (key in opts) {
			_opts[key] = opts[key];
		};

		if (_opts.type.toLowerCase() == "get") {
			//url形势传参数，避免缓存
			_opts.url += (_opts.url.indexOf('?') < 0 ? '?' : '&') + params(_opts.data) + '&_=' + (+new Date());
		}
		//超时处理
		function checkTimeout() {
			if (xhr.readyState !== 4) {
				abort = true;
				xhr.abort();
			}
		}


		setTimeout(checkTimeout, _opts.timeout * 1000);

		//状态改变监听
		xhr.onreadystatechange = function() {
			if (xhr.readyState !== 4) {
				_opts.load && _opts.load(xhr);
			}
			if (xhr.readyState == 4 && xhr.status == 200) {
				var s = xhr.status,
					xhrdata;
				//请求成功状态范围
				if (!aborted && (s >= 200 && s < 300 || s === 304)) {
					switch (_opts.dataType) {
						case 'xml':
							xhrdata = xhr.responseXML;
							break;
						case 'json':
							xhrdata = window.JSON && window.JSON.parse ? JSON.parse(xhr.responseText) : eval('(' + xhr.responseText + ')');
							break;
						default:
							xhrdata = xhr.responseText;
							break;
					}
					_opts.success && _opts.success(xhrdata, xhr);
				} else {
					_opts.error && _opts.error(xhr);
				}
				_opts.complete && _opts.complete(xhr);
			}
		};
		//发送请求
		xhr.open(_opts.type, _opts.url, _opts.async);
		if (_opts.type.toLowerCase() == "post") {
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		}
		xhr.send(_opts.type.toLowerCase() == 'get' ? null : params(_opts.data));
	}
	return {
		ajax: ajax
	}
})();