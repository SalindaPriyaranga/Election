$(document).ready(function () {
    $(".BranchMangmtMenu").addClass("active");
    $(".createBranchCountersMenu").addClass("active");
    $.ajaxSetup({ async: false });
    GetAllBranchBranchesByRegionId();
    LoadAllBranchCategory();
    loadbranchCounter();

});
function selectBranchDothis() {
    LoadAllBranchCategory();
    loadbranchCounter();
}

function saveBranchCategoryEdit() {
    var branchId = $('#BranchIdCommon').val();
    var counterIdEdit = $('#counterIdEdit').val();
    var counterNo = $('#counterNoEdit').val();
    var counterName = $('#counterNameEdit').val();
    var counterDefaultCategoryId = $('#counterDefaultCategoryIdEdit').val();

    var branchCounterIsAct = 0;
    if ($('#branchCounterIsActEdit').is(":checked")) {
        branchCounterIsAct = 1;
    }


    var chkArray = [];
    $(".chkEdit:checked").each(function () {
        chkArray.push($(this).val());
    });

    var DataString = JSON.stringify({
        branchId: branchId,
        counterId:counterIdEdit,
        counterNo: counterNo,
        counterName: counterName,
        counterDefaultCategoryId: counterDefaultCategoryId,
        isAct: branchCounterIsAct,
        otherCategories: chkArray
    });

    $.ajax({
        url: SaveBranchCounterEditUrl,
        data: {
            DataString: DataString
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            loadbranchCounter();
            ShowSuccessMsge("Saved Success....");
            $(function () {
                function show_popup() {
                    $('#CounterSaveCancelBtnEdit').click();
                };
                window.setTimeout(show_popup, 500);
            });
        },
        error: function (e) {
            alert("Save Category Failed");
        }
    });
}

function branchCounterEdit(counterId) {
    $.ajax({
        url: getBranchCounterByIdUrl,
        data: {
            counterId: counterId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            $('#counterNoEdit').val(data.counterNo);
            $('#counterNameEdit').val(data.counterName);
            $('#counterIdEdit').val(counterId);
            $('#counterDefaultCategoryIdEdit').val(data.counterDefaultCategoryId);
            desableOtherCategory();
            $('#branchCounterEditBtn').click();
        },
        error: function (e) {
            console.log("branch Counter Edit Failed");
        }
    });
}

function loadbranchCounter() {
    var branchId = $('#BranchIdCommon').val();
    $.ajax({
        url: loadbranchCounterUrl,
        data: {
            branchId: branchId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var htmTableTag = '<table class="table">'
                   + ' <thead>                                           '
                   + '     <tr>                                          '
                   + '         <th>ID</th>                               '
                   + '         <th>Counter #</th>                        '
                   + '         <th>Counter Name</th>                     '
                   + '         <th>Default Category / Group</th>         '
                   + '         <th>Other Categories/ Groups</th>         '
                   + '         <th>Action</th>                           '
                   + '     </tr>                                         '
                   + ' </thead>                                          '
                   + ' <tbody>';

            for(var i = 0 ; i < data.length; i++){
                htmTableTag += '<tr>                       '
                            + '      <td>'+ (i + 1)+'</td>            '
                            + '      <td>'+ data[i].counterNo +'</td>           '
                            + '      <td>' + data[i].counterName + '</td>    '
                            + '      <td>' + data[i].counterDefaultCategory + '</td>       '
                            + '      <td>' + data[i].otherCategoriesString + '</td>         '
                            + '                            '
                            + '      <td>                  '
                            + '          <ul>              '
                            + '                        <li><a onclick="branchCounterEdit(' + data[i].counterId + ')" ><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
                            + '              <li style="display:none;" ><a id="branchCounterEditBtn" href="#" data-toggle="modal" data-target="#myModal1"><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
                            + '              <li><a href="#"><i class="fa fa-check" aria-hidden="true" title="Active"></i></a></li>'
                            + '          </ul>           '
                            + '      </td>               '
                            + '      </ul>               '
                            + '  </tr>';
            }
            htmTableTag += '</tbody></table>';

            $('#branchCounterTableDiv').empty().append(htmTableTag);
        },
        error: function (e) {
            alert("Save Category Failed");
        }
    });
    $('.table').DataTable();
}


