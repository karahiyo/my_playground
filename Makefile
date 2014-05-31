all:info

RUBY=$(shell which ruby)
CWD=$(shell pwd)
CODE_BASE=$(CWD)/codepazzle_code

up_server_alg:
	$(RUBY) -run -e httpd $(CODE_BASE)/000_template\(algorithm\)/index.html -p 33720 

up_server_glf:
	$(RUBY) -run -e httpd $(CODE_BASE)/000_template\(algorithm\)/index.html -p 33721 
