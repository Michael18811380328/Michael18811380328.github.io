#!/usr/bin/python

import sqlite3

conn = sqlite3.connect('test.db')

print(conn)

print("Opened database successfully")
