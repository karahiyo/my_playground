function originalCode() {
    r = ""
	for (y=a=x=40;y+a;)
        r += "-*\n"[x+a?x*x--+y*y<900|0:(x=a,y-=2,2)]
	return r
}

