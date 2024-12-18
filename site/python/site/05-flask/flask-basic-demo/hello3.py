from flask import Flask, url_for, request, render_template
app = Flask(__name__)

# support html methods


@app.route('/login', methods=['GET', 'POST', 'PUT', 'DELETE'])
def login():
    if request.method == 'GET':
        return 'This is get page'
    elif request.method == 'POST':
        return 'This is post page'
    elif request.method == 'PUT':
        return 'This is put page'
    else:
        return 'This is null page'

# use postman to test get and post methods


@app.route('/setting', methods=['GET', 'POST'])
def settting():
    # searchword = request.args.get('q', '')
    # get severals from URL
    error = None
    username = None
    password = None
    if request.method == 'POST':
        username = request.args.get('username', '')
        password = request.args.get('password', '')
        # database login and check user and name
        # if valid_login(request.form['username'], request.form['password']):
        #   return log_the_user_in(request.form['username'])
        # else:
        #   error = 'Invalid username/password'
    return 'username is %s \n' % username + 'password is %s' % password
    # return render_template('setting.html', error=error)


if __name__ == '__main__':
    app.debug = True
    app.run()
