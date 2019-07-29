(function($) {
  "use strict";
  // 名稱
  var ModuleName = "banner";
  // 類別
  var Module = function(ele, options) {
    // 該元素
    this.ele = ele;
    // $(ele)為操作的DOM
    this.$ele = $(ele);
    this.option = options;
  };

  // 預設
  Module.DEFAULTS = {
    // 設定一開始是否為開或合
    openAtStart: true, // [boolean] true | false
    // 設定啟動後是否要自動開或合，若設為false，就不要自勳開合；若為true是馬上自動開合；若為數字是幾毫秒之後開合
    autoToggle: true, // [boolean|number] true | false | 3000
    // 設定收合展開按鈕顯示名稱
    button: {
      closeText: "收合", // [string]
      openText: "展開", // [string]
      class: "btn" // [string]
    },
    // 設定模組在各狀態時的class
    class: {
      closed: "closed", // [string]
      closing: "closing", // [string]
      opened: "opened", // [string]
      opening: "opening" // [string]
    },
    // 是否要有transition效果
    transition: true,
    // 當有transition時，要執行的callback function
    // tenasitionend 事件
    whenTransition: function() {
      console.log("whenTransition");
    },
    style: "classname",
    whenClickCallback: function() {
      //   console.log("whenClickCallback");
    }
  };
  // Function

  Module.prototype.open = function() {
    // console.log("123")
  };

  Module.prototype.buttonClick = function() {
    var banner = this.$ele;
    var btn = banner.find("." + this.option.button.class);
    var imgContainer = banner.find("div");
    var img = banner.find(".img");

    // function裡如有包function裡面的this是指向Window因此要在此層先固定this指向
    var opened = this.option.class.opened;
    console.log(opened);
    var closing = this.option.class.closing;
    var opening = this.option.class.opening;
    var closed = this.option.class.closed;
    var whenTransition = this.option.whenTransition;
    // 展開字樣
    var openText = this.option.button.openText;
    var closeText = this.option.button.closeText;

    btn.click(function() {
      var bannerStatusOpen = banner.hasClass("opened");
      var bannerStatusClose = banner.hasClass("closed");
      console.log(banner.hasClass("closed"));
      if (bannerStatusOpen) {
        // 換成展開字樣
        btn.text(openText);
        banner.removeClass(opened);
        banner.addClass(closing);
        // transition中刷console.log
        var transitinoInterval = setInterval(whenTransition, 15);

        // transition結束後
        banner.on("transitionend", function() {
          banner.addClass(closed);
          banner.removeClass(closing);
          clearInterval(transitinoInterval);
          // TRANSITION結束再觸發並調整圖片位置成顯示圖片底部內容
          img.css({
            top: "-300px",
            margin: "0 0 0 -12%",
            position: "absolute"
          });
          console.log("hihi");
        });

        imgContainer.css({ height: "40px", overflow: "hidden" });
      }
      if (bannerStatusClose) {
        // 換成展開字樣
        btn.text(closeText);
        banner.removeClass(closed);
        banner.addClass(opening);
        // transition中刷console.log
        var transitinoInterval = setInterval(whenTransition, 15);
        img.css({ top: "0px", margin: "0 0 0 -12%", position: "absolute" });

        // transition結束後
        banner.on("transitionend", function() {
          banner.addClass(opened);
          banner.removeClass(opening);
          clearInterval(transitinoInterval);
          // TRANSITION結束再觸發並調整圖片位置成顯示圖片底部內容
          console.log("heyhey");
        });
        imgContainer.css({ height: "300px", overflow: "hidden" });
      }
    });
  };

  // 初始狀態
  Module.prototype.init = function() {
    var banner = this.$ele;
    // 初始化class顯示opend
    banner.addClass(this.option.class.opened);
    var imgContainer = banner.find("div");
    imgContainer.css({
      margin: "0 auto",
      height: "300px",
      width: "960px",
      overflow: "hidden",
      position: "relative",
      transition: "0.5s"
    });
    // 將圖片調整位置
    imgContainer.find(".img").css({ top: "0", "margin-left": "-12%" });

    banner.find("button").addClass(this.option.button.class);
    var btn = banner.find("." + this.option.button.class);
    btn.text(this.option.button.closeText);
    btn
      .css({
        position: "absolute",
        right: "0",
        bottom: "0",
        padding: "2px 2px 2px 8px",
        "font-size": "13px",
        "background-color": "rgba(0,0,0,.8)",
        border: "0",
        color: "#a3a3a3",
        cursor: "pointer"
      })
      .hover(
        function() {
          $(this).css("color", "#fff");
        },
        function() {
          $(this).css("color", "#a3a3a3");
        }
      );
    console.log(btn);
    // 按鈕預設顯示收合字體
  };

  // 街口
  $.fn[ModuleName] = function(methods, options) {
    return this.each(function() {
      var $this = $(this);
      var module = $this.data(ModuleName);
      // console.log($this);
      // console.log(module);
      // console.log(!!module);
      // console.log(methods);
      // console.log(options);
      var opts = null;
      // 第二次狀態
      if (!!module) {
        if (typeof methods === "string" && typeof options === "undefined") {
          console.log("NOT1");
          module[methods]();
        } else if (typeof options === "string" && typeof options === "object") {
          console.log("NOT2");
          module[methods](options);
        } else {
          // console.log("unsupported options!");
          throw "unsupported options!";
        }
      } else {
        // 第一次狀態
        opts = $.extend(
          {},
          Module.DEFAULTS,
          typeof methods === "object" && options,
          typeof options === "object" && options
        );
        console.log(this); //整個banner元素
        module = new Module(this, opts);
        // console.log(module)
        $this.data(ModuleName, module);
        module.init();
        // module.buttonClick();
        // console.log(methods)
        // console.log(opts)
        // console.log($this.data(ModuleName));
      }
    });
  };
})(jQuery);

// $(".banner").banner({
//   // 設定一開始是否為開或合
//   openAtStart: true, // [boolean] true | false
//   // 設定啟動後是否要自動開或合，若設為false，就不要自勳開合；若為true是馬上自動開合；若為數字是幾毫秒之後開合
//   autoToggle: true, // [boolean|number] true | false | 3000
//   // 設定收合展開按鈕顯示名稱
//   button: {
//     closeText: "收合", // [string]
//     openText: "展開", // [string]
//     class: "btn" // [string]
//   },
//   // 設定模組在各狀態時的class
//   class: {
//     closed: "closed", // [string]
//     closing: "closing", // [string]
//     opened: "opened", // [string]
//     opening: "opening" // [string]
//   },
//   // 是否要有transition效果
//   transition: true,
//   // 當有transition時，要執行的callback function
//   // tenasitionend 事件
//   whenTransition: function () {
//     console.log("whenTransition");
//   }
// });

// 設定好function等待呼叫

$(".banner").banner("", {});
$(".banner").banner("buttonClick");
