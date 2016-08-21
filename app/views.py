from flask import render_template, jsonify

from app import app

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('main.html')

@app.route('/all_data')
def all_data():
    dummy_memo = {
            "title": "메모 제목",
            "body": "메모 내용 하하하",
            "modifiedAt": 1471758447,
            "labeIds": [1, 2]
            }

    memo_dict = {1: dummy_memo, 2: dummy_memo}

    # memo_dict = {}
    # for memo in Memo.query.all():
    #     memo_dict[memo.id] = {
    #             "title": memo.title,
    #             "body": memo.body,
    #             "modifiedAt": memo.modifiedAt,
    #             "labelIds": [str(label.id) for label in memo.labels]
    #             }

    dummy_label = {
            "name": "라벨 이름",
            "memoIds": [1, 2]
            }

    label_dict = {1: dummy_label, 2: dummy_label, 3:dummy_label }

    # label_dict = {}
    # for label in Label.query.all():
    #     label_dict[label.id] = {
    #             "name": label.name,
    #             "memoIds": [memo.id for memo in label.memos]
    #             }

    return jsonify(memos=memo_dict, labels=label_dict)
