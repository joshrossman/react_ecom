from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from marshmallow import fields, validate
from marshmallow import ValidationError

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='mysql+mysqlconnector://root:rootPassword1919@localhost/e_commerece_db'
db=SQLAlchemy(app)
ma = Marshmallow(app)
CORS(app)

class CustomerSchema(ma.Schema):  
    name=fields.String(required=True,validate=validate.Length(min=1), error='Enter Valid Name')
    email = fields.String(required=True, validate=validate.Length(min=3), error='Enter Valid Email')
    phone = fields.String(required=True, validate=validate.Length(min=10,max=12), error='Enter Valid phone')

    class Meta:
        fields=('name', 'email', 'phone', 'id')

customer_schema=CustomerSchema()
customers_schema=CustomerSchema(many=True)

class CustomerAccountSchema(ma.Schema):
    id=fields.Integer(required=True)
    username=fields.String(required=True)
    passsword=fields.String(required=True)
    customer_id=fields.Integer(required=True)

    class Meta:
        fields=('id','username','password','customer_id')

account_schema=CustomerAccountSchema()
accounts_schema=CustomerAccountSchema(many=True)

class ProductSchema(ma.Schema):
    name = fields.String(required=True,validate=validate.Length(min=1))
    price = fields.Float(required=True, validate=validate.Range(min=0))
    
    class Meta:
        fields = ('id','name','price')

product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

class OrderSchema(ma.Schema):
    id=fields.Integer()
    date=fields.Date(required=True)
    customer_id=fields.Integer(required=True)
    order_status=fields.String()
    expected_delivery=fields.Date()

    
    
        

    class Meta:
        fields=('id','date','customer_id','order_status','expected_delivery')

order_schema=OrderSchema()
orders_schema=OrderSchema(many=True)

class OrderProductSchema(ma.Schema):
    date=fields.Date(required=True)
    customer_id=fields.Integer(required=True)
    products=fields.List(fields.Integer())

    fields=(date,customer_id,products)

op_schema=OrderProductSchema()
ops_schema=OrderProductSchema(many=True)
class Customer(db.Model):
    __tablename__="customers"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(320))
    phone = db.Column(db.String(12))
    orders= db.relationship('Order',backref='customer')

class Order(db.Model):
    __tablename__= 'orders'
    id= db.Column(db.Integer, primary_key=True)
    date= db.Column(db.Date, nullable=False)
    customer_id=db.Column(db.Integer,db.ForeignKey('customers.id'))
    order_status=db.Column(db.String)
    expected_delivery=db.Column(db.Date)


class CustomerAccount(db.Model):
    __tablename__= 'Customer_Accounts'
    id= db.Column(db.String(255), unique=True, nullable=False, primary_key=True)
    username = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    customer_id = db.Column(db.Integer,db.ForeignKey('customers.id'))
    customer = db.relationship("Customer",backref='customer_account', uselist=False)

#Association table for the many-to-many relationship
class OrderProduct(db.Model):
    __tablename__= 'order_product'
    order_id= db.Column('order_id',db.Integer,db.ForeignKey('orders.id'),primary_key=True)
    product_id=db.Column('product_id', db.Integer, db.ForeignKey('Products.id'), primary_key=True)


    


class Product(db.Model):
    __tablename__= 'Products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    orders = db.relationship('Order', secondary='order_product', backref=db.backref('products'))

with app.app_context():
    db.create_all()

@app.route('/customers', methods=['GET'])
def get_customers():
    customers=Customer.query.all()
    return customers_schema.jsonify(customers)

@app.route('/customers/<int:id>',methods=['GET'])
def get_customer(id):
    customer=Customer.query.get_or_404(id)
    if customer:
        return customer_schema.jsonify(customer)
    else:
        return jsonify({"message":"could not find that id in our database"}),404
@app.route('/customers/add', methods=['POST'])
def add_customer():
    try:
        customer_data= customer_schema.load(request.json)
        new_customer = Customer(name=customer_data['name'], email=customer_data['email'], phone=customer_data['phone'])
        db.session.add(new_customer)
        db.session.commit()
        return jsonify({"message":"New customer added successfully"}),201
    except Exception as e:
        try:
            return jsonify(e), 400
        except:
            return 'Error',500
    
    

@app.route('/customers/<int:id>', methods=['PUT'])
def update_customer(id):
    customer = Customer.query.get_or_404(id)
    try:
        customer_data=customer_schema.load(request.json)
    except ValidationError as e:
        return jsonify(e.messages), 400
    
    customer.name = customer_data['name']
    customer.email = customer_data['email']
    customer.phone = customer_data['phone']
    db.session.commit()
    return jsonify({"message":"customer added"}),200

@app.route('/customers/<int:id>', methods=["DELETE"])
def delete_customer(id):
    customer = Customer.query.get_or_404(id)
    db.session.delete(customer)
    db.session.commit()
    return jsonify({"message":"Customer removed successfully"}),200


