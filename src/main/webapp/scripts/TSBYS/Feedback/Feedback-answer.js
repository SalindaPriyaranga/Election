$(document).ready(function () {
    $.ajaxSetup({ async: false });
  
    $(".FbManagementmenu").addClass("active");
    //$(".FbAnswer").addClass("active");

    $('#FbASaveBtn').click(function () {
        SaveFbAnswer();
      
    });

});


function SaveFbAnswer() {
    var Aid = $('#Aid').val();
    var Qid = $('#Qid').val();
    var fbid = $('#fbid').val();

    
    var isValid = true;
    var Msge = "";
 
    //if (ans == null || ans == "") {
    //    isValid = false;
    //    Msge += "Answer is empty! ";
    //}
   
  

    var DataString = JSON.stringify({
        AId: Aid,
        QId: Qid,
        FbId: fbid
    
    });

    if (isValid) {
        $.ajax({
            url: SaveFbAnswerURL,
            data: {
                DataString: DataString
            },
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            success: function (data) {
                ShowSuccessMsge("Saved Success....");

                //$('#ans').val("");
              
                $(function () {
                    function show_popup() {
                        $('#FbASaveCancelBtn').click();
                        clearMsges();
                    };
                    window.setTimeout(show_popup, 500); // 5 seconds
                   
                });
               
            },
            error: function (e) {
                alert("Save Feedback Answer Failed");
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





