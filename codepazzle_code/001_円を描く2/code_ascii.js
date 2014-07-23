function originalCode() {
	r= "", w= 96, h= 48, sA  = 32, sB  = 16;

	for (var y = 0; y < h; y ++) {
		for (var x = 0; x < w; x ++) {
			var dstnc = Math.sqrt(
				  Math.pow(w/ 2 - x, 2)
				+ Math.pow((h/ 2 - y) * 2, 2)
			);
			if (dstnc < sA) {
				if (dstnc < sB) {
					r+= "2";
				} else {
					r+= "1";
				}
			} else {
				r+= "0";
			}
		}
		r+= "\n"
	}

	// 結果を戻して終了
	return r;
}

