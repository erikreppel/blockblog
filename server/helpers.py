import json


def load_entity(ent):
    if ent:
        data = dict(ent)
        data['following'] = json.loads(data['following'])
        data['posts'] = json.loads(data['posts'])
        return data
    else:
        return {}


def make_entity(data):
    if data:
        data['following'] = json.dumps(data['following'])
        data['posts'] = json.dumps(data['posts'])
        return data
    else:
        return {}
