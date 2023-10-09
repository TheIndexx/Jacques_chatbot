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
  var closeButton = document.getElementById('close-widget');
  widget.style.display = 'block';
  closeButton.addEventListener('click', closeWidget);
}

function closeWidget() {
  widget.style.display = 'none';
  widget.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', function () {
  openWidget();
});
