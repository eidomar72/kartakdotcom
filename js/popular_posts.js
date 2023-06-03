function getTop3BlogArticles() {

// Fetch popularity data from Google Analytics
  function queryReports() {
    console.log('Fetching popularity data from Google Analytics...');

    gapi.client.request({
      path: '/v4/reports:batchGet',
      root: 'https://analyticsreporting.googleapis.com/',
      method: 'POST',
      body: {
        reportRequests: [
          {
            viewId: '47983407',
            dateRanges: [
              {
                startDate: '7daysAgo',
                endDate: 'today'
              }
            ],
            metrics: [
              {
                expression: 'ga:pageviews'
              }
            ],
            dimensions: [
              {
                name: 'ga:pageTitle'
              },
              {
                name: 'ga:pagePath'
              }
            ],
            orderBys: [
              {
                fieldName: 'ga:pageviews',
                sortOrder: 'DESCENDING'
              }
            ],
            pageSize: 3
          }
        ]
      }
    }).then(function(response) {
      console.log('Popularity data fetched successfully.');

      var results = response.result.reports[0].data.rows;

      // Create a list of the top three blog articles.
      var top3Articles = [];
      for (var i = 0; i < results.length; i++) {
        var article = {
          title: results[i].dimensions[0],
          pageviews: results[i].metrics[0].values[0]
        };
        top3Articles.push(article);
      }

      console.log('Top three articles:');
      console.log(top3Articles);

      // Display the top three blog articles.
      var div = document.getElementById('top3Articles');
      for (var i = 0; i < top3Articles.length; i++) {
        var article = top3Articles[i];
        var li = document.createElement('li');
        li.innerHTML = article.title + ' (' + article.pageviews + ' pageviews)';
        div.appendChild(li);
      }
    }, function(reason) {
      console.error('Error: ' + reason.result.error.message);
    });
  }

  // Load the Google Analytics Reporting API client library.
  console.log('Loading Google Analytics Reporting API...');

  gapi.load('client:auth2', function() {
    gapi.client.init({
      apiKey: 'AIzaSyDAa8Z7rvfkAaEvGrAEcsGUhA9hGLQwoKE'
    }).then(function() {
      return gapi.client.load('https://content.googleapis.com/discovery/v1/apis/analyticsreporting/v4/rest');
    }).then(function() {
      console.log('Google Analytics Reporting API loaded successfully.');

      // Call the queryReports function to fetch popularity data and display the top three blog articles.
      queryReports();
    }, function(reason) {
      console.error('Error: ' + reason.result.error.message);
    });
  });
}

// Call the getTop3BlogArticles function.
getTop3BlogArticles();
