from flask import (Flask,
                   request,
                   jsonify,
                   session,
                   redirect,
                   render_template,
                   make_response)
from gcloud import datastore
import requests
import helpers
import data
from functools import wraps
import json
import hashlib
import time

app = Flask(__name__, static_url_path='/static')
app.secret_key = '@mgonto'
client = datastore.Client()


def user_id_from_session(session):
    user_info = session['profile']
    return hashlib.sha256(
            user_info['nickname'] + user_info['user_id']
        ).hexdigest()[:7]


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
        'client_id': '35xtzL9xQ3onulOU5JhFrLgrKni1Lrya',
        'client_secret': 'VIVKgyzQ2WtmZp0XaIcJGyOOEye11KiIppG2a5kJWTKDgrlikwK2io9mOLOpqKLk',
        'redirect_uri': 'http://localhost:3005/',
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
    user_id = hashlib.sha256(
            user_info['nickname'] + str(user_info['user_id'])
        ).hexdigest()[:7]
    session['profile'] = user_info
    key = client.key('Users', user_id)
    resp = client.get(key)
    if not resp:
        entity = datastore.Entity(key=key)
        new_user = {
            'username': user_info['nickname'],
            'signup_timestamp': time.time(),
            'following': [],
            'posts': []
        }
        entity.update(helpers.make_entity(new_user))
        client.put(entity)
    # Redirect to the User logged in page that you want here
    # In our case it's /dashboard
    return redirect('/')


@app.route('/post', methods=['GET', 'POST'])
# @requires_auth
def hande_new_post():
    if request.method == "POST":
        # if is_authed(session):
        body = request.json
        post_id = hashlib.sha256(json.dumps(body)).hexdigest()[:11]
        data.submit_post(body['user_id'], post_id, body)
        return jsonify({"id": post_id, "success": True})
        # else:
        #     return 400

    if request.method == "GET":
        post_id = request.args.get('post_id')
        user_id = request.args.get('user_id')
        print user_id, post_id
        return jsonify(data.get_data(user_id, post_id))
    else:
        return 400


@app.route('/')
def index():
    if is_authed(session):
        user_id = user_id_from_session(session)
        response = make_response(render_template("index.html"))
        response.set_cookie('username', session['profile']['nickname'])
        response.set_cookie('user_id', user_id)
        return response
    else:
        return render_template('login.html')


@app.route('/user/<user_id>')
def user_page(user_id):
    resp = make_response(render_template("profile.html"))
    key = datastore('User', user_id)
    user = helpers.load_entity(client.get(key))
    resp.set_cookie('user_id', user_id)
    resp.set_cookie('username', user['username'])
    return resp


@app.route('/users/<username>/follow', methods=['POST'])
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
    profile = helpers.load_entity(client.get(key))
    profile['following'].append(body['user_id'])
    entity = datastore.Entity(key=key)
    entity.update(helpers.make_entity(profile))
    return 200


@app.route('/users/<user_id>')
def get_posts(user_id):
    if request.headers.get('Content-Type') == 'application/json':
        print 'here'
        key = client.key('Users', user_id)
        client_response = client.get(key)
        if client_response:
            user = helpers.load_entity(client_response)
            resp = make_response(jsonify(user))
            resp.set_cookie('user_id', user_id)
            resp.set_cookie('username', user['username'])
            # key = client.key('Users', user)
            # profile = helpers.load_entity(client.get(key))
            return resp
        else:
            print 'error'
            return 500
    else:
        return 403


if __name__ == '__main__':
    app.run(port=3005, debug=True)
