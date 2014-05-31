//= 元のコード
function originalCode(arg) {
	// 配列を初期化
	var res = "";

	// 処理
	var splt = arg.match(/\d+|./g);
	res = splt.length;

	// 結果の配列を戻して終了
	return res;
}

