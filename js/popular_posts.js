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
      var div = document.getElementById('popular-posts');
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
      clientId: '846109528598-l0p4tk1hdg14b24rgcbvtf6kdreel06f.apps.googleusercontent.com',
      discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
      scope: 'https://www.googleapis.com/auth/analytics.readonly'
    }).then(function() {
      console.log('Google Analytics Reporting API loaded successfully.');

      // Authenticate with Google OAuth2.
      return gapi.auth2.getAuthInstance().signIn();
    }).then(function() {
      console.log('User authenticated.');

      // Call the queryReports function to fetch popularity data and display the top three blog articles.
      queryReports();
    }).catch(function(error) {
      console.error('Error: ' + error);
    });
  });
  }

  // Call the getTop3BlogArticles function.
  getTop3BlogArticles();
