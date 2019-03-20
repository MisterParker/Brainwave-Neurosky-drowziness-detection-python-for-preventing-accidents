# main.py

from flask import Flask, render_template, Response
from drowsiness_detect import *
import requests
# from drowsiness_detect import VideoCamera

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

def gen(camera):
    while True:
        frame = camera.getFrame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen(VideoCamera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/getdata')
def get_data():
    res = requests.get('http://localhost:3000/getdata')
    print(res.content)
    return res.content

@app.route('/displaychart')
def display_chart():
    return render_template('chart.html')

if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True, threaded=True)