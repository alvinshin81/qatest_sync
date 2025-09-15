// QA 테스트 페이지 JavaScript

// appDb 데이터
const appDb = [
    {"phase": "Sandbox", "app": "광고QA발송테스트앱", "appId": "205776", "appKey": "e8917243a0fc51362b3cb787586fd481", "channel": "광고발송테스트_샌박"},
    {"phase": "Sandbox", "app": "광고QA카카오모먼트 API swagger", "appId": "205554", "appKey": "a9ce3768866d2259b6a984a33b65989d", "channel": "꽃길만걷자"},
    {"phase": "CBT", "app": "광고QA비즈앱", "appId": "290751", "appKey": "e745c87cd7e283708bb27d51d0110f01", "channel": "카.카.오.광.고.테.스.트"}
];

// 카카오 SDK 스크립트 URL
const scriptSrc = {
    'CBT': 'https://t1.kakaocdn.net/kakao_js_sdk/v1/kakao.js',
    'Sandbox': 'https://t1-sandbox.kakaocdn.net/kakao_js_sdk/sandbox/v1/kakao.js'
};

document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소 참조
    const mainPage = document.getElementById('main-page');
    const loginPage = document.getElementById('login-page');
    const signupPage = document.getElementById('signup-page');
    const signupCompletePage = document.getElementById('signup-complete-page');
    const dashboardPage = document.getElementById('dashboard-page');
    const kakaoResultPage = document.getElementById('kakao-result-page');
    
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const backToMainBtn = document.getElementById('back-to-main');
    const backToMainFromLoginBtn = document.getElementById('back-to-main-from-login');
    const goToDashboardBtn = document.getElementById('go-to-dashboard');
    const logoutBtn = document.getElementById('logout-btn');
    
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    // 카카오 로그인 관련 요소
    const phaseSelect = document.getElementById('phase-select');
    const kakaoLoginTestBtn = document.getElementById('kakao-login-test-btn');
    const appSelectionModal = document.getElementById('app-selection-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const appList = document.getElementById('app-list');
    const loginWithSelectedAppBtn = document.getElementById('login-with-selected-app');
    const retryBtn = document.getElementById('retry-btn');
    const loginResult = document.getElementById('login-result');
    
    // 선택된 앱 정보
    let selectedApp = null;

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

    // 이벤트 리스너 설정 (null 체크 포함)
    
    // 로그인 버튼 클릭
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            window.location.href = 'signup.html';
        });
    }

    // 회원가입 버튼 클릭
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            showPage(signupPage);
            // 입력 필드 초기화
            const signupId = document.getElementById('signup-id');
            const signupPassword = document.getElementById('signup-password');
            if (signupId) signupId.value = '';
            if (signupPassword) signupPassword.value = '';
        });
    }

    // 메인으로 돌아가기 버튼 (회원가입에서)
    if (backToMainBtn) {
        backToMainBtn.addEventListener('click', function() {
            showPage(mainPage);
        });
    }

    // 메인으로 돌아가기 버튼 (로그인에서)
    if (backToMainFromLoginBtn) {
        backToMainFromLoginBtn.addEventListener('click', function() {
            showPage(mainPage);
        });
    }

    // 대시보드로 이동 버튼
    if (goToDashboardBtn) {
        goToDashboardBtn.addEventListener('click', function() {
            showPage(dashboardPage);
        });
    }

    // 로그아웃 버튼
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            showPage(mainPage);
            showSuccessMessage('로그아웃되었습니다.');
        });
    }

    // 로그인 폼 제출 처리
    if (loginForm) {
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
    }

    // 회원가입 폼 제출 처리
    if (signupForm) {
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
    }

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

    // Phase 선택에 따른 버튼 활성화
    if (phaseSelect && kakaoLoginTestBtn) {
        phaseSelect.addEventListener('change', function() {
            const selectedPhase = this.value;
            console.log('Phase 선택됨:', selectedPhase);
            if (selectedPhase) {
                kakaoLoginTestBtn.disabled = false;
                kakaoLoginTestBtn.style.opacity = '1';
                kakaoLoginTestBtn.style.cursor = 'pointer';
                console.log('버튼 활성화됨');
            } else {
                kakaoLoginTestBtn.disabled = true;
                kakaoLoginTestBtn.style.opacity = '0.6';
                kakaoLoginTestBtn.style.cursor = 'not-allowed';
                console.log('버튼 비활성화됨');
            }
        });
    } else {
        console.error('Phase select 또는 카카오 로그인 버튼을 찾을 수 없습니다.');
        console.log('phaseSelect:', phaseSelect);
        console.log('kakaoLoginTestBtn:', kakaoLoginTestBtn);
    }

    // 카카오 로그인 테스트 버튼 클릭
    if (kakaoLoginTestBtn) {
        kakaoLoginTestBtn.addEventListener('click', function() {
            const selectedPhase = phaseSelect.value;
            if (!selectedPhase) return;
            
            showAppSelectionModal(selectedPhase);
        });
    }

    // 앱 선택 모달 표시
    function showAppSelectionModal(phase) {
        const filteredApps = appDb.filter(app => app.phase === phase);
        
        // 앱 목록 생성
        appList.innerHTML = '';
        filteredApps.forEach((app, index) => {
            const appItem = document.createElement('div');
            appItem.className = 'app-item';
            appItem.innerHTML = `
                <input type="radio" name="app-selection" value="${index}" id="app-${index}">
                <div class="app-info">
                    <div class="app-name">${app.app}</div>
                    <div class="app-details">앱 ID: ${app.appId} | 채널: ${app.channel}</div>
                </div>
                <span class="app-phase">${app.phase}</span>
            `;
            
            // 앱 선택 이벤트
            const radioBtn = appItem.querySelector('input[type="radio"]');
            appItem.addEventListener('click', function() {
                radioBtn.checked = true;
                selectedApp = filteredApps[index];
                
                // 선택된 앱 스타일 업데이트
                document.querySelectorAll('.app-item').forEach(item => {
                    item.classList.remove('selected');
                });
                appItem.classList.add('selected');
                
                // 로그인 버튼 활성화
                loginWithSelectedAppBtn.disabled = false;
            });
            
            appList.appendChild(appItem);
        });
        
        // 모달 표시
        appSelectionModal.classList.add('active');
        selectedApp = null;
        loginWithSelectedAppBtn.disabled = true;
    }

    // 모달 닫기
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            appSelectionModal.classList.remove('active');
        });
    }

    // 모달 배경 클릭으로 닫기
    if (appSelectionModal) {
        appSelectionModal.addEventListener('click', function(e) {
            if (e.target === appSelectionModal) {
                appSelectionModal.classList.remove('active');
            }
        });
    }

    // 선택된 앱으로 로그인
    if (loginWithSelectedAppBtn) {
        loginWithSelectedAppBtn.addEventListener('click', function() {
            if (!selectedApp) return;
            
            appSelectionModal.classList.remove('active');
            performKakaoLogin(selectedApp);
        });
    }

    // 카카오 로그인 수행
    function performKakaoLogin(app) {
        const phase = app.phase === 'CBT' ? 'CBT' : 'Sandbox';
        const scriptUrl = scriptSrc[phase];
        
        loginResult.innerHTML = `로그인 시도 중...\n앱: ${app.app}\n앱 ID: ${app.appId}\nPhase: ${app.phase}`;
        showPage(kakaoResultPage);
        
        loadScript(scriptUrl).then(() => {
            // 카카오 SDK 초기화
            if (window.Kakao) {
                Kakao.cleanup();
                Kakao.init(app.appKey);
                
                // 현재 URL 정보 로그
                console.log('현재 URL:', window.location.href);
                console.log('현재 도메인:', window.location.hostname);
                console.log('현재 포트:', window.location.port);
                console.log('사용 중인 앱 키:', app.appKey);
                console.log('Phase:', phase);
                
                // 카카오 로그인 실행 (모바일 대응)
                Kakao.Auth.login({
                    throughTalk: false,  // 카카오톡 앱 연동 비활성화
                    success: function (authObj) {
                        // 사용자 정보 요청
                        Kakao.API.request({
                            url: '/v2/user/me',
                            success: function (res) {
                                console.log('카카오 로그인 성공:', res);
                                
                                let resultText = `로그인 성공!\n\n`;
                                resultText += `앱: ${app.app}\n`;
                                resultText += `앱 ID: ${app.appId}\n`;
                                resultText += `Phase: ${app.phase}\n\n`;
                                resultText += `**회원번호: ${res.id}**\n`;
                                
                                if (res.kakao_account?.profile?.nickname) {
                                    resultText += `닉네임: ${res.kakao_account.profile.nickname}\n`;
                                }
                                
                                // HTML로 변환하여 볼드 처리
                                const htmlResult = resultText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                                loginResult.innerHTML = htmlResult.replace(/\n/g, '<br>');
                            },
                            fail: function (error) {
                                console.error('사용자 정보 요청 실패:', error);
                                loginResult.innerHTML = `사용자 정보 요청 실패\n\n에러: ${JSON.stringify(error, null, 2)}`;
                            }
                        });
                    },
                    fail: function (err) {
                        console.error('카카오 로그인 실패:', err);
                        loginResult.innerHTML = `로그인 실패\n\n에러: ${JSON.stringify(err, null, 2)}`;
                    }
                });
            }
        }).catch((error) => {
            console.error('스크립트 로드 실패:', error);
            const errorMsg = phase === 'Sandbox' ? 
                '스크립트 로드에 실패하였습니다.\n샌드박스 앱의 경우 사내망에서만 가능합니다.' : 
                '스크립트 로드에 실패하였습니다.';
            loginResult.innerHTML = `${errorMsg}\nPhase: ${phase}`;
        });
    }

    // 스크립트 동적 로드 함수
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const old = document.getElementById("kakao-script");
            if (old) {
                old.remove();
            }
            const script = document.createElement("script");
            script.id = "kakao-script";
            script.src = src;
            script.async = true;
            script.onload = () => resolve(script);
            script.onerror = (err) => reject(err);
            document.body.appendChild(script);
        });
    }

    // 재시도 버튼
    if (retryBtn) {
        retryBtn.addEventListener('click', function() {
            // 전체 상태 초기화
            if (phaseSelect) phaseSelect.value = '';
            if (kakaoLoginTestBtn) {
                kakaoLoginTestBtn.disabled = true;
                kakaoLoginTestBtn.style.opacity = '0.6';
                kakaoLoginTestBtn.style.cursor = 'not-allowed';
            }
            selectedApp = null;
            if (loginResult) loginResult.innerHTML = '';
            
            // 카카오 SDK 정리
            if (window.Kakao) {
                Kakao.cleanup();
            }
            
            // 메인 페이지로 복귀
            showPage(mainPage);
        });
    }

    // 개발자 도구용 헬퍼 함수
    window.QATest = {
        showMainPage: () => showPage(mainPage),
        showLoginPage: () => showPage(loginPage),
        showSignupPage: () => showPage(signupPage),
        showDashboard: () => showPage(dashboardPage),
        showKakaoResult: () => showPage(kakaoResultPage)
    };
});