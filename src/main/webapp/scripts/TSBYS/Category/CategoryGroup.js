

function LoadAllCategoryGroup() {
    var catGroupTable = '<table class="table">'
            + '        <thead>                              '
            + '            <tr>                             '
            + '                <th>Group Code</th>          '
            + '                <th>Short Group Code</th>    '
            + '                <th>Group Name</th>          '
            + '                <th>Status</th>              '
            + '                <th>Action22</th>              '
            + '            </tr>                            '
            + '        </thead>                             '
            + '        <tbody>';

    $.ajax({
        url: loadData, //"Category/GetAllCategoryGroup",
        data: {
            GroupLevel: -1
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var ccd = data.length;
            alert(ccd+data[1].username );
            for (var i = 0; i < ccd; i++) {
                catGroupTable += '<tr>                       '
                        + '                <td>' + data[i].username + '</td>      '
                        + '                <td>' + data[i].userType + '</td>          '
                        + '                <td>' + data[i].password + '</td>      '
                        + '                <td>' + (data[i].isAct == 1 ? "Active" : "Inactive") + '</td>     '
                        + '                <td>                  '
                        + '                    <ul>              '
                        // + '                        <li><a onclick="EditGroupBind(' + data[i].categoryId + ')" ><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
                        // + '                        <li style="display:none;"><a href="#" id="EditGroupBindBtn" data-toggle="modal" data-target="#myModal1"><i class="fa fa-pencil" aria-hidden="true" title="Edit"></i></a></li>'
                        //+ '                        <li><a href="#">' + (data[i].isAct == 0 ? "<i class='fa fa-check' aria-hidden='true' title='Active'></i>" : "<i class='fa fa-close' aria-hidden='true' title='Deactive'></i>") + '</a></li>'
                        //+ ' '+ (data[i].isAct == 1 ? "Act" : "INAct") +''       //<i class="fa fa-check" aria-hidden="true" title="Active"></i>
                        + '                    </ul>     '
                        + '                </td>         '
                        + '                </ul>         '
                        + '            </tr>           ';
            }
        },
        error: function (e) {
            //   alert("LoadAllCategoryGroup Failed");
        }
    });

    catGroupTable += '</tbody></table>';

    $('#LoadCatGroupTableDiv').empty().append(catGroupTable);
    $(document).ready(function () {
        $('.table').DataTable();
    });
}

