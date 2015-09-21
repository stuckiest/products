$(document).ready(function(){

  var baseURL = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1';

  $('#get_products').click(function() {
      $.ajax(baseURL + '/products', {
        type: 'GET',
        success: function(data) {
          for(index in data.products) {
            var product = data.products[index];
            $('#products').append("<li class='product' data-product-id='" + product.id + "'>" + product.name + "<button class='delete'>Delete</button><button id='show'>Show</button></li>");
          }
        },
        error: function(data) {
         console.log('error');
  
        }
      });
    });
});