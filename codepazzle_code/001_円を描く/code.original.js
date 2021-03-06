//= 元のコード
function originalCode() {
	// 変数の初期化
	var res = "";
	var w = 80;
	var h = 40;
	var sz = 30;

	// 処理
	for (var y = 0; y < h; y ++) {
		for (var x = 0; x < w; x ++) {
			var dstnc = Math.sqrt(
				  Math.pow(w / 2 - x, 2)
				+ Math.pow((h / 2 - y) * 2, 2)
			);
			if (dstnc < sz) {
				res += "*";
			} else {
				res += "-";
			}
		}
		res += "\n"
	}

	// 結果を戻して終了
	return res;
}

