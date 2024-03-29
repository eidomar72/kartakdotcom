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

      blogElements.forEach(blogElement => {
        const linkElement = blogElement.querySelector('a');
        const titleElement = blogElement.querySelector('.featured-title');
        const contentElement = blogElement.querySelector('.blog-content');
        const dateElement = blogElement.querySelector('.blog-date');

        // Check if all required elements exist
        if (linkElement && titleElement && contentElement && dateElement) {
          const blog = {
            url: linkElement.href,
            title: titleElement.textContent,
            content: contentElement.textContent,
            date: dateElement.textContent,
          };
          blogs.push(blog);
        }
      });

      // Display the latest 3 blogs
      const blogContainer = document.getElementById('feat-container');

      for (let i = 0; i < 2 && i < blogs.length; i++) {
        const blog = blogs[i];

        // Create HTML elements for the blog title and content
        const blogElement = document.createElement('div');
        const titleElement = document.createElement('h2');
        const contentElement = document.createElement('p');
        const dateElement = document.createElement('span');

        // Create an anchor element for the title with the appropriate href
        const titleLink = document.createElement('a');
        titleLink.href = blog.url;
        titleLink.textContent = blog.title;
        dateElement.textContent = blog.date;

        // Set the text content of the content element
        contentElement.textContent = blog.content;

        // Append the title link and content elements to the blog element
        blogElement.appendChild(titleLink);
        blogElement.appendChild(contentElement);
        blogElement.appendChild(dateElement);

        // Append the blog element to the main container
        blogContainer.appendChild(blogElement);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Call the function to parse and display the latest blogs
parseAndDisplayBlogs();
