# Miao: Combineing the frontend and Django

#!/usr/bin/env python
import os
import urllib.request as reader
import urllib.parse as parser
from http.server import SimpleHTTPRequestHandler, HTTPServer
from http.client import parse_headers
from http import HTTPStatus

ROUTES = [
    ('app/', 'http://localhost:8000/'),
]

class MyHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # default root -> cwd        
        root = os.getcwd() + '/static/'
        
        # look up routes and get root directory
        if path[0] == '/':
            path = path[1:]
            
        if path == '':
            path = 'index.html'
        for pattern, rootDir in ROUTES:
             if path.startswith(pattern):
                 path = path[len(pattern):]
                 root = rootDir
                 break
            
        # new path
        print("root: " + root)
        print("path: " + path)
        return os.path.join(root, path)    
    
    def do_proxy_GET(self):
        url = self.translate_path(self.path)
        print("Path: " + url)

        req = reader.Request(url, headers=self.headers)
        resp = reader.urlopen(req)
        self.send_response(resp.code)
        self.send_header('set-cookie', resp.headers['set-cookie'])
        self.send_header('content-type', resp.headers['content-type'])
        self.end_headers()
        self.copyfile(resp, self.wfile)
        resp.close()

    def do_proxy_POST(self):
        url = self.translate_path(self.path)
        print("Path: " + url)
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        req = reader.Request(url, data=post_data)
        resp = reader.urlopen(req)
        self.send_response(resp.code)
        self.send_header('set-cookie', resp.headers['set-cookie'])
        self.send_header('content-type', resp.headers['content-type'])
        self.end_headers()
        self.copyfile(resp, self.wfile)
        resp.close()
        #self.send_response(resp.code)
         
    def do_GET(self):
        if self.path.startswith('/app/'):
            self.do_proxy_GET()
            return
        print("path: " + self.path)
        return SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
        if self.path.startswith('/app/'):
            self.do_proxy_POST()
            return
        self.send_response(HTTPStatus.METHOD_NOT_ALLOWED)
        self.end_headers()
        
        

if __name__ == '__main__':
    # start server
    httpd = HTTPServer(('localhost', 8080), MyHandler)
    httpd.serve_forever()
