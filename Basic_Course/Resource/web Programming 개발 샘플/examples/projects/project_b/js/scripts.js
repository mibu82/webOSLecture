document.addEventListener('DOMContentLoaded', () => {
    const nightModeToggle = document.getElementById('nightModeToggle');
    const profilePic = document.getElementById('profilePic');
    const postEntryButton = document.getElementById('postEntry');
    const guestbookEntry = document.getElementById('guestbookEntry');
    const guestbookList = document.getElementById('guestbookList');

    // 나이트 모드 토글
    nightModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
    });

    // 프로필 사진에 마우스 포커스 시 배경색 랜덤 변경
    profilePic.addEventListener('mouseenter', () => {
        profilePic.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    });

    // 프로필 사진에 마우스 포커스 해제 시 배경색 투명으로 변경
    profilePic.addEventListener('mouseleave', () => {
        profilePic.style.backgroundColor = 'transparent';
    });

    // 방명록 항목 추가 함수
    function addGuestbookEntry(entryText, saveToLocalStorage = true) {
        const entryDiv = document.createElement('div');
        entryDiv.textContent = entryText;

        // 삭제 버튼 추가
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.classList.add('deleteButton');
        deleteButton.addEventListener('click', () => {
            guestbookList.removeChild(entryDiv);
            removeFromLocalStorage(entryText);
        });

        entryDiv.appendChild(deleteButton);
        guestbookList.appendChild(entryDiv);

        // 로컬 스토리지에 방명록 추가
        if (saveToLocalStorage) {
            let guestbookEntries = localStorage.getItem('guestbookEntries');
            if (guestbookEntries) {
                guestbookEntries = JSON.parse(guestbookEntries);
            } else {
                guestbookEntries = [];
            }
            guestbookEntries.push(entryText);
            localStorage.setItem('guestbookEntries', JSON.stringify(guestbookEntries));
        }
    }

    // 방명록 로컬 스토리지에서 삭제 함수
    function removeFromLocalStorage(entryText) {
        let guestbookEntries = localStorage.getItem('guestbookEntries');
        if (guestbookEntries) {
            guestbookEntries = JSON.parse(guestbookEntries);
            guestbookEntries = guestbookEntries.filter(entry => entry !== entryText);
            localStorage.setItem('guestbookEntries', JSON.stringify(guestbookEntries));
        }
    }

    // 방명록 게시 버튼 클릭 이벤트
    postEntryButton.addEventListener('click', () => {
        const entryText = guestbookEntry.value;
        if (entryText) {
            addGuestbookEntry(entryText);
            guestbookEntry.value = '';
        }
    });

    // 로컬 스토리지에서 방명록 불러오기
    const savedEntries = localStorage.getItem('guestbookEntries');
    if (savedEntries) {
        const entries = JSON.parse(savedEntries);
        entries.forEach(entry => {
            addGuestbookEntry(entry, false);
        });
    }
});
