//== レンダリング
function rndr(p, bombPos, eneArr, holeArr) {
	var cntxt;
	try {
		cntxt = $("#cnvs").get(0).getContext("2d");
	} catch(e) {
		$("#cnvs").after(
			$("<div>").text(
			"HTML5に対応したブラウザでご覧ください。")
		);
		return;
	}

	// 背景クリア
	cntxt.fillStyle = "#888888";
	cntxt.fillRect(0, 0, p.w, p.h);

	// 索敵範囲
	cntxt.fillStyle = "#cccccc";
	for (var i = 0; i < bombPos.length; i ++) {
		var pos = bombPos[i];
		cntxt.beginPath();
		cntxt.arc(pos.x, pos.y, p.rngOut, 0, Math.PI * 2);
		cntxt.fill();
	}

	// 爆心地
	cntxt.fillStyle = "#ffcccc";
	for (var i = 0; i < bombPos.length; i ++) {
		var pos = bombPos[i];
		cntxt.beginPath();
		cntxt.arc(pos.x, pos.y, p.rngIn, 0, Math.PI * 2);
		cntxt.fill();
	}

	// 敵の位置
	for (var i = 0; i < eneArr.length; i ++) {
		var ene = eneArr[i];
		cntxt.fillStyle = ene.hit ? "#ff0000" : "#eeeeee";
		cntxt.fillRect(ene.x - 0.5, ene.y - 0.5, 2, 2);
	}

	// 巣穴の位置
	for (var i = 0; i < holeArr.length; i ++) {
		var hole = holeArr[i];

		cntxt.beginPath();
		cntxt.arc(hole.x, hole.y, 3, 0, Math.PI * 2);

		cntxt.strokeStyle = "#ffffff";
		cntxt.lineWidth = 4;
		cntxt.stroke();

		cntxt.strokeStyle = "#0000ff";
		cntxt.lineWidth = 2;
		cntxt.stroke();
	}
}

