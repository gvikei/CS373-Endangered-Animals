from flask import Flask
from flask import request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
import os
import json
from flask import jsonify
import inspect

app = Flask(__name__)
CORS(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/endangered-animal2'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# engine = create_engine('mysql+pymysql://root:@localhost/endangered-animal2', echo=False)
engine = create_engine(os.environ['SQLALCHEMY_DATABASE_URI'], echo=False)

db = SQLAlchemy(app)
print("models has run!!!")


class animal(db.Model):
    __tablename__ = 'animal'
    scientificName = db.Column(
        'scientificName', db.String(255), primary_key=True)
    name = db.Column('name', db.String(255))
    vulnerability = db.Column('vulnerability', db.String(255))
    citationLink = db.Column('citationLink', db.String(9999))
    conservationMeasure = db.Column('conservationMeasure', db.String(255))
    videoLink = db.Column('videoLink', db.String(255))
    webLink = db.Column('webLink', db.String(255))
    imageLink = db.Column('imageLink', db.String(255))

    # Links to assoc tables
    associated_countries_animals_link = db.relationship(
        'associated_countries_animals', backref='animal', lazy='dynamic')
    associated_habitats_animals_link = db.relationship(
        'associated_habitats_animals', backref='animal', lazy='dynamic')
    associated_threats_animals_link = db.relationship(
        'associated_threats_animals', backref='animal', lazy='dynamic')

    def __init__(self, scientificName, name, vulnerability, citationLink, conservationMeasure, videoLink, webLink, imageLink):
        self.scientificName = scientificName
        self.name = name
        self.vulnerability = vulnerability
        self.citationLink = citationLink
        self.conservationMeasure = conservationMeasure
        self.videoLink = videoLink
        self.webLink = webLink
        self.imageLink = imageLink


class habitats(db.Model):
    __tablename__ = 'habitats'
    name = db.Column('name', db.String(255), primary_key=True)
    image = db.Column('image', db.String(255))
    suitability = db.Column('suitability', db.String(255))

    # Links to assoc tables
    associated_habitats_animals_link = db.relationship(
        'associated_habitats_animals', backref='habitat', lazy='dynamic')
    associated_habitats_countries_link = db.relationship(
        'associated_habitats_countries', backref='habitat', lazy='dynamic')
    associated_threats_habitats_link = db.relationship(
        'associated_threats_habitats', backref='habitat', lazy='dynamic')

    def __init__(self,  name, image, suitability):
        self.name = name
        self.image = image
        self.suitability = suitability


class country(db.Model):
    __tablename__ = 'country'
    name = db.Column('name', db.String(255), primary_key=True)
    flag = db.Column('flag', db.String(255))
    coordinate = db.Column('coordinate', db.String(255))

    # Links to assoc tables
    associated_countries_animals_link = db.relationship(
        'associated_countries_animals', backref='country', lazy='dynamic')
    associated_habitats_countries_link = db.relationship(
        'associated_habitats_countries', backref='country', lazy='dynamic')

    def __init__(self, name, flag, coordinate):
        self.name = name
        self.flag = flag
        self.coordinate = coordinate


class threats(db.Model):
    __tablename__ = 'threats'
    name = db.Column('name', db.String(255), primary_key=True)
    timing = db.Column('timing', db.String(255))
    severity = db.Column('severity', db.String(255))
    image = db.Column('image', db.String(255))

    # Links to assoc tables
    associated_threats_animals_link = db.relationship(
        'associated_threats_animals', backref='threat', lazy='dynamic')
    associated_threats_habitats_link = db.relationship(
        'associated_threats_habitats', backref='threat', lazy='dynamic')

    def __init__(self, name, timing, severity, image):
        self.name = name
        self.timing = timing
        self.severity = severity
        self.image = image

# Associated tables


class associated_countries_animals(db.Model):
    __tablename__ = 'associated_countries_animals'
    id = db.Column('id', db.Integer, primary_key=True)
    scientificName = db.Column(
        db.String(255), db.ForeignKey('animal.scientificName'))
    countriesName = db.Column(db.String(255), db.ForeignKey('country.name'))


class associated_habitats_animals(db.Model):
    __tablename__ = 'associated_habitats_animals'
    id = db.Column('id', db.Integer, primary_key=True)
    scientificName = db.Column(
        db.String(255), db.ForeignKey('animal.scientificName'))
    habitatName = db.Column(db.String(255), db.ForeignKey('habitats.name'))


class associated_threats_animals(db.Model):
    __tablename__ = 'associated_threats_animals'
    id = db.Column('id', db.Integer, primary_key=True)
    scientificName = db.Column(
        db.String(255), db.ForeignKey('animal.scientificName'))
    threatName = db.Column(db.String(999), db.ForeignKey('threats.name'))


class associated_habitats_countries(db.Model):
    __tablename__ = 'associated_habitats_countries'
    id = db.Column('id', db.Integer, primary_key=True)
    countryNames = db.Column(db.String(255), db.ForeignKey('country.name'))
    habitatsName = db.Column(db.String(255), db.ForeignKey('habitats.name'))


class associated_threats_habitats(db.Model):
    __tablename__ = 'associated_threats_habitats'
    id = db.Column('id', db.Integer, primary_key=True)
    habitatsName = db.Column(db.String(255), db.ForeignKey('habitats.name'))
    threatName = db.Column(db.String(999), db.ForeignKey('threats.name'))
