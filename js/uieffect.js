$(function(){
  // 健保署影片播放頁 //

  // 複合功能圖示
  var _compIcon = $('.compound'); //li
  _compIcon.each(function(){
    let _this = $(this);
    let _controler = _this.children('button');
    let _optList = _this.children('ul');
    let _optItem = _optList.children('li');
    let _optButton = _optItem.children('button');
    let _optLink = _optItem.children('a');
    let count = _optItem.length;

    const speed = 300;

    // 改變 li 的 z-index 值，第一個 li 要在最上面
    for (let i = 0; i < count; i++) {
      _optItem.eq(i).css('z-index', count - i)
    }

    // 收合
    function glideUp() {
      for (let i = 0; i < count; i++) {
        _optList.stop(true, false).animate({ 'top': 0 }, speed);
        _optItem.eq(i).delay( speed * i * .4).stop(true, false).animate({ 'top': 0 }, speed, function(){
          if ( i == count-1) {_optList.height(0).hide()}
        });
      }
    }

    _controler.click(function(){
      if (_optList.is(':hidden')) {
        _optList.show();
        let height = _optItem.outerHeight(true);
        _optList.stop(true, false).animate({ 'top': height }, speed);
        for (let i = 0; i < count; i++) {
          _optItem.eq(i).delay( speed*i*.3 ).stop(true, false).animate({ 'top': height * i }, speed, function(){
            _optList.height( height * count);
          })
        }
      } else {
        glideUp();
      }
    })

    _optButton.add(_optLink).click(glideUp);
    _this.siblings().click(glideUp);
    _this.siblings().children('a, button').focus(glideUp);
  })

    // /////////// font size 和 cookie ///////////////
  // font size：顯示所選項目
  var _fontSize = $('.fontSize');
  var _fontSizeBtn = _fontSize.children('button');
  var _fsOption = _fontSize.find('ul>li>button');
  var _innerMain = $('.main.inner');

  _fsOption.click(function(){
    let fontClass = $(this).attr('class');
    _fontSizeBtn.removeClass().addClass(fontClass);
    _innerMain.removeClass('largeFont mediumFont smallFont').addClass(fontClass);
    createCookie('FontSize', fontClass , 365);

  })

  function createCookie(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      var expires = '; expires=' + date.toGMTString();
    } else {
      expires = '';
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  }

  function readCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }


})