// widget.js
(function () {
    // Create a container element for the widget
    var container = document.createElement('div');
    
    // Customize the widget's appearance
    container.style.border = '1px solid #ccc';
    container.style.padding = '10px';
    
    // Create the widget's content
    var message = document.createElement('p');
    message.textContent = 'Hello, World!';
    
    // Append the content to the container
    container.appendChild(message);
    
    // Append the container to the host page's body
    document.body.appendChild(container);
  })();
  