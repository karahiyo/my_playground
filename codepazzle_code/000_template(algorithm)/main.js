$(function() {
	//== 答え
	var ans = null;

	//== コードを確認
	function chckCode() {
		// 初期化
		var src = $("#src").val();

		// 処理
		var res = execCode(src);
		if (ans == null) ans = res;	// 初回は答えを格納

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

