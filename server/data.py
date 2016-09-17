from gcloud import datastore
import helpers

client = datastore.Client()


def submit_post(user_id, post_id, data):
    post_key = client.key('Posts', post_id)
    user_key = client.key('Users', user_id)
    user_entity = datastore.Entity(key=user_key)
    post_entity = datastore.Entity(key=post_key)

    current_posts = helpers.load_entity(client.get(user_key))
    current_posts['posts'].append(data)
    user_entity.update(current_posts)
    client.put(user_entity)
    post_entity.update(data)
    client.put(post_entity)


def get_data(user_id, post_id):
    key = client.key('Posts', post_id)
    data = helpers.load_entity(client.get(key))
    return data
