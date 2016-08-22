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
