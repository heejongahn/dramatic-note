import os
basedir = os.path.abspath(os.path.dirname(__file__))

# SQLAlchemy
if os.environ.get('DATABASE_URL') is None:
    SQLALCHEMY_DATABASE_URI = (
                'sqlite:///' + os.path.join(basedir, 'dramatic.db') +
                '?check_same_thread=False')
else:
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
