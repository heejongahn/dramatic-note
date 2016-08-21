from flask import render_template, jsonify, request

from app import app
from app.models import Memo, Label

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('main.html')

@app.route('/all_data')
def all_data():
    memo_dict = {}
    for memo in Memo.query.all():
        memo_dict[memo.id] = {
                "title": memo.title,
                "body": memo.body,
                "modifiedAt": memo.modifiedAt,
                "labelIds": [str(label.id) for label in memo.labels]
                }

    label_dict = {}
    for label in Label.query.all():
        label_dict[label.id] = {
                "name": label.name,
                "memoIds": [memo.id for memo in label.memos]
                }

    result = {"memos": memo_dict, "labels": label_dict}
    return jsonify(result=result)
