$(function() {
    $('#createFlight').on('click', () => {
        let payload = {
            airline_id: $('#airline_id').val(),
            departure_airport_id: $('#departure_airport_id').val(),
            arrival_airport_id: $('#arrival_airport_id').val(),
            departure_datetime: $('#departure_datetime').val(),
            arrival_datetime: $('#arrival_datetime').val(),
            economy_price: $('#economy_price').val(),
            business_price: $('#business_price').val()
        }
        axios.post('/admin/create-flight', payload)
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

    $(document).on('click', '.deleteFlight', function() {
      let payload = {
        id: $(this).data('id')
      }
      axios.post('/admin/delete-flight', payload)
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

    $(document).on('click', '.updateFlight', function() {
      let payload = {
        id: $(this).data('id')
      }
      axios.post('/admin/data-flight', payload)
          .then(function (res) {
            let departure_datetime = formatDateTime(new Date(res.data.data.departure_datetime));
            let arrival_datetime = formatDateTime(new Date(res.data.data.arrival_datetime));
            
            $('#airline_id_update').val(res.data.data.airline_id),
            $('#departure_airport_id_update').val(res.data.data.departure_airport_id),
            $('#arrival_airport_id_update').val(res.data.data.arrival_airport_id),
            $('#departure_datetime_update').val(departure_datetime),
            $('#arrival_datetime_update').val(arrival_datetime),
            $('#economy_price_update').val(res.data.data.economy_price),
            $('#business_price_update').val(res.data.data.business_price)
            $('#_id').val(res.data.data._id)
          })
          .catch(function (error) {
            console.log(error);
          });
    })

    $(document).on('click', '#confirmUpdate', function() {
      let payload = {
          _id: $('#_id').val(),
          airline_id: $('#airline_id_update').val(),
          departure_airport_id: $('#departure_airport_id_update').val(),
          arrival_airport_id: $('#arrival_airport_id_update').val(),
          departure_datetime: $('#departure_datetime_update').val(),
          arrival_datetime: $('#arrival_datetime_update').val(),
          economy_price: $('#economy_price_update').val(),
          business_price: $('#business_price_update').val()
      }
      axios.post('/admin/update-flight', payload)
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

    function pad(number) {
      return (number < 10 ? '0' : '') + number;
    }

    function formatDateTime(datetime) {
      return formattedDatetime = datetime.getFullYear() + '-' +
                                    pad(datetime.getMonth() + 1) + '-' +
                                    pad(datetime.getDate()) + 'T' +
                                    pad(datetime.getHours()) + ':' +
                                    pad(datetime.getMinutes());
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