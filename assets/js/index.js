document.addEventListener('DOMContentLoaded', function () {
  uiDatepicker()
  uiSelects()
  counter()
  header()
  gallery()
  bannerSlider()
  popup()
  reviewsSlider()
})
window.addEventListener('load', () => {
  contacts()
})

function uiDatepicker() {
  const defaultSettings = {
    locale: 'ru',
    dateFormat: 'd.m.Y',
    disableMobile: false
  }
  const datepickersSingle = document.querySelectorAll('.ui-datepicker--single')
  for (const datepicker of datepickersSingle) {
    const datepickerSingle = datepicker.querySelector('input')
    flatpickr(datepickerSingle, defaultSettings)
  }
}

function uiSelects() {
  const selects = document.querySelectorAll('.ui-select select')
  for (const select of selects) {
    const selectParent = select.parentElement
    $(select).select2({
      minimumResultsForSearch: Number.POSITIVE_INFINITY,
      width: 'auto',
      dropdownAutoWidth: true,
      dropdownParent: selectParent
    })
  }
}

function bannerSlider() {
  const slider = new Swiper('.banner-slider .swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  })
}

function contacts() {
  if (document.querySelector('#contactsMapMain')) {
    ymaps.ready(
      mapInit('contactsMapMain', [44.409482, 34.025084])
    )
  }
  if (document.querySelector('#contactsMapInner')) {
    ymaps.ready(
      mapInit('contactsMapInner', [44.408931, 34.033517])
    )
  }
}

function counter() {
  $('.counter__btn').on('click', function () {
    const isNegative = $(this).hasClass('counter__btn--minus')
    const input = $(this).siblings('.counter__input')
    input[0][isNegative ? 'stepDown' : 'stepUp']()
  })
}

function gallery() {
  if (window.innerWidth < 768 && document.querySelector('.gallery')) {
    const sections = document.querySelectorAll('.gallery')
    for (const section of sections) {
      const itemsLength = section.querySelectorAll('.gallery__item').length
      const sectionAll = section.querySelector('.gallery__all')
      if (itemsLength > 5) {
        sectionAll.classList.add('gallery__all--visible')
      }
    }

    $('.gallery__ui-button').on('click', function () {
      const textStart = $(this).data('textStart')
      const textEnd = $(this).data('textEnd')
      const galleryMain = $(this).parents('.gallery')
      if ($(this).text().trim() === textStart) {
        $(this).text(textEnd)
        galleryMain.addClass('gallery__main--visible-all')
      } else {
        $(this).text(textStart)
        galleryMain.removeClass('gallery__main--visible-all')
      }
    })

    window.addEventListener('scroll', () => {
      const pageTop = this.scrollY
      const pageHeight = this.outerHeight / 2
      const items = document.querySelectorAll('.gallery__item')

      for (const item of items) {
        const frameTop = item.offsetTop
        const frameHeight = item.offsetHeight
        if (pageTop >= frameTop - pageHeight && pageTop < frameTop + frameHeight / 2) {
          for (const itemGallery of items) {
            itemGallery.classList.remove('gallery__item--loupe-active')
          }
          item.classList.add('gallery__item--loupe-active')
        }
      }
    })
  }
}

function header() {
  const burger = document.querySelector('.header__burger')
  const burgerOpen = document.querySelector('.header__open-burger')
  const burgerClose = document.querySelector('.header__close-burger')
  const html = document.querySelector('html')

  burgerOpen.addEventListener('click', () => {
    burger.classList.add('active')
    html.classList.add('lock-scroll')
  })

  burgerClose.addEventListener('click', () => {
    burger.classList.remove('active')
    html.classList.remove('lock-scroll')
  })

  window.addEventListener('load', () => {
    const headerHeight = document.querySelector('.header').offsetHeight
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`)
    headerFixed()
  })
  window.addEventListener('scroll', function () {
    headerFixed()
  })
}

function headerFixed() {
  const headerBlock = document.querySelector('.header')
  const scrollValue = $(window).scrollTop()
  scrollValue > 60 ? headerBlock.classList.add('header--scroll') : headerBlock.classList.remove('header--scroll')
}

function popup() {
  window.Fancybox = Fancybox

  Fancybox.defaults.ScrollLock = false

  window.openPopup = function (url) {
    getPopup(url)
  }
}

function getPopup(url) {
  Fancybox.show(
    [
      {
        src: url,
        preload: false
      }
    ],
    {
      mainClass: 'popup',
      parentEl: document.querySelector('.wrapper'),
      showClass: 'fancybox-fadeIn',
      hideClass: 'fancybox-fadeOut',
      hideScrollbar: true,
      autoFocus: true,
      trapFocus: true,
      dragToClose: false,
      animated: false
    }
  )
}

function mapInit(id, coords) {
  ymaps.ready(function () {
    let myMap
    myMap = new ymaps.Map(id, {
      center: coords,
      zoom: 15,
      controls: []
    }, {
      suppressMapOpenBlock: true
    })
    const placemark = new ymaps.Placemark(coords, {}, {
      iconColor: '#14bccc'
    })

    myMap.geoObjects.add(placemark)
    myMap.behaviors.disable('scrollZoom')
    if (window.innerWidth < 1025) {
      myMap.behaviors.disable('drag')
    }
  })
}

function reviewsSlider() {
  const slider = new Swiper('.reviews__slider .swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.reviews__nav .swiper-button-next',
      prevEl: '.reviews__nav .swiper-button-prev'
    },
    breakpoints: {
      1380: {
        slidesPerView: 3,
        spaceBetween: 44
      },
      767: {
        slidesPerView: 2
      }
    }
  })
}
