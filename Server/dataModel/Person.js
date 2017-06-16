"use strict"; //使用strict mode(嚴格模式)
var Constant = require('./Constant.js');

var Person = {
    createNew : function(id, number, name, lv) {
        var person = {};
        person.id = id ;
        person.name = name ;
        person.number = number ;
        person.lv = lv ;

        person.getId = function() { return this.id };
        person.getName = function() { return this.name };
        person.getNumber = function() { return this.number };
        person.getLv = function() { return this.lv };
        person.setId = function(id) { this.id = id };
        person.setName = function(name) { this.name = name };
        person.setNumber = function(number) { this.number = number };
        person.setLv = function(lv) { this.lv = lv };

        return person;
    }
};


exports = module.exports = Person;