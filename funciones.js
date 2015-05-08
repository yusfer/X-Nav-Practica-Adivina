
//////////****** FUNCIONES CREACIÓN DINÁMICA BOOTSTRAP ******//////////
//// estas funciones crearán dinámicamente el bootstrap según  ciertos////
//// parámetros en un array (generalmente) y retornarán el string que será ////
//// incluido en el htmlen forma $("#id").html(stringcreado) o similares////

//array con 10 fotos
function creoCarrousel(array){
	var carousel = ""
	
    carousel = '<div id="myCarousel" class="carousel slide" data-ride="carousel">'+
      
     ' <div class="carousel-inner" style="text-align: center;" role="listbox">'+
     '   <div class="item active">'+
      '    <img src="'+array[0]+'" alt="First slide" style="display: inline-block;">'+
       '   <div class="container">'+
       '     <div class="carousel-caption">'+
              
      '      </div>'+
        '  </div>'+
    '    </div>'+
      '  <div class="item">'+
      '    <img src="'+array[1]+'" alt="Second slide" style="display: inline-block;">'+
        '  <div class="container">'+
       '     <div class="carousel-caption">'+
        '    </div>'+
       '   </div>'+
       ' </div>'+
       ' <div class="item">'+
       '   <img src="'+array[2]+'" alt="Third slide" style="display: inline-block;">'+
       '   <div class="container">'+
       '     <div class="carousel-caption">'+
             
       '     </div>'+
      '    </div>'+
      '  </div>'+
       ' <div class="item">'+
       '   <img src="'+array[3]+'" alt="Third slide" style="display: inline-block;">'+
       '   <div class="container">'+
       '     <div class="carousel-caption">'+
             
       '     </div>'+
      '    </div>'+
      '  </div>'+
       ' <div class="item">'+
      '    <img src="'+array[4]+'" alt="Fourth slide" style="display: inline-block;">'+
        '  <div class="container">'+
        '    <div class="carousel-caption">'+
             
       '     </div>'+
        '  </div>'+
     '   </div>'+
       ' <div class="item">'+
      '    <img src="'+array[5]+'" alt="Fifth slide" style="display: inline-block;">'+
        '  <div class="container">'+
        '    <div class="carousel-caption">'+
             
       '     </div>'+
        '  </div>'+
     '   </div>'+
       ' <div class="item">'+
      '    <img src="'+array[6]+'" alt="Sixth slide" style="display: inline-block;">'+
        '  <div class="container">'+
        '    <div class="carousel-caption">'+
             
       '     </div>'+
        '  </div>'+
     '   </div>'+
       ' <div class="item">'+
      '    <img src="'+array[7]+'" alt="Seventh slide" style="display: inline-block;">'+
        '  <div class="container">'+
        '    <div class="carousel-caption">'+
             
       '     </div>'+
        '  </div>'+
     '   </div>'+
       ' <div class="item">'+
      '    <img src="'+array[8]+'" alt="Eighth slide" style="display: inline-block;">'+
        '  <div class="container">'+
        '    <div class="carousel-caption">'+
             
       '     </div>'+
        '  </div>'+
     '   </div>'+
       ' <div class="item">'+
      '    <img src="'+array[9]+'" alt="Ninth slide" style="display: inline-block;">'+
        '  <div class="container">'+
        '    <div class="carousel-caption">'+
             
       '     </div>'+
        '  </div>'+
     '   </div>'+
    '  </div>'+
     ' <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">'+
      '  <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'+
      '  <span class="sr-only">Previous</span>'+
    '  </a>'+
     ' <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">'+
      '  <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'+
     '   <span class="sr-only">Next</span>'+
      '</a>'+
   ' </div>'
   return carousel
}
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
	
	function fotosAlCarrousel(value){
		
		url = "http://api.flickr.com/services/feeds/photos_public.gne?tags=" + value + "&tagmode=any&format=json&jsoncallback=?"
		$.getJSON(url,function(data){
			
		var  array = []
		for(i=0;i<10;i++){
			//list = list + "<li><img src=" + data.items[i].media.m+ "></li>"
			array.push(data.items[i].media.m)
		}
		var carrousel = creoCarrousel(array)	//funcion que crea carrousel de tamaño 5
		$("#fotos").html(carrousel);
	})
		
	}
		
		
		
	$("#reiniciarbutton").click(function(){		//esto se hará automático
	
		local = nuevoGeoJson()
		/*var marker2			//pruebas --> sacar geojson y colocar marker
		marker2 = new L.marker(local.geometry.coordinates).addTo(map)
		map.addLayer(marker2)
		marker2.bindPopup(local.properties.Name)
		.openPopup();*/
		// funcion sacar fotos flickr y colocar carrousel
		fotosAlCarrousel(local.properties.Name)
			
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
