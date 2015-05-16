
//////// texto de información   ///////
var datareglas = "Selecciona un tipo de juego, una dificultad y pulsa Start! Intenta adivinar con el menor número de fotos la situación geográfica de nuestro objetivo y alcanzarás una mayor puntuación. Pincha en el mapa y cuando tengas decidida tu respuesta final, clickea en Confirmar Posición! En mitad de una partida, puedes elegir un nuevo juego y dificultad y pulsando en Reiniciar Juego, empezarás uno nuevo según tu elección descartando lo hecho en el anterior"
var dataabout = "Juego Adivina Donde Está creado por Fernando Yustas Ruiz para la asignatura Desarrollo de Aplicaciones Telemáticas (DAT)"
var datahome = "Emocionante juego en el que tendrás que mostrar tus habilidades geográficas y de asociación visual. Pasa entretenidos e instructivos ratos jugando con tus amigos y compitiendo por ver quién obtiene una mayor puntuación en cada uno de los diferentes juegos. Selecciona un juego, pulsa Start! y ¡A JUGAR!"
// carousel de imágenes de mapas  para el home
var homecarousel ='<div id="homecarousel" class="carousel slide" data-ride="carousel">'+
      
     ' <div class="carousel-inner" style="text-align: center;" role="listbox">'+
     '   <div class="item active">'+
      '    <img src="images/world1.jpg" alt="First slide" style="display: inline-block;widht:600px;height:350px;">'+
       '   <div class="container">'+
       '     <div class="carousel-caption">'+
              
      '      </div>'+
        '  </div>'+
    '    </div>'+
      '  <div class="item">'+
      '    <img src="images/world2.jpg" alt="Second slide" style="display: inline-block;widht:600px;height:350px;">'+
        '  <div class="container">'+
       '     <div class="carousel-caption">'+
        '    </div>'+
       '   </div>'+
       ' </div>'+
       ' <div class="item">'+
       '   <img src="images/world3.jpg" alt="Third slide" style="display: inline-block;widht:600px;height:350px;">'+
       '   <div class="container">'+
       '     <div class="carousel-caption">'+
             
       '     </div>'+
      '    </div>'+
      '  </div>'+
       ' <div class="item">'+
       '   <img src="images/world4.jpg" alt="Third slide" style="display: inline-block;widht:600px;height:350px;">'+
       '   <div class="container">'+
       '     <div class="carousel-caption">'+
             
       '     </div>'+
      '    </div>'+
      '  </div>'+
      '  </div>'+
      '  </div>'+
      '<p>_</p>'

////////////////////////////////////////////////////////////////////////////
/////////  función para calcular distancia entre coordenadas  //////////////
/////// vía: http://www.mapanet.eu/Resources/Script-Distance.htm  //////////
////////////////////////////////////////////////////////////////////////////

function dist(lat1, lon1, lat2, lon2)
  {
  rad = function(x) {return x*Math.PI/180;}

  var R     = 6378.137;                          //Radio de la tierra en km
  var dLat  = rad( lat2 - lat1 );
  var dLong = rad( lon2 - lon1 );

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;

  return d.toFixed(3);                      //Retorna tres decimales
}


////////////////////////////////////////////////////////////////////////////
/////////  función para calcular la puntuación de una jugada  //////////////
/////// in: distancia, fotos vistas y tipo juego; out:puntuación  //////////
////////////////////////////////////////////////////////////////////////////

function calcpunt(dist,numfotos,tipo){		//tipo para si Hispania, se puntúa diferente
	var puntuacion
	// de momento: puntuacion = dist * numfotos
	puntuacion = dist*numfotos
	return puntuacion	
}

////////////////////////////////////////////////////////////////////////
/////////  función para rellenar el cuadro de puntuación  //////////////
/////// in: respuesta, distancia, fotos vistas y si hay fin   //////////
/////// out: html a incluir en elemento #cuadropunt   //////////
/////////////////////////////////////////////////////////////////////////////

