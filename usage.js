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
    Module.prototype.toggle = function() {
        var banner = this.$ele;
        var btn = banner.find("." + this.option.button.class);
        // banner狀態
        var opened = this.option.class.opened;
        var closing = this.option.class.closing;
        var opening = this.option.class.opening;
        var closed = this.option.class.closed;
        // 展開字樣
        var openText = this.option.button.openText;
        var closeText = this.option.button.closeText;
        // transition func
        var whenTransition = this.option.whenTransition;

        btn.on("click", function() {
            var bannerStatusOpen = banner.hasClass(opened);
            var bannerStatusClose = banner.hasClass(closed);
            // transition中刷console.log
            var transitinoInterval = setInterval(whenTransition, 15);

            if (bannerStatusOpen) {
                // 換成展開字樣
                btn.text(openText);
                banner.removeClass(opened);
                banner.addClass(closing);
            }
            if (bannerStatusClose) {
                // 換成展開字樣
                btn.text(closeText);
                banner.removeClass(closed);
                banner.addClass(opening);
            }
            // transition結束後
            banner.on("transitionend", function() {
                if (banner.hasClass(closing)) {
                    banner.addClass(closed);
                    banner.removeClass(closing);
                    console.log("收合");
                }
                if (banner.hasClass(opening)) {
                    banner.addClass(opened);
                    banner.removeClass(opening);
                    // TRANSITION結束再觸發並調整圖片位置成顯示圖片底部內容
                    console.log("打開");
                }
                // 中止interval
                clearInterval(transitinoInterval);
            });
        });
    };

    // 初始狀態
    Module.prototype.init = function() {
        var banner = this.$ele;
        // 初始化class顯示opend
        banner.addClass(this.option.class.opened);

        banner.find("button").addClass(this.option.button.class);
        var btn = banner.find("." + this.option.button.class);
        btn.text(this.option.button.closeText);
        // 按鈕預設顯示收合字體
    };

    // 接口
    $.fn[ModuleName] = function(methods, options) {
        return this.each(function() {
            var $this = $(this);
            var module = $this.data(ModuleName);
            var opts = null;
            // 第二次狀態
            if (!!module) {
                if (typeof methods === "string" && typeof options === "undefined") {
                    module[methods]();
                } else if (typeof options === "string" && typeof options === "object") {
                    module[methods](options);
                } else {
                    // console.log("unsupported options!");
                    throw "unsupported options!";
                }
            } else {
                // 第一次狀態
                opts = $.extend({},
                    Module.DEFAULTS,
                    typeof methods === "object" && options,
                    typeof options === "object" && options
                );
                module = new Module(this, opts);
                $this.data(ModuleName, module);
                module.init();
            }
        });
    };
})(jQuery);


$(".banner").banner("", {});
$(".banner").banner("toggle");