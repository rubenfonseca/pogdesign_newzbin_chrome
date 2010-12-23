function format_number(number) {
	n = parseInt(number);
	if(n < 10)
		return "0" + n;
	else
		return number;
}

chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
  $(function() {
    $('.newzbin').remove();
    
    $('.eplink').each(function(i) {
      series = $(this).html();

      quote = $($(this).nextAll('span')[1]).html();
      s = /S: (\d+) - Ep: (\d+)/(quote);
      season = s[1];
      episode = s[2];

      if(!req.type || req.type == "newzbin") {
        querystring = series + "+" + season + "x" + format_number(episode);
        link = "http://www.newzbin.com/search/query/?q=" + querystring + "&area=-1&fpn=p&searchaction=Go&areadone=-1";
      } else {
        querystring = series + "+S" + format_number(season) + "E" + format_number(episode);
        link = "http://nzbmatrix.com/nzb-search.php?search=" + querystring + "&cat=0";
      }

      $($(this).nextAll('span')[1]).after('<span class="newzbin"><a href="' + link + '" target="_blank" rel="external"><img src="http://www.newzbin.com/m/i/i/download.png" alt="newzbin download" /></a></span>');
    });

    $(".newzbin a").click(function() {
  		window.open($(this).attr('href'));
  		return false;
  	});
  });
});

