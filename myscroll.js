/*johnnyjiang 2015.6.12*/
(function ($) {
    $.fn.myScroll = function (options) {
        var defaults = {
            speed: 40, //速度
            rowHeight: 24, //高度
            dir: "v"//方向 h/v
    };
        var opts = $.extend({}, defaults, options), intId = [];
        function marquee(ul, obj) {
            if (opts.dir === "v") {
                if (ul[0].offsetHeight - obj[0].scrollTop <= 0) {
                    obj[0].scrollTop -= ul[0].offsetHeight;
                } else {
                    obj[0].scrollTop++;
                }
            } else {
                if (ul[0].offsetWidth - obj[0].scrollLeft <= 0) {
                    obj[0].scrollLeft-= ul[0].offsetWidth;
                } else {
                    obj[0].scrollLeft++;
                }
            }
        }

        this.each(function (i) {
            var sh = opts["rowHeight"], speed = opts["speed"], _this = $(this);
            _this.find('ul').eq(1).html(_this.find('ul').eq(0).html());
            var ul = _this.find('ul').eq(0);
            intId[i] = setInterval(function () {
                if (ul.height() <= _this.height()) {
                    clearInterval(intId[i]);
                } else {
                    marquee(ul,_this);
                }
            }, speed);

            _this.hover(function () {
                clearInterval(intId[i]);
            }, function () {
                intId[i] = setInterval(function () {
                    if (ul.height() <= _this.height()) {
                        clearInterval(intId[i]);
                    } else {
                        marquee(ul, _this);
                    }
                }, speed);
            });

        });

    }
})(jQuery);