// JavaScript code for parsing and displaying the latest blogs
function parseAndDisplayBlogs() {
  fetch('https://kartak.co/blog.html')
  .then(response => response.text())
  .then(data => {
    // Create a temporary element to hold the HTML content
    const tempElement = document.createElement('div');
    tempElement.innerHTML = data;

    // Extract the blog information using DOM manipulation
    const blogElements = tempElement.querySelectorAll('.blog');
    const blogs = [];

    blogElements.forEach(blogElements => {
      const blog = {
        title: blogElements.querySelector('.blog-title').innerText,
        content: blogElements.querySelector('.blog-content').innerText
      };
      blogs.push(blog);
    });

    // Display the latest 3 blogs
    const blogContainer = document.getElementById('blog-container');

    for (let i = 0; i < 3 && i < blogs.length; i++) {
      const blog = blogs[i];

      // Create HTML elements for the blog title and content
      const blogElements = document.createElement('div');
      const titleElement = document.createElement('h2');
      const contentElement = document.createElement('p');

      // Set the text content of the blog title and content
      titleElement.textContent = blog.title;
      contentElement.textContent = blog.content;


      // Append the blog title and content elements to the main container
      blogElements.appendChild(titleElement);
      blogElements.appendChild(contentElement);
      blogContainer.appendChild(blogElements);

    }
  })
}
// Call the function to parse and display the latest blogs
parseAndDisplayBlogs();
