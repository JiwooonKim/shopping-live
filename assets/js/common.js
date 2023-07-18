/**
 * 토글버튼 클릭 함수 : 클릭 시, on 가상클래스 toggle
 * @sortBtn : 시청순/구매순 버튼
 * @infoBtn : 푸터 네이버 사업자 정보 버튼
 */
function toggleBtnClick(btn) {
    for ( let i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', function(){
            this.parentElement.classList.toggle('on');
        })
    }
}
const sortBtn = document.querySelectorAll('.select-area .btn-sort');
const infoBtn = document.querySelectorAll('.footer .btn-info');
toggleBtnClick(sortBtn);
toggleBtnClick(infoBtn);

/**
 * 가이드 버튼
 * 
 * @guideBtn : 가이드 아이콘 버튼
 * @closeBtn : 닫기 버튼
 */
const guideBtn = document.querySelectorAll('.btn-guide');
const closeBtn =  document.querySelectorAll('.button-wrap .btn-close');
for ( let i = 0; i < guideBtn.length; i++) {
    guideBtn[i].addEventListener('click', function(){
        this.nextElementSibling.classList.add('on');
    })
}
for ( let i = 0; i < closeBtn.length; i++) {
    closeBtn[i].addEventListener('click', function(){
        this.parentElement.classList.remove('on');
    })
}