@app.route('/customer-accounts',methods=['POST'])
def add_account():
    try:
        customer_account_data=account_schema.load(request.json)
    except ValidationError as e:
        return jsonify({"error":f"{e.messages}"}),400
    
    new_account=CustomerAccount(id=customer_account_data['id'],username=customer_account_data['username'],password=customer_account_data['password'],customer_id=customer_account_data['customer_id'])
    db.session.add(new_account)
    db.session.commit()
    return jsonify({"message":"new account added"}),200
@app.route('/customer-accounts',methods=['GET'])
def get_account():
    accounts=CustomerAccount.query.all()
    return accounts_schema.jsonify(accounts)

@app.route('/customer-accounts/<int:id>',methods=["PUT"])
def update_accounts(id):
    account=CustomerAccount.query.get_or_404(id)
    try:
        account_data=account_schema.load(request.json)
    except ValidationError as e:
        return jsonify({"message":f"{e.messages}"}),404
    account.id=account_data["id"]
    account.username=account_data["username"]
    account.password=account_data["password"]
    account.customer_id=account_data["customer_id"]
    db.session.commit()
    return jsonify({"message":"Customer data updated."}),200

@app.route('/customer-accounts/<int:id>',methods=["DELETE"])
def delete_account(id):
    account=CustomerAccount.query.get_or_404(id)
    db.session.delete(account)
    db.session.commit()
    return jsonify({"message":"user deleted"}),200



@app.route('/products', methods=['POST'])
def add_product():
    try:
        product_data=product_schema.load(request.json)
    except ValidationError as e:
        return jsonify(e.messages),400
    new_product = Product(name=product_data['name'],price=product_data['price'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"message":"product added successfully"}),201

@app.route('/products',methods=['GET'])
def get_products():
    products = Product.query.all()
    return products_schema.jsonify(products)

@app.route('/products/<int:id>',methods=['GET'])
def get_product(id):
    product=Product.query.get_or_404(id)
    if product:
        return product_schema.jsonify(product)
    else:
        return jsonify({"message":"could not find that id in our database"}),404

@app.route('/products/<int:id>',methods=['PUT'])
def update_product(id):
    product = Product.query.get_or_404(id)
    try:
        product_data = product_schema.load(request.json)
    except ValidationError as e:
        return jsonify(e.messages),400
    
    product.name=product_data['name']
    product.price=product_data['price']
    db.session.commit()
    return jsonify({"message":"Product succesfully updated"}),200

@app.route('/products/<int:id>',methods=['DELETE'])
def delete_product(id):    
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message":"Product deleted"})

@app.route('/customers/by-name',methods=['GET'])
def query_customer_by_name():
    email=request.args.get('email')
    customer=Customer.query.filter_by(email=email).first()
    if customer:
        return customer_schema.jsonify(customer)
    
    else:
        return jsonify({"Message":"Customer not found"}),404

@app.route('/products/by-name', methods=['GET'])
def query_product_by_name():
    name=request.args.get('name')
    product=Product.query.filter(Product.name ==name).first()

    if product:
        return product_schema.jsonify(product)
    else:
        return jsonify({"message":"could not find product with this name"}),404


@app.route('/get_order/<int:id>',methods=["GET"])
def get_order(id):
    
    try:
        my_order=Order.query.get_or_404(id)
    except Exception as e:
        jsonify({"Error":f'{e}'})

    products_list=OrderProduct.query.filter(OrderProduct.order_id==id).all()
    product=[]
    for i in range(len(products_list)):
        product.append(products_list[i].product_id)

    #return order_schema.jsonify(my_order), 
    return op_schema.jsonify({"date":my_order.date,"customer_id":my_order.customer_id,"products":product})

@app.route('/order',methods=["POST"])
def new_order():

    data=request.json
    print(f"Received data: {data}") 
   
    try:
        new_order=Order(id=data['id'],date=data['date'],customer_id=data['customer_id'])
        print(f"Created new order: {new_order}")
    except Exception as e:
        return jsonify({"error":f"{e}"}),404
    
    db.session.add(new_order)
    db.session.commit()
    print(f"Order {new_order.id} committed to the database.")
    
    order_products =[]
    for product_id in data["products"]:
        print(f"Adding product with ID: {product_id} to order ID: {new_order.id}")
        order_and_product=OrderProduct(order_id=new_order.id,product_id=product_id)
        order_products.append(order_and_product)

    
    db.session.add_all(order_products)
    db.session.commit()
    print(f"All products added for order {new_order.id}.")
    
    
    return jsonify({"message":"new order added"}),200

@app.route('/order_status/<int:id>')
def order_status(id):
    my_order=Order.query.get_or_404(id)
    if my_order and my_order.order_status is not None:
        return jsonify({"Order Status:":my_order.order_status})
    else:
        return jsonify({"message":"Order status not currently available"})

@app.route('/expected_delivery/<int:id>')
def expected_delivery(id):
    my_order=Order.query.get_or_404(id)
    if my_order and my_order.expected_delivery is not None:
        return jsonify({"Order Status:":my_order.expected_delivery})
    else:
        return jsonify({"message":"Expected delivery not currently available"})


if __name__ == '__main__':
    app.run(debug=True)
