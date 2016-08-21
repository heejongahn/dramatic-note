from app import db

memo_label = db.Table(
        'memo_label',
        db.Column('memo_id', db.Integer, db.ForeignKey('memo.id')),
        db.Column('label_id', db.Integer, db.ForeignKey('label.id')))


class Memo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120))
    body = db.Column(db.Text)
    modifiedAt = db.Column(db.Integer)
    labels = db.relationship(
            'Label',
            secondary=memo_label,
            backref=db.backref('memos', lazy='dynamic'))

    def __init__(self, title, body, modifiedAt, labels):
        self.title = title
        self.body = body
        self.modifiedAt = modifiedAt
        self.labels = labels

class Label(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)

    def __init__(self, name):
        self.name = name
