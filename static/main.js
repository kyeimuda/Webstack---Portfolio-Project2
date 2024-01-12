$(document).ready(function() {
    $(".smallImgs").on("click", function() {
	var fullimg = $(this).attr("src");
	var className = $(this).attr("data-imageId");
	$("#"+className).attr("src", fullimg);
    });
    


    var Workers;
    var pages = 1;
    var showPerPage = 5;
    var PAGE = 1;
    var trimedWorkers;
    var btnField;

    
    $(".field").on("click", function() {
	var fields = $(this).val();
	$.getJSON("/api/explore/workers/" + fields, function(data) {
	    if(data.length > 0) {
		$(".workertab").remove();
		$(".results h3").remove();
		

		pages = Math.ceil(data.length /showPerPage)
		if (pages < 1){
		    pages = 1;
		}
		pageButton(pages, fields);

		$(".pagerBTN").each(function(index){
		    if ((index +1) == PAGE){
			$(this).attr("id", "currentPage")
		    }
		});
		
		var trimStart = (PAGE - 1) * showPerPage;
		var trimEnd = trimStart + showPerPage;
		Workers = data
		trimedWorkers = data.slice(trimStart, trimEnd);

		
		$.each(trimedWorkers, function(i, worker) {
 		    $('.results').append('<div class="workertab" id="WorkerTab"><div class="resultsinfo"><div class="pic"><div id="profileimg"><img src="image/profilepic/' + worker.username + '"></div></div><div class="about"><h3>Workerfy</h3><p id="username">Name: <br>' + worker.username + '</p><p id="workfield">Workfield :<br>' + worker.work_field + '</p><p id="location">Location:<br>' + worker.Location + '</p><p id="email">Email:<br>' + worker.email + '</p><p id="phone">phone:<br>' + worker.phone + '</p><p id="phone2">Phone2:<br>' + worker.phone2 + '</p><p id="description">About:<br>' + worker.description + '</p></div></div><div class="resultspics"><div class="smallimg"><img src="/image/image1/' + worker.username + '" class="smalImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image2/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image3/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image4/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image5/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"></div><div class="fullimg"><img src="/image/image1/' + worker.username + '" id="fullone' + worker.id + '"></div></div></div>');

		    $(".smallImgs").on("click", function() {
			var fullimg = $(this).attr("src");
			var className = $(this).attr("data-imageId");
			$("#"+className).attr("src", fullimg);
		    });
		    
		  
		});
	 
	    }else {
		$(".workertab").remove();
		$(".results h3").remove();
		$("#pagebtnpage").empty();
		$(".results").append("<h3> No Worker found.</h3>");
	    }

	    $('.pagerBTN').on('click', function(){
		$(".pagerBTN").removeAttr("id");
		$(this).attr("id", "currentPage")
		$(".workertab").remove();
		$(".results h3").remove();
		
		PAGE = $(this).val();

		pages = Math.ceil(data.length /showPerPage)
		if (pages < 1){
		    pages = 1;
		}
			
		var trimStart = (PAGE - 1) * showPerPage;
		var trimEnd = trimStart + showPerPage;
		Workers = data
		trimedWorkers = data.slice(trimStart, trimEnd);

		
		$.each(trimedWorkers, function(i, worker) {
		    $('.results').append('<div class="workertab" id="WorkerTab"><div class="resultsinfo"><div class="pic"><div id="profileimg"><img src="image/profilepic/' + worker.username + '"></div></div><div class="about"><h3>Workerfy</h3><p id="username">Name: <br>' + worker.username + '</p><p id="workfield">Workfield :<br>' + worker.work_field + '</p><p id="location">Location:<br>' + worker.Location + '</p><p id="email">Email:<br>' + worker.email + '</p><p id="phone">phone:<br>' + worker.phone + '</p><p id="phone2">Phone2:<br>' + worker.phone2 + '</p><p id="description">About:<br>' + worker.description + '</p></div></div><div class="resultspics"><div class="smallimg"><img src="/image/image1/' + worker.username + '" class="smalImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image2/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image3/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image4/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image5/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"></div><div class="fullimg"><img src="/image/image1/' + worker.username + '" id="fullone' + worker.id + '"></div></div></div>');

		    $(".smallImgs").on("click", function() {
			var fullimg = $(this).attr("src");
			var className = $(this).attr("data-imageId");
			$("#"+className).attr("src", fullimg);
		    });
		    

		  
		});
		
	    });



	    
	});
    });

    $("#searchBTN").on("click", function() {
	var loc = $("#location").val();
	var work = $("#fields").val()
	if(work == "All" & loc == "All") {
	    $.getJSON("/api/explore/workers", function(data) {
		if(data.length > 0) {
		    $(".workertab").remove();
		    $(".results h3").remove();
		    
		    pages = Math.ceil(data.length /showPerPage)
		    if (pages < 1){
			pages = 1;
		    }
		    pageButton(pages, fields);

		    $(".pagerBTN").each(function(index){
		    if ((index +1) == PAGE){
			$(this).attr("id", "currentPage")
		    }
		    });
		
		
		    var trimStart = (PAGE - 1) * showPerPage;
		    var trimEnd = trimStart + showPerPage;
		    Workers = data
		    trimedWorkers = data.slice(trimStart, trimEnd);


		    
		    $.each(trimedWorkers, function(i, worker) {
			$('.results').append('<div class="workertab" id="WorkerTab"><div class="resultsinfo"><div class="pic"><div id="profileimg"><img src="image/profilepic/' + worker.username + '"></div></div><div class="about"><h3>Workerfy</h3><p id="username">Name: <br>' + worker.username + '</p><p id="workfield">Workfield :<br>' + worker.work_field + '</p><p id="location">Location:<br>' + worker.Location + '</p><p id="email">Email:<br>' + worker.email + '</p><p id="phone">phone:<br>' + worker.phone + '</p><p id="phone2">Phone2:<br>' + worker.phone2 + '</p><p id="description">About:<br>' + worker.description + '</p></div></div><div class="resultspics"><div class="smallimg"><img src="/image/image1/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image2/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image3/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image4/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image5/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"></div><div class="fullimg"><img src="/image/image1/' + worker.username + '" id="fullone' + worker.id + '"></div></div></div>');

			$(".smallImgs").on("click", function() {
			    var fullimg = $(this).attr("src");
			    var className = $(this).attr("data-imageId");
			    $("#"+className).attr("src", fullimg);
			});
		    });
		}else {
		    $(".workertab").remove();
		    $(".results h3").remove();
		    $("#pagebtnpage").empty();
		    $(".results").append("<h3> No Worker found.</h3>");
		}

		$('.pagerBTN').on('click', function(){
		    $(".pagerBTN").removeAttr("id");
		    $(this).attr("id", "currentPage")
		    $(".workertab").remove();
		    $(".results h3").remove();
		
		PAGE = $(this).val();

		pages = Math.ceil(data.length /showPerPage)
		if (pages < 1){
		    pages = 1;
		}
			
		var trimStart = (PAGE - 1) * showPerPage;
		var trimEnd = trimStart + showPerPage;
		Workers = data
		trimedWorkers = data.slice(trimStart, trimEnd);

		
		$.each(trimedWorkers, function(i, worker) {
		    $('.results').append('<div class="workertab" id="WorkerTab"><div class="resultsinfo"><div class="pic"><div id="profileimg"><img src="image/profilepic/' + worker.username + '"></div></div><div class="about"><h3>Workerfy</h3><p id="username">Name: <br>' + worker.username + '</p><p id="workfield">Workfield :<br>' + worker.work_field + '</p><p id="location">Location:<br>' + worker.Location + '</p><p id="email">Email:<br>' + worker.email + '</p><p id="phone">phone:<br>' + worker.phone + '</p><p id="phone2">Phone2:<br>' + worker.phone2 + '</p><p id="description">About:<br>' + worker.description + '</p></div></div><div class="resultspics"><div class="smallimg"><img src="/image/image1/' + worker.username + '" class="smalImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image2/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image3/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image4/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image5/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"></div><div class="fullimg"><img src="/image/image1/' + worker.username + '" id="fullone' + worker.id + '"></div></div></div>');

		    $(".smallImgs").on("click", function() {
			var fullimg = $(this).attr("src");
			var className = $(this).attr("data-imageId");
			$("#"+className).attr("src", fullimg);
		    });
		    

		  
		});
		
	    });


		
	    });
	}else if(work != "All" & loc == "All") {
	    $.getJSON("/api/explore/workers/" + work, function(data) {
		if(data.length > 0) {
		    $(".workertab").remove();
		    $(".results h3").remove();

		    pages = Math.ceil(data.length /showPerPage)
		    if (pages < 1){
			pages = 1;
		    }
		    pageButton(pages, fields);

		    $(".pagerBTN").each(function(index){
		    if ((index +1) == PAGE){
			$(this).attr("id", "currentPage")
		    }
		    });
		
		    var trimStart = (PAGE - 1) * showPerPage;
		    var trimEnd = trimStart + showPerPage;
		    Workers = data
		    trimedWorkers = data.slice(trimStart, trimEnd);
		    
		    
		    $.each(trimedWorkers, function(i, worker) {
			$('.results').append('<div class="workertab" id="WorkerTab"><div class="resultsinfo"><div class="pic"><div id="profileimg"><img src="image/profilepic/' + worker.username + '"></div></div><div class="about"><h3>Workerfy</h3><p id="username">Name: <br>' + worker.username + '</p><p id="workfield">Workfield :<br>' + worker.work_field + '</p><p id="location">Location:<br>' + worker.Location + '</p><p id="email">Email:<br>' + worker.email + '</p><p id="phone">phone:<br>' + worker.phone + '</p><p id="phone2">Phone2:<br>' + worker.phone2 + '</p><p id="description">About:<br>' + worker.description + '</p></div></div><div class="resultspics"><div class="smallimg"><img src="/image/image1/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image2/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image3/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image4/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image5/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"></div><div class="fullimg"><img src="/image/image1/' + worker.username + '" id="fullone' + worker.id + '"></div></div></div>');

			$(".smallImgs").on("click", function() {
			    var fullimg = $(this).attr("src");
			    var className = $(this).attr("data-imageId");
			    $("#"+className).attr("src", fullimg);
			});
		    });
		}else {
		    $(".workertab").remove();
		    $(".results h3").remove();
		    $("#pagebtnpage").empty();
		    $(".results").append("<h3> No Worker found.</h3>");
		}

		$('.pagerBTN').on('click', function(){
		    $(".pagerBTN").removeAttr("id");
		    $(this).attr("id", "currentPage")
		    $(".workertab").remove();
		    $(".results h3").remove();
		
		PAGE = $(this).val();

		pages = Math.ceil(data.length /showPerPage)
		if (pages < 1){
		    pages = 1;
		}
			
		var trimStart = (PAGE - 1) * showPerPage;
		var trimEnd = trimStart + showPerPage;
		Workers = data
		trimedWorkers = data.slice(trimStart, trimEnd);

		
		$.each(trimedWorkers, function(i, worker) {
		    $('.results').append('<div class="workertab" id="WorkerTab"><div class="resultsinfo"><div class="pic"><div id="profileimg"><img src="image/profilepic/' + worker.username + '"></div></div><div class="about"><h3>Workerfy</h3><p id="username">Name: <br>' + worker.username + '</p><p id="workfield">Workfield :<br>' + worker.work_field + '</p><p id="location">Location:<br>' + worker.Location + '</p><p id="email">Email:<br>' + worker.email + '</p><p id="phone">phone:<br>' + worker.phone + '</p><p id="phone2">Phone2:<br>' + worker.phone2 + '</p><p id="description">About:<br>' + worker.description + '</p></div></div><div class="resultspics"><div class="smallimg"><img src="/image/image1/' + worker.username + '" class="smalImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image2/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image3/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image4/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image5/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"></div><div class="fullimg"><img src="/image/image1/' + worker.username + '" id="fullone' + worker.id + '"></div></div></div>');

		    $(".smallImgs").on("click", function() {
			var fullimg = $(this).attr("src");
			var className = $(this).attr("data-imageId");
			$("#"+className).attr("src", fullimg);
		    });
		    

		  
		});
		
	    });


		
	    });
	}else if(work == "All" & loc != "All") {
	    $.getJSON("/api/explore/workersLoc/" + loc, function(data) {
		if(data.length > 0) {
		    $(".workertab").remove();
		    $(".results h3").remove();

		    pages = Math.ceil(data.length /showPerPage)
		    if (pages < 1){
			pages = 1;
		    }
		    pageButton(pages, fields);

		    $(".pagerBTN").each(function(index){
		    if ((index +1) == PAGE){
			$(this).attr("id", "currentPage")
		    }
		    });
		
		    var trimStart = (PAGE - 1) * showPerPage;
		    var trimEnd = trimStart + showPerPage;
		    Workers = data
		    trimedWorkers = data.slice(trimStart, trimEnd);

		    
		    $.each(trimedWorkers, function(i, worker) {
			$('.results').append('<div class="workertab" id="WorkerTab"><div class="resultsinfo"><div class="pic"><div id="profileimg"><img src="image/profilepic/' + worker.username + '"></div></div><div class="about"><h3>Workerfy</h3><p id="username">Name: <br>' + worker.username + '</p><p id="workfield">Workfield :<br>' + worker.work_field + '</p><p id="location">Location:<br>' + worker.Location + '</p><p id="email">Email:<br>' + worker.email + '</p><p id="phone">phone:<br>' + worker.phone + '</p><p id="phone2">Phone2:<br>' + worker.phone2 + '</p><p id="description">About:<br>' + worker.description + '</p></div></div><div class="resultspics"><div class="smallimg"><img src="/image/image1/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image2/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image3/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image4/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image5/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"></div><div class="fullimg"><img src="/image/image1/' + worker.username + '" id="fullone' + worker.id + '"></div></div></div>');

			$(".smallImgs").on("click", function() {
			    var fullimg = $(this).attr("src");
			    var className = $(this).attr("data-imageId");
			    $("#"+className).attr("src", fullimg);
			});
		    });
		}else {
		    $(".workertab").remove();
		    $(".results h3").remove();
		    $("#pagebtnpage").empty();
		    $(".results").append("<h3> No Worker found.</h3>");
		}

		$('.pagerBTN').on('click', function(){
		    $(".pagerBTN").removeAttr("id");
		    $(this).attr("id", "currentPage")
		    $(".workertab").remove();
		    $(".results h3").remove();
		
		PAGE = $(this).val();

		pages = Math.ceil(data.length /showPerPage)
		if (pages < 1){
		    pages = 1;
		}
			
		var trimStart = (PAGE - 1) * showPerPage;
		var trimEnd = trimStart + showPerPage;
		Workers = data
		trimedWorkers = data.slice(trimStart, trimEnd);

		
		$.each(trimedWorkers, function(i, worker) {
		    $('.results').append('<div class="workertab" id="WorkerTab"><div class="resultsinfo"><div class="pic"><div id="profileimg"><img src="image/profilepic/' + worker.username + '"></div></div><div class="about"><h3>Workerfy</h3><p id="username">Name: <br>' + worker.username + '</p><p id="workfield">Workfield :<br>' + worker.work_field + '</p><p id="location">Location:<br>' + worker.Location + '</p><p id="email">Email:<br>' + worker.email + '</p><p id="phone">phone:<br>' + worker.phone + '</p><p id="phone2">Phone2:<br>' + worker.phone2 + '</p><p id="description">About:<br>' + worker.description + '</p></div></div><div class="resultspics"><div class="smallimg"><img src="/image/image1/' + worker.username + '" class="smalImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image2/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image3/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image4/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image5/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"></div><div class="fullimg"><img src="/image/image1/' + worker.username + '" id="fullone' + worker.id + '"></div></div></div>');

		    $(".smallImgs").on("click", function() {
			var fullimg = $(this).attr("src");
			var className = $(this).attr("data-imageId");
			$("#"+className).attr("src", fullimg);
		    });
		    

		  
		});
		
	    });

		
	    });
	}else if(work != "All" & loc != "All") {
	    $.getJSON("/api/explore/workers/" + loc + "/" + work, function(data) {
		if(data.length > 0) {
		    $(".workertab").remove();
		    $(".results h3").remove();

		    pages = Math.ceil(data.length /showPerPage)
		    if (pages < 1){
			pages = 1;
		    }
		    pageButton(pages, fields);

		    $(".pagerBTN").each(function(index){
		    if ((index +1) == PAGE){
			$(this).attr("id", "currentPage")
		    }
		    });
		
		    var trimStart = (PAGE - 1) * showPerPage;
		    var trimEnd = trimStart + showPerPage;
		    Workers = data
		    trimedWorkers = data.slice(trimStart, trimEnd);

		    
		    $.each(trimedWorkers, function(i, worker) {
			$('.results').append('<div class="workertab" id="WorkerTab"><div class="resultsinfo"><div class="pic"><div id="profileimg"><img src="image/profilepic/' + worker.username + '"></div></div><div class="about"><h3>Workerfy</h3><p id="username">Name: <br>' + worker.username + '</p><p id="workfield">Workfield :<br>' + worker.work_field + '</p><p id="location">Location:<br>' + worker.Location + '</p><p id="email">Email:<br>' + worker.email + '</p><p id="phone">phone:<br>' + worker.phone + '</p><p id="phone2">Phone2:<br>' + worker.phone2 + '</p><p id="description">About:<br>' + worker.description + '</p></div></div><div class="resultspics"><div class="smallimg"><img src="/image/image1/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image2/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image3/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image4/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image5/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"></div><div class="fullimg"><img src="/image/image1/' + worker.username + '" id="fullone' + worker.id + '"></div></div></div>');

			$(".smallImgs").on("click", function() {
			    var fullimg = $(this).attr("src");
			    var className = $(this).attr("data-imageId");
			    $("#"+className).attr("src", fullimg);
			});
		    });
		}else {
		    $(".workertab").remove();
		    $(".results h3").remove();
		    $("#pagebtnpage").empty();
		    $(".results").append("<h3> No Worker found.</h3>");
		}

		$('.pagerBTN').on('click', function(){
		    $(".pagerBTN").removeAttr("id");
		    $(this).attr("id", "currentPage")
		    $(".workertab").remove();
		    $(".results h3").remove();
		
		PAGE = $(this).val();

		    pages = Math.ceil(data.length /showPerPage)
		if (pages < 1){
		    pages = 1;
		}
			
		var trimStart = (PAGE - 1) * showPerPage;
		var trimEnd = trimStart + showPerPage;
		Workers = data
		trimedWorkers = data.slice(trimStart, trimEnd);

		
		$.each(trimedWorkers, function(i, worker) {
		    $('.results').append('<div class="workertab" id="WorkerTab"><div class="resultsinfo"><div class="pic"><div id="profileimg"><img src="image/profilepic/' + worker.username + '"></div></div><div class="about"><h3>Workerfy</h3><p id="username">Name: <br>' + worker.username + '</p><p id="workfield">Workfield :<br>' + worker.work_field + '</p><p id="location">Location:<br>' + worker.Location + '</p><p id="email">Email:<br>' + worker.email + '</p><p id="phone">phone:<br>' + worker.phone + '</p><p id="phone2">Phone2:<br>' + worker.phone2 + '</p><p id="description">About:<br>' + worker.description + '</p></div></div><div class="resultspics"><div class="smallimg"><img src="/image/image1/' + worker.username + '" class="smalImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image2/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image3/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image4/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"><img src="/image/image5/' + worker.username + '" class="smallImgs" data-imageId="fullone' + worker.id + '"></div><div class="fullimg"><img src="/image/image1/' + worker.username + '" id="fullone' + worker.id + '"></div></div></div>');

		    $(".smallImgs").on("click", function() {
			var fullimg = $(this).attr("src");
			var className = $(this).attr("data-imageId");
			$("#"+className).attr("src", fullimg);
		    });
		    

		  
		});
		
	    });

		
	    });
	    
	}
    });
	    
});

function pagination(data, page, row){
    var trimStart = (page - 1) * row;
    var trimEnd = trimStart + row;
    
    Workers = data.slice(trimStart, trimEnd);
    pages = Math.ceil(data.length /row);
}

function pageButton(pages, field){
    var wrapper = document.getElementById('pagebtnpage')
    
    wrapper.innerHTML = ''

    for (var page = 1; page <= pages; page ++){
	wrapper.innerHTML += `<button name=${field} value=${page} class="pagerBTN">${page}</button>`
    }

}


