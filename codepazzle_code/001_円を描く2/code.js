function originalCode() {
	var r = "", sA  = 1024, sB  = 256;

	for (var y = -24; y < 24; y ++, r += "\n") {
		for (var x = -48; x < 48; x ++) {
			var d= x*x + 4*y*y;
            var q=0;
			if (d< sA) q++;
			if (d< sB) q++;
            r += q;
		}
	}

	return r;
}
