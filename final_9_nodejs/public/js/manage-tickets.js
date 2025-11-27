$(function() {
    $(document).on('click', '.userInfo', function() {
        let name = $(this).data('name')
        let email = $(this).data('email')
        let phone = $(this).data('phone')
        let dob = new Date($(this).data('dob'))
        $('#name').text(name)
        $('#email').text(email)
        $('#phone').text(phone)
        $('#dob').text(formatDateTime(dob))
    })

    $(document).on('click', '.deleteTicket', function() {
        let id = $(this).data('id');
        $('#_id').val(id)
    })
    
    $(document).on('click', '#confirmDelete', function() {
        let payload = {
            _id: $('#_id').val()
        }
        axios.post('/admin/delete-ticket', payload)
            .then(function (res) {
                displayMess('Xóa thành công', 'success')
                setTimeout(() => {
                    location.reload()
                  }, 1000);
            })
            .catch(function (error) {
                console.log(error);
            });
    })

    function pad(number) {
        return (number < 10 ? '0' : '') + number;
    }
  
    function formatDateTime(datetime) {
        return formattedDatetime = pad(datetime.getDate()) + '-' +
                                        pad(datetime.getMonth() + 1) + '-' +
                                        datetime.getFullYear();
    }

    function displayMess(mess, type) {
      Lobibox.notify(type, {
          pauseDelayOnHover: true,
          continueDelayOnInactiveTab: false,
          position: 'top right',
          icon: 'bx bx-x-circle',
          msg: mess
      });
  }

});