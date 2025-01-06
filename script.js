document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  console.log(hamburgerMenu)
  const navi = document.getElementById("navi");

  const hamburgerMenuSections = document.querySelectorAll(
    ".hamburger-menu-section"
  );
  const mask = document.querySelector("#mask")

  hamburgerMenu.addEventListener("click", function () {
    hamburgerMenu.classList.toggle("active");
    mask.classList.toggle("active");
    navi.classList.toggle("active");
  });

  hamburgerMenuSections.forEach((hamburgerMenuSection) => {
    hamburgerMenuSection.addEventListener("click", function () {
      hamburgerMenu.classList.remove("active");
      navi.classList.remove("active");
    });
  });


  // ページ内のリンクをすべて取得
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      // デフォルトのリンク動作を無効にする
      event.preventDefault();

      // リンク先のhref属性を取得
      let href = this.getAttribute("href");

      // ジャンプ先の要素を取得
      let target = document.querySelector(
        href === "#" || href === "" ? "html" : href
      );

      if (target) {
        // ジャンプ先の要素の位置を取得
        let position = target.getBoundingClientRect().top + window.scrollY;

        // スムーススクロールを実行
        window.scrollTo({
          top: position,
          behavior: "smooth", // スムーススクロールを指定
        });
      
        navi.classList.remove("active");
        hamburgerMenu.classList.remove("active");

        mask.classList.remove("active");
      }
    });
  });

  mask.addEventListener("click", () => {
    navi.classList.remove("active");
    hamburgerMenu.classList.remove("active");
    mask.classList.remove("active");
  });

  window.addEventListener("load", () => {
    // IntersectionObserverのオプション
    const options = {
      root: null, // ビューポートを基準
      rootMargin: "0px",
      threshold: 0.1 // 要素が10%表示された時にコールバックを実行
    };

    // 共通の処理を行う関数
    function handleInView(entries, observer, className) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 要素が表示された場合
          entry.target.classList.add(className);
        }
      });
    }
    // ふわっとフェード表示の要素（複数の可能性）
    const fadeinElements = document.querySelectorAll(".item__img");
    console.log(fadeinElements);
    if (fadeinElements.length > 0) {
      const fadeinObserver = new IntersectionObserver((entries) => {
        handleInView(entries, fadeinObserver, "fadein");
      }, options);
      fadeinElements.forEach((el) => fadeinObserver.observe(el));
    }
  });



  //スワイパー
  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    centeredSlides: true, //アクティブなスライドを中央に表示
    slidesPerView: 1.5, //スライダーコンテナにスライドを3枚同時表示
    centeredSlidesBounds: true,
    spaceBetween: 16, //スライド間の距離を16pxに
    speed: 600,

    pagination: {
      el: ".swiper-pagination", //必須
      type: "bullets",
      clickable: "clickable"
    },

    breakpoints: {
      // スライドの表示枚数：500px以上の場合
      600: {
        slidesPerView: 3.5,
      }
    },

    pagination: {
      el: ".swiper-pagination", //必須
      clickable: "clickable",
    },

    autoplay: {
      disableOnInteraction: false //スライドに触っても自動再生を停止しない
    },

  });
});





