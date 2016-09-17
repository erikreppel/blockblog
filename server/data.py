import redis


def set_data(user_id, post_id, data):
    r = redis.StrictRedis(host='localhost', port=6379, db=0)
    key = user_id + str(post_id)
    r.set(key, data)


def get_data(user_id, post_id):
    r = redis.StrictRedis(host='localhost', port=6379, db=0)    
    key = user_id + str(post_id)
    data = r.get(key)
    return data
