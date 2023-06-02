// Function to parse and display the latest blogs
function parseAndDisplayBlogs() {
  // Fetch the HTML content of the website page
  fetch('URL_OF_WEBSITE_PAGE')
    .then(response => response.text())
    .then(data => {
      // Create a temporary element to hold the HTML content
      const tempElement = document.createElement('div');
      tempElement.innerHTML = data;

      // Extract the blog information using DOM manipulation
      const blogElements = tempElement.querySelectorAll('.blog'); // Replace '.blog' with the appropriate CSS selector for your blog elements
      const blogs = [];

      blogElements.forEach(blogElement => {
        const blog = {
          title: blogElement.querySelector('.blog-title').innerText, // Replace '.blog-title' with the appropriate CSS selector for the blog title
          content: blogElement.querySelector('.blog-content').innerText // Replace '.blog-content' with the appropriate CSS selector for the blog content
        };
        blogs.push(blog);
      });

      // Display the blogs on the desired page
      const blogContainer = document.getElementById('blog-container'); // Replace 'blog-container' with the ID or selector of the container where you want to display the blogs

      blogs.forEach(blog => {
        const blogElement = document.createElement('div');
        blogElement.innerHTML = `
          <h2>${blog.title}</h2>
          <p>${blog.content}</p>
        `;
        blogContainer.appendChild(blogElement);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Call the function to parse and display the latest blogs
parseAndDisplayBlogs();
