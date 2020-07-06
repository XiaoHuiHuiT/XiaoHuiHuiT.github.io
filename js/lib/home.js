let mixinData = {
  isHome: !!$('.posts-expand article .post-button').length,
  pageType: 'home',
  bgImgList: [
    "https://w.wallhaven.cc/full/ne/wallhaven-neqwon.jpg",
    "https://w.wallhaven.cc/full/k9/wallhaven-k9p8l6.jpg",
    "https://w.wallhaven.cc/full/ne/wallhaven-ne7lr8.jpg",
    "https://w.wallhaven.cc/full/dg/wallhaven-dgekog.jpg",
    "https://w.wallhaven.cc/full/xl/wallhaven-xl67ov.jpg",
    "https://w.wallhaven.cc/full/lm/wallhaven-lm2762.jpg",
    "https://w.wallhaven.cc/full/4y/wallhaven-4ylgl0.jpg",
    "https://w.wallhaven.cc/full/47/wallhaven-47ldq9.jpg",
  ],
};

mixinData.pageType = mixinData.isHome ? 'home' :
  $('#link-page').length ? 'links' :
    $('#books-page').length ? 'books' : 'article';

let mixin = {
  data: function () {
    return mixinData;
  },
  created: function () {
    let vm = this;

    // 刷新 css
    $('link[href="/css/main.css"]').attr('href', '/css/main.css?v=' + vm.getNowFormatDate());

    // 更换头图
    vm.bannerBgUrl = vm.bgImgList[vm.randomNum(0, vm.bgImgList.length - 1)];
    $('#banner-img').css('background', 'url("' + vm.bannerBgUrl + '") center center / cover no-repeat rgb(34, 34, 34)');

    // 设置标语
    if (vm.isHome) {
      $('h1.page-title').show();

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://sentence.iciba.com/index.php?callback=onecallback&c=dailysentence&m=getdetail&title=" + vm.getNowFormatDate(),
        "method": "POST",
        "dataType": 'jsonp',
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
        },
        "data": {
          "TransCode": "030111",
          "OpenId": "123456789",
          "Body": ""
        }
      };

      var description = $('h2.page-description'), author = $('h3.page-author');
      $.ajax(settings).done(function (response) {
        if (response.errno === 0) {
          description.text(response.note).css('display', '-webkit-box');
          author.text(response.content).show();
        } else {
          description.text("自立立人，自达达人，莫问收获，但问耕耘。").css('display', '-webkit-box');
        }
        return false;
      });

    } else {
      let postHeader = $('.posts-expand header.post-header'), postHeaderHtml = postHeader.html();
      postHeader.html('');
      if (typeof postHeaderHtml === "undefined") {
        var title = $('title').text();
        title = $.trim(title.split("|")[0]);
        postHeaderHtml = '<h2 class="post-title" itemprop="name headline">' + title + '</h2>';
      }
      $('#banner-post-header').html(postHeaderHtml);
    }

    // 设置页脚
    let footerHtml = '<footer-background>' +
      '    <figure class="clouds"></figure>' +
      '    <figure class="background"></figure>' +
      '    <figure class="foreground"></figure>' +
      '</footer-background>';
    $('footer.footer').prepend(footerHtml);
  },
  methods: {

    /**
     * 随机数
     */
    randomNum: function (minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1);
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
        default:
          return 0;
      }
    },

    /**
     * 获取日期
     */
    getNowFormatDate: function () {
      let date = new Date(),
        seperator = "-",
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      return year + seperator + month + seperator + strDate;
    }
  },
};

new Vue({
  mixins: [mixin],
  data: function () {
    return {}
  },
  created: function () {
    let vm = this;

    // 设置主页标题
    if (vm.isHome) {
      let article = $('article.post-block');
      if (article.length) {
        article.addClass('home');
        delete (article[article.length - 1]);
        article.addClass('articleBottom');
      }
    }
  }
});
