
var estadoactual = 0

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
/*
function calcpunt(dist,numfotos,tipo){		//tipo para si Hispania, se puntúa diferente (1 Hispania, 0 otros)
	var puntuacion
	// de momento: puntuacion = dist * numfotos
	puntuacion = dist*numfotos
	return puntuacion	
}*/
function calcpunt(dist,numfotos,tipo){		//tipo para si Hispania, se puntúa diferente (1 Hispania, 0 otros)
	var puntuacion
	// si Hispania, dist * 12 para asemejar
	/*
	 * Para calcular puntuación : por intervalos de 500 km
	 * En Hispania multiplico por 12 porque las distancias son mucho menores
	 * Resto 5 puntos por cada foto vista, a partir de la primera (1 foto-> - 0 ; 2 fotos -> -10: 3 fotos -> -15)
	 * Puntuación mínima -> 0
	 * 
	 * */
	if(tipo){dist = dist*12}
	if(dist<500){puntuacion = 100}else{
	if(dist<1000){puntuacion = 90}else{
	if(dist<1500){puntuacion = 80}else{
	if(dist<2000){puntuacion = 70}else{
	if(dist<2500){puntuacion = 60}else{
	if(dist<3000){puntuacion = 50}else{
	if(dist<3500){puntuacion = 40}else{
	if(dist<4000){puntuacion = 30}else{
	if(dist<4500){puntuacion = 20}else{
	if(dist<5000){puntuacion = 10}else{
	if(dist>5000){puntuacion = 0}
	}}}}}}}}}}
	if(numfotos > 1){
	puntuacion = puntuacion - (5*numfotos)	//restamos 5 puntos por cada foto vista
	}
	if (puntuacion<0){puntuacion = 0}		//mínimo se saca 0 de puntuación
	return puntuacion	
}

////////////////////////////////////////////////////////////////////////
/////////  función para rellenar el cuadro de puntuación  //////////////
/////// in: respuesta, distancia, fotos vistas y si hay fin   //////////
/////// out: html a incluir en elemento #cuadropunt   //////////
/////////////////////////////////////////////////////////////////////////////

