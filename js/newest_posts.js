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
        const titleElement = blogElement.querySelector('.blog-title');
        const contentElement = blogElement.querySelector('.blog-content');

        // Check if all required elements exist
        if (linkElement && titleElement && contentElement) {
          const blog = {
            url: linkElement.href,
            title: titleElement.textContent,
            content: contentElement.textContent
          };
          blogs.push(blog);
        }
      });

      // Display the latest 3 blogs
      const blogContainer = document.getElementById('blog-container');

      for (let i = 0; i < 3 && i < blogs.length; i++) {
        const blog = blogs[i];

        // Create HTML elements for the blog title and content
        const blogElement = document.createElement('div');
        const titleElement = document.createElement('h2');
        const contentElement = document.createElement('p');

        // Create an anchor element for the title with the appropriate href
        const titleLink = document.createElement('a');
        titleLink.href = blog.url;
        titleLink.textContent = blog.title;


        // Set the text content of the content element
        contentElement.textContent = blog.content;

        // Append the title link and content elements to the blog element
        blogElement.appendChild(titleLink);
        blogElement.appendChild(contentElement);

        // Append the blog element to the main container
        blogContainer.appendChild(blogElement);

        if (i < 2) {
          // Add spacing between each title (adjust the value according to your preference)
          blogContainer.appendChild(document.createElement('hr'));
        }
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Call the function to parse and display the latest blogs
parseAndDisplayBlogs();