function SaveBranchCounters() {
    var branchId = $('#BranchIdCommon').val();
    var counterNo = $('#counterNo').val();
    var counterName = $('#counterName').val();
    var counterDefaultCategoryId = $('#counterDefaultCategoryId').val();

    var branchCounterIsAct = 0;
    if ($('#branchCounterIsAct').is(":checked")) {
        branchCounterIsAct = 1;
    }

    var chkArray = [];
    $(".chk:checked").each(function () {
        chkArray.push($(this).val());
    });

    var DataString = JSON.stringify({
        branchId: branchId,
        counterNo: counterNo,
        counterName: counterName,
        counterDefaultCategoryId: counterDefaultCategoryId,
        isAct: branchCounterIsAct,
        otherCategories: chkArray
    });

    $.ajax({
        url: SaveBranchCounterUrl,
        data: {
            DataString: DataString
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            loadbranchCounter();
            ShowSuccessMsge(data.message);
            $(function () {
                function show_popup() {
                    $('#CounterSaveCancelBtn').click();
                };
                window.setTimeout(show_popup, 500);
            });
        },
        error: function (e) {
            alert("Save Category Failed");
        }
    });

}

function desableOtherCategory() {
    var vl = $('#counterDefaultCategoryId').val();
    var vl2 = $('#counterDefaultCategoryIdEdit').val();
    $(".chk").prop('disabled', false);
    $(".chkEdit").prop('disabled', false);
    if (vl != null) {
        document.getElementById("cat" + vl).checked = false;
        document.getElementById("cat" + vl).disabled = true;
    }
    if (vl2 != null) {
        document.getElementById("catEdit" + vl2).checked = false;
        document.getElementById("catEdit" + vl2).disabled = true;
    }
}

function LoadAllBranchCategory() {
    var branchId = $('#BranchIdCommon').val();
    $.ajax({
        url: LoadAllBranchCategoryUrl,
        data: {
            branchId: branchId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var htmlTag = '<select id="counterDefaultCategoryId" onchange="desableOtherCategory()" class="addClassdropdown">';
            var htmlTagEdit = '<select id="counterDefaultCategoryIdEdit" onchange="desableOtherCategory()" class="addClassdropdown">';
            var htmlTagEdittest = '<select class="addClassdropdown">';
            var htmlTagforCheckbox = '';
            var htmlTagforCheckboxEdit = '';
            for (var i = 0; i < data.length; i++) {
                htmlTag += '<option value="' + data[i].categoryId + '">' + data[i].categoryCode + '</option>';
                htmlTagforCheckbox += '<div class="col-sm-4">                                                        '
                     + '               <label class="col-sm-8">' + data[i].categoryCode + '</label>                    '
                     + '               <div class="col-sm-3">                                       '
                     + '                   <input id="cat' + data[i].categoryId + '" type="checkbox" class="chk" value="' + data[i].categoryId + '" id="CategoryIsActiveEdit">        '
                     + '               </div>                                                       '
                     + '           </div>';


                htmlTagEdit += '<option value="' + data[i].categoryId + '">' + data[i].categoryCode + '</option>';
                htmlTagforCheckboxEdit += '<div class="col-sm-4">                                                        '
                     + '               <label class="col-sm-8">' + data[i].categoryCode + '</label>                    '
                     + '               <div class="col-sm-3">                                       '
                     + '                   <input id="catEdit' + data[i].categoryId + '" type="checkbox" class="chkEdit" value="' + data[i].categoryId + '" id="CategoryIsActiveEdit">        '
                     + '               </div>                                                       '
                     + '           </div>';
            }                                                                                       
            htmlTag += '</select>';
            htmlTagEdittest += htmlTagforCheckbox + "</select>";
            $('#branchcategoryDropDownDiv').empty().append(htmlTag);
            $('#otherCategoriesDiv').empty().append(htmlTagforCheckbox);
            $('#branchcategoryDropDownDivEdit').empty().append(htmlTagEdit);
            $('#otherCategoriesDivEdit').empty().append(htmlTagforCheckboxEdit);
        },
        error: function (e) {
            alert("Category Load Failed! dropdown");
        }
    });
    desableOtherCategory();
}