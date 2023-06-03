// Replace with your view ID.
var VIEW_ID = '47983407';

// Fetch popularity data from Google Analytics
     function fetchPopularityData() {
       gapi.client.request({
         path: '/v4/reports:batchGet',
         root: 'https://analyticsreporting.googleapis.com/',
         method: 'POST',
         body: {
           reportRequests: [
             {
               viewId: VIEW_ID,
               dateRanges: [
                 {
                   startDate: '7daysAgo',
                   endDate: 'today'
                 }
               ],
               metrics: [
                    { expression: 'ga:pageviews' }, // Adjust the metric based on your needs
                  ],
                  dimensions: [
                    { name: 'ga:pagePath' }, // Adjust the dimension based on your needs
                  ],
                  orderBys: [
                    { fieldName: 'ga:pageviews', sortOrder: 'DESCENDING' },
                  ],
                  pageSize: 3, // Number of top popular posts to fetch
                }
               ]
             }
           ]
         }
       })
         .then((response) => {
           const popularityData = response.result.reports[0].data.rows;

           // Combine popularity data with blog data
            const blogsWithPopularity = blogs.map((blog) => {
              const matchingRow = popularityData.find((row) => row.dimensions[0] === blog.url);
              const popularity = matchingRow ? +matchingRow.metrics[0].values[0] : 0;

              return { ...blog, popularity };
              console.log(blog);
            });
         }
