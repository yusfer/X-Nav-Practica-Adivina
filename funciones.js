
//////////****** FUNCIONES CREACIÓN DINÁMICA BOOTSTRAP ******//////////
//// estas funciones crearán dinámicamente el bootstrap según  ciertos////
//// parámetros en un array (generalmente) y retornarán el string que será ////
//// incluido en el htmlen forma $("#id").html(stringcreado) o similares////


///////////////////////////////////////////////////////////////////////
///////////////////////    DOM JQUERY   ///////////////////////////////
///////////////////////////////////////////////////////////////////////
$(document).ready(function() {
	
	
	//////////////////////// RELACIONADOS CON MAPAS LEAFLETS ///////////////////////////////////////
	map = L.map('map').setView([0, 0], 1);	//creamos map en 0,0 y con zoom máximo

	// add an OpenStreetMap tile layer
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
	
	var marker
	var flag = 0
	map.on('click', function(e) {	//código poner posición (con popup)
		if (flag){map.removeLayer(marker)}
		marker = new L.marker(e.latlng).addTo(map)
		map.addLayer(marker)
		marker.bindPopup('Aquí está!')
		.openPopup();
		flag = 1
		//console.log(e)
	});
	
	/*
	$("#startbutton").click(function(){
		$.getJSON("geojson/geojsonbasico.json",function(data){
			//L.geoJson(data).addTo(map)
			L.geoJson(data,{onEachFeature:onEachFeature}).addTo(map)
		
		})		
		
	})
			//usando esto como prueba --> geolocaliza el geojson
	
	function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.Name) {
        layer.bindPopup(feature.properties.Name);
		}
	}*/
	///////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////     FIN MAPAS LEAFLETS    //////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	//////////////////////// RELACIONADOS CON FLICKR JSON ///////////////////////////////////////
	var datos
	var usadas = [] //array que recopilo los índices usados
	$("#startbutton").click(function(){
		
		$.getJSON("geojson/geojsonbasico.json",function(data){
			datos = data
		})
			
	})
	
	// métodos que coge una ciudad no usada
	function nuevoGeoJson(){
		num = Math.round(Math.random()*(datos.features.length-1))
		console.log(num)
		var paso = 1
		var local = undefined
		for(i=0;i<usadas.length;i++){			//para que no se repitan
			if(usadas[i]==num){paso = 0}
			}
		if(paso){
			local = datos.features[num]
			usadas.push(num)
			console.log(local.properties.Name)
			}
		if(local==undefined){
			return nuevoGeoJson()
		}else{
			return local
			}
		
	}
	$("#reiniciarbutton").click(function(){		//esto se hará automático
	
		local = nuevoGeoJson()
		/*var marker2			//pruebas --> sacar geojson y colocar marker
		marker2 = new L.marker(local.geometry.coordinates).addTo(map)
		map.addLayer(marker2)
		marker2.bindPopup(local.properties.Name)
		.openPopup();*/
		// funcion sacar fotos flickr y colocar carrousel
	})
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////     FIN FLICKR JSON    /////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////
	$(".cambiojuego").click(function(){		// cambiamos situación de "juego actual"
		
			$("#juegoseleccionado").html("Juego seleccionado: " + $(this).html())
			
		});	
	$("#confposicion").click(function(){		// cambiamos situación de "juego actual"
		
				console.log(marker)
		});	
	
	
	$("#fotos p").html("pedo")





});
