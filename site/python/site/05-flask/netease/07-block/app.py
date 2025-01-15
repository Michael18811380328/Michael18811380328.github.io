from flask import Flask, render_template
import sqlite3

app = Flask(__name__)


@app.route('/')
def init():
    return render_template('index.html')


@app.route('/login/')
def login():
    conn = sqlite3.connect('test.db')
    print("Opened database successfully")
    c = conn.cursor()
    # c.execute('''CREATE TABLE COMPANY
    #        (ID INT PRIMARY KEY     NOT NULL,
    #        NAME           TEXT    NOT NULL,
    #        AGE            INT     NOT NULL,
    #        ADDRESS        CHAR(50),
    #        SALARY         REAL);''')
    print("Table created successfully")
    # conn.commit()
    conn.close()

    return render_template('login.html')


if __name__ == '__main__':
    app.run(debug=True)
