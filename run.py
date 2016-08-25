from app import app, db
from app.models import Label, Memo

import random
import time

if __name__ == "__main__":
    try:
        db.create_all()
    except:
        pass

    app.run(debug = True)
