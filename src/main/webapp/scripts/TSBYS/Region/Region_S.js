$(document).ready(function () {
    $.ajaxSetup({ async: false });
    $(".createGlobalRegionMenu").addClass("active");

//    LoadGlobalRegionTable();

//    $('#SaveGlobalRegionBtn').click(function () {
//        $('#CancleGblobalAdd').click();
//    })

});

function LoadGlobalRegionTable() {
//    alert();s
    var htmltable = '<table class="table">                                                                                                                                                '
                   + '        <thead>                                                                                                                                                     '
                   + '            <tr>                                                                                                                                                    '
                   + '                <th>Code</th>                                                                                                                                       '
                   + '                <th>Global Region Name</th>                                                                                                                         '
                   + '                <th>Status</th>                                                                                                                                     '
                   + '                <th>Action</th>                                                                                                                                     '
                   + '            </tr>                                                                                                                                                   '
                   + '        </thead>                                                                                                                                                    '
                   + '        <tbody> ';

    $.ajax({
        url: UrlGetEmpDet,// "/Region/GetAllRegions",
        data: {
            branchLevel: 100
        },
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        success: function (data) {
            var ccd = Object.keys(data).length;
            for (var i = 0; i < ccd; i++) {
                htmltable += '<tr>'
                               + '                <td>' + data[i].branchCode + '</td>'
                               + '                <td>' + data[i].branch + '</td>    '
                               + '                <td>Inactive</td>                                                                                                                                   '
                               + '                <td>                                                                                                                                                '
                               + '                    <ul>                                                                                                                                            '
                               + '                        <li><a href="#" data-toggle="modal" data-target="#myModal1"><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>           '
                               + '                        <li><a href="#"><i class="fa fa-check" aria-hidden="true" title="Active"></i></a></li>                                                      '
                               + '                    </ul>                                                                                                                                           '
                               + '                </td>                                                                                                                                               '
                               + '                </ul>                                                                                                                                               '
                               + '            </tr> ';
            }
        },
        error: function (e) {
            alert("Failed");
        }
    });

    htmltable += '</tbody></table>';
    $('#LoadGlobalRegionTableDiv').empty().append(htmltable);
}