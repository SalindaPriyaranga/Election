$(document).ready(function () {
    $.ajaxSetup({ async: false });
  
    $(".FbManagementmenu").addClass("active");
    //$(".answer").addClass("active");

    AIdDropdown();

    $('#ASaveBtn').click(function () {
        SaveAnswer();
      
    });

});


function SaveAnswer() {
    var ans = $('#ans').val();
    var Qid = $('#Qid').val();
    
    
    var isValid = true;
    var Msge = "";
 
    if (ans == null || ans == "") {
        isValid = false;
        Msge += "Answer is empty! ";
    }
   
  

    var DataString = JSON.stringify({
        Answer: ans,
        QId: Qid
    
    });

    if (isValid) {
        $.ajax({
            url: SaveAnswerURL,
            data: {
                DataString: DataString
            },
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            success: function (data) {
                ShowSuccessMsge("Saved Success....");

                $('#ans').val("");
              
                $(function () {
                    function show_popup() {
                        $('#ASaveCancelBtn').click();
                        clearMsges();
                    };
                    window.setTimeout(show_popup, 500); // 5 seconds
                   
                });
               
            },
            error: function (e) {
                alert("Save Answer Failed");
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



function AIdDropdown() {
    $.ajax({
        url: LoadAsUrl,
        data: {
            Id: 1
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var htmlTag = '<select id="Aid" onchange="" class="addClassdropdown">';

            for (var i = 0; i < data.length; i++) {
                htmlTag += '<option type="text" class="form-control" value="' + data[i].Id + '">' + data[i].Name + '</option>';

            }
            htmlTag += '</select>';
            //htmlTag2 += '</select>';

            $('#AIdDiv').empty().append(htmlTag);

        },
        error: function (e) {
            alert("globalChanged failed");
        }
    });
}





