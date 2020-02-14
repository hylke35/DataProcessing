import json
import requests
import numpy as np
import matplotlib.pyplot as plt
import plotly.graph_objects as go
from xml.etree import ElementTree
import xml.etree.ElementTree as ET
from lxml import etree
from jsonschema import validate

# Create arrays to be used for pulling data from API
maleArray = []
femaleArray = []
happyArray = []

# Path to schema used for validation
filename = "schema.xsd" 
parser = etree.XMLParser(recover=True)

# Request XML from localhost
headers = {"content-type": "application/xml"}
rm = requests.get("http://localhost:3000/world_select/countries_male/", headers=headers)
rf = requests.get("http://localhost:3000/world_select/countries_female/", headers=headers)
rh = requests.get("http://localhost:3000/world_select/countries_groupby", headers=headers)

# Get content from XML
root_male = ElementTree.fromstring(rm.content, parser=parser)
root_female = ElementTree.fromstring(rf.content, parser=parser)
root_happy = ElementTree.fromstring(rh.content, parser=parser)

# Convert content from XML to string
rmcontent_string = rm.content.decode("utf-8")
rfcontent_string = rf.content.decode("utf-8")
rhcontent_string = rh.content.decode("utf-8")

# Parse XSD Schema
xmlschema_doc = etree.parse(filename)
xmlschema = etree.XMLSchema(xmlschema_doc)

# Allow string to be read as XML
root_male = etree.fromstring(rmcontent_string)
root_female = etree.fromstring(rfcontent_string)
root_happy = etree.fromstring(rhcontent_string)

# Validate XML pulled for database
if(xmlschema.validate(root_male) == True) and (xmlschema.validate(root_female) == True) and (xmlschema.validate(root_happy) == True) :

    number = 0

    # Loop through XML and add every entry to personal map and then add that map to a array
    for number in range(0, 61):
        child = root_male[number]
        test_male = {}
        for i in child:
            test_male[str(i.tag)] = i.text
        maleArray.append(test_male)

    # Loop through XML and add every entry to personal map and then add that map to a array
    for number in range(0, 61):
        child = root_female[number]
        test_female = {}
        for i in child:
            test_female[str(i.tag)] = i.text
        femaleArray.append(test_female)

    # Loop through XML and add every entry to personal map and then add that map to a array
    for number in range(0, 61):
        child = root_happy[number]
        test_happy = {}
        for i in child:
            test_happy[str(i.tag)] = i.text
        happyArray.append(test_happy)    

    # Create bar chart pulling data from arrays
    fig = go.Figure(data=[ 
        go.Bar(name='Male', x=[x['Name'] for x in maleArray], y=[y['Suicide_rate'] for y in maleArray]),
        go.Bar(name='Female', x=[x['Name'] for x in femaleArray], y=[x['Suicide_rate'] for x in femaleArray])
    ])

    fig2 = go.Figure(data=[
        go.Bar(name='Happiness Index', x=[x['Name'] for x in happyArray], y=[y['Score'] for y in happyArray])
    ])

    # Update the layout of graphs
    fig.update_layout(title="Suicide rate among 15 year old millenials", barmode='group', xaxis_title="Countries", yaxis_title="Suicide Rate")
    fig2.update_layout(title="Happiness index in countries", barmode='group', xaxis_title="Countries", yaxis_title="Happiness Index")

    # Show graph
    fig.show()
    fig2.show()

    print("XML Validation completed!")

else :

    print("XML Validation failed!")









