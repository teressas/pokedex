from flask_app import app, bcrypt
from flask import render_template, redirect, request, session, flash, jsonify

@app.route('/')
def index():
    return render_template('index.html')

