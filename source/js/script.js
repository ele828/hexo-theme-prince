var quoteEndpoint = "https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
function initQuotes(count) {
  // Avoid deep recursive
  if (count > 10) {
    $(".quotes").text("Make things that really matter.");
    return;
  }
  // If in homepage, fetches quotes
  $.getJSON(quoteEndpoint).then(r => {
    var quotes = r.quoteText;
    if (!quotes || quotes.length > 60 || quotes.length <= 0) {
      initQuotes(++count);
    } else {
      $(".quotes").text(quotes);
    }
  });
}
initQuotes(0);

function init() {
  $('.post-block p img').each(function () {
    $(this).wrap('<a data-fancybox="images" href="' + this.src + '" data-caption=" ' + this.alt + '" class="fancybox"></a>');
    $(this).attr('src', this.src + '?imageMogr2/thumbnail/300x300/gravity/North/crop/200x200');
  });

  // Align all images to center
  $('.post-entry p:has(a.fancybox)').css({ 'text-align': 'center' });

  if ($.fancybox) {
    $('.fancybox').fancybox({
      thumbs: {
        // showOnStart: true
      },
      caption: function (instance, item) {
        var caption, link;

        if (item.type === 'image') {
          caption = $(this).data('caption');
          link = '<a href="' + item.src + '">Download</a>';

          return (caption ? caption : '') + link;
        }
      },

    });
    // $.fancybox.defaults.speed = 1000;
  }
}

init();
