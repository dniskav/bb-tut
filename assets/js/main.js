// main.js
// final verson of tutorial using templates models views and helpers
// 
// 22-02-2013
// 

(function(){

	window.App = {
		Models : {},
		Collections : {},
		Views : {}
	}



window.template = function(id){
	return _.template( $('#' + id).html() );
}

//person model
App.Models.Person = Backbone.Model.extend({
	defaults : {
		nombre : "Daniel",
		apellido : "Silva",
		profesion : "Web Developer",
		edad : 37
	},
	validate : function(attrs){
		if(attrs.edad < 18){
			return 'solo mayores de 18 años'
		};
		if(! attrs.nombre ){
			return 'se necesita un nombre'
		}
	},
	initialize : function(){
		this.on('invalid',function(model, error){
			alert(error);
		})
	}
});

//list of people
App.Collections.People = Backbone.Collection.extend({
	model : App.Models.Person
});

// people view
App.Views.People = Backbone.View.extend({
	tagName : 'ul',

	className : 'people-list',
	// filter througt all items in a collection
	render : function(){
	// for each create a new person view
		this.collection.each(function(person){
			var personView = new App.Views.Person({model : person});

			this.$el.append(personView.render().el);

		},this);

		return this;
	}
	// append to root element
})

//person view
App.Views.Person = Backbone.View.extend({

	tagName: "li",

	className: "person",

	id : 'one-person',

	template : template('personTemplate'),

	render : function(){
		this.$el.html( this.template( this.model.toJSON() ) );

		return this;
	}

});

var peopleCollection = new App.Collections.People([
{
	nombre : 'Daniel',
	apellido : 'silva',
	edad : 30
},
{
	nombre : 'Sebas',
	apellido : 'silva',
	edad : 22,
	profesion : 'pokerista'
},
{
	nombre : 'Mafe',
	apellido : 'Silva',
	edad : 27,
	profesion : 'Fashion Designer'
}

])

var peopleView = new App.Views.People({collection : peopleCollection});
$(document.body).html(peopleView.render().el);


})()
