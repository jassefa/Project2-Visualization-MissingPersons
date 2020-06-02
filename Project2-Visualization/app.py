from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask import request


# Create an instance of our Flask app.
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI']= "postgresql://postgres:postgres@localhost:5432/missingpersons_db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db= SQLAlchemy(app)

class missingGender(db.Model):
        __tablename__ = 'final_missing'
        # __table_args__={'extend_existing': True}
        date = db.Column(db.Date, primary_key=True)
        male = db.Column(db.Integer)
        female = db.Column( db.Integer)
        total = db.Column(db.Integer)
    
db.create_all()

# Set route
@app.route('/')
def index():

    return render_template('index1.html')

# Set route
@app.route('/missingAge')
def index1():

    return render_template('missingState.html')

# Set route
@app.route('/missingGender')
def index2():

    return render_template('missingGender.html')

# Set route
@app.route('/missingDemo')
def index3():

    return render_template('missingDemo.html')

    # Set route
@app.route('/monthToMonth')
def index4():

    return render_template('monthToMonth.html')

    # Set route
@app.route('/comparison')
def index5():

    return render_template('comparison.html')

@app.route('/api_output', methods=["GET"])
def output():


    if request.method=="GET":
        print("test")
        missing_FM = missingGender.query.all()
        for i in missing_FM:
            print(i.male)


        print(missing_FM[0])
        results = [
            {
                "date": final_missing.date,
                "female": final_missing.female,
                "male": final_missing.male,
                "total": final_missing.total
            } for final_missing in missing_FM]
        return {"count": len(results), "Missing": results}
        print(missing_FM)
    # Return the template with the list passed in
    return jsonify(missing_FM)


if __name__ == "__main__":
    app.run(debug=True)