function rellenoCuadroPunt(nombre,dist,fotos,findepartida,puntfinal){
	
	var punt = calcpunt(dist,fotos,1)
	var boton = ""
	var texto = ""
	texto =" Respuesta: " + nombre + "<br>" +
			"Distancia: " + dist + "<br>" +
			"Fotos vistas: " + fotos + "<br>" +
			"Puntuación: " + punt + "<br>"
			
	if(findepartida){
		// botón fin del juego
		texto = texto + "Puntuación final : " + puntfinal + "<br>"
		boton = '<button id ="findejuego"class="button"> Fin del Juego </button>'
	}else{
		// botón siguiente
		boton = '<button id ="sigjuego"class="button"> Siguiente prueba </button>'
	}
	texto = texto + boton
	return texto
}
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////


//////////****** FUNCIONES CREACIÓN DINÁMICA BOOTSTRAP ******//////////
//// estas funciones crearán dinámicamente el bootstrap según  ciertos////
//// parámetros en un array (generalmente) y retornarán el string que será ////
//// incluido en el htmlen forma $("#id").html(stringcreado) o similares////

//array con 10 fotos para las descargas de flickr
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
     ' <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">'+	//esto tenemos que quitarlo (izda y dcha en carousel)
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
	
	var latactual
	var lngactual
	var respuesta
	var todasusadas = 0
	var puntfinal = 0		//la de cada partida
		
	// la del usuario (luego, localStorage)
	function getpunt(){
		console.log(localStorage.getItem("puntuacion"))
		if(localStorage.getItem("puntuacion")!=0){
			return localStorage.getItem("puntuacion")
		}else{
			return 5
		}
		
		
	}
	var puntfinaldelinfinito = getpunt()
	$("#numpuntuacion").html(puntfinaldelinfinito)
	var usadas = [] //array que recopilo los índices usados (cuando estén vistos todos, puntuación y al home, por ejemplo)
	
	function mostrarHome(){
		
		$('#divhome').show()
		$('#startbutton').show()
		$('#fotos').hide()
		$('#generalmap').hide()
		$('#reiniciarbutton').hide()
		usadas = []		//cada vez que voy a home, reinicio las usadas
		
	}	
	function ocultarHome(){
		
		$('#divhome').hide()
		$('#startbutton').hide()
		$('#fotos').show()
		$('#generalmap').show()
		$('#reiniciarbutton').show()
		

	}	


	
	
	
	
	
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
	
	
	/*$("#startbutton").click(function(){
		ocultarHome()
		var juego = $("#mijuego").html()
		$.getJSON("juegos/"+juego+".json",function(data){
			//L.geoJson(data).addTo(map)
			L.geoJson(data,{onEachFeature:onEachFeature}).addTo(map)
		
		})		
		
	})*/
			//usando esto como prueba --> geolocaliza el geojson
	
	function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.Name) {
        layer.bindPopup(feature.properties.Name);
		}
	}
	///////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////     FIN MAPAS LEAFLETS    //////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////
	
	//ocultarHome()
	// dom cargado --> texto de información a #textohome, fotos a carousel y mostramos HOME
	$("#textohome").html(datahome)
	$("#fotoshome").html(homecarousel)
	mostrarHome()		// ocultamos mapa tras crearlo porque sino, da problemas!
	
	
	
	
	
	
	//////////////////////// RELACIONADOS CON FLICKR JSON ///////////////////////////////////////
	
	
	
	// métodos que coge una ciudad no usada (recibe el json como datos)
	function nuevoGeoJson(datos){
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
			if (usadas.length == datos.features.length) {todasusadas = 1;alert("cambio valor todasusadas")}
			}
		if(local==undefined){
			return nuevoGeoJson(datos)
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
			if(data.items[i]==undefined){break}
			array.push(data.items[i].media.m)
		}
		var carrousel = creoCarrousel(array)	//funcion que crea carrousel de tamaño 10
		$("#fotos").html(carrousel);
	})
		
	}
	
	function mapayfotos(){		//proceso de elección de UNO de los geojson --> deberemos llamarle cuando tema puntuaciones
		$('#confposicion').show()
		if (flag){map.removeLayer(marker)} //borro el anterior popup
		var juego = $("#mijuego").html()	// selecciono el juego determinado
		$.getJSON("juegos/"+juego+".json",function(data){
			local = nuevoGeoJson(data)
			latactual = local.geometry.coordinates[1]
			lngactual = local.geometry.coordinates[0]
			respuesta = local.properties.Name		// para el tema de pasar respuesta a cuadro final
			fotosAlCarrousel(local.properties.Name)	
		})
	}
	$("#startbutton").click(function(){
		ocultarHome()
		mapayfotos()
		
	})
		
	$("#reiniciarbutton").click(function(){		//esto se hará automático
		
		usadas = []		//cada vez que reinicio juego, a cero las usadas
		mapayfotos()
			
	})
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////     FIN FLICKR JSON    /////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////
	$(".cambiojuego").click(function(){		// cambiamos situación de "juego actual"
		
			$("#mijuego").html($(this).html())
			
		});	
	$("#confposicion").click(function(){		// qué pasa cuando confirmo posición??
												// comparo distancia entre data.coords y marker.coords (función que lo hace)
												// obtengo puntuación (por medio de función) y sumo a actual y global del infinito
												// continuo con nuevo punto a localizar (si no hay más, a home por ejemplo)
		
			var distancia = dist(marker._latlng.lat, marker._latlng.lng,latactual,lngactual)		//calculo distancia entre 2 coordenadas
			console.log(distancia)
			//var punt = calcpunt(distancia,1,1)
			mostrarPunt(distancia)
		});	
	
	
	// creación de div information oculto, para incluir tema Reglas y About
	(function(){
		$('<div class="information"></div>').hide().appendTo($('body'));
	}());
	// creación de div puntuacion oculto, para mostrar puntuación tras jugada
	(function(){
		$('<div id="cuadropunt"></div>').hide().appendTo($('body'));
	}());
	
	
	function mostrarInfo(data){
		
			var dimension = Math.ceil($(window).width()/4)
			$('.information').html(data + '<br><br><br><br><br><span  id="closeLink">Close</span>').css({'left':30, 'width':(4*dimension)/3,'top':150})
			.show()
			$("#closeLink").click(function(){			//Debe estar dentro del contexto
	
				$('.information').hide()
		})
	}
	function mostrarPunt(distancia){
			var dimension = Math.ceil($(window).width()/4)
			var punt = calcpunt(distancia,1)
			puntfinal = puntfinal + punt
			$('#cuadropunt').html(rellenoCuadroPunt(respuesta,distancia,1,todasusadas,puntfinal)).css({'left':130, 'width':(4*dimension)/2,'top':150})
			.show()
			$('#confposicion').hide()
			
			$("#sigjuego").click(function(){		
				$('#confposicion').show()
				$('#cuadropunt').hide()
				mapayfotos()
				console.log(usadas.length)

			})
			
			$("#findejuego").click(function(){		
				// sumar a puntos totales del infinito, sumarlos al html y poner a cero los de partida
				puntfinaldelinfinito = puntfinaldelinfinito + puntfinal
				localStorage.setItem("puntuacion",puntfinaldelinfinito)
				puntfinal = 0
				$("#numpuntuacion").html(puntfinaldelinfinito)
				$('#cuadropunt').hide()
				mostrarHome()
				// irnos a home
		})
	}
	
	
	
		
	$("#reglasbutton").click(function(){		
	
		mostrarInfo(datareglas)
	})
	$("#aboutbutton").click(function(){		
	
		mostrarInfo(dataabout)
	})
	
	////////////////////////////// RELACIONADOS ALTERNANCIA HOME Y RESTO ///////////////////////////////////////
	
	$("#home").click(function(){		
	
		mostrarHome()
	})
		
		
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////     FIN RELACIONADO CON HOME    /////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////

});
