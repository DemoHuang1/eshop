function upload(obj) {
    var form = document.getElementById("imageForm");
    form.submit();
    //获取展示图片的区域
    var img = document.getElementById("showImg");
    //获取文件对象
    let file = obj.files[0];
    //获取文件阅读器
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        //给img的src设置图片url
        img.setAttribute("src", this.result);
    }

};