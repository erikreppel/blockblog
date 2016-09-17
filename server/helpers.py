def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not is_authed(session):
            # Redirect to Login page here
            return redirect('/')
        return f(*args, **kwargs)
    return decorated