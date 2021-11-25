# __init__.py
from flask import Flask
app = Flask(__name__)


app.secret_key = "shhhhhh"

# !!! pipenv install flask-bcrypt !!!
from flask_bcrypt import Bcrypt   
bcrypt = Bcrypt(app)