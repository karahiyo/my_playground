$(function() {
	//== 問題
	var ques = ["1+2+3", "1+2*3-4", "1-2/3+4", "10*-20/5+30"];

	//== コードを確認
	function chckCode() {
		// 初期化
		var src = $("#src").val();
		var sccs = true;
		var resArr = [];

		for (var i = 0; i < ques.length; i ++) {
			// 処理
			var q = ques[i];
			eval("var ans = " + q);
			var res = execCode(src, [q]);
			if (res != ans) sccs = false;

			resArr.push((i + 1) + "回目 " + q + " = "
				+ res + "\n      正解は「" + ans + "」結果は"
				+ (sccs ? "正解" : "不正解"));
		}

		// 判定
		var judg = sccs ? "正解" : "不正解";
		$("#stts").text(judg);

		// 結果を出力
		$("#res").val(resArr.join("\n\n"));
	}

	//== ボタンの処理を登録
	$("#chck").click(chckCode);

	//== 初回時実行
	vwCode();	// 元の式を表示
	chckCode();	// コードを確認
});

