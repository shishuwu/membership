var totalPages = 1;

//initialize all modals
// $('.modal').modal({
//     dismissible: true
// });




function updateData(pageNum) {
    if (pageNum < 1 || pageNum > totalPages)
        return;
    $.ajax({
        url: '/memberGrade',
        dataType: 'JSON',
        type: 'POST',
        data: {currentPage: pageNum - 1},
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
                        '<td style="display:none">' + content.id + '</td>' +
                        '<td>' + content.gradeName + '</td>' +
                        '<td>' + content.discount + '</td>' +
                        '<td>' + content.comment + '</td>' +
                        '<td> <button class="waves-effect waves-light btn" data-toggle="modal" data-target="#myModal" onclick="openModelWindow(this)">修改</button> </td>' +    
                        '<td> <button class="waves-effect waves-light btn" onclick="deleteMemberGrade(this, ' + content.id + ')">删除</button> </td>' + 
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

var info;
function openModelWindow(btn) {
    info = $(btn).parent().parent();
//        console.log(info);
//        console.log(info.children()[1]);
//        console.log(info.children()[2]);
//        console.log(info.children()[3]);
    $('#gradeId').val($(info.children()[0]).text());
    $('#gradeName').val($(info.children()[1]).text());
    $('#discount').val($(info.children()[2]).text());
    $('#comment').val($(info.children()[3]).text());
    $('#myModal').modal('show');
}

function deleteMemberGrade(btn, aid) {
    
    if (confirm('确认删除该会员等级吗？')) {
        var info = $(btn).parent().parent();
        //var id = $(info.children()[0]).text();
        var id = aid ;//$('#gradeId').val();
        $.ajax({
            url: '/deleteMemberGrade',
            type: 'POST',
            data: {id: id},
            success: function (data) {
                alert(data);
                if (data ==='success'){
                    $(btn).parent().parent().remove();
                }
            }
        })
    }
    
}

function updateMemberGrade() {
    var id = $('#gradeId').val();
        var gradeName = $('#gradeName').val();
        var discount = $('#discount').val();
        var comment = $('#comment').val();
        $.ajax({
            url: '/updateMemberGrade',
            type: 'POST',
            data: {id: id, gradeName: gradeName, discount: discount, comment: comment},
            success: function (data) {
                var modal = $('#myModal');
                modal.attr('class', 'modal fade');
                modal.attr('aria-hidden','true');
                modal.attr('style','display:none');
                $('.modal-backdrop')[0].remove();
                $('body').attr('class', '').attr('style', '');
                if (data === 'success') {
                    $(info.children()[1]).text(gradeName);
                    $(info.children()[2]).text(discount);
                    $(info.children()[3]).text(comment);
                }
                alert(data);
            }
        })
}

function addMemberGrade() {
    var gradeName = $('#addGradeName').val();
    var discount = $('#addDiscount').val();
    var comment = $('#addComment').val();

    $.ajax({
        url:'/addMemberGrade',
        type:'POST',
        data:{gradeName: gradeName, discount: discount, comment: comment},
        success:function (data) {
            var tableContent = $('#tableContent');
            var addHTML = '<tr class="gradeU odd">' +
                '<td style="display:none">' + data.id + '</td>' +
                '<td>' + data.gradeName + '</td>' +
                '<td>' + data.discount + '</td>' +
                '<td>' + data.comment + '</td>' +
                '<td><button class="waves-effect waves-light btn" onclick="openModelWindow(this)">修改</button></td>' +
                '</tr>';
            tableContent.html(tableContent.html() + addHTML);
        }
    })
}