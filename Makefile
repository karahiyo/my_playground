all:info

RUBY=$(shell which ruby)
CWD=$(shell pwd)
CODE_BASE=$(CWD)/codepazzle_code
UGLIFYJS=$(shell which uglifyjs)

patch_src_exists := $(shell find $(TARGET)/code.min.js)
rm_src := $(shell rm -f $(TARGET)/code.min.js)
TARGET=

define rm_message
	@echo "INFO: remove code.min.js"
endef

up:
	$(RUBY) -run -e httpd $(TARGET)/index.html -p 33720

min:
	$(if $(check_file_exists), $(rm_src), $(rm_message))
	$(UGLIFYJS) $(TARGET)/code.js > $(TARGET)/code.min.js

