// script.js
var widget = document.getElementById('widget-container');

function openWidget() {
  var widgetHTML = `
    <div id="custom-widget" class="widget">
      <div class="widget-content">
        <p>Hello, World!</p>
        <button id="close-widget">Close</button>
      </div>
    </div>
  `;

  widget.innerHTML = widgetHTML;
  widget.style.position = 'fixed';
  widget.style.bottom = '20px';
  widget.style.right = '20px';
  widget.style.backgroundColor = 'green';
  widget.style.padding = '10px';
  widget.style.border = '1px solid #ccc';
  widget.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
  widget.style.zIndex = '999';

  var closeButton = document.getElementById('close-widget');
  widget.style.display = 'block';
  closeButton.addEventListener('click', closeWidget);
}

function closeWidget() {
  widget.style.position = 'fixed';
  widget.style.bottom = '20px';
  widget.style.right = '20px';
  widget.style.backgroundColor = 'green';
  widget.style.padding = '10px';
  widget.style.border = '1px solid #ccc';
  widget.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
  widget.style.zIndex = '999';
  var widgetHTML = `
    <div id="custom-widget" class="widget">
      <div class="widget-content">
        <button id="open-widget">Open</button>
      </div>
    </div>
  `
  widget.innerHTML = widgetHTML;

  var openButton = document.getElementById('open-widget');
  widget.style.display = 'block';
  openButton.addEventListener('click', openWidget);
}

document.addEventListener('DOMContentLoaded', function () {
  openWidget();
});
