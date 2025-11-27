$(function() {
    $(document).on('click', '.deleteUser', function() {
        let user_id = $(this).data('id')
        $('#_id').val(user_id)
    })
    
    $(document).on('click', '.confirmDelete', function() {
        let payload = {
            id: $('#_id').val()
        }
        axios.post('/admin/delete-user', payload)
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

    $(document).on('click', '.updateUser', function() {
    let payload = {
        id: $(this).data('id')
    }
    axios.post('/admin/data-user', payload)
        .then(function (res) {
            $('#email').val(res.data.data.email),
            $('#last_name').val(res.data.data.last_name)
            $('#first_name').val(res.data.data.first_name)
            $('#phonenumber').val(res.data.data.phonenumber)
            $('#dob').val(formatDateTime(new Date(res.data.data.dob)))
            $('#_id_update').val(res.data.data._id)
        })
        .catch(function (error) {
            console.log(error);
        });
    })

    $(document).on('click', '#confirmUpdate', function() {
    let payload = {
        _id: $('#_id_update').val(),
        email: $('#email').val(),
        last_name: $('#last_name').val(),
        first_name: $('#first_name').val(),
        phonenumber: $('#phonenumber').val(),
        dob: $('#dob').val()
    }
    axios.post('/admin/update-user', payload)
        .then(function (res) {
            displayMess('Cập nhật thành công', 'success')
            setTimeout(() => {
            location.reload()
            }, 1000);
        })
        .catch(function (error) {
            console.log(error);
        })
    })

    $(document).on('click', '.verifyButton', function() {
        let payload = {
            _id: $(this).data('id')
        }
        axios.post('/admin/update-verify', payload)
        .then(function (res) {
            location.reload()
        })
        .catch(function (error) {
            console.log(error);
        })
    })

    function formatDateTime(datetime) {
        return formattedDatetime = datetime.getFullYear() + '-' +
                                pad(datetime.getMonth() + 1) + '-' +
                                pad(datetime.getDate());
    }

    function pad(number) {
        return (number < 10 ? '0' : '') + number;
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