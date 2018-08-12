
MAKEFLAGS := s

.PHONY: deploy

deploy:
	now --public
	now alias

