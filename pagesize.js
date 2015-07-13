var Page = Window.Page || {};
Page.MakePage = function(cur, k) {
	var f = '',
		a = cur - 2,
		b = Math.min(k, Number(cur) + 2);
	if (b < 10) {
		b = Math.min(10, k)
	} else {
		a = b - 4
	}

	if (k < 10) {
		for (var m = 1; m <= k; m++) {
			f += m == cur ? '<a class="on">' + m + '</a>' : '<a onclick="Page.goPage(' + m + ')">' + m + '</a>';
		}
	} else {
		if (cur <= 1) {
			f += '<span class="prev-disabled">上一页</span>'
		} else {
			f += '<a class="prev" onclick="Page.goPage(' + (cur - 1) + ')">上一页</a>'
		}
		for (var j = 1; j <= k; j++) {
			if (j <= 2 || j >= a && j <= b) {
				f += j == cur ? '<a class="on">' + j + '</a>' : '<a onclick="Page.goPage(' + j + ')">' + j + '</a>';
			} else {
				if (j < a) {
					f += '<span class="dot">...</span>';
					j = a - 1;
				} else {
					if (j > b) {
						f += '<span class="dot">...</span>';
						break;
					}
				}
			}
		}

		if (cur >= k) {
			f += '<span class="next-disabled">下一页</span>'
		} else {
			f += '<a  onclick="Page.goPage(' + (cur + 1) + ')">下一页</a>'
		}
		f += '<span class="page-go"><em>&nbsp;&nbsp;共' + k + '页&nbsp;&nbsp;&nbsp;&nbsp;到第</em><input id="jumpto" type="text" onkeydown="javascript:if(event.keyCode==13){Page.goPage(this.value);return false;}"/><em>页</em><a class="btn-go" value="确定" onclick="Page.goPage(document.getElementById(\'jumpto\').value)" href="javascript:;">确定</a></span>';
	}
	return f;
}

Page.goPage = function(i) {
	var html = this.MakePage(i, Page.opt.k);
	this.Show(i);
	$(Page.opt.ele).empty();
	$(html).appendTo(Page.opt.ele);
};

Page.Show = function(i) {
	$(this.opt.se).hide();
	$(this.opt.se).slice((i - 1) * this.opt.ms, i * this.opt.ms).show();
};

Page.Init = function(_opt) {
	Page.opt = {
		ele: '#pages',
		se: '.jobitem',
		ms: 3,
	};
	if (_opt) {
		$.extend(Page.opt, _opt);
	}
	Page.opt.k = Math.ceil($(this.opt.se).length / this.opt.ms);
	var html = this.MakePage(1, Page.opt.k);
	$(Page.opt.ele).empty();
	this.Show(1);
	$(html).appendTo(Page.opt.ele);
};