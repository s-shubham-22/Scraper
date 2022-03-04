from bs4 import BeautifulSoup
import requests
import sys, json

data = {
    'url': 'https://www.flipkart.com/search?q=keayboard&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off',
    'selectors': ['#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(2) > div > div > div > a.s1Q9rs', '#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2) > div:nth-child(2) > div > div > div > a._8VNy32 > div._25b18c > div._30jeq3'],
    'labels': ['Label 1', 'Label 2'],
    'array': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}

url = data['url']
selectors = data['selectors']
labels = data['labels']
html_text = requests.get(url).text
soup = BeautifulSoup(html_text, 'lxml')
newdata = {}

for i in range(len(selectors)):
    newdata[labels[i]] = [item.text for item in soup.select(selectors[i])]

# Print the data in stringified
# json format so that we can
# easily parse it in Node.js
print(newdata)
print(json.dumps(newdata))