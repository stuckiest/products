$(document).ready(function(){

  var baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1';

  $('#get_products').click(function() {
      $.ajax(baseUrl + '/products', {
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
    }); // Ends get products 

 function showProduct(product) {
    $.ajax('/get_product', {
      type: 'GET',
      data: product,
      success: function(data) {
        $('body').html(data);
      }
    });
  }

  $(document).on('click', '#show', function() {
    var id = $(this).closest('.product').data('product-id');

    $.ajax(baseUrl + '/products/' + id, {
      type: 'GET',
      success: function(data) {
        showProduct(data.product);
        console.log('success');
      },
      error: function(data) {
      console.log('error');
      }
    });


  });


}); // Ends document Ready function