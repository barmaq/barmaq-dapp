from flask import Flask, render_template
from version import VERSION


app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html", version=VERSION)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
