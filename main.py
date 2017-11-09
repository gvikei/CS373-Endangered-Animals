# Copyright 2016 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START app]
import logging

# [START imports]
from flask import Flask, render_template, request
# [END imports]

# [START create_app]
app = Flask(__name__)
# [END create_app]

@app.route('/')
def main():
    return render_template('react-bootstrap/public/src/HomePage.js')


# [START about]
@app.route('/about')
def about():
    return render_template('react-bootstrap/public/src/About.js')
# [END form]

# [START animals]
@app.route('/animals')
def animals():
    return render_template('react-bootstrap/public/src/Animals.js')
# [END animals]

# [START countries]
@app.route('/countries')
def countries():
    return render_template('react-bootstrap/public/src/Country.js')
# [END countries]

# [START habitats]
@app.route('/habitats')
def habitats():
    return render_template('react-bootstrap/public/src/Habitats.js')
# [END habitats]

# [START threats]
@app.route('/threats')
def threats():
    return render_template('react-bootstrap/public/src/Threats.js')
# [END threats]

@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500
# [END app]
