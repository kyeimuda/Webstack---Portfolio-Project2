#!/usr/bin/python3

"""
Workerfy: this is my portfolio project.
A web app at helps people find civil workers
"""

from io import BytesIO
from flask import Flask, redirect, url_for, Response, render_template, request,\
    send_file, flash, session, g, jsonify
import os
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_restful import Resource, Api, fields, marshal_with
from sqlalchemy.sql.expression import func
import redis
import json
import pickle


app = Flask(__name__)
app.secret_key = "Kyeimuda12@*"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///workerfy_db.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
api = Api(app)
bcrypt = Bcrypt(app)
r = redis.Redis()

app.app_context().push()

class workers(db.Model):
    """
    This class stores creates a database colunm  for workers
    """

    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(), nullable=False, unique=True)
    fullname = db.Column(db.String(), nullable=False)
    password = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), nullable=False)
    phone = db.Column(db.Integer(), nullable=False)
    phone2 = db.Column(db.Integer(), nullable=False)
    Location = db.Column(db.String(), nullable=False)
    work_field = db.Column(db.String(), nullable=False)
    description = db.Column(db.String(), nullable=False)
    photos = db.relationship('Photos', backref='worker', lazy=True)


class Photos(db.Model):
    """
    This class stores the images of workers
    """
    
    id = db.Column(db.Integer(), primary_key=True)
    pic_grp = db.Column(db.String(), nullable=False)
    filename = db.Column(db.String(), nullable=False)
    image = db.Column(db.LargeBinary)
    owner_id = db.Column(db.Integer(), db.ForeignKey('workers.id'))
    mimetype = db.Column(db.Text, nullable=False)


@app.route('/', strict_slashes=False)
@app.route('/home', strict_slashes=False)
def homepage():
    """
    Route to  Home page
    """
    return render_template("home.html")


@app.route('/about', strict_slashes=False)
def aboutpage():
    """ Rouye to about page """

    return render_template("about.html")


@app.route('/team', strict_slashes=False)
def teampage():
    """ The team page """

    return render_template("team.html")


@app.route("/worker_account", methods=["POST", "GET"], strict_slashes=False)
def worker_accountpage():
    """ The worker page """

    if request.method == "POST":
        session.pop('user', None)
        username = request.form["username"]
        password = request.form["password"]

        try:
            Worker = workers.query.filter_by(username=username).first()

            if Worker.username == username and bcrypt.check_password_hash(Worker.password, password):
                session['user'] = username
                return render_template('login_page.html',
                                       workerInfo=workers.query.filter_by
                                       (username=session['user']).first())
            else:
                flash("User does not exist")
                return render_template("worker_account.html")
        except:
            flash("User does not exit")
            return render_template("worker_account.html")
    else:
        if g.user:
            return render_template('login_page.html',
                                   workerInfo=workers.query.filter_by
                                   (username=session['user']).first())
        return render_template("worker_account.html")


@app.route("/create", methods=["POST", "GET"], strict_slashes=False)
def createWorker():
    """ creates user in database """

    passed = bcrypt.generate_password_hash(request.form["passwordcreate"])
    if request.method == "POST":
        if request.form["usernamecreate"]:
            username_ = request.form["usernamecreate"]
            fullname_ = request.form["fullname"]
            password_ = passed
            email_ = request.form["email"]
            phone_ = request.form["phone"]
            phone2_ = request.form["otherPhone"]
            location_ = request.form["location"]
            workerfield_ = request.form["workField"]
            description_ = request.form["description"]
            profilepic_ = request.files["profilepicture"]
            image_1 = request.files["image1"]
            image_2 = request.files["image2"]
            image_3 = request.files["image3"]
            image_4 = request.files["image4"]
            image_5 = request.files["image5"]

            try:
                worker = workers(username=username_,
                                 fullname=fullname_, password=password_,
                                 email=email_, phone=phone_, phone2=phone2_,
                                 Location=location_,
                                 work_field=workerfield_,
                                 description=description_)
                db.session.add(worker)
                db.session.commit()

                profilepic = Photos(pic_grp="profileimage",
                                    filename=profilepic_.filename,
                                    image=profilepic_.read(),
                                    owner_id=worker.id, mimetype=profilepic_.mimetype)
                image1 = Photos(pic_grp="Image_1",
                                filename=image_1.filename,
                                image=image_1.read(), owner_id=worker.id, mimetype=image_1.mimetype)
                image2 = Photos(pic_grp="Image_2",
                                filename=image_2.filename,
                                image=image_2.read(), owner_id=worker.id, mimetype=image_2.mimetype)
                image3 = Photos(pic_grp="Image_3",
                                filename=image_3.filename,
                                image=image_3.read(),
                                owner_id=worker.id, mimetype=image_3.mimetype)
                image4 = Photos(pic_grp="Image_4",
                                filename=image_4.filename,
                                image=image_4.read(), owner_id=worker.id, mimetype=image_4.mimetype)
                image5 = Photos(pic_grp="Image_5",
                                filename=image_5.filename,
                                image=image_5.read(), owner_id=worker.id, mimetype=image_5.mimetype)

                db.session.add(profilepic)
                db.session.add(image1)
                db.session.add(image2)
                db.session.add(image3)
                db.session.add(image4)
                db.session.add(image5)
                db.session.commit()

            except:
                flash("Account already exists")
                return render_template("worker_account.html")
            return render_template("worker_page.html", workerInfo=worker)
        else:
            return render_template("worker_account.html")
    else:
        return render_template("worker_account.html")


