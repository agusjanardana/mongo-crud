// $('#update_product').submit(function (event) {
//    event.preventDefault();

const { isGeneratorObject } = require('util/types');

//    var unindexed_array = $(this).serializeArray();
//    var data = {};

//    $.map(unindexed_array, function (n, i) {
//       data[n['name']] = n['value'];
//    });

//    var request = {
//       'url': `http://localhost:3000/api/product/${data.id}`,
//       'method': 'PUT',
//       'data': data,
//    };

//    $.ajax(request).done(function (response) {
//       console.log('success');
//    });
// });

if (window.location == '/') {
   $ondelete = $('.container #example tbody tr td a.delete');
   $ondelete.click(function () {
      var id = $(this).attr('data-id');

      var request = {
         'url': `http://localhost:3000/api/product/${id}`,
         'method': 'DELETE',
      };

      if (confirm('Do you really want to delete this record?')) {
         $.ajax(request).done(function (response) {
            alert('Data Deleted Successfully!');
            location.reload();
         });
      }
   });
}

function goto() {
   window.location = '/add-product';
}
