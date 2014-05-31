//== Xorshift
var Xors = function(n) {
	var x, y, z, w;

	// シード
	this.seed = function(s) {
		x = 123456789
		if (typeof s !== "undefined") x = s; 
		y = 362436069; z = 521288629; w = 88675123;
	}

	// ランダム
	this.rand = function() {
		var t;
		t = x ^ (x << 11);
		x = y; y = z; z = w;
		return w = (w^(w>>19))^(t^(t>>8));
	}

	// 初回実行
	this.seed(n);
};

