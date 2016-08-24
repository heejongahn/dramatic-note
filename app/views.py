from flask import render_template, jsonify, request

from app import app, db
from app.models import Memo, Label

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('main.html')

def memo_to_json(memo):
    return { 'title': memo.title, 'body': memo.body,
            'modifiedAt': memo.modifiedAt,
            'labelIds': [str(label.id) for label in memo.labels]}

def label_to_json(label):
    return { 'name': label.name, 'memoIds': [str(memo.id) for memo in label.memos] }

@app.route('/all_data')
def all_data():
    memo_dict = {}
    for memo in Memo.query.all():
        memo_dict[memo.id] = memo_to_json(memo)

    label_dict = {}
    for label in Label.query.all():
        label_dict[label.id] = label_to_json(label)

    result = {'memos': memo_dict, 'labels': label_dict}
    return jsonify(result=result)

@app.route('/label', methods=['POST'])
def create_label():
    payload = request.get_json()
    label = Label(payload['name'])
    db.session.add(label)
    db.session.commit()

    result = {'id': label.id, 'label': label_to_json(label)}

    return jsonify(result=result)

@app.route('/label/<id>', methods=['PUT', 'DELETE'])
def edit_or_delete_label(id):
    label = Label.query.get(id)

    if request.method == 'PUT':
        payload = request.get_json()
        label.name = payload['name']

        db.session.add(label)
        db.session.commit()

        result = {'id': id, 'label': label_to_json(label)}

    else:
        db.session.delete(label)
        db.session.commit()

        result = {'id': id}

    return jsonify(result=result)

@app.route('/memo', methods=['POST'])
def create_memo():
    payload = request.get_json()
    memo = Memo(payload['title'], payload['body'], payload['modifiedAt'], [])
    db.session.add(memo)
    db.session.commit()

    result = {'id': memo.id, 'memo': memo_to_json(memo)}

    return jsonify(result=result)

@app.route('/memo/<id>', methods=['PUT', 'DELETE'])
def edit_or_delete_memo(id):
    memo = Memo.query.get(id)

    if request.method == 'PUT':
        payload = request.get_json()
        memo.title = payload['title']
        memo.body = payload['body']
        memo.modifiedAt = payload['modifiedAt']

        db.session.add(memo)
        db.session.commit()

        result = {'id': id, 'memo': memo_to_json(memo)}


    else:
        db.session.delete(memo)
        db.session.commit()

        result = {'id': id}

    return jsonify(result=result)

@app.route('/memos', methods=['DELETE'])
def delete_memos():
    ids = request.get_json()['ids']
    for id in ids:
        memo = Memo.query.get(id)
        db.session.delete(memo)
        db.session.commit()

    result = {'ids': ids}

    return jsonify(result=result)

@app.route('/label/<labelId>/memos', methods=['POST', 'DELETE'])
def add_or_remove_label(labelId):
    payload = request.get_json()
    label = Label.query.get(labelId)
    memos = [Memo.query.get(memo_id) for memo_id in payload['memoIds']]

    if request.method == 'POST':
        for memo in memos:
            if memo not in label.memos:
                label.memos.append(memo)
                db.session.add(memo)

    else:
        for memo in memos:
            if memo in label.memos:
                label.memos.remove(memo)
                db.session.add(memo)

    db.session.add(label)
    db.session.commit()

    result = {'id': labelId, 'label': label_to_json(label), 'memoIds':
            payload['memoIds']}

    return jsonify(result=result)
