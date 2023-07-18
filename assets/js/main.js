/**
 * 화제의 쇼핑라이브 데이터 바인딩
 * 
 * 첫번째 fetch문 - 라이브 리스트 
 * liveMain 함수 - 메인 이미지 
 * */
fetch('./assets/data/shoppingLiveData.json')
.then((response) => response.json())
.then((json) => {
    data = json.items;
    let html = '';
    data.forEach(element => {
        html += `<li class="live-item" role="tab" aria-selected="${element.snippet.selected}">
                    <a href="${element.id}" class="live">
                        <svg width="85" height="98" viewBox="0 0 85 98" focusable="false" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.998 0a8 8 0 0 0-8 8v35.08L1.38 47.713a1 1 0 0 0 0 1.572l5.618 4.635V90a8 8 0 0 0 8 8h61.999a8 8 0 0 0 8-8v-1.78C85 88.148 85 88.075 85 88V78h-.002V8a8 8 0 0 0-8-8h-62Zm67 78h-72V8a5 5 0 0 1 5-5h62a5 5 0 0 1 5 5v70Z" fill="#6563F0"></path></svg>
                        <div class="img-box">
                            <img src="${element.snippet.thumbnail.side}" alt="${element.snippet.title}">
                        </div>
                        <div class="text-box">
                            <em>${element.snippet.thumbnail.time}</em>
                        </div>
                    </a>
                </li>`
    });
    document.getElementById('liveList1').innerHTML = html;
})

function liveMain(number) {
    fetch('./assets/data/shoppingLiveData.json')
    .then((response) => response.json())
    .then((json) => {
        data = json.items;
        let result = data.filter(function (parm) {return parm.id == number});
        let html = '';
        result.forEach(element => {
            html += `<div role="tabpanel" class="content" aria-selected="true">
                        <div class="time-box"><strong>${element.snippet.time}</strong></div>
                        <div class="img-box">
                            <img src="${element.snippet.thumbnail.normal}">
                        </div>
                        <div class="text-box">
                            <div class="info-area">
                                <strong class="title">${element.snippet.title}</strong>
                                <em class="news">${element.snippet.wait}명이 기다리는 중</em>
                            </div>
                            <div class="alarm-area">
                                <a href="" class="link-alarm">
                                    <svg width="14" height="14" viewBox="0 0 15 15" xmlns="https://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M14.927 9.437h-2.188V7.25h-1.042v2.187H9.51v1.042h2.187v2.188h1.042v-2.188h2.188V9.437zm-8.542 4.271a2.284 2.284 0 01-1.922-1.042h3.844a2.284 2.284 0 01-1.922 1.042h0zm4.27-1.042v-.833H1.052l.699-1.255a.418.418 0 00.052-.203V6.416a4.589 4.589 0 014.583-4.583 4.59 4.59 0 014.579 4.375h.834A5.424 5.424 0 006.385 1 5.423 5.423 0 00.968 6.416v3.85l-.903 1.628a.522.522 0 00.456.772h3a3.115 3.115 0 002.864 1.875 3.115 3.115 0 002.865-1.875h1.406z" fill="#F2312E"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>`
        });
        document.getElementById('liveMain1').innerHTML = html;
    })
}
liveMain(0);

// 아이템 클릭했을 때 해당 아이템을 가져옴
liveList1.addEventListener('click',(e)=>{
    e.preventDefault();
    const live = document.querySelectorAll('.section.hot .live-item .live');

    for ( let i = 0; i < live.length; i++ ) {
        live[i].addEventListener('click', function(e){
            e.preventDefault();
            let aHref =  this.getAttribute('href');

            for( let j = 0; j < live.length; j++ ) { 
                live[j].parentElement.setAttribute('aria-selected','false'); 
            }
            this.parentElement.setAttribute('aria-selected','true');
            liveMain(aHref);
        })
    }
})

/**
 * 인기 급상습 숏클립 
 * : 리스트를 5개까지만 보여주도록 함.
 * @index : 수를 증가시키기 위한 변수 
*/
fetch('./assets/data/trendItemData.json')
.then((response) => response.json())
.then((json) => {
    data = json.items;
    let html = '';
    let index = 1;
    data.forEach(element => {
        if ( index > 5 ) { return false; }
        html += `<li class="swiper-slide popular-item">
                    <a href="" class="link-sale">
                        <div class="img-area">
                            <div class="view-box">
                                <i class="icon-clip"></i>
                                <span class="count">${element.snippet.view}</span>
                            </div>
                            <div class="brand-box">
                                <img src="${element.snippet.market.thumbnail}">
                            </div>
                            <div class="img-box">
                                <video src="${element.snippet.thumbnail}" autoplay loop muted>
                            </div>
                        </div>
                        <div class="text-area">
                            <p class="title">${element.snippet.title}</p>
                        </div>
                    </a>
                </li>`
                index++;
    });
    document.getElementById('popularList').innerHTML = html;
})

