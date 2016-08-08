/**
 * 
 * @Author: fengyeyang
 * @Date:   2016-08-08 09:42:38
 * @Last Modified by:   fengyeyang
 * @Last Modified time: 2016-08-08 15:16:06
 */

/**
 * fileReaderSlider.js
 * @param  {[type]} $         [jQuery]
 * @param  {[type]} window    [window]
 * @param  {[type]} document  [document]
 * @param  {[type]} undefined [undefined]
 * @return {[type]}           
 */
;(function($,window,document,undefined) {
	var pluginName = 'fileReaderSlider',
		defaults = {
			smallImg: $('.small-img'),
			btnPrev : $('.btn-prev'),
			btnNext : $('.btn-next'),
			btnSmallPrev : $('.btn-small-prev'),
			btnSmallNext : $('.btn-small-next'),
			curr : $('.curr'),
			del : $('.del'),
			f : $('#file'),
			r : $('#result'),
			initL : 6,
			auto: true,
			speed : 3000,
		};
	function FileReaderSlider(ele,opt){
		this.ele = ele;
		this.settings = $.extend({},defaults,opt);
		this._defaults = defaults;
		this._name = pluginName;
		this.version = 'v0.1';
		this.init();
	}

	FileReaderSlider.prototype = {
		i: 0,
		init: function(){
			var _this = this;
			_this.clone();
			_this.setSmall();
			_this.setSize();
			_this.prev();
			_this.next();
			// this.settings.btnNext.on('click',_this.next);
			_this.appoint();
			_this.smallPrev();
			_this.smallNext();
			_this.delete();
			_this.add();
			_this.auto();
		},
		clone: function(){
			var _this = this;
			this.settings.smallImg.prepend(_this.setSmall().bigUl.clone());
		},
		setSmall: function(){
			var smallUl = $('.small-img ul');
			var smallLi = $('.small-img ul li');
			var bigLi = $('.big-img ul li');
			var bigUl = $('.big-img ul');
			return {
				bigUl: bigUl,
				bigLi: bigLi,
				smallUl: smallUl,
				smallLi: smallLi,
			}
		},
		setSize: function(){
			var _this = this;
			var li = this.setSmall().bigLi.length;
			var bigLiW = this.setSmall().bigLi.outerWidth();
			var smallLiW = _this.setSmall().smallLi.outerWidth();
			var bigAllW = li * bigLiW;
			var smallAllW = li * smallLiW;
			_this.setSmall().bigUl.css('width', bigAllW);
			_this.setSmall().smallUl.css('width', smallAllW);
			return {
				li:li,
				bigLiW: bigLiW,
				smallLiW: smallLiW,
				bigAllW: bigAllW,
				smallAllW: smallAllW,
			}
		},
		prev: function() {
			var _this = this;
			this.settings.btnPrev.on('click',function(){
				if (_this.i == 0) {
					_this.i = _this.setSize().li - 1;
					// console.log(i + ',li = ' + li)
					_this.other(_this.i);
				} else {
					_this.i--;
					console.log(_this.i)
					_this.other(_this.i);
				}
			})
		},
		next: function() {
			var _this = this;
			this.settings.btnNext.on('click', function(){
				if (_this.i < _this.setSize().li - 1) {
					_this.i++;
					// console.log('i< li-1 ' + ' ' + i + ',li = ' + li)
					_this.other(_this.i);
				} else {
					_this.i = 0;
					// console.log(i + ',li = ' + li)
					_this.other(_this.i);
				}
			});
		},
		appoint: function(){
			var _this = this;
			_this.setSmall().smallLi.on('click', function(){
				_this.i = _this.setSmall().smallLi.index(this);
				_this.other(_this.setSmall().smallLi.index(this));
			});
		},
		smallPrev: function() {
			var _this = this;
			this.settings.btnSmallPrev.on('click', function(){
				if (_this.i < _this.settings.initL) {
					_this.other(0);
					_this.i = 0;
				} else {
					_this.other(Math.floor(_this.i - _this.settings.initL));
					_this.i -= _this.settings.initL;
				}
			});
		},
		smallNext: function() {
			var _this = this;
			this.settings.btnSmallNext.on('click', function(){
				console.log(_this.settings.speed);
				if (_this.setSize().li < _this.settings.initL) {
					_this.other(0);
					_this.i = 0;
				} else {
					if (_this.i + _this.settings.initL > _this.setSize().li) {
						_this.other(Math.floor(_this.setSize().li - 1));
					} else {
						_this.other(Math.floor(_this.i + _this.settings.initL));
						_this.i += _this.settings.initL;
					}
				}
			});
		},
		other: function(l){
			var _this =this;
			_this.setSmall().bigUl.animate({
				'left': l * (-_this.setSize().bigLiW) + 'px',
			}, 400);
			console.log('l 的值为:' + l)
			if (_this.setSize().li > this.settings.initL) {
				if (l >= this.settings.initL) {
					_this.setSmall().smallUl.animate({
						'left': this.settings.initL * Math.floor(l / this.settings.initL) * (-_this.setSize().smallLiW) + 'px',
					}, 400);
				} else {
					_this.setSmall().smallUl.animate({
						'left': 0,
					}, 400);
				}
			}
			_this.setSmall().smallLi.eq(l).addClass('current').siblings().removeClass('current');
			_this.setSmall().bigLi.eq(l).addClass('current').siblings().removeClass('current');
		},
		delete: function() {
			var _this = this;
			this.settings.del.on('click', function(){
				_this.setSmall().smallLi.remove('.current');
				_this.setSmall().bigLi.remove('.current');
				_this.i == _this.setSize().li - 1 ? _this.prev() : _this.setSmall().bigLi.eq(_this.i + 1).addClass('animateLeft');
				_this.setSize().li--;
				console.log(_this.settings.li);
				_this.setSmall().smallLi = _this.setSmall().smallLi;
				_this.setSmall().bigLi = _this.setSmall().bigLi;
				_this.setSmall().smallLi.eq(_this.i).addClass('current').siblings().removeClass('current');
				_this.setSmall().bigLi.eq(_this.i).addClass('current').siblings().removeClass('current');
			});
		},
		auto: function(){
			var _this = this;
			if(this.settings.auto){
				console.log(this.settings.auto+''+this.settings.speed);
				// var time = setInterval(_this.next(),this.settings.speed);
				// $('.d-body').hover(function(){
				// 	clearInterval(time);
				// },function(){
				// 	time = setInterval(_this.next(),this.settings.speed);
				// })
			}
		},
		add: function() {
			var _this = this;
			if (typeof FileReader === 'undefined') {
				this.settings.r.innerHTML = '浏览器不支持 FileReader';
				this.settings.f.setAttribute('disabled', 'disabled');
			} else {
				this.settings.f.on('change', function(){
					var file = this.files[0];
					if (!/image\/\w+/.test(file.type)) {
						alert("文件是图片");
						return false;
					}
					var reader = new FileReader();
					var result = reader.readAsDataURL(file);
					reader.onload = function(e) {
						console.log(_this.settings.r);
						_this.settings.r.html('<img src="' + this.result + '" alt=""/>');
						_this.append(this.result);
					}
				});
			}
		},
		append: function(src){
			var _this = this;
			var rli = document.createElement('li');
			var ra = document.createElement('a');
			var rimg = document.createElement('img');
			ra.appendChild(rimg);
			ra.setAttribute('href', '#');
			rimg.setAttribute('src', src);
			rimg.setAttribute('class', 'img-responsive');
			rli.appendChild(ra);
			_this.setSmall().bigUl.prepend(rli);
			_this.setSmall().smallUl.prepend(rli.cloneNode(true));
			_this.setSmall().smallLi.first().removeClass('current');
			_this.setSmall().smallLi = $('.small-img ul li');
			_this.setSmall().bigLi = _this.setSmall().bigLi;
			_this.setSize().li = _this.setSmall().bigLi.length;
			_this.setSize().bigAllW = _this.setSize().li * _this.setSize().bigLiW;
			_this.setSize().smallAllW = _this.setSize().li * _this.setSize().smallLiW;
			// set
			_this.setSmall().bigUl.css('width', _this.setSize().bigAllW);
			_this.setSmall().smallUl.css('width', _this.setSize().smallAllW);
			_this.other(0);
			_this.i = 0;
			_this.setSmall().smallLi.eq(0).addClass('current').siblings().removeClass('current');
			_this.setSmall().bigLi.eq(0).addClass('current').siblings().removeClass('current');
			_this.appoint();
		}
	}
	$.fn[pluginName] = function(opt){
        this.each(function(){
          if(!$.data(this,"plugin_"+pluginName)){
            $.data(this,"plugin_"+pluginName,new FileReaderSlider(this,opt))
          }
        });
        return this;
        // return new FileReaderSlider(this,opt);
      }
})(jQuery,window,document)