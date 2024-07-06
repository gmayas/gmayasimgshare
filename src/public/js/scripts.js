// Post Toggle View
$('#post-comment').hide();
$('#btn-toggle-comment').click(e => {
  e.preventDefault();
  $('#post-comment').slideToggle();
});

// Like Button Request
$('#btn-like').click(function(e) {
    e.preventDefault();
    let imgId = $(this).data('id');
    console.log(imgId)
    $.post('/images/' + imgId + '/like')
      .done(data => {
      console.log('back:', data)
        $('.likes-count').text(data.likes);
      });
  });

// Delete Image Button Request
$('#btn-delete').click(function(e) {
  e.preventDefault();
  const response = confirm('Are you sure you want to delete this image?')
  if (response) {
    const imgId = $(this).data('id');
    $.ajax({ url:`/images/${imgId}`, type: 'DELETE' })
    .done( result => {
       console.log('result:', result);
       if (result) {
        alert('Successfully deleted image.');
        window.location.reload();
       }
    });
  } else {
    window.location.reload();
  }
});