/**
 * 현재 시간 구하는 함수
 */
function currentTime() {
    const current = new Date();
    let currentMonth = current.getMonth()+1;
    let currentDay = current.getDate();
    let currentHour = current.getHours();
    let localHour = currentHour > 12 ? currentHour - 12 : currentHour;
    let currentMin = current.getMinutes();

    if ( currentHour <= 12 ) {
        time = `${currentMonth}월 ${currentDay}일 오전 ${localHour}시 ${currentMin}분 기준`;
    } else {
        time = `${currentMonth}월 ${currentDay}일 오후 ${localHour}시 ${currentMin}분 기준`;
    }

    html = `<span class="time">${time}</span>`;

    document.getElementById('currentTime').innerHTML = html;
}
currentTime();
setInterval(()=>{
    currentTime();
},60000)


// 탭메뉴 라이브 1 
function typeLive(sort){
    fetch('./assets/data/shortclipData.json')
    .then((response) => response.json())
    .then((json) => {
        data = json.items;
        result = data.filter(function (parm) {return parm.sort == sort})
        let html = '';
        result.forEach(element => {
            html += `<li class="content-item">
                        <a href="" class="link-sale">
                            <div class="img-area">
                                <div class="view-box">
                                    <i class="icon-clip"></i>
                                    <span class="count">${element.snippet.view} 시청</span>
                                </div>
                                <div class="brand-box">
                                    <img src="${element.snippet.market}">
                                </div>
                                <div class="img-box">
                                    <video src="${element.snippet.thumbnail}" autoplay muted loop>
                                </div>
                            </div>
                            <div class="text-area">
                                <p class="title">${element.snippet.title}</p>
                            </div>
                        </a>
                    </li>`
        });
        document.getElementById('typeLive').innerHTML = html;
    })
}
typeLive(1);

/**
 * 요즘 대세! 인기라이브 JSON
 * @rank : 순위 숫자
 * @sort
 * [1-뷰티]
 * [2-푸드]
 * [3-패션]
 * [4-라이프]
 * [5-여행/체험]
 * [6-키즈]
 * [7-테크]
 * [8-취미레저]
*/
function trendLive(sort){
    fetch('./assets/data/trendItemData.json')
    .then((response) => response.json())
    .then((json) => {
        data = json.items;
        result = (sort === 'all') ? data : data.filter(function (parm) {return parm.sort == sort})
        let html = '';
        let rank = 1;
        result.forEach(element => {
            if ( rank > 10 ) { return false; }
            html += `<li class="swiper-slide swiper-slide slide-item">
                        <a href="" class="link-sale">
                            <div class="img-area">
                                <div class="ranking-box"><strong class="rank">${rank}</strong></div>
                                <div class="view-box">
                                    <i class="icon-view"><svg width="11" height="11" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" class="VideoViewCount_icon_view_oRS93"><path d="M5.286 2.514c-2.256 0-4.153 1.28-4.715 2.75.562 1.47 2.46 2.75 4.715 2.75S9.438 6.734 10 5.264c-.562-1.47-2.46-2.75-4.714-2.75zm0 4.479c-.978 0-1.77-.774-1.77-1.729 0-.954.792-1.728 1.77-1.728s1.77.774 1.77 1.728c0 .955-.792 1.729-1.77 1.729zm0-2.395a.675.675 0 0 0-.683.666c0 .368.306.667.683.667a.675.675 0 0 0 .682-.667.675.675 0 0 0-.682-.666z" fill="#FFF"></path></svg></i>
                                    <span class="count">${element.snippet.view} 시청</span>
                                </div>
                                <div class="thumb-box">
                                    <div class="img-wrap"><img src="${element.snippet.prd.thumbnail}"></div>
                                    <div class="text-wrap">
                                        <p class="title">${element.snippet.prd.title}</p>
                                        <strong class="price">${element.snippet.prd.price}원</strong>
                                    </div>
                                </div>
                                <div class="img-box"><video src="${element.snippet.thumbnail}" autoplay loop muted></div>
                            </div>
                            <div class="text-area"><p class="title">${element.snippet.title}</p></div>
                            <a href="" class="market-area">
                                <div class="img-box"><img src="${element.snippet.market.thumbnail}"></div>
                                <div class="name-box"><span>${element.snippet.market.name}</span></div>
                            </a>
                        </a>
                    </li>`
                    rank++;
        });
        document.getElementById('trendLive').innerHTML = html;
    })
}
trendLive('all');    

