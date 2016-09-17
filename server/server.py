from flask import (Flask,
                   request,
                   jsonify,
                   session,
                   redirect,
                   render_template,
                   make_response)
from gcloud import datastore
import requests
# import helpers
import data
from functools import wraps
import json
from random import randint
import hashlib
import time

app = Flask(__name__)
app.secret_key = '@mgonto'
client = datastore.Client()


def user_id_from_session(session):
    user_info = session['profile']
    return hashlib.sha256(user_info['nickname'] + user_info['user_id'])


def is_authed(session):
    return 'profile' in session


def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'profile' not in session:
            # Redirect to Login page here
            return redirect('/')
        return f(*args, **kwargs)
    return decorated


@app.route('/callback')
def callback_handling():
    code = request.args.get('code')

    json_header = {'content-type': 'application/json'}

    token_url = "https://{domain}/oauth/token".format(domain='erikreppel.auth0.com')

    token_payload = {
        'client_id': 'M3Iy4EYCRTD7uaGpBCE5nfAXMsCukFAV',
        'client_secret': 'iF7KTOHLyPb8zZUgZMaDak4jIXfu2LDEVPr6FWoSqtBWBxy8xxqJysOHM9d9FdP1',
        'redirect_uri': 'http://localhost:3000/protected',
        'code': code,
        'grant_type': 'authorization_code'
    }
    token_info = requests.post(token_url,
                               data=json.dumps(token_payload),
                               headers=json_header
                               ).json()

    user_url = "https://{domain}/userinfo?access_token={access_token}" \
        .format(domain='erikreppel.auth0.com',
                access_token=token_info['access_token'])

    user_info = requests.get(user_url).json()
    # We're saving all user information into the session
    user_id = hashlib.sha256(user_info['nickname'] + user_info['user_id'])
    session['profile'] = user_info
    key = client.key('Users', user_id)
    resp = client.get(key)
    if not resp:
        client.put(key, {'user_info': user_info,
                         'signup_time': time.time(),
                         'following': [],
                         'posts': {}})
    # Redirect to the User logged in page that you want here
    # In our case it's /dashboard
    return redirect('/')


@app.route('/')
def index():
    if is_authed(session):
        return "Newsfeed goes here"
        # return render_template('newsfeed.html')
    else:
        return render_template('index.html')


@app.route('/<username>')
def user_page(username):
    resp = make_response(render_template("user.html"))  # change this
    resp.set_cookie('username', username)
    return resp


@app.route('/<username>/follow', methods=['POST'])
@requires_auth
def follow_new_user(username):
    if request.method != 'POST':
        return 405

    user_id = request.args.get('user_id')
    body = request.json
    user_id = user_id_from_session(session)
    if user_id != username:
        return 403
    key = client.key('Users', user_id)
    profile = client.get(key)
    profile['following'].append(body['user_id'])
    client.put(key, profile)
    return 200


@app.route('/<user>/posts')
def get_posts(user):
    if request.headers.get('Content-Type') == 'application/json':
        key = client.key('Users', user)
        profile = client.get(key)
        return profile['posts']
    else:
        return 403


@app.route('/post', methods=['GET', 'POST'])
# @requires_auth
def hande_new_post():
    if request.method == "POST":
        if is_authed(session):
            body = request.json
            post_id = randint(0, 100000)
            data.set_data(body['user_id'], post_id, body)
            return jsonify({"id": post_id, "success": True})
        else:
            return 400

    if request.method == "GET":
        post_id = request.args.get('post_id')
        user_id = request.args.get('user_id')
        print user_id, post_id
        return jsonify(data.get_data(user_id, post_id))
    else:
        return 400

if __name__ == '__main__':
    app.run(port=3000, debug=True)
