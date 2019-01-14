#!/usr/bin/python
# -- coding: utf-8 --

import json
import requests
import pprint
import MySQLdb
import time
import random


def cleanString(upc):
    sub = upc[0:4]
    upc = list(upc)
    if "0075" in sub:
        del(upc[len(upc)-1])
        upc = "".join(upc)
    elif  "075" in sub:
        del(upc[len(upc)-1])
        upc = "".join(upc)
        upc = "0"+upc
    elif  "75" in sub:
        del(upc[len(upc)-1])
        upc = "".join(upc)
        upc = "0"+upc
    else:
        upc = "".join(upc)
    return upc


def LoadUserAgents(uafile):
    uas = []
    with open(uafile, 'rb') as uaf:
        for ua in uaf.readlines():
            if ua:
                uas.append(ua.strip())
    random.shuffle(uas)
    return uas

# load the user agents, in random order
uas = LoadUserAgents("user-agents.txt")
ua = random.choice(uas)  # select a random user agent
headers = {
    "Connection" : "close",  # another way to cover tracks
    "User-Agent" : ua}
url = 'https://www.superama.com.mx/buscador/resultado'
proxy = {
	"http": "http://username:p3ssw0rd@10.10.1.10:3128",
}

db = MySQLdb.connect(host="192.241.142.12",    # your host, usually localhost
                    user="scanmarketpro",         # your username
                    passwd="scanmarket@.",  # your password
                    db="scanmarket_p")        # name of the data base

cursor = db.cursor()

cursor.execute("SELECT * FROM products WHERE productpic IS NULL;")

productos = list()
results = cursor.fetchall()
for row in results:
    productos.append({'idProducto': int(row[0]),
                    'code': row[3]})
db.close()
file = open("scrap.txt","w")
price = open("prices.txt","w")

for dat in productos:
    # print(cleanString(dat['code']))
    params = dict(
        busqueda = dat['code']
    )

    data = requests.get(url, proxies=proxy, params=params, headers=headers)
    # print(data.text)    

    binary = data.content
    output = json.loads(binary)

    if(len(output['Products']) > 0):
        # print(dat['idProducto'])
        # print(output['Products'][0]['PrecioNumerico'])
        # print(output['Products'][0]['DescriptionDisplay'])
        # print(output['Products'][0]['ImageUrl'])
        insert = "UPDATE products SET description='" + \
            output['Products'][0]['DescriptionDisplay'] + \
            "', productpic='" + \
            "https://www.superama.com.mx/"+str(output['Products'][0]['ImageUrl']) + \
            "' WHERE idProduct="+str(dat['idProducto'])+";"
        # print(insert)
        # insertPrice = "INSERT INTO productsprices (idProduct,price, idMarket, numofconfirms, createdAt, updatedAt) VALUES ('"+str(dat['idProducto'])+"','"+str(
        #     output['Products'][0]['PrecioNumerico'])+"', '1', '10', NOW(), NOW());"
         
        file.write(insert.encode("utf8"))
        #price.write(insertPrice)
        print("producto encontrado")
    else:
        print("producto no encontrado")
    # time.sleep(5)
file.close()
price.close()
