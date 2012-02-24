//reflash file list
function reloadfilelist(){
	$.get('list.php','',function(data){
		if (data.data.length) {
			createlist(data.data);
		}
	},'json');
}
//create file list
function createlist(data)
{
	var str = '';
	$.each(data,function(i,n){
		var icon_style = '';
		switch (n.type) {
		case 'directory':
			icon_style = 's_folder_32';
			break;
		case 'image/gif':
		case 'image/jpeg':
			icon_style = 's_page_white_picture_32';
			break;
		case 'application/pdf':
			icon_style = 's_page_white_acrobat_32';
			break;
		case 'text/plain':
			icon_style = 's_page_white_text_32';
			break;
		case 'application/x-gzip':
		case 'application/rar':
		case 'application/zip':
			icon_style = 's_page_white_compressed_32';
			break;
		default:
			icon_style = 's_page_white_32';
			break;
		}
		
		str += '<li class="browse-file">'+
			   '<div class="filename-col">'+
			   '<img class="icon sprite '+icon_style+'" src="img/icon_spacer.gif" />'+
			   '<div class="filename">'+n.name+'</div></div>'+
			   '<div class="kind">'+n.type+'</div>'+
			   '<div class="modified">'+n.modified+'</div>'+
			   '<br style="clear:both;" /></li>';
	});
	$("#browse-files").empty();
	$("#browse-files").append(str);
}

reloadfilelist();