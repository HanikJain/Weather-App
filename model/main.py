import json 
import weather_prediction_model
import os



with open(os.path.abspath("./json/weatherData.json")) as f:
  data = json.load(f)
weatherData = [ data['weatherData'][k] for k in data['weatherData']]  

model = weather_prediction_model.model

def testModel(weatherData, Classifier):
  return Classifier.predict([weatherData])  


str = ""
output = testModel(weatherData, model)
str_output = str.join(output)


data['output'] = str_output
print(str_output)
with open(os.path.abspath("./json/weatherData.json"), 'w') as json_file:
  json.dump(data, json_file)
