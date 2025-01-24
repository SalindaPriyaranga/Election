$(document).ready(function () {
    $.ajaxSetup({ async: false });
  
    $(".FbManagementmenu").addClass("active");
    //$(".createFeedbackTemp").addClass("active");

   

    $('#fbTempSaveBtn').click(function () {
        SaveFeedbackTemp();
      
    });

});



function SaveFeedbackTemp() {
    var name = $('#name').val();
    var header = $('#header').val();
    var footer = $('#footer').val();
    var responseTxt = $('#responseTxt').val();
    var logoImgName = $('#logoImgName').val();
    var bgImageName = $('#bgImageName').val();
    var createddate ="";

    var withQueue = 0;
    if ($('#withQueue').is(":checked")) {
        withQueue = 1;
    }
    var isValid = true;
    var Msge = "";
    if (name == null || name == "") {
        isValid = false;
        Msge += "Name is empty! ";
    }
    if (header == null || header == "") {
        isValid = false;
        Msge += "Header is empty! ";
    }
    if (footer == null || footer == "") {
        isValid = false;
        Msge += "Footer is empty! ";
    }
    if (responseTxt == null || responseTxt == "") {
        isValid = false;
        Msge += "Response text is empty! ";
    }
  
    var DataString = JSON.stringify({
        Name: name,
        CreatedTime: createddate,
        Header: header,
        Footer: footer,
        LogoUrl: logoImgName,
        BgUrl: bgImageName,
        WithQueue: withQueue,
        ResponseText: responseTxt

    });

    if (isValid) {
        $.ajax({
            url: SaveFbTempURL,
            data: {
                DataString: DataString
            },
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            success: function (data) {
                ShowSuccessMsge("Saved Success....");
                $('#logoImageUploadBtn').click();
                $('#bgImageUploadBtn').click();
                //LoadAllUsers();
                $(function () {
                    function show_popup() {
                        $('#fbTempSaveCancelBtn').click();
                    };
                    window.setTimeout(show_popup, 500); // 5 seconds
                });
            },
            error: function (e) {
                alert("Save Feedback Template Failed");
            }
        });
        $(document).ready(function () {
            $('.table').DataTable();
        });
    }
    else {
        ShowErrorMsge(Msge);
    }
}

