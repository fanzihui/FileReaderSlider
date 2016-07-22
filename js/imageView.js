/*
 * @Author: fengyeyang
 * @Date:   2016-07-08 10:42:38
 * @Last Modified by:   fengyeyang
 * @Last Modified time: 2016-07-12 15:57:06
 */
;
$(function() {

	var imgView = {
		init: function(opt) {

		},
		next: function() {},
		prev: function() {},
		delete: function() {},
		smallPrev: function() {},
		smallNext: function() {},
		add: function() {},
	}

	// 获取元素
	var bigUl = $('.big-img ul');
	var $bigLi = $('.big-img ul li');
	$('.small-img').prepend(bigUl.clone());
	var smallUl = $('.small-img ul');
	var $smallLi = $('.small-img ul li');
	$smallLi.first().removeClass('current').addClass('curr');
	var btnPrev = $('.other-img .btn-prev');
	var btnNext = $('.other-img .btn-next');
	var btnSmallPrev = $('.other-img .btn-small-prev');
	var btnSmallNext = $('.other-img .btn-small-next');
	var curr = $('.curr');
	var del = $('.del');

	// 获取长度和宽
	var li = $('.big-img ul li').length;
	var bigLiW = $('.big-img ul li').outerWidth();
	var smallLiW = $('.small-img ul li').outerWidth();
	var $bigAllW = li * bigLiW;
	var $smallAllW = li * smallLiW;

	// 小图一排 6个
	var initL = 6;
	var speed = 3000;

	// set
	bigUl.css('width', $bigAllW);
	smallUl.css('width', $smallAllW);

	// 事件
	del.on('click', delImg);
	$smallLi.on('click', appoint);
	btnPrev.on('click', prev);
	btnNext.on('click', next);
	btnSmallPrev.on('click', smallPrev);
	btnSmallNext.on('click', smallNext);

	var f = document.querySelector('#file');
	var r = document.querySelector('#result');

	if (typeof FileReader === 'undefined') {
		r.innerHTML = '浏览器不支持 FileReader';
		f.setAttribute('disabled', 'disabled');
	} else {
		f.addEventListener('change', readFile, false);
	}

	function appendLi(src) {
		var rli = document.createElement('li');
		var ra = document.createElement('a');
		var rimg = document.createElement('img');
		ra.appendChild(rimg);
		ra.setAttribute('href', '#');
		rimg.setAttribute('src', src);
		rimg.setAttribute('class', 'img-responsive');
		rli.appendChild(ra);
		bigUl.prepend(rli);
		smallUl.prepend(rli.cloneNode(true));
		$smallLi.first().removeClass('current');
		$smallLi = $('.small-img ul li');
		$bigLi = $('.big-img ul li');
		li = $('.big-img ul li').length;
		$bigAllW = li * bigLiW;
		$smallAllW = li * smallLiW;
		// set
		bigUl.css('width', $bigAllW);
		smallUl.css('width', $smallAllW);
		other(0);
		i = 0;
		$smallLi.eq(0).addClass('curr').siblings().removeClass('curr');
		$bigLi.eq(0).addClass('current').siblings().removeClass('current');
		$smallLi.on('click', appoint);
	}

	function readFile() {
		var file = this.files[0];
		if (!/image\/\w+/.test(file.type)) {
			alert("文件是图片");
			return false;
		}
		var reader = new FileReader();
		var result = reader.readAsDataURL(file);
		reader.onload = function(e) {
			r.innerHTML = '<img src="' + this.result + '" alt=""/>';
			appendLi(this.result);
		}
	}

	// 函数逻辑 
	var i = 0;

	function prev() {
		if (i == 0) {
			i = li - 1;
			console.log(i + ',li = ' + li)
			other(i);
		} else {
			i--;
			console.log(i)
			other(i);
		}
	};

	function next() {
		if (i < li - 1) {
			i++;
			console.log('i< li-1 ' + ' ' + i + ',li = ' + li)
			other(i);
		} else {
			i = 0;
			console.log(i + ',li = ' + li)
			other(i);
		}
	};

	function other(l) {
		bigUl.animate({
			'left': l * (-bigLiW) + 'px',
		}, 400);
		console.log('l 的值为:' + l)
		if (li > initL) {
			if (l >= initL) {
				smallUl.animate({
					'left': initL * Math.floor(l / initL) * (-smallLiW) + 'px',
				}, 400);
			} else {
				smallUl.animate({
					'left': 0,
				}, 400);
			}
		}
		$smallLi.eq(l).addClass('curr').siblings().removeClass('curr');
		$bigLi.eq(l).addClass('current').siblings().removeClass('current');
	};

	function appoint(e) {
		e.stopPropagation();
		i = $smallLi.index(this);
		other($smallLi.index(this));
	}

	function smallPrev() {
		if (i < initL) {
			other(0);
			i = 0;
		} else {
			other(Math.floor(i - initL));
			i -= 6;
		}
	};

	function smallNext() {
		if (li < initL) {
			other(0);
			i = 0;
		} else {
			if (i + initL > li) {
				other(Math.floor(li - 1));
			} else {
				other(Math.floor(i + initL));
				i += 6;
			}
		}
	};

	function delImg() {
		console.log('delImg ' + i);
		$smallLi.remove('.curr');
		$bigLi.remove('.current');
		i == li - 1 ? prev() : $bigLi.eq(i + 1).addClass('animateLeft');
		li--;
		console.log(li);
		$smallLi = $('.small-img ul li');
		$bigLi = $('.big-img ul li');
		$smallLi.eq(i).addClass('curr').siblings().removeClass('curr');
		$bigLi.eq(i).addClass('current').siblings().removeClass('current');
	}
	//定时器
	// var time = setInterval(next,speed);
	// $('.d-body').hover(function(){
	// 	clearInterval(time);
	// },function(){
	// 	time = setInterval(next,speed);
	// })
})