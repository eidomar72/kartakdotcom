// Load the Google JavaScript client library
gapi.load('client', initClient);

// Initialize the Google API client
function initClient() {
  gapi.client
    .init({
      apiKey: 'AIzaSyDAa8Z7rvfkAaEvGrAEcsGUhA9hGLQwoKE',
      clientId: '846109528598-l0p4tk1hdg14b24rgcbvtf6kdreel06f.apps.googleusercontent.com',
      discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
      scope: 'https://www.googleapis.com/auth/analytics.readonly',
    })
    .then(() => {
      // Fetch and display popularity data
      fetchPopularityData();
    })
    .catch((error) => {
      console.error('Error initializing Google API client:', error);
    });
}

// Fetch popularity data from Google Analytics
function fetchPopularityData() {
  gapi.client.analyticsreporting.reports
    .batchGet({
      requestBody: {
        reportRequests: [
          {
            viewId: '47983407',
            dateRanges: [
              {
                startDate: '2023-01-01', // e.g., '2023-01-01'
                endDate: '2023-05-31', // e.g., '2023-05-31'
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
