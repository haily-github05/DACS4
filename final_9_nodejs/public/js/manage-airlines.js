$(function() {
    $('#createAirline').on('click', () => {
        let payload = {
            airline_name: $('#airline_name').val(),
            airline_logo: $('#airline_logo').val(),
        }
        axios.post('/admin/create-airline', payload)
          .then(function (res) {
            displayMess('Thêm mới thành công', 'success')
            setTimeout(() => {
              location.reload()
            }, 1000);
          })
          .catch(function (error) {
            console.log(error);
          });
    })

    $(document).on('click', '.deleteAirline', function() {
        let payload = {
          id: $(this).data('id')
        }
        axios.post('/admin/delete-airline', payload)
            .then(function (res) {
              displayMess('Xóa thành công', 'success')
              setTimeout(() => {
                location.reload()
              }, 1000);
            })
            .catch(function (error) {
              console.log(error);
            })
      })

      $(document).on('click', '.updateAirline', function() {
        let payload = {
          id: $(this).data('id')
        }
        axios.post('/admin/data-airline', payload)
            .then(function (res) {
              $('#airline_name_update').val(res.data.data.airline_name),
              $('#airline_logo_update').val(res.data.data.airline_logo)
              $('#_id').val(res.data.data._id)
            })
            .catch(function (error) {
              console.log(error);
            });
      })

      $(document).on('click', '#confirmUpdate', function() {
        let payload = {
            _id: $('#_id').val(),
            airline_name: $('#airline_name_update').val(),
            airline_logo: $('#airline_logo_update').val(),
        }
        axios.post('/admin/update-airline', payload)
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