@app.route("/login", methods=["POST", "GET"], strict_slashes=False)
def login():
    """ login page of user """

    if request.method == "POST":
        if 'user' in session:
            name = session['user']

            if request.form["usernamecreate"] == '':
                pass
            else:
                new = request.form["usernamecreate"]

                worker = workers.query.filter_by(username=name).first()
                worker.username = new
                db.session.commit()

                newWorker = workers.query.filter_by(username=new).first()
                session.pop('user', None)
                session['user'] = new
                name = session['user']

            if request.form["fullname"] == '':
                pass
            else:
                new = request.form["fullname"]
                worker = workers.query.filter_by(username=name).first()
                worker.fullname = new
                db.session.commit()

            if request.form["passwordcreate"] == '':
                pass
            else:
                new = request.form["passwordcreate"]
                worker = workers.query.filter_by(username=name).first()
                worker.password = new
                db.session.commit()

            if request.form["email"] == '':
                pass
            else:
                new = request.form["email"]
                worker = workers.query.filter_by(username=name).first()
                worker.email = new
                db.session.commit()

            if request.form["phone"] == '':
                pass
            else:
                new = request.form["phone"]
                worker = workers.query.filter_by(username=name).first()
                worker.phone = new
                db.session.commit()

            if request.form["otherPhone"] == '':
                pass
            else:
                new = request.form["otherPhone"]
                worker = workers.query.filter_by(username=name).first()
                worker.phone2 = new
                db.session.commit()

            if request.form["location"] == '':
                pass
            else:
                try:
                    new = request.form["location"]
                    worker = workers.query.filter_by(username=name).first()
                    worker.Location = new
                    db.session.commit()
                except:
                    pass

            if request.form["description"] == '':
                pass
            else:
                new = request.form["description"]
                worker = workers.query.filter_by(username=name).first()
                worker.description = new
                db.session.commit()

            if request.files['profilepicture'].filename == '':
                pass
            else:
                newImage = request.files["profilepicture"]
                newfilename = newImage.filename
                Image = newImage.read()
                Worker = workers.query.filter_by(username=name).first()

                images = Worker.photos
                for photo in images:
                    if photo.pic_grp == "profileimage":
                        photo.filename = newfilename
                        photo.image = Image
                        db.session.commit()

            if request.files['image1'].filename == '':
                pass
            else:
                newImage = request.files["image1"]
                newfilename = newImage.filename
                Image = newImage.read()
                Worker = workers.query.filter_by(username=name).first()

                images = Worker.photos
                for photo in images:
                    if photo.pic_grp == "Image_1":
                        photo.filename = newfilename
                        photo.image = Image
                        db.session.commit()

            if request.files["image2"].filename == '':
                pass
            else:
                newImage = request.files["image2"]
                newfilename = newImage.filename
                Image = newImage.read()
                Worker = workers.query.filter_by(username=name).first()

                images = Worker.photos
                for photo in images:
                    if photo.pic_grp == "Image_2":
                        photo.filename = newfilename
                        photo.image = Image
                        db.session.commit()

            if request.files["image3"].filename == '':
                pass
            else:
                newImage = request.files["image3"]
                newfilename = newImage.filename
                Image = newImage.read()
                Worker = workers.query.filter_by(username=name).first()
                images = Worker.photos
                for photo in images:
                    if photo.pic_grp == "Image_3":
                        photo.filename = newfilename
                        photo.image = Image
                        db.session.commit()

            if request.files["image4"].filename == '':
                pass
            else:
                newImage = request.files["image4"]
                newfilename = newImage.filename
                Image = newImage.read()
                Worker = workers.query.filter_by(username=name).first()
                images = Worker.photos
                for photo in images:
                    if photo.pic_grp == "Image_4":
                        photo.filename = newfilename
                        photo.image = Image
                        db.session.commit()

            if request.files["image5"].filename == '':
                pass
            else:
                newImage = request.files["image5"]
                newfilename = newImage.filename
                Image = newImage.read()
                Worker = workers.query.filter_by(username=name).first()
                images = Worker.photos
                for photo in images:
                    if photo.pic_grp == "Image_5":
                        photo.filename = newfilename
                        photo.image = Image
                        db.session.commit()

            return render_template('login_page.html',
                                   workerInfo=workers.query.filter_by
                                   (username=session['user']).first())
        return render_template('login_page.html',
                               workerInfo=workers.
                               query.filter_by(username=session['user'])
                               .first())

    else:
        if g.user:
            return render_template('login_page.html',
                                   workerInfo=workers.query.filter_by
                                   (username=session['user']).first())
        return redirect(url_for("worker_accountpage"))


