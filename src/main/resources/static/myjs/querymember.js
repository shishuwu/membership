var totalPages = 1;

function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

function updateData(pageNum) {
    var memberName = document.getElementById('search').value;
    // if search content is empty, query all
    if(isEmptyOrSpaces(memberName) || totalPages === 0){
        //continue to query;
    } else {
        if (pageNum < 1 || pageNum > totalPages)
        return;
    }

    
    
    $.ajax({
        url: '/queryMember',
        dataType: 'JSON',
        type: 'POST',
        data: { currentPage: pageNum - 1, memberName: memberName },
        success: function (data) {
            console.log(data);
            totalPages = data.totalPages;
            var flag = 0;
            var tableContent = $('#tableContent');
            tableContent.html('');
            $.each(data.content, function (index, content) {
                console.log(content);
                if (flag % 2 === 1)
                    tableContent.html(tableContent.html() + fillTableHtml('gradeU odd', content));
                else
                    tableContent.html(tableContent.html() + fillTableHtml('gradeU even', content));

                function fillTableHtml(clazz, content) {
                    return '<tr class="' + clazz + '">' +
                        '<td>' + content.id + '</td>' +
                        '<td>' + content.memberName + '</td>' +
                        '<td>' + content.phone + '</td>' +
                        '<td>' + content.email + '</td>' +
                        '<td>' + content.birthday + '</td>' +
                        '<td>' + content.memberIntegral + '</td>' +
                        '<td>' + content.balance + '</td>' +
                        '<td>' + content.memberGrade.gradeName + '</td>' +
                        '<td>' + content.sex + '</td>' +
                        '<td>' + content.state + '</td>' +
                        '<td> <button class="waves-effect waves-light btn" data-toggle="modal" data-target="#myModal" onclick="openModelWindow(this)">修改</button> </td>' +    
                        '</tr>';
                }
            });

            //totalPages
            if (data.number + 1 >= totalPages - 1)
                var inHTML = '<li class="page-item"><a class="page-link" onclick="updateData(' + (totalPages - 1) + ')" href="javascript:void(0)">上一页</a></li>';
            if (data.number <= 0)
                inHTML = '<li class="page-item"><a class="page-link" onclick="updateData(' + 1 + ')" href="javascript:void(0)">上一页</a></li>';
            else
                inHTML = '<li class="page-item"><a class="page-link" onclick="updateData(' + data.number + ')" href="javascript:void(0)">上一页</a></li>';

            for (var i = data.number - 1; i <= data.number + 3; i++) {
                if (i < 1)
                    continue;
                if (i > data.totalPages)
                    break;
                if (data.number + 1 === i)
                    inHTML += '<li class="active page-item"><a class="page-link" onclick="updateData(' + i + ')" href="javascript:void(0)">' + i + '</a></li>';
                else
                    inHTML += '<li class="page-item"><a class="page-link" onclick="updateData(' + i + ')" href="javascript:void(0)">' + i + '</a></li>';
            }
            if (data.number + 1 >= totalPages)
                inHTML += '<li class="page-item"><a class="page-link" onclick="updateData(' + totalPages + ')" href="javascript:void(0)">下一页</a></li>';
            else
                inHTML += '<li class="page-item"><a class="page-link" onclick="updateData(' + (data.number + 2) + ')" href="javascript:void(0)">下一页</a></li>';
            $('#page').html(inHTML);

        }
    })
}

updateData(1);