from app import app, db
from app.models import Label, Memo

import random
import time

if __name__ == "__main__":
    db.drop_all()
    db.create_all()
    for i in range(10):
        label = Label("{}번째 라벨".format(i + 1))
        db.session.add(label)
        db.session.commit()

    for i in range(30):
        memo = Memo("{}번째 메모".format(i + 1),
                "내용내용내용내용내용내용내용내용내용",
                int(time.time() * 1000 * 0.95),
                [])
        db.session.add(memo)
        db.session.commit()

    for i in range(100):
        label = random.choice(Label.query.all())
        memo = random.choice(Memo.query.all())

        if label not in memo.labels:
            memo.labels.append(label)
            db.session.add(memo)
            db.session.commit()

    app.run(debug = True)
