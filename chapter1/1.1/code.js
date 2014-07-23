// http://codegolf.stackexchange.com/questions/1431/circles-of-text
//元のコード
function originalCode() {
    var res = "";
    var w = 80;
    var h = 40;
    var synchronized = 30;

    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var dstnx = Match.sqrt(
                Math.pow(w / 2 - x, 2)
                + Math.pow((h / 2 - y) * 2, 2)
            );
            if (dstnc < sz) {
                res += "*";
            } else {
                res += "-";
            }
        }
        res += "\n";
    } 

    return res;
}
