$(function () {

    /* ============================
       1. Hàm chuyển trang
    ============================ */
    window.showPage = function(pageId) {
        $('.page-content').removeClass('active');
        $('#' + pageId).addClass('active');
    };

    /* ============================
       2. Hàm load hồ sơ từ server
    ============================ */
    window.loadProfile = function (email) {
        axios.post('/admin/get-user', { email })
            .then(res => {
                const u = res.data; // dữ liệu user từ server
                console.log("Dữ liệu load:", u);

                $('#_id_update').val(u._id);
                $('#last_name').val(u.last_name);
                $('#first_name').val(u.first_name);
                $('#phone').val(u.phonenumber);
                $('#email').val(u.email);

                // Load ngày sinh nếu có
                if(u.dob) {
                    let dobVal = u.dob;
                    if(dobVal.includes('T')) {
                        dobVal = dobVal.split('T')[0];
                    }
                    $('#dob').val(dobVal);
                } else {
                    $('#dob').val(''); // nếu không có dob
                }
            })
            .catch(err => console.error("Lỗi load profile:", err));
    };

    /* ============================
       3. Hàm LƯU hồ sơ
    ============================ */
    window.saveProfile = function () {
        const payload = {
            _id: $('#_id_update').val(),
            last_name: $('#last_name').val(),
            first_name: $('#first_name').val(),
            email: $('#email').val(),
            phonenumber: $('#phone').val(),
            dob: $('#dob').val()
        };

        console.log("Payload gửi:", payload);

        if (!payload._id) {
            alert("Lỗi: Không có ID người dùng!");
            return;
        }

        axios.post('/admin/update-user', payload)
            .then(res => {
                alert("Cập nhật thành công!");

                // cập nhật giao diện không cần reload
                $('.username').text(payload.last_name + " " + payload.first_name);
                $('.name').text(payload.last_name + " " + payload.first_name);

                showPage('accountPage'); // quay lại trang account
            })
            .catch(err => {
                console.error("Lỗi update:", err);
                alert("Cập nhật thất bại!");
            });
    };

    /* ============================
       4. Gán sự kiện nút xem profile
    ============================ */
    $(document).on('click', '.btn-account', function () {
        const email = $('#email').val(); // lấy email hiện tại
        loadProfile(email); // load dữ liệu, bao gồm dob
        showPage('profilePage'); // hiện trang profile
    });

    /* ============================
       5. Trang mặc định
    ============================ */
    showPage('accountPage');

});