function rellenoCuadroPunt(nombre,dist,fotos,findepartida,puntfinal,esHispania){
	
	var punt = calcpunt(dist,fotos,esHispania)
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


function cambioestado(num){
	
	// cambio el estadoactual al que nos movemos
	
	cambio = num-estadoactual
	estadoactual = num
	history.go(cambio)
	
}

//////////****** FUNCIONES CREACIÓN DINÁMICA BOOTSTRAP ******//////////
//// estas funciones crearán dinámicamente el bootstrap según  ciertos////
//// parámetros en un array (generalmente) y retornarán el string que será ////
//// incluido en el htmlen forma $("#id").html(stringcreado) o similares////

//array con 10 fotos para las descargas de flickr
function creoCarrousel(array,dif){		//dificultad [1,2,3,4] = [8 seg,6seg,4seg,2seg]
	var carousel = ""
	var speed
	if(dif==1){speed = 8000}
	if(dif==2){speed = 6000}
	if(dif==3){speed = 4000}
	if(dif==4){speed = 2000}
	
    carousel = '<div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval='+speed+' cycle="true">'+
      
     ' <div class="carousel-inner" style="text-align: center;" role="listbox">'+
     '   <div class="item active">'+
      '    <img src="'+array[0]+'" alt="First slide" style="display: inline-block;">'+
    '    </div>'+
      '  <div class="item">'+
      '    <img src="'+array[1]+'" alt="Second slide" style="display: inline-block;">'+
       ' </div>'+
       ' <div class="item">'+
       '   <img src="'+array[2]+'" alt="Third slide" style="display: inline-block;">'+
      '  </div>'+
       ' <div class="item">'+
       '   <img src="'+array[3]+'" alt="Third slide" style="display: inline-block;">'+
      '  </div>'+
       ' <div class="item">'+
      '    <img src="'+array[4]+'" alt="Fourth slide" style="display: inline-block;">'+
     '   </div>'+
       ' <div class="item">'+
      '    <img src="'+array[5]+'" alt="Fifth slide" style="display: inline-block;">'+
     '   </div>'+
       ' <div class="item">'+
      '    <img src="'+array[6]+'" alt="Sixth slide" style="display: inline-block;">'+
     '   </div>'+
       ' <div class="item">'+
      '    <img src="'+array[7]+'" alt="Seventh slide" style="display: inline-block;">'+
     '   </div>'+
       ' <div class="item">'+
      '    <img src="'+array[8]+'" alt="Eighth slide" style="display: inline-block;">'+
     '   </div>'+
       ' <div class="item">'+
      '    <img src="'+array[9]+'" alt="Ninth slide" style="display: inline-block;">'+
     '   </div>'+
    '  </div>'+
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
	var fotosvistas = 1
	var todasusadas = 0
	var puntfinal = 0		//la de cada partida
	var esHispania = 0 //se puntúa diferente el juego Hispania
		
	// la del usuario (luego, localStorage)
	function getpunt(){
		console.log(localStorage.getItem("puntuacion"))
		if(localStorage.getItem("puntuacion")!=null){
			return localStorage.getItem("puntuacion")
		}else{
			return 0
		}
		
		
	}
	
	 function mislider() {
		$( "#slider" ).slider({
		value:100,
		min: 1,
		max: 4,
		step: 1,
		slide: function( event, ui ) {
			$( "#amount" ).val(+ ui.value );
		}
		});
		$( "#amount" ).val( $( "#slider" ).slider( "value" ) );
	};
	
	mislider()
	
	
	///////////////////////////////////////////
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
	
	function nuevoHistorial(juego){
		//Añadimos al historial estado con nombre del juego
		data = {nombre:juego,fecha: new Date()}
		history.pushState(data,null,location.href.split("?")[0]+'?'+juego)
		link = '<a id='+data.nombre+' href="javascript:cambioestado('+estadoactual+')" >'+data.nombre+'</a>'
		$("#historial").append(link)
		alert("estado actual  "  + estadoactual)
				
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
		var dif= $( "#slider" ).slider( "value" )
		var carrousel = creoCarrousel(array,dif)	//funcion que crea carrousel de tamaño 10
		$("#fotos").html(carrousel);
		$('#myCarousel').carousel();// para que arranque solo
		$("#myCarousel").on("slid.bs.carousel",function(e){
		
			fotosvistas++
		
		
		})
	})
		
	}
	
	function mapayfotos(){		//proceso de elección de UNO de los geojson --> deberemos llamarle cuando tema puntuaciones
		$('#confposicion').show()
		if (flag){map.removeLayer(marker)} //borro el anterior popup
		var juego = $("#mijuego").html()	// selecciono el juego determinado
		if(juego =="Hispania"){esHispania = 1;map.setView([40,(-3)], 5)}else {esHispania = 0;map.setView([0,0], 1)}
		$.getJSON("juegos/"+juego+".json",function(data){
			local = nuevoGeoJson(data)
			latactual = local.geometry.coordinates[1]
			lngactual = local.geometry.coordinates[0]
			respuesta = local.properties.Name		// para el tema de pasar respuesta a cuadro final
			fotosAlCarrousel(local.properties.Name)	
		})
	}
	$("#startbutton").click(function(){
		if(estadoactual!=0){estadoactual++}
		ocultarHome()
		mapayfotos()
		nuevoHistorial($("#mijuego").html())
		
	})
		
	$("#reiniciarbutton").click(function(){		//esto se hará automático
		estadoactual++
		usadas = []		//cada vez que reinicio juego, a cero las usadas
		mapayfotos()
		nuevoHistorial($("#mijuego").html())
			
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
			var punt = calcpunt(distancia,fotosvistas,esHispania)
			puntfinal = puntfinal + punt
			$('#cuadropunt').html(rellenoCuadroPunt(respuesta,distancia,fotosvistas,todasusadas,puntfinal,esHispania)).css({'left':130, 'width':(4*dimension)/2,'top':150})
			.show()
			fotosvistas = 1
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
	
	
	
	function replaceHistorial(data){
		alert(data)
		if(data!=null){
			alert("data2   " + data.nombre)
			$("#mijuego").html(data.nombre)
		}
	}    



    window.onpopstate= function(event) {

        replaceHistorial(event.state);
    };

});