@app.before_request
def before_request():
    """ executes before any request """

    g.user = None

    if 'user' in session:
        g.user = session['user']


@app.route('/delete', methods=["POST"], strict_slashes=False)
def delete_accout():
    """ deletes worker account """

    if request.method == "POST":
        if 'user' in session:
            name = session['user']
            worker = workers.query.filter_by(username=name).first()
            db.session.delete(worker)
            db.session.commit()
            session.pop("user", None)
            flash("Account deleted successfully")
            return render_template("worker_account.html")


@app.route('/logout', strict_slashes=False)
def logout():
    """ Removes worker from session """

    session.pop("user", None)
    flash("You logged out")
    return render_template("worker_account.html")

@app.route('/image/profilepic/<name>', strict_slashes=False)
def upload_profile_picture(name):
    """profile picture upload"""

    Worker = workers.query.filter_by(username=name).first()
    images = Worker.photos
    for image in images:
        if image.pic_grp == "profileimage":
            return Response(image.image, mimetype=image.mimetype)
        else:
            return None


@app.route('/image/image1/<name>', strict_slashes=False)
def upload_image1(name):
    """ image2picture upload"""

    Worker = workers.query.filter_by(username=name).first()
    images = Worker.photos
    for photo in images:
        if photo.pic_grp == "Image_1":
            return Response(photo.image, mimetype=photo.mimetype)


@app.route('/image/image2/<name>', strict_slashes=False)
def upload_image2(name):
    """ image1 picture upload"""
    Worker = workers.query.filter_by(username=name).first()
    images = Worker.photos
    for photo in images:
        if photo.pic_grp == "Image_2":
            return Response(photo.image, mimetype=photo.mimetype)


@app.route('/image/image3/<name>', strict_slashes=False)
def upload_image3(name):
    """image3 picture upload"""

    Worker = workers.query.filter_by(username=name).first()
    images = Worker.photos
    for image in images:
        if image.pic_grp == "Image_3":
            return Response(image.image, mimetype=image.mimetype)


@app.route('/image/image4/<name>', strict_slashes=False)
def upload_image4(name):
    """profile picture upload"""

    Worker = workers.query.filter_by(username=name).first()
    images = Worker.photos
    for photo in images:
        if photo.pic_grp == "Image_4":
            return Response(photo.image, mimetype=photo.mimetype)


@app.route('/image/image5/<name>', strict_slashes=False)
def upload_image5(name):
    """profile picture upload"""

    Worker = workers.query.filter_by(username=name).first()
    images = Worker.photos
    for image in images:
        if image.pic_grp == "Image_5":
            return Response(image.image, mimetype=image.mimetype)


@app.route('/explore', strict_slashes=False)
def explorepage():
    """ The explore page """
    from sqlalchemy.sql.expression import func
    import math

    lista = []
    dicta = {}

    if (r.get("explorePage") != None):
        page = request.args.get("page", 1, type = int)
        showPerPage = 4
        
        allWorkers = json.loads(r.get("explorePage"))
        workersT = allWorkers["workers"]

        pages = math.ceil(len(workersT) / showPerPage)

        trimStart = (page - 1) * showPerPage
        trimEnd = trimStart + showPerPage

        trimmedWorkers = workersT[trimStart : trimEnd]

        return render_template("explore.html", trimmedWorkers=trimmedWorkers, trimmedPage=page, trimmedpages=pages)
        
    else:
        page = request.args.get("page", 1, type = int)
    
        allWorkers = workers.query.order_by(func.random()).paginate(per_page=5)
        kers = workers.query.order_by(func.random())
        for a in kers:
            dicta = {
                'id' : a.id,
                'username' : a.username,
                'work_field' : a.work_field,
                'Location' : a.email,
                'phone' : a.phone,
                'phone2' : a.phone2,
                'description' : a.description
            }
            lista.append(dicta)
        
        readyList = {
            'workers' : lista
        }
        readyForRedis = json.dumps(readyList)

        r.set("explorePage", readyForRedis)
        r.expire("explorePage", 1200)
            
        return render_template("explore.html", Allworkers=allWorkers)


