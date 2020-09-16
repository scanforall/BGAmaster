
function ready() {
  let body = document.querySelector('body');
  body.style.opacity = 0;

  setTimeout(pageLoadOpacity, 100);
  setTimeout(pageLoadOpacityRemove, 500);

  function pageLoadOpacity() {
    body.style.opacity = 1;
    body.style.transition = 'all 0.3s ease';
  }

  function pageLoadOpacityRemove() {
    body.style.opacity = 1;
    body.style.transition = 'none';
  }
}

document.addEventListener("DOMContentLoaded", ready);


var header = document.querySelector('.page-header');
var headerNav = document.querySelector('.header-nav-block');
var headerHolder = document.querySelector('.header-holder');
headerHolder.style.minHeight = (header.offsetHeight - headerNav.offsetHeight) + 'px';

window.onscroll = function showHeader() {
  if (window.pageYOffset > 100) {
    header.classList.add('header-fixed');
    citiesList.style.maxHeight = '0'; 
    city.classList.remove('rotate'); 
  } else {
    header.classList.remove('header-fixed')
  }
};


var citiesList = header.querySelector('.header-info-block__cities');
citiesList.setAttribute('data-height', citiesList.offsetHeight);
citiesList.style.maxHeight = '0';
var city = header.querySelector('.header-info-block__city');

city.addEventListener('click', function (evt) {
  evt.preventDefault();

  if (citiesList.style.maxHeight === '0px') {
    citiesList.style.maxHeight = citiesList.getAttribute('data-height') + 'px';
    city.classList.add('rotate');
  } else {
    citiesList.style.maxHeight = '0';
    city.classList.remove('rotate');
  }
});

$(document).on('click', 'a[data-scroll^="#"]', function (event) {
  event.preventDefault();

  $('html, body').animate({
    scrollTop: ($($.attr(this, 'data-scroll')).offset().top - 100)
  }, 700);
});

if (document.querySelector('.page-header') !== null) {

  let hamburger = document.querySelector('.page-header__mobile-hamburger');

  hamburger.addEventListener('click', function (evt) {
    evt.preventDefault();
    hamburger.classList.toggle('pressed');
    headerNav.classList.toggle('pressed');

    setTimeout(disabled, 0);
    setTimeout(enabled, 600);
  });

  function disabled() {
    hamburger.disabled = true;
  }

  function enabled() {
    hamburger.disabled = false;
  }
}

if (document.querySelector('.main-home-slider') !== null) {
  var mySwiper = new Swiper('.main-home-slider__container', {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 0,
    loop: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

if (document.querySelector('.models') !== null) {

  var modelItems = document.querySelectorAll('.model-slide');
  var modelItemsNum = modelItems.length;

  if (modelItemsNum <= 10) {

    var modelsLess = new Swiper('.models-slider__container', {
      slidesPerView: 1,
      slidesPerColumn: 1,
      spaceBetween: 0,
      slidesPerGroup: 1,

      breakpoints: {
        576: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },

        768: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },

        992: {
          slidesPerView: 4,
          slidesPerGroup: 3,
        },

        1200: {
          slidesPerView: 5,
          slidesPerGroup: 3,
        }
      },

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

  } else if (modelItemsNum > 10) {

    var modelsMore = new Swiper('.models-slider__container', {
      slidesPerView: 1,
      slidesPerColumn: 2,
      spaceBetween: 0,
      slidesPerGroup: 2,

      breakpoints: {

        576: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },

        768: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },

        992: {
          slidesPerView: 4,
          slidesPerGroup: 3,
        },

        1200: {
          slidesPerView: 5,
        },
      },

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    for (var i = 0; i < modelItems.length; i++) {
      document.querySelector('.models-slider__container').classList.add('more-than-five');
    }
  }
}


if (document.querySelector('.why-us') !== null && window.innerWidth < 767) {

  var advantages = document.querySelector('.why-us__row');
  var advantageItems = document.querySelectorAll('.why-us .why-us__col');
  var toAllButton = document.querySelector('.why-us__to-all-button');
  var advantageHeightSum = 59; 

  advantages.setAttribute('data-height', advantages.offsetHeight);

  for (var i = 0; i < 3; i++) {
    advantageHeightSum += advantageItems[i].offsetHeight;
  }

  advantages.style.maxHeight = advantageHeightSum + 'px';

  toAllButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    advantages.classList.toggle('opened');

    if (advantages.style.maxHeight === (advantageHeightSum + 'px')) {
      advantages.style.maxHeight = advantages.getAttribute('data-height') + 'px';
      toAllButton.innerHTML = "Скрыть"
    } else {
      advantages.style.maxHeight = advantageHeightSum + 'px';
      toAllButton.innerHTML = "Показать все"
    }
  })
}

if (document.querySelector('.inner-first-block') !== null) {

  var tabsAdvantages = document.querySelector('.introduction-inner + .tabs-advantages');
  var navItems = document.querySelectorAll('.inner-first-block .nav-tabs .nav-link');

  for (var i = 0; i < navItems.length; i++) {
    navItemClick(navItems[i]);
  }

  function navItemClick(navItem) {
    navItem.addEventListener('click', function () {

      if (this.classList.contains('active') && tabsAdvantages.classList.contains('tab-advantages-shown')) {
        tabsAdvantages.classList.remove('tab-advantages-shown');
      } else {
        tabsAdvantages.classList.add('tab-advantages-shown');
      }

    })
  }
}


if (document.querySelector('.brands') !== null) {
  var brandsBox = document.querySelector('.brands__items-box');
  var brandsBlock = document.querySelector('.brands__row');
  var toAllBrandsButton = document.querySelector('.brands__to-all-button');
  var toAllBrandsIcon = document.querySelector('.brands__to-all-icon');
  var brandsHeight = 0;

  toAllBrandsButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    brandsHeight = brandsBlock.offsetHeight;
    brandsBox.classList.toggle('expanded');
    toAllBrandsIcon.classList.toggle('rotate');

    if (brandsBox.offsetHeight <= 322) {
      brandsBox.style.maxHeight = brandsHeight + 'px';
    } else {
      brandsBox.style.maxHeight = '322px';
    }
  })
}

