function originalCode() {
	r = "", s  = 256;

	for (y = x= h=48; y + h; x+h||(y-=2, x=h, r += "\n")) {
			d= x--*x + y*y;
            r += (d<s*4)+(d<s);
	}

	return r;
}
