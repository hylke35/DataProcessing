import json
import requests
import numpy as np
import matplotlib.pyplot as plt
import plotly.graph_objects as go
from jsonschema import validate

# Path to schema used for validation
filename = "c:/xd/schema.json"

# Request data from database
response = requests.get("http://localhost:3000/countries_male/")
response2 = requests.get("http://localhost:3000/countries_female/")
response3 = requests.get("http://localhost:3000/countries_groupby/")

# Open schema and read
with open(filename, 'r') as f:
    data=f.read()
schema = json.loads(data)

# Convert response into variable    
my_json = response.json()
my_json2 = response2.json()
my_json3 = response3.json()

# Pull 'data' from json file
elements = response.json()['data']
elements2 = response2.json()['data']
elements3 = response3.json()['data']

# Validate json to schema
if validate(instance=my_json, schema=schema) == None and validate(instance=my_json2, schema=schema) == None and validate(instance=my_json2, schema=schema) == None:

    # Create bar chart based off data pulled with JSON from database
    fig = go.Figure(data=[ 
        go.Bar(name='Male', x=[x['Country'] for x in elements], y=[x['Suicide_rate'] for x in elements]),
        go.Bar(name='Female', x=[x['Country'] for x in elements2], y=[x['Suicide_rate'] for x in elements2])
    ])

    fig2 = go.Figure(data=[
        go.Bar(name='Happiness Index', x=[x['Country'] for x in elements3], y=[x['Score'] for x in elements3])
    ])

    # Change the bar mode
    fig.update_layout(title="Suicide rate among 15 year old millenials", barmode='group', xaxis_title="Countries", yaxis_title="Suicide Rate")
    fig2.update_layout(title="Happiness index in countries", barmode='group', xaxis_title="Countries", yaxis_title="Happiness Index")


    # Show graph
    fig.show()
    fig2.show()

    print("JSON Validation completed!")
else :
    print("JSON Validation failed!")



