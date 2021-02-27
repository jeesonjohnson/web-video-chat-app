from flask import Flask, render_template
app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def index():
   if request.method == 'POST':
      pass
   else: 
      return render_template('index.html')



@app.route('/upload')
def upload():
   return render_template('upload.html')


if __name__ == '__main__':
   app.run()