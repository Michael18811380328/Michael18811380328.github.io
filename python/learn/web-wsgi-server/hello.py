# coding=utf-8
# hello.py

def application(environ, start_response):
    start_response('200 OK', [('Content-Type', 'text/html')])
    return '<h1>Hello, web! this is test python server and frontend page</h1>'
