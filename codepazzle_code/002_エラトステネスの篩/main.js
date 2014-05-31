$(function() {
	//== 答え
	var ans = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47
		,53,59,61,67,71,73,79,83,89,97].toString();

	//== コードを確認
	function chckCode() {
		// 初期化
		var src = $("#src").val();

		// 処理
		var res = execCode(src);

		// 判定
		var judg = (res == ans) ? "正解" : "不正解";
		$("#stts").text(judg);

		// 結果を出力
		$("#res").val(res);
	}

	//== ボタンの処理を登録
	$("#chck").click(chckCode);

	//== 初回時実行
	vwCode();	// 元の式を表示
	chckCode();	// コードを確認
});

