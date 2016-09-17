from flask import Flask, request, jsonify, session, redirect, render_template, send_from_directory, render_template
from functools import wraps
import requests
import helpers
import data
import json
from random import randint

app = Flask(__name__)
app.secret_key = '@mgonto'

def is_authed(session):
    return 'profile' in session

@app.route('/callback')
def callback_handling():
    code = request.args.get('code')

    json_header = {'content-type': 'application/json'}

    token_url = "https://{domain}/oauth/token".format(domain='erikreppel.auth0.com')

    token_payload = {
    'client_id':     'M3Iy4EYCRTD7uaGpBCE5nfAXMsCukFAV',
    'client_secret': 'iF7KTOHLyPb8zZUgZMaDak4jIXfu2LDEVPr6FWoSqtBWBxy8xxqJysOHM9d9FdP1',
    'redirect_uri':  'http://localhost:3000/protected',
    'code':          code,
    'grant_type':    'authorization_code'
    }
    token_info = requests.post(token_url, data=json.dumps(token_payload), headers = json_header).json()

    user_url = "https://{domain}/userinfo?access_token={access_token}" \
        .format(domain='erikreppel.auth0.com', access_token=token_info['access_token'])

    user_info = requests.get(user_url).json()

    # We're saving all user information into the session
    session['profile'] = user_info

    # Redirect to the User logged in page that you want here
    # In our case it's /dashboard
    return redirect('/protected')

@app.route('/')
def index():
    if is_authed(session):
        return "Newsfeed goes here"
        # return render_template('newsfeed.html')
    else:
        return render_template('index.html')

@app.route('/<username>')
def user_page(username):
    resp = make_response(render_template("user.html")) # change this
    resp.set_cookie('username', username)
    return resp

@app.route('/post', methods=['GET', 'POST'])
@helpers.requires_auth
def hande_new_post():
    if request.method == "POST":
        body = request.json
        post_id = randint(0, 100000)
        data.set_data(body['user_id'], post_id, body)
        return jsonify({"id": post_id, "success": True})

    if request.method == "GET":
        post_id = request.args.get('post_id')
        user_id = request.args.get('user_id')
        print user_id, post_id
        return jsonify(data.get_data(user_id, post_id))

if __name__ == '__main__':
    app.run(port=3000, debug=True)
