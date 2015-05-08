
//////////****** FUNCIONES CREACIÓN DINÁMICA BOOTSTRAP ******//////////
//// estas funciones crearán dinámicamente el bootstrap según  ciertos////
//// parámetros en un array (generalmente) y retornarán el string que será ////
//// incluido en el htmlen forma $("#id").html(stringcreado) o similares////


///////////////////////////////////////////////////////////////////////
///////////////////////    DOM JQUERY   ///////////////////////////////
///////////////////////////////////////////////////////////////////////
$(document).ready(function() {
	
	map = L.map('map').setView([0, 0], 1);	//creamos map en 0,0 y con zoom máximo

	// add an OpenStreetMap tile layer
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
	
	var marker
	var aux = 0
	map.on('click', function(e) {	//código poner posición (con popup)
		if (aux){map.removeLayer(marker)}
		marker = new L.marker(e.latlng).addTo(map)
		map.addLayer(marker)
		marker.bindPopup('Aquí está!')
		.openPopup();
		aux = 1
		//console.log(e)
});
	$(".cambiojuego").click(function(){		// cambiamos situación de "juego actual"
		
			$("#juegoseleccionado").html("Juego seleccionado: " + $(this).html())
			
		});	
	$("#confposicion").click(function(){		// cambiamos situación de "juego actual"
		
				console.log(marker)
		});	
	
	
	$("#fotos p").html("pedo")





});