@app.route('/landingPage', strict_slashes=False)
def landingpage():
    """ The landing page """

    return render_template("landing.html")


@app.route('/discretion', strict_slashes=False)
def advicepage():
    """ The explore page """

    return render_template("discretion.html")


resource_fields = {
    'id': fields.Integer,
    'username': fields.String,
    'fullname': fields.String,
    'email': fields.String,
    'phone': fields.Integer,
    'phone2': fields.Integer,
    'Location': fields.String,
    'work_field': fields.String,
    'description': fields.String,
}


class filterByField(Resource):
    @marshal_with(resource_fields)
    def get(self, field):
        lista = []
        dicta = {}
        if (r.get(field) != None):
            WorkerT = json.loads(r.get(field))
            Workers = WorkerT["workers"]
        else:
            Workers = workers.query.filter_by(work_field=field).order_by(func.random()).all()
            if Workers != None:
                for a in Workers:
                    dicta = {
                        'id' : a.id,
                        'username' : a.username,
                        'work_field' : a.work_field,
                        'Location' : a.email,
                        'phone' : a.phone,
                        'phone2' : a.phone2,
                        'description' : a.description
                    }
                    lista.append(dicta)

        
                readyList = {
                    'workers' : lista
                }
                readyForRedis = json.dumps(readyList)
            
                r.set(field, readyForRedis)
                r.expire(field, 1200)
        return Workers


api.add_resource(filterByField, "/api/explore/workers/<string:field>")


class filterByLocation(Resource):
    @marshal_with(resource_fields)
    def get(self, location):
        lista = []
        dicta = {}
        if (r.get(location) != None):
            WorkerT = json.loads(r.get(location))
            Workers = WorkerT["workers"]
        else:
            Workers = workers.query.filter_by(Location=location).order_by(func.random()).all()
            if Workers != None:
                for a in Workers:
                    dicta = {
                        'id' : a.id,
                        'username' : a.username,
                        'work_field' : a.work_field,
                        'Location' : a.email,
                        'phone' : a.phone,
                        'phone2' : a.phone2,
                        'description' : a.description
                    }
                    lista.append(dicta)

        
                readyList = {
                    'workers' : lista
                }
                readyForRedis = json.dumps(readyList)
            
                r.set(location, readyForRedis)
                r.expire(location, 1200)
        return Workers


api.add_resource(filterByLocation, "/api/explore/workersLoc/<string:location>")


class filterAll(Resource):
    @marshal_with(resource_fields)
    def get(self):
        lista = []
        dicta = {}
        if (r.get("ALL") != None):
            WorkerT = json.loads(r.get("ALL"))
            Workers = WorkerT["workers"]
        else:
            Workers = workers.query.order_by(func.random()).all()
            if Workers != None:
                for a in Workers:
                    dicta = {
                        'id' : a.id,
                        'username' : a.username,
                        'work_field' : a.work_field,
                        'Location' : a.email,
                        'phone' : a.phone,
                        'phone2' : a.phone2,
                        'description' : a.description
                    }
                    lista.append(dicta)

        
                readyList = {
                    'workers' : lista
                }
                readyForRedis = json.dumps(readyList)
            
                r.set("ALL", readyForRedis)
                r.expire("ALL", 1200)
        return Workers



api.add_resource(filterAll, "/api/explore/workers")


class filterByLnF(Resource):
    @marshal_with(resource_fields)
    def get(self, location, field):
        lista = []
        dicta = {}
        if (r.get(location + field) != None):
            WorkerT = json.loads(r.get(location + field))
            Workers = WorkerT["workers"]
        else:
            Workers = workers.query.filter((workers.work_field == field) & (workers.Location == location)).order_by(func.random()).all()
            if Workers != None:
                for a in Workers:
                    dicta = {
                        'id' : a.id,
                        'username' : a.username,
                        'work_field' : a.work_field,
                        'Location' : a.email,
                        'phone' : a.phone,
                        'phone2' : a.phone2,
                        'description' : a.description
                    }
                    lista.append(dicta)

        
                readyList = {
                    'workers' : lista
                }
                readyForRedis = json.dumps(readyList)
            
                r.set(location + field, readyForRedis)
                r.expire(location + field, 1200)
        return Workers



api.add_resource(filterByLnF,
                 "/api/explore/workers/<string:location>/<string:field>")
 
 
if __name__ == "__main__":
    app.run("0.0.0.0", debug=True)

    
