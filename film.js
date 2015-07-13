var film = {
	index: 0,
	init: function(b, d, a, c) {
		film.params = a.split(",");
		film.len = $(d).length;
		film.classname = c;
		film.time = b;
		film.obj = d;
		film.move();
		film.mouseaction(d);
		for (j = 0; j < film.params.length; j++) {
			film.mousestop(film.params[j])
		}
	},
	move: function() {
		film.start = setInterval("film.round()", film.time)
	},
	stop: function() {
		film.start = clearInterval(film.start)
	},
	round: function() {
		if (film.index == film.len - 1) {
			film.index = 0
		} else {
			film.index += 1
		}
		film.event()
	},
	event: function() {
		if (film.len <= 1) {
			return
		} else {
			$(film.obj).hide().eq(film.index).fadeIn(500);
			for (i = 0; i < film.params.length; i++) {
				$(film.params[i]).removeClass(film.classname).eq(film.index).addClass(film.classname)
			}
		}
	},
	mousestop: function(a) {
		$(a).mouseover(function() {
			film.stop();
			film.index = $(this).index(a);
			film.event()
		}).mouseout(function() {
			film.move()
		})
	},
	mouseaction: function(a) {
		$(a).mouseover(function(b) {
			if (isMouseLeaveOrEnter(b, this)) {
				film.stop()
			}
		}).mouseout(function(b) {
			if (isMouseLeaveOrEnter(b, this)) {
				film.move()
			}
		})
	}
};