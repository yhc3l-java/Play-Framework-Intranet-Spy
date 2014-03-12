$(function(){
	
	for(var i = 1; i <= 50; i++){
		var ip = '192.168.1.' + i;
		
		$('<tr><th></th><td></td><td></td><td></td></tr>').attr('id', 'ip-' + ip.replace(/\./g, '-'))
		.children().eq(0).text(ip).end().end()
		.children().eq(1).html('<a href="http://' + ip + ':9000/" target="_blank"><i class="fa fa-external-link"></i></a>').end().end()
		.hide()
		.appendTo('#ip-numbers');
		
		updateStatusForIp(ip);
	}
	
	function updateStatusForIp(ip, queue){
		$.ajax({
			url: '/getStatusForIp/' + ip,
			success: function(response){
				if(response.status == '?'){
					$('#ip-' + ip.replace(/\./g, '-')).fadeOut();
					
					setTimeout(function(){
						updateStatusForIp(ip);
					}, 60000);
					
					return;
				}
				
				$('#ip-' + ip.replace(/\./g, '-'))
				.removeClass()
				.addClass((response.status + '').charAt(0) == '2' ? 'success' : 'warning')
				.children().eq(2).text(response.status).end().end()
				.children().eq(3).empty().append($('<abbr title=\"' + new Date().toISOString() + '\">').timeago()).end().end()
				.fadeIn();
				
				setTimeout(function(){
					updateStatusForIp(ip);
				}, 5000);
			},
			error: function(response){
				console.error();
				
				if(response.responseText == "No response"){
					$('#ip-' + ip.replace(/\./g, '-')).fadeOut();
				}
			}
		});
	}
});