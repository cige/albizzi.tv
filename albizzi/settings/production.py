from albizzi.settings.common import *

DEBUG = False

SECRET_KEY = os.environ['SECRET_KEY']

ALLOWED_HOSTS = ['clementgeorge.pythonanywhere.com']

STATIC_ROOT = os.path.join(BASE_DIR, "static")