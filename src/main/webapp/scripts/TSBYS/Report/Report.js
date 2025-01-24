$(document).ready(function () {
    $(function(){
        $('#datepicker').datepicker();
    });
    $.ajaxSetup({ async: false });
    $(".CentralReportMenu").addClass("active");
    GetAllBranchBranchesByRegionId();
});

function selectBranchDothis() {

}

function sendReportPDF(mailType) {
    var branchId = $('#BranchIdCommon').val();
    var reportName = document.querySelector('input[name="optradio"]:checked').value; //$('#BranchIDReport').val();
    var fromDate = $('#reportFromDate').val();
    var toDate = $('#reportToDate').val();
    var ReceiverEmail = $('#ReceiverEmail').val();
    var ReceiverEmailCC = $('#ReceiverEmailCC').val();

    if (mailType == "AllEmail") {
        reportName = "AllEmail";
    }
    var isValid = true;
    var Msge = "Please select the ";
    if (branchId == null || branchId == "") {
        isValid = false;
        Msge += "branch";
    }
    if (reportName == null || reportName == "") {
        isValid = false;
        Msge += "  report";
    }
    if (fromDate == null || fromDate == "") {
        isValid = false;
        Msge += " 'from Date'";
    }
    if (toDate == null || toDate == "") {
        isValid = false;
        Msge += " 'to Date'";
    }
    if (ReceiverEmail == null || ReceiverEmail == "") {
        isValid = false;
        Msge += " Receiver Email";
    }
    Msge += "!";
    if (isValid) {
        $.ajax({
            url: GetReportBaseUrl,
            data: {
                reportName: reportName,
                reportType: mailType
            },
            contentType: "application/json; charset=utf-8",
            dataType: "Json",
            success: function (data) {
                for (var i = 0 ; i < data.length; i++) {
                    var url = data[i].reportUrl;
                    url = url.replace("BRANCH_ID", branchId);
                    url = url.replace("FROM_DATE", fromDate);
                    url = url.replace("TO_DATE", toDate);
                    url = url.replace("RECEIVERCC_EMAIL", ReceiverEmailCC);
                    url = url.replace("RECEIVER_EMAIL", ReceiverEmail);
                    window.open(url, '_blank');
                }
            },
            error: function () {
                alert("Report Url Load Failed");
            }
        });
    }
    else {
        alert(Msge);
    }
}


function viewReportExcelAndPDF(reportFromat) {
    var branchId = $('#BranchIdCommon').val();
    var reportName = document.querySelector('input[name="optradio"]:checked').value; //$('#BranchIDReport').val();
    var fromDate = $('#reportFromDate').val();
    var toDate = $('#reportToDate').val();
    var isValid = true;
    var Msge = "Please select the ";
    if (branchId == null || branchId == "") {
        isValid = false;
        Msge += "branch";
    }
    if (reportName == null || reportName == "") {
        isValid = false;
        Msge += "  report";
    }
    if (fromDate == null || fromDate == "") {
        isValid = false;
        Msge += " 'from Date'";
    }
    if (toDate == null || toDate == "") {
        isValid = false;
        Msge += " 'to Date'";
    }
    Msge += "!";    
    if (isValid) {
        $.ajax({
            url: GetReportBaseUrl,
            data: {
                reportName: reportName,
                reportType: reportFromat
            },
            contentType: "application/json; charset=utf-8",
            dataType : "Json",
            success: function (data) {
                for (var i = 0 ; i < data.length; i++) {
                    var url = data[i].reportUrl;
                    url = url.replace("BRANCH_ID", branchId);
                    url = url.replace("FROM_DATE", fromDate);
                    url = url.replace("TO_DATE", toDate);
                    window.open(url, '_blank');
                }
            },
            error: function () {
                alert("Report Url Load Failed");
            }
        });
    }
    else{
        alert(Msge);
    }
}