import numpy as np
import matplotlib.pyplot as plt
import plotly.graph_objects as go
import xml.etree.ElementTree as ET
from validator import validate


filename = "c:/xd/schema.xsd"
response = ("http://localhost:3000/countries/")

tree = ET.parse(response)
myxml = tree.getroot()

elements = myxml['data']

if validate(myxml, filename):

    fig = go.Figure(data=[ 
        go.Bar(name='Male', x=[x['Country'] for x in elements], y=[x['Suicide_rate'] for x in elements]),
        go.Bar(name='Female', x=[x['Country'] for x in elements], y=[x['Suicide_rate'] for x in elements])
        
    ])
    # Change the bar mode
    fig.update_layout(barmode='group')
    fig.show()
else :
    print("Validation failed!")



