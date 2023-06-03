.then(response => response.text())
.then(data => {
    // Create a temporary element to hold the HTML content
    const tempElement = document.createElement('div');
    tempElement.innerHTML = data;

    // Extract the blog information using DOM manipulation
    const blogElements = tempElement.querySelectorAll('.blog');  // Replace '.blog' with the appropriate CSS selector for your blog elements
    const blogs = [];

    blogElements.forEach(blogElement => {
        const blog = {
            title: blogElement.querySelector('.blog-title').innerText, // Replace '.blog-title' with the appropriate CSS selector for the blog title
            //content: blogElement.querySelector('.blog-content').innerText // Replace '.blog-content' with the appropriate CSS selector for the blog content
        };
        blogs.push(blog);
    });

    // Display the latest 3 blogs
    const blogContainer = document.getElementById('blog-container');

    // Loop through the latest 3 blogs
    for (let i = 0; i < 3 && i < blogs.length; i++) {
        const blog = blogs[i];

        // Create HTML elements for the blog title and content
        const blogElement = document.createElement('div');
        const titleElement = document.createElement('h2');
        //const contentElement = document.createElement('p');

        // Set the text content of the blog title and content
        titleElement.textContent = blog.title;
        //contentElement.textContent = blog.content;

        // Append the blog title and content elements to the main container
        blogElement.appendChild(titleElement);
        //blogElement.appendChild(contentElement);
        blogContainer.appendChild(blogElement);
    }
})
}s
// Call the function to parse and display the latest blogs
parseAndDisplayBlogs();
