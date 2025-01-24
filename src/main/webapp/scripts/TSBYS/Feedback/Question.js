$(document).ready(function () {
    $.ajaxSetup({ async: false });
  
    $(".FbManagementmenu").addClass("active");
    //$(".question").addClass("active");

    QIdDropdown();

    $('#QSaveBtn').click(function () {
        SaveQuestion();
      
    });

});



function SaveQuestion() {
    var qstn = $('#qstn').val();
    var name = $('#name').val();

  

    
    var isValid = true;
    var Msge = "";
 
    if (qstn == null || qstn == "") {
        isValid = false;
        Msge += "Footer is empty! ";
    }
   
  

    var DataString = JSON.stringify({
        Question: qstn,
        Name: name
    });

    if (isValid) {
        $.ajax({
            url: SaveQuestionURL,
            data: {
                DataString: DataString
            },
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            success: function (data) {
                ShowSuccessMsge("Saved Success....");

                $('#qstn').val("");
              
                $(function () {
                    function show_popup() {
                        $('#QSaveCancelBtn').click();
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


function QIdDropdown() {
    $.ajax({
        url: LoadQsUrl,
        data: {
            Id: 1
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var htmlTag = '<select id="Qid" onchange="" class="addClassdropdown">';

            for (var i = 0; i < data.length; i++) {
                htmlTag += '<option type="text" class="form-control" value="' + data[i].Id + '">' + data[i].Name + '</option>';

            }
            htmlTag += '</select>';
            //htmlTag2 += '</select>';

            $('#QIdDiv').empty().append(htmlTag);

        },
        error: function (e) {
            alert("globalChanged failed");
        }
    });
}



