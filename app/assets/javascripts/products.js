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
  }); //ends show


  ///NEW product

  // $('#add_partial').on('click', function() {
  //   $.ajax('/add_partial',
  //          {
  //            type: 'GET',
  //            success: function(data) {
  //              $('body').append(data);
  //            }
  //          });
  // });

  $('.add').on('click', function(){
    var name = $('#new_name').val();
    var basePrice = $('#new_base_price').val();
    var description = $('#new_description').val();
    var quantityOnHand = $('#new_quantity_on_hand').val();
    var color = $('#new_color').val();
    var weight = $('#new_weight').val();

    var product = {product: {name: name, base_price: basePrice, description: description, quantity_on_hand: quantityOnHand, color: color, weight: weight }};

    $.ajax(baseUrl + '/products', {
       type: 'POST',
       data: product,
       success: function(data) {
        var product = data.product;
        console.log('success')
        $('#products').append("<li class='product' data-product-id='" + product.id + "'>" + product.name + "<button class='delete'>Delete</button><button class='show'>Show</button></li>");
       },

    });
  }); // ends new 


}); // Ends document Ready function