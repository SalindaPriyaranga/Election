$(document).ready(function () {
    $.ajaxSetup({ async: false });
  
    $(".FbManagementmenu").addClass("active");
    //$(".answer").addClass("active");

 

    $('#TempQSaveBtn').click(function () {
        SaveTempQ();
      
    });

});


function SaveTempQ() {
   
    var Qid = $('#Qid').val();
    var modelid = $('#modelid').val();
    
    var isValid = true;
    var Msge = "";
 
    //if (ans == null || ans == "") {
    //    isValid = false;
    //    Msge += "Answer is empty! ";
    //}
   
  

    var DataString = JSON.stringify({
        MId: modelid,
        QId: Qid
    
    });

    if (isValid) {
        $.ajax({
            url: SaveTempQURL,
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
                        $('#TempQSaveCancelBtn').click();
                        clearMsges();
                    };
                    window.setTimeout(show_popup, 500); // 5 seconds
                   
                });
               
            },
            error: function (e) {
                alert("Save Template Question Failed");
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








