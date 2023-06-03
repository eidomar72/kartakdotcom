function getTop3BlogArticles() {
  // Get the Google Analytics API client.
  var analytics = google.analytics();

  // Create a request object.
  var request = analytics.request('ga', 'get', {
    ids: 'ga:47983407',
    dimensions: 'ga:pageviews',
    sort: '-ga:pageviews',
    filters: 'ga:type==blog',
    max: 3
  });

  // Send the request.
  request.send(function(response) {
    // Get the results.
    var results = response.data;

    // Create a list of the top three blog articles.
    var top3Articles = [];
    for (var i = 0; i < results.length && i < 3; i++) {
      top3Articles.push({
        title: results[i].title,
        pageviews: results[i].pageviews
      });
    }

    // Display the top three blog articles.
    var div = document.getElementById('popular-posts');
    for (var i = 0; i < top3Articles.length; i++) {
      var article = top3Articles[i];
      var li = document.createElement('li');
      li.innerHTML = article.title + ' (' + article.pageviews + ' views)';
      div.appendChild(li);
    }
  });
}

// Call the getTop3BlogArticles function.
getTop3BlogArticles();
