$(document).ready(function () {
    bindLogedinUserDet();
})
function selectBranch() {
    localStorage.setItem("selectBranch", $('#BranchIdCommon').val());
    selectBranchDothis();

}


function GetAllBranchBranchesByRegionId() {
    $.ajax({
        url: GetAllBranchBranchesByRegionIdURL, //"/Branch/GetAllBranchBranchesByRegionId",
        data: {
            regionId: 0
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var htmlCode = "<select id='BranchIdCommon' onchange='selectBranch()'>";

            for (var i = 0 ; i < data.length ; i++) {
                if (localStorage.getItem("selectBranch") == data[i].branchId)
                {
                    htmlCode += "<option selected value='" + data[i].branchId + "'>" + data[i].branch + "</option>"
                }
                else
                {
                    htmlCode += "<option value='" + data[i].branchId + "'>" + data[i].branch + "</option>";
                }
            }
            htmlCode += "</select>";
            $('#BranchesDivComn').empty().append(htmlCode);
        },
        error: function (e) {
            alert("GetAllBranchBranchesByRegionId");
        }
    });
}


function GetAllRegionCounteryLocalReginArea() {
    $.ajax({
        url: GetAllRegionCounteryLocalReginAreaURL,
        data: {
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var htmlCode = "<b>Select Branch :</b><select id='BranchIdCommon' onchange='selectBranch()'>";

            for (var i = 0; i < data.length; i++) {
                if (localStorage.getItem("selectBranch") == data[i].branchId) {
                    htmlCode += "<option selected value='" + data[i].branchId + "'>" + data[i].branch + "</option>"
                }
                else {
                    htmlCode += "<option value='" + data[i].branchId + "'>" + data[i].branch + "</option>";
                }
            }
            htmlCode += "</select>";
            $('#RegionCounteryLocalReginAreaDropdownDiv').empty().append(htmlCode);
        },
        error: function (e) {
            alert("GetAllBranchBranchesByRegionId");
        }
    });
}

function ShowErrorMsge(Msge) {
    $('.SuccessMsge').empty();
    $('.ErrorMsge').empty().append(Msge);
}
function ShowSuccessMsge(Msge) {
    $('.ErrorMsge').empty();
    $('.SuccessMsge').empty().append(Msge);
}

function clearMsges() {
    $('.SuccessMsge').empty();
    $('.ErrorMsge').empty();
}

function ClickBtnUsingId(BtnId) {
    $(function () {
        function show_popup() {
            clearMsges();
            $('#'+BtnId).click();
        };
        window.setTimeout(show_popup, 500);
    });
}