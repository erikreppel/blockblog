import json


def load_entity(ent):
    data = dict(ent)
    data['following'] = json.loads(data['following'])
    data['posts'] = json.loads(data['posts'])
    return data


def make_entity(data):
    data['following'] = json.dumps(data['following'])
    data['posts'] = json.dumps(data['posts'])
    return data