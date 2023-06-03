// Replace with your view ID.
var VIEW_ID = '47983407';

// Query the API and print the results to the page.
function queryReports() {
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
            {
              expression: 'ga:sessions'
            }
          ]
        }
      ]
    }
  }).then(displayResults, console.error.bind(console));
}

// Fetch popularity data from Google Analytics
     function fetchPopularityData() {
       gapi.client.analyticsreporting.reports
         .batchGet({
           requestBody: {
             reportRequests: [
               {
                 viewId: 'YOUR_VIEW_ID',
                 dateRanges: [
                   {
                     startDate: 'YOUR_START_DATE', // e.g., '2023-01-01'
                     endDate: 'YOUR_END_DATE', // e.g., '2023-05-31'
                   },
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
               },
             ],
           },
         })
         .then((response) => {
           const popularityData = response.result.reports[0].data.rows;

           // Combine popularity data with blog data
           const blogsWithPopularity = blogs.map((blog) => {
             const matchingRow = popularityData.find((row) => row.dimensions[0] === blog.url);
             const popularity = matchingRow ? +matchingRow.metrics[0].values[0] : 0;

             return { ...blog, popularity };
           });

           // Sort the blogs by popularity (descending order)
           const sortedBlogs = blogsWithPopularity.sort((a, b) => b.popularity - a.popularity);

           // Display the top popular posts
           const popularPostsElement = document.getElementById('popular-posts');
           sortedBlogs.slice(0, 3).forEach((blog) => {
             const listItem = document.createElement('li');
             const link = document.createElement('a');
             link.href = blog.url;
             link.textContent = blog.title;
             listItem.appendChild(link);
             popularPostsElement.appendChild(listItem);
           });
         })
         .catch((error) => {
           console.error('Error fetching popularity data:', error);
         });
     }
