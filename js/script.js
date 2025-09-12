// QA 테스트 페이지 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소 참조
    const mainPage = document.getElementById('main-page');
    const loginPage = document.getElementById('login-page');
    const signupPage = document.getElementById('signup-page');
    const signupCompletePage = document.getElementById('signup-complete-page');
    const dashboardPage = document.getElementById('dashboard-page');
    
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const backToMainBtn = document.getElementById('back-to-main');
    const backToMainFromLoginBtn = document.getElementById('back-to-main-from-login');
    const goToDashboardBtn = document.getElementById('go-to-dashboard');
    const logoutBtn = document.getElementById('logout-btn');
    
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    // 페이지 전환 함수
    function showPage(pageToShow) {
        // 모든 페이지 숨기기
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => page.classList.remove('active'));
        
        // 지정된 페이지 보이기
        pageToShow.classList.add('active');
    }

    // 성공 메시지 표시 함수
    function showSuccessMessage(message) {
        // 간단한 알림 메시지
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
            z-index: 2000;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // 3초 후 제거
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // 이벤트 리스너 설정
    
    // 로그인 버튼 클릭
    loginBtn.addEventListener('click', function() {
        window.location.href = 'signup.html';
    });

    // 회원가입 버튼 클릭
    signupBtn.addEventListener('click', function() {
        showPage(signupPage);
        // 입력 필드 초기화
        document.getElementById('signup-id').value = '';
        document.getElementById('signup-password').value = '';
    });

    // 메인으로 돌아가기 버튼 (회원가입에서)
    backToMainBtn.addEventListener('click', function() {
        showPage(mainPage);
    });

    // 메인으로 돌아가기 버튼 (로그인에서)
    backToMainFromLoginBtn.addEventListener('click', function() {
        showPage(mainPage);
    });

    // 대시보드로 이동 버튼
    goToDashboardBtn.addEventListener('click', function() {
        showPage(dashboardPage);
    });

    // 로그아웃 버튼
    logoutBtn.addEventListener('click', function() {
        showPage(mainPage);
        showSuccessMessage('로그아웃되었습니다.');
    });

    // 로그인 폼 제출 처리
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userId = document.getElementById('login-id').value;
        const password = document.getElementById('login-password').value;
        
        // 간단한 검증 (테스트용)
        if (userId && password) {
            // 로그인 성공 시뮬레이션
            showSuccessMessage(`${userId}님, 환영합니다!`);
            showPage(dashboardPage);
        } else {
            alert('아이디와 비밀번호를 입력해주세요.');
        }
    });

    // 회원가입 폼 제출 처리
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userId = document.getElementById('signup-id').value;
        const password = document.getElementById('signup-password').value;
        
        // 간단한 검증
        if (userId && password) {
            if (userId.length < 3) {
                alert('아이디는 3자 이상이어야 합니다.');
                return;
            }
            if (password.length < 4) {
                alert('비밀번호는 4자 이상이어야 합니다.');
                return;
            }
            
            // 회원가입 성공
            showPage(signupCompletePage);
            showSuccessMessage('회원가입이 완료되었습니다!');
        } else {
            alert('모든 필드를 입력해주세요.');
        }
    });

    // 페이지 로드 시 초기화
    function initializePage() {
        // 메인 페이지를 기본으로 설정
        showPage(mainPage);
        
        // 배경 이미지 로드 확인
        const img = new Image();
        img.onload = function() {
            console.log('배경 이미지 로드 완료');
        };
        img.onerror = function() {
            console.warn('배경 이미지 로드 실패 - 기본 배경 사용');
        };
        img.src = 'rsc/bg_360x800.png';
    }

    // 페이지 초기화
    initializePage();

    // 개발자 도구용 헬퍼 함수
    window.QATest = {
        showMainPage: () => showPage(mainPage),
        showLoginPage: () => showPage(loginPage),
        showSignupPage: () => showPage(signupPage),
        showDashboard: () => showPage(dashboardPage)
    };
});