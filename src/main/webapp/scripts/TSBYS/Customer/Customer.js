$(document).ready(function () {
    $.ajaxSetup({ async: false });
    $(".createCustomerMenu").addClass("active");
    $(".CustomerInformationTreeMenu").addClass("active");
    $('#SaveCustomerBtn').click(function () {
//        SaveCustomer();
    });
    $('#EditSaveCustomerBtn').click(function () {
//        EditCustomer();
    });

//    LoadAllCustomer();
});

function EditCustomerBind(customerId) {
    $.ajax({
        url: EditCustomerBindUrl, //"/Customer/GetCustomerBycustomerId",
        data: {
            customerId: customerId
        },

        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            $('#customerIdEdit').val(data.customerId);
            $('#customernameEdit').val(data.CustomerName);
            $('#headofficeaddressEdit').val(data.Address);
            $('#customerLogoNameEdit').val(data.customerLogoName);

            $('#customerCreatedUser').empty().append(data.addedUsername + " , " + data.addedDtTime);
            $('#customerModifiedUser').empty().append(data.modifiedUsername + " , " + data.modifiedDtTime);


            $("#CustomerLogoEdit").attr('src', 'data:image/jpg;base64,' + data.customerLogo64String + '');

            if (data.isAct == 1) {

                $('#CustomerIsActiveEdit').prop('checked', true);
            }
            else {

                $('#CustomerIsActiveEdit').prop('checked', false);
            }
        },
        error: function (e) {

        }
    });
    $('#EditCustomerBindBtn').click();
}

function LoadAllCustomer() {
    var htmltable = '<table class="table">                                                                                                                                                 '
                   + '        <thead>                                                                                                                                                      '
                   + '            <tr>                                                                                                                                                     '
                   + '                <th>Customer Name</th>                                                                                                                               '
                   + '                <th>Address</th>                                                                                                                                     '
                   + '                <th>Customer Logo</th>                                                                                                                              '
                   + '                <th>Status</th>                                                                                                                                      '
                   + '                <th>Action</th>                                                                                                                                      '
                   + '            </tr>                                                                                                                                                    '
                   + '        </thead>                                                                                                                                                     '
                   + '        <tbody> ';

    $.ajax({

        url: LoadAllCustomerURL,
        data: {  },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var ccd = Object.keys(data).length;
            for (var i = 0; i < ccd; i++) {
                htmltable += '<tr>'

                               + '                <td>' + data[i].CustomerName + '</td>    '
                               + '                <td>' + data[i].Address + '</td>    '
                               + '                <td><img src="data:image/jpg;base64, ' + data[i].customerLogo64String + '"  width="30px" height="30px"></td>     '
                               + '                  <td>' + (data[i].isAct == 1 ? "Active" : "Inactive") + '</td>     '  
                               + '                <td>                                                                                                                                                '
                               + '                    <ul>                                                                                                                                            '
                               + ' <li><a onclick="EditCustomerBind(' + data[i].customerId + ')" ><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>                                    '
                               + '                        <li style="display:none;"><a id="EditCustomerBindBtn"href="#" data-toggle="modal" data-target="#myModal1"><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>                '
                               + '                        <li><a  href="#"><i class="fa fa-check" aria-hidden="true" title="Active"></i></a></li>                                                      '
                               + '                    </ul>                                                                                                                                           '
                               + '                </td>                                                                                                                                               '
                               + '                </ul>                                                                                                                                               '
                               + '            </tr> ';
            }
        },
        error: function (e) {
             alert('Customer Load Failed');
        }
    });
    htmltable += '</tbody></table>';

    $('#LoadCustomerTableDiv').empty().append(htmltable);


    $(document).ready(function () {
        $('.table').DataTable();
    });
}

function SaveCustomer() {
    var customername = $('#customername').val();
    var headofficeaddress = $('#headofficeaddress').val();
    var customerLogoName = $('#customerLogoName').val();
    var CustomerIsActive = 0;
    if ($('#CustomerIsActive').is(":checked")) {
        CustomerIsActive = 1;
    }
    var isValid = true;
    var Msge = "";
    if (customername == null || customername == "") {
        isValid = false;
        Msge += "Customer Name is empty! ";
    }

    if (headofficeaddress == null || headofficeaddress == "") {
        isValid = false;
        Msge += "Head Office Address is empty! ";
    }

    if (customerLogoName == null || customerLogoName == "") {
        isValid = false;
        Msge += "Customer Logo  is empty! ";
    }

    $('#ErrorMsge').empty().append(Msge);
    var DataString = JSON.stringify({
        CustomerName: customername,
        Address: headofficeaddress,
        customerLogoName: customerLogoName,
        isAct: CustomerIsActive
    });
    $.ajax({
        url: SaveCustomerUrl, //"/Customer/SaveCustomer",
        data: {
            DataString: DataString
        },

        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            $('#ErrorMsge').empty().append("Success....");

            $('#customerLogoUploadBtn').click();
            LoadAllCustomer();
            $(function () {
                function show_popup() {
                    $('#cancelCustomerBtn').click();
                };

                window.setTimeout(show_popup, 500); // 5 seconds
            });
        },
        error: function (e) {
            alert("Save Customer Failed");
        }
    });
}

function EditCustomer() {
    var customerId = $('#customerIdEdit').val();
    var customername = $('#customernameEdit').val();
    var headofficeaddress = $('#headofficeaddressEdit').val();
    var customerLogoName = $('#customerLogoNameEdit').val();
    var CustomerIsActive = 0;
    if ($('#CustomerIsActiveEdit').is(":checked")) {
        CustomerIsActive = 1;
    }

    var isValid = true;
    var Msge = "";
    if (customername == null || customername == "") {
        isValid = false;
        Msge += "Customer Name is empty! ";
    }
    if (headofficeaddress == null || headofficeaddress == "") {
        isValid = false;
        Msge += "Head Office Address is empty! ";
    }


    if (customerLogoName == null || customerLogoName == "") {
        isValid = false;
        Msge += "Customer Logo is empty! ";
    }

    $('#ErrorMsgeEdit').empty().append(Msge);

    var DataString = JSON.stringify({
        CustomerName: customername,
        Address: headofficeaddress,
        customerId: customerId,
        customerLogoName: customerLogoName,
        isAct: CustomerIsActive
    });
    $.ajax({
        url: EditCustomerUrl, //"/Customer/EditCustomer",
        data: {
            DataString: DataString
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            $('#ErrorMsgeEdit').empty().append("Success....");

            $('#customerLogoUploadBtnEdit').click();
            LoadAllCustomer();
            $(function () {
                function show_popup() {
                    $('#EditcancelCustomerBtn').click();
                };
                window.setTimeout(show_popup, 500);
            });
        },

        error: function (e) {
             alert("Failed");
        }
    });
}