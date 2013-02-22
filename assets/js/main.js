// main.js
var template = function(id){
	return _.template( $('#' + id).html() );
}

//person model
var Person = Backbone.Model.extend({
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
var PeopleCollection = Backbone.Collection.extend({
	model : Person
});

// people view
var PeopleView = Backbone.View.extend({
	tagName : 'ul',

	className : 'people-list',
	// filter througt all items in a collection
	render : function(){
	// for each create a new person view
		this.collection.each(function(person){
			var personView = new PersonView({model : person});

			this.$el.append(personView.render().el);

		},this);

		return this;
	}
	// append to root element
})

//person view
var PersonView = Backbone.View.extend({

	tagName: "li",

	className: "person",

	id : 'one-person',

	template : template('personTemplate'),

	render : function(){
		this.$el.html( this.template( this.model.toJSON() ) );

		return this;
	}

});

var  peopleCollection = new PeopleCollection([
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

peopleView = new PeopleView({collection : peopleCollection});
$(document.body).html(peopleView.render().el);



