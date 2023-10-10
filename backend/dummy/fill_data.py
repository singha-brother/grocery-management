import requests

products = []
categories = []
items = [
    {
        "id": 1,
        "name": "Accessories",
    },
    {
        "id": 2,
        "name": "Appliances",
    },
    {
        "id": 3,
        "name": "Clothing",
    },
    {
        "id": 4,
        "name": "Electronics",
    },
    {
        "id": 5,
        "name": "Footwear",
    },
    {
        "id": 6,
        "name": "Health & Beauty",
    }
]

for item in items:
    data = {
        "name": item["name"],
        "is_active": True
    }

    requests.post('http://localhost:3000/api/categories',
                  json=data)
with open('./product.csv') as f:
    lines = f.readlines()
    for line in lines:
        line = line.strip()
        name, sale_price, buy_price, category, uom = line.split(', ')
        # categories.append(category)
        for item in items:
            # print(item['id'])
            if category == item['name']:
                categories.append(item['id'])
                products.append({
                    "name": name,
                    "sale_price": sale_price,
                    "buy_price": buy_price,
                    "category": item['id'],
                    "unit": uom
                })


url = 'http://localhost:3000/api/products'
for product in products:
    data = {
        "name": product["name"],
        "description": "",
        "buy_price": float(product["buy_price"]),
        "sale_price": float(product["sale_price"]),
        "quantity": 0,
        "unit": product["unit"],
        "category_id": product["category"]
    }

    x = requests.post(url, json=data)
    print(x.text)
