// Dashboard 페이지 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소 참조
    const logoutBtn = document.getElementById('logout-btn');

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
        }, 1000);
    }

    // 이벤트 리스너 설정
    
    // 로그아웃 버튼
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            showSuccessMessage('로그아웃되었습니다.');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }

    // 페이지 로드 시 초기화
    function initializePage() {
        // 배경 이미지 로드 확인
        const img = new Image();
        img.onload = function() {
            console.log('배경 이미지 로드 완료');
        };
        img.onerror = function() {
            console.warn('배경 이미지 로드 실패 - 기본 배경 사용');
        };
        img.src = 'rsc/bg_360x800.png';

        // 환영 메시지 표시
        setTimeout(() => {
            showSuccessMessage('대시보드에 오신 것을 환영합니다!');
        }, 500);
    }

    // 대시보드 데이터 업데이트 함수 (시뮬레이션)
    function updateDashboardData() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        // 랜덤하게 숫자 업데이트 (테스트 시뮬레이션)
        setInterval(() => {
            statNumbers.forEach(stat => {
                const currentValue = parseInt(stat.textContent);
                const change = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
                const newValue = Math.max(0, currentValue + change);
                stat.textContent = newValue;
            });
        }, 10000); // 10초마다 업데이트
    }

    // 페이지 초기화
    initializePage();
    updateDashboardData();

    // 개발자 도구용 헬퍼 함수
    window.QATest = {
        logout: () => logoutBtn.click(),
        updateStats: updateDashboardData
    };
});