if (document.querySelector('.prices') !== null) {

  var tableContent = document.querySelector('.prices__table-content');
  var tableRows = document.querySelectorAll('.prices__table-row--item');
  var pricesButtonToAll = document.querySelector('.prices__table-show-wrapper');
  var pricesButtonToAllIcon = document.querySelector('.prices__table-show-icon');
  var tableRowHeight = 0;


  for (var i = 0; i < 4; i++) {
    tableRowHeight += tableRows[i].offsetHeight;
  }

  tableContent.setAttribute('data-height', tableContent.offsetHeight);
  var newHeight = tableRowHeight + 10;
  tableContent.style.maxHeight = newHeight + 'px';

  pricesButtonToAll.addEventListener('click', function() {
    if (tableContent.offsetHeight === newHeight) {
      tableContent.style.maxHeight = tableContent.getAttribute('data-height') + 'px';
      pricesButtonToAllIcon.classList.add('expanded');
    } else {
      tableContent.style.maxHeight = newHeight + 'px';
      pricesButtonToAllIcon.classList.remove('expanded');
    }
  })
}

$('.nav-tabs a').click(function(){
  $(this).tab('show');
});


if (document.querySelector('.price-calculator') !== null) {
  var malItems = document.querySelectorAll('.price-calculator__malfunction-item-wrapper');
  var costInfo = document.querySelector('.price-calculator__cost');

  for (var i = 0; i < malItems.length; i++) {
    malItemClick(malItems[i]);
  }

  function malItemClick(malItem) {
    var itemSelected = 0;

    malItem.addEventListener('click', function() {
      for (var k = 0; k < malItems.length; k++) {
        if (malItems[k].classList.contains('active')) {
          itemSelected++;
        }
      }

      if (itemSelected > 1) {
        malItem.classList.remove('active');
        itemSelected = 0;
      } else if (itemSelected < 2) {
        malItem.classList.add('active');
        itemSelected = 1;
      }

      malItemsChecker();
    });
  }

  function malItemsChecker() {
    var activeNum = 0;

    for (var j = 0; j < malItems.length; j++) {
      if (malItems[j].classList.contains('active')) {
        activeNum++;
      }
    }

    if (activeNum > 0) {
      costInfo.classList.add('shown');
    } else {
      costInfo.classList.remove('shown');
    }
  }

  var calculateButton = document.querySelector('.price-calculator__cost-button');
  var modalSumValue = document.querySelector('.modal-calсulator__value-sum');
  var modalMalfunctons = document.querySelector('.price-calculator__modal-malfunctons');
  var modalMalInfo = document.querySelector('.modal-calсulator__malfunction-information');


  calculateButton.addEventListener('click', function () {
    var priceSum = 0;
    var arrayOfActivated = [];
    var numOfActivated = 0;

    for (var s = 0; s < malItems.length; s++) {
      if (malItems[s].classList.contains('active')) {
        numOfActivated = arrayOfActivated.length + 1;
        arrayOfActivated.push(malItems[s]);
        priceSum += parseInt(malItems[s].querySelector('.price-calculator__malfunction-item-price').textContent);
      }
    }

    modalSumValue.innerHTML = priceSum;

    while (modalMalfunctons.firstChild || modalMalInfo.firstChild) {
      modalMalfunctons.firstChild.remove();
      modalMalInfo.firstChild.remove();
    }

    var itemFirst = arrayOfActivated[0];
    var itemFirstClone = itemFirst.cloneNode(true);
    var itemFirstDesc = itemFirst.querySelector('.price-calculator__malfunction-item-description');
    var itemFirstDescClone = itemFirstDesc.cloneNode(true);

    if (numOfActivated < 2) {
      modalMalfunctons.appendChild(itemFirstClone);
      modalMalInfo.appendChild(itemFirstDescClone);

    } else if ((numOfActivated === 2)) {
      var itemSecond = arrayOfActivated[1];
      var itemSecondClone = itemSecond.cloneNode(true);
      var itemSecondDesc = itemSecond.querySelector('.price-calculator__malfunction-item-description');
      var itemSecondDescClone = itemSecondDesc.cloneNode(true);

      modalMalfunctons.appendChild(itemFirstClone);
      modalMalInfo.appendChild(itemFirstDescClone);
      modalMalfunctons.appendChild(itemSecondClone);
      modalMalInfo.appendChild(itemSecondDescClone);
    }

  })
}




/*
ymaps.ready(init);

function init () {
  var myMap;

  $('#map-toggle').bind({
    click: function () {
      if (!myMap) {
        myMap = new ymaps.Map('map', {
          center: [55.64652564884731,37.26629580555723],
          zoom: 18
        }, {
          searchControlProvider: 'yandex#search'
        });

                MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'Москва, ул. Киевская, 15',
        }, {
          iconLayout: 'default#image',
          iconImageHref: 'img/icons/placeholder.svg',
          iconImageSize: [30, 42],
          iconImageOffset: [-5, -38]
        });

        myMap.geoObjects.add(myPlacemark);

        $("#map-toggle").attr('value', 'Скрыть карту');

                $("#map-toggle").remove();

      } else {
        myMap.destroy();
        myMap = null;
        $("#map-toggle").attr('value', 'Показать карту снова');
      }
    }
  });
}

*/
