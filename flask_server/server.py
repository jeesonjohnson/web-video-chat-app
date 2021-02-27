from flask import Flask, render_template, request
import pickle
app = Flask(__name__)

def detecting_fake_news(var):    
#retrieving the best model for prediction call
    load_model = pickle.load(open('Fake_News_Detection-master/final_model.sav', 'rb'))
    prediction = load_model.predict([var])
    prob = load_model.predict_proba([var])

    return prediction[0] , prob[0][1]

@app.route('/', methods=['POST', 'GET'])
def index():

   if request.method == 'POST':

      
      content = request.form['content']
      pred, prob = detecting_fake_news(content)

      return "This news is " +str(pred)+ " With a prob of "+ str(prob)
      
   else: 
      return render_template('index.html')


if __name__ == '__main__':
   app.run()