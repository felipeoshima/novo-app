if (window.cordova.platformId == "browser") {
    facebookConnectPlugin.browserInit(152479708206968);
    // version is optional. It refers to the version of API you may want to use.
}

$(document).ready(function() {   

	//Loop para trazer e filtrar as baladas do Lista.Json
	for (var i = 0; i < baladas.length; i++) {
		var item = baladas[i];

		var htmlItem = 	'<div class="itemLista">'+
		'<div class="clearfix">'+
		'<a href="detalhe.html" title="detalhe">'+
		'<div class="imgLogo pull-left"><img src="http://www.nex2.com.br/app/imagens/'+item.logo+'" alt="'+item.nome+'"></div>'+
		'<div class="infoGeral pull-left">'+
		'<h2>'+item.nome+'</h2>'+
		'<div class="data">'+item.data+' / '+item.hora+'</div>'+
		'<div class="festa">'+item.festa+'</div>'+
		'<div class="info"><span class="tit">O que toca?</span> '+item.genero.descricao+'</div>'+
		'<div class="info"><span class="tit">Lista</span>: '+item.comLista+'</div>'+
		'<div class="info"><span class="tit">Sem lista</span>:'+item.semLista+'</div>'+
		'</div>'+
		'</div>'+
		'<div class="barraInfo clearfix">'+
		'<div class="tipo '+item.tipo+'"></div>'+
		'<div class="tipo rank"><span class="fa fa-heart"></span>65%</div>'+
		'</a>'+
		'</div>'+
		'</div>';

		$("#geral .listaGeral .lista").append(htmlItem);

		if(item.tipo.indexOf("vip") != -1){	
			$("#vip .listaGeral .lista").append(htmlItem);
		}
		if(item.tipo.indexOf("openBar") != -1){	
			$("#openbar .listaGeral .lista").append(htmlItem);
		}
	}

	//Adiciona o icone e o tipo de acordo com a classe
	$(".openBar").html("<span class='fa fa-glass'></span>Open Bar");
	$(".vip").html("<span class='fa fa-star'></span>VIP");

	//MenuBar Principal
	$('.btnMenuPrincipal').on('click touchstart', function(e){
		$('.menuPrincipal').toggleClass('in');
		$('.blackout').toggleClass('in');
		e.preventDefault();
	});

    //MenuBar Filtro
    $('.btnFiltro').on('click touchstart', function(e){
    	$('.menuFiltro').toggleClass('in');
    	$('.blackout2').toggleClass('in');
    	e.preventDefault();
    });


    //Blackouts
    $('.blackout').on('click touchstart', function(e){
    	$(".menuPrincipal").toggleClass('in');
    	$(this).toggleClass('in')
    	e.preventDefault();
    });

    $('.blackout2').on('click touchstart', function(e){
    	$(".menuFiltro").toggleClass('in');
    	$(this).toggleClass('in')
    	e.preventDefault();
    });

    $('.menuPrincipal .checkFiltro').on('click touchstart', function(e){
    	$(".menuPrincipal").toggleClass('in');
    	$('.blackout').toggleClass('in')
    	e.preventDefault();
    });

    $('.menuFiltro .checkFiltro').on('click touchstart', function(e){
    	$(".menuFiltro").toggleClass('in');
    	$('.blackout2').toggleClass('in')
    	e.preventDefault();
    });
    ///////

    //Tabs
    //$('#tabs').tab();
    $('#tabs').tab();

    ////////////////////////////////////////////

    // Adiciona os filtros (radiobox) por Localização
    for (i=0;i<baladas.length; i++){
    	var item = baladas[i]
    	var radiobox = $("<li><label class='radio-inline'><input type='radio' name='filtroLocal' value='"+item.local+"'>"+item.local+"</label></li>")

    	$(".filtroLocal").each(function() {
    		$(this).append(radiobox)
    	})
    }

    // Adiciona os filtros (checkbox) por Gênero
    for(i=0;i < baladas.length; i++) {
    	var item = baladas[i]
    	var checkbox = $("<li><label class='checkbox-inline'><input class='checkboxGenero' type='checkbox' value='"+item.genero.gen+"' name='gen2'>"+item.genero.descricao+"</label></li>")

    	$(".filtroGenero").each(function() {
    		$(this).append(checkbox)
    	})
    }

    $(".filtroGenero input[type=checkbox]").on('click', function () {
    	var genero = $(this).val();
    	if($(this).is(":checked")) {
    		adicionarItemBaladaPorGenero(genero);
    	} else {		
    		$("." + genero).remove();				
    	}
    	filtroAtivo()
    	semResultado()

    })

    function adicionarItemBaladaPorGenero(genero){

    	for(i=0;i < baladas.length; i++){			
    		var item = baladas[i];
    		if(item.genero.gen == genero) {
    			adicionarHtmlPorGenero(item);
    			$(".openBar").html("<span class='fa fa-glass'></span>Open Bar");
    			$(".vip").html("<span class='fa fa-star'></span>VIP");
    		}
    	}
    }

    function adicionarHtmlPorGenero(item){
    	var divLista = $("#geral .listaFiltro .lista")
    	var divLista2 = $("#vip .listaFiltro .lista")
    	var divLista3 = $("#openbar .listaFiltro .lista")
    	var htmlItem = 	'<div class="itemLista ' + item.genero.gen + '">'+
    	'<div class="clearfix">'+
    	'<a href="detalhe.html" title="detalhe">'+
    	'<div class="imgLogo pull-left"><img src="http://www.nex2.com.br/app/imagens/'+item.logo+'" alt="'+item.nome+'"></div>'+
    	'<div class="infoGeral pull-left">'+
    	'<h2>'+item.nome+'</h2>'+
    	'<div class="data">'+item.data+' / '+item.hora+'</div>'+
    	'<div class="festa">'+item.festa+'</div>'+
    	'<div class="info"><span class="tit">O que toca?</span> '+item.genero.descricao+'</div>'+
    	'<div class="info"><span class="tit">Lista</span>: '+item.comLista+'</div>'+
    	'<div class="info"><span class="tit">Sem lista</span>:'+item.semLista+'</div>'+
    	'</div>'+
    	'</div>'+
    	'<div class="barraInfo clearfix">'+
    	'<div class="tipo '+item.tipo+'"></div>'+
    	'<div class="tipo rank"><span class="fa fa-heart"></span>65%</div>'+
    	'</a>'+
    	'</div>'+
    	'</div>';
    	divLista.append(htmlItem);

    	if(item.tipo.indexOf("vip") != -1){	
    		divLista2.append(htmlItem);
    	}
    	if(item.tipo.indexOf("openBar") != -1){	
    		divLista3.append(htmlItem);
    	}
    }

	//Verifica se há um filtro ativo
	function filtroAtivo() {
		if($(".filtroGenero input[type=checkbox]:checked").length > 0) {
			$(".listaGeral .lista").hide()
			$(".listaFiltro .lista").show()
			$(".listaBusca .lista").empty()
		} else {
			$(".listaGeral .lista").show()
			$(".listaFiltro .lista").hide()
		}
	}

	function limpaArrayRepetido() {
		var seen = {};
		$('.filtroGenero span').each(function() {
			var txt = $(this).text();
			if (seen[txt]) {
				$(this).parent().remove();
			}
			else {
				seen[txt] = true;
			}
		});
	}
	limpaArrayRepetido()

	function semResultado() {
		if($("#geral .listaFiltro .lista .itemLista").length == 0) {
			$("#geral .listaFiltro .semResultado").text("Nenhum resultado encontrado")
		} else {
			$("#geral .listaFiltro .semResultado").text("")
		}

		if($("#openbar .listaFiltro .lista .itemLista").length == 0) {
			$("#openbar .listaFiltro .semResultado").text("Nenhum resultado encontrado")
		} else {
			$("#openbar .listaFiltro .semResultado").text("")
		}

		if($("#vip .listaFiltro .lista .itemLista").length == 0) {
			$("#vip .listaFiltro .semResultado").text("Nenhum resultado encontrado")
		} else {
			$("#vip .listaFiltro .semResultado").text("")
		}

	}

	$(".btnBusca").on('click', function() {
		$(".busca").css("display","block")
		$(".busca input").focus()
	})

	$(".busca .fechaBusca").on('click', function() {
		$(".busca").css("display","none")
		$(".busca input").val('')
		busca()
	})

	$(".busca input").on('change', function() {
		var resultadoBusca = $(this).val()
		busca();
		addBusca(resultadoBusca)
	})

	function addBusca(resultadoBusca) {
		for(i=0;i<baladas.length;i++){
			var item = baladas[i]
			if(resultadoBusca == item.nome) {
				addHtml(item)
			} 
		}

	}

	function addHtml(item) {
		var divLista = $("#geral .listaBusca .lista")
		var htmlItem = 	'<div class="itemLista">'+
		'<div class="clearfix">'+
		'<a href="detalhe.html" title="detalhe">'+
		'<div class="imgLogo pull-left"><img src="http://www.nex2.com.br/app/imagens/'+item.logo+'" alt="'+item.nome+'"></div>'+
		'<div class="infoGeral pull-left">'+
		'<h2>'+item.nome+'</h2>'+
		'<div class="data">'+item.data+' / '+item.hora+'</div>'+
		'<div class="festa">'+item.festa+'</div>'+
		'<div class="info"><span class="tit">O que toca?</span> '+item.genero.descricao+'</div>'+
		'<div class="info"><span class="tit">Lista</span>: '+item.comLista+'</div>'+
		'<div class="info"><span class="tit">Sem lista</span>:'+item.semLista+'</div>'+
		'</div>'+
		'</div>'+
		'<div class="barraInfo clearfix">'+
		'<div class="tipo '+item.tipo+'"></div>'+
		'<div class="tipo rank"><span class="fa fa-heart"></span>65%</div>'+
		'</a>'+
		'</div>'+
		'</div>';
		divLista.append(htmlItem);
	}

	function busca() {
		if($(".busca input").val().length > 1) {
			$(".listaGeral .lista").hide()
			$(".listaFiltro .lista").empty()
			$("input.checkboxGenero").attr("checked",false)
		} else {
			$(".listaGeral .lista").show()
			$(".listaBusca .lista").empty()
		}
	}

});