/**
 *  탭메뉴 클릭 시
 *  : 메뉴에 해당하는 라이브 목록 나오도록 하기 (sort 변수로 뷴류)
 *  : 메뉴 스타일 변경
 * 
 * @sort : 메뉴의 data-sort 속성 값을 저장, 몇 번 메뉴인지 구분을 위한 변수.
 * @livesort : 메뉴의 조상 ul이 가진 data-livesort 속성 값을 저장, 어떤 라이브의 탭메뉴인지 구분을 위한 변수.
 */
function tabMenuClick(menu) {
    for ( let i = 0; i < menu.length; i++ ) {
        menu[i].addEventListener('click', function(e){
            e.preventDefault();

            let sort = this.dataset.sort;
            let livesort = this.parentNode.parentNode.dataset.livesort;
    
            for ( let j = 0; j < menu.length; j++ ) { 
                menu[j].setAttribute('aria-selected','false'); 
            }
            this.setAttribute('aria-selected','true');

            if ( livesort == 1 ) {
                typeLive(sort);
            } else if ( livesort == 2 ) {
                trendLive(sort);
            }
        })
    }
}
const typeTabMenu = document.querySelectorAll('.section.type .menu-item .menu');
const trendTabMenu = document.querySelectorAll('.section.trend .menu-item .menu');

tabMenuClick(typeTabMenu);
tabMenuClick(trendTabMenu);

/**
 * 카테고리별 아이템 리스트 
 *  @sort 
 * [1-뷰티]
 * [2-푸드]
 * [3-패션]
 * */ 
function categoryList(sort,frame){
    fetch('./assets/data/categoryItemData.json')
    .then((response) => response.json())
    .then((json) => {
        data = json.items;
        let html = '';
        result = data.filter(function (parm) {return parm.sort == sort})
        result.forEach(element => {
            html += `<li class="swiper-slide slide-item">
                        <a href="" class="link-slide">
                            <div class="img-area">
                                <div class="view-box">
                                    <i class="icon-view">
                                        <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" class="VideoViewCount_icon_view_oRS93"><path d="M5.286 2.514c-2.256 0-4.153 1.28-4.715 2.75.562 1.47 2.46 2.75 4.715 2.75S9.438 6.734 10 5.264c-.562-1.47-2.46-2.75-4.714-2.75zm0 4.479c-.978 0-1.77-.774-1.77-1.729 0-.954.792-1.728 1.77-1.728s1.77.774 1.77 1.728c0 .955-.792 1.729-1.77 1.729zm0-2.395a.675.675 0 0 0-.683.666c0 .368.306.667.683.667a.675.675 0 0 0 .682-.667.675.675 0 0 0-.682-.666z" fill="#FFF"></path></svg>
                                    </i>
                                    <span class="count">${element.snippet.view} 시청</span>
                                </div>
                                <div class="img-box">
                                    <img src="${element.snippet.thumbnail}">
                                </div>
                            </div>
                            <div class="text-area">
                                <p class="title">${element.snippet.title}</p>
                            </div>
                        </a>
                        <a href="" class="market-area">
                            <span>${element.snippet.market}</span>
                        </a>
                    </li>`
        });
        document.querySelector(frame).innerHTML = html;
    })
}
categoryList(1, '#categoryBeautyList');
categoryList(2, '#categoryFoodList');
categoryList(3, '#categoryFashionList');

// 카테고리 스와이퍼 
const swiper1 = new Swiper(".cate-slide", {
    pagination: {
        el: ".swiper-pagination",
    }
});
// 라이브찬스 슬라이드
const swiper2 = new Swiper(".section.chance .group-slide", {
    slidesPerView: "auto",
    spaceBetween: 20,
    freeMode: true,
});
const swiper3 = new Swiper(".section.popular .group-slide", {
    slidesPerView: "auto",
    spaceBetween: 10,
    freeMode: true
});
const swiper4 = new Swiper(".section.type .group-menu", {
    slidesPerView: "auto",
    freeMode: true,
});
const swiper5 = new Swiper(".section.trend .group-menu", {
    slidesPerView: "auto",
    spaceBetween: 8,
    freeMode: true,
});
const swiper6 = new Swiper(".section.trend .group-slide", {
    slidesPerView: "auto",
    spaceBetween: 10,
    freeMode: true,
});

//원더랜드 페스타
const swiper7 = new Swiper(".section.theme .group-slide", {
    slidesPerView: "auto",
    spaceBetween: 10,
});

const swiper8 = new Swiper(".section.livetheme .group-slide", {
    slidesPerView: "auto",
    spaceBetween: 10,
    freeMode: true,
});




