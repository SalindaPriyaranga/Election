$(document).ready(function () {
    $.ajaxSetup({ async: false });
  
    $(".FbManagementmenu").addClass("active");
    //$(".createTempModel").addClass("active");

    TemplateIdDropdown();
    ModelIdDropdown();

    $('#TmpMdlSaveBtn').click(function () {
        SaveTemplateModel();
      
    });

});


function SaveTemplateModel() {
    var tempid = $('#tempid').val();
    var modelid = $('#modelid').val();
    //var index = $('#index').val();
    var indx = $('#indx').val();
  

    
    var isValid = true;
    var Msge = "";
 
  
    if (indx == null || indx == "") {
        isValid = false;
        Msge += "Index is empty! ";
    }
  

    var DataString = JSON.stringify({
        TempId: tempid,
        ModelId: modelid,
        Indx: indx
        //ResponsePlaceHolder: rplaceholder,
        //ImageURL: ImgName

    });

    if (isValid) {
        $.ajax({
            url: SaveTmpMdlURL,
            data: {
                DataString: DataString
            },
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            success: function (data) {
                ShowSuccessMsge("Saved Success....");
               //$('#tempid').val("");
               // $('#modelid').val("");
             
               //$('#indx').val("");
               
                $(function () {
                    function show_popup() {
                        $('#TmpMdlSaveCancelBtn').click();
                        clearMsges();
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

function TemplateIdDropdown() {
    $.ajax({
        url: LoadFbTempsUrl,
        data: {
            Id:1
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var htmlTag = '<select id="tempid" onchange="" class="addClassdropdown">';
           
            for (var i = 0; i < data.length; i++) {
                htmlTag += '<option type="text" class="form-control" value="' + data[i].Id + '">' + data[i].Name + '</option>';
               
            }
            htmlTag += '</select>';
            //htmlTag2 += '</select>';

            $('#tempIdDiv').empty().append(htmlTag);
           
        },
        error: function (e) {
            alert("globalChanged failed");
        }
    });
}


function ModelIdDropdown() {
    $.ajax({
        url: LoadFbModelsUrl,
        data: {
            Id: 1
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var htmlTag = '<select id="modelid" onchange="" class="addClassdropdown">';

            for (var i = 0; i < data.length; i++) {
                htmlTag += '<option type="text" class="form-control" value="' + data[i].Id + '">' + data[i].Name + '</option>';

            }
            htmlTag += '</select>';
            //htmlTag2 += '</select>';

            $('#ModelIdDiv').empty().append(htmlTag);

        },
        error: function (e) {
            alert("globalChanged failed");
        }
    });
}

