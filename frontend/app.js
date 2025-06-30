// ==== Enhanced Data with Progress Tracking ====
const groups = [{
    "id": 1,
    "title": "Group 1: s, a, t",
    "description": "Start learning s, a, t phonics and practice",
    "letters": ["s", "a", "t"],
    "songs": [{
        "letter": "s",
        "label": "S Song",
        "audio": "audio/s-song.mp3"
    },
    {
        "letter": "a",
        "label": "A Song",
        "audio": "audio/a-song.mp3"
    },
    {
        "letter": "t",
        "label": "T Song",
        "audio": "audio/t-song.mp3"
    }],
    "phonics": [{
        "letter": "s",
        "ipa": "/s/",
        "audio": "audio/s.mp3",
        "color": "pink",
        "hint": "Keep teeth close, let air flow to make a hissing sound"
    },
    {
        "letter": "a",
        "ipa": "/æ/",
        "audio": "audio/a.mp3",
        "color": "blue",
        "hint": "Open mouth, tongue flat"
    },
    {
        "letter": "t",
        "ipa": "/t/",
        "audio": "audio/t.mp3",
        "color": "green",
        "hint": "Touch tongue tip to upper gum, then release quickly"
    }],
    "cards": [{
        "letter": "s",
        "label": "S /s/",
        "draggable": true
    },
    {
        "letter": "a",
        "label": "A /æ/",
        "draggable": true
    },
    {
        "letter": "t",
        "label": "T /t/",
        "draggable": true
    }],
    "images": [{
        "letter": "s",
        "word": "Strawberry"
    },
    {
        "letter": "a",
        "word": "Apple"
    },
    {
        "letter": "t",
        "word": "Tiger"
    }],
    "spellingPractice": {
        "words": ["a", "as", "at", "sat", "tat", "stat"]
    },
    "nextGroupId": 2
},
{
    "id": 2,
    "title": "Group 2: i, p, n",
    "description": "Learn i, p, n phonics and practice",
    "letters": ["i", "p", "n"],
    "songs": [{
        "letter": "i",
        "label": "I Song",
        "audio": "audio/i-song.mp3"
    },
    {
        "letter": "p",
        "label": "P Song",
        "audio": "audio/p-song.mp3"
    },
    {
        "letter": "n",
        "label": "N Song",
        "audio": "audio/n-song.mp3"
    }],
    "phonics": [{
        "letter": "i",
        "ipa": "/ɪ/",
        "audio": "audio/i.mp3",
        "color": "purple",
        "hint": "Mouth slightly open, tongue near upper teeth"
    },
    {
        "letter": "p",
        "ipa": "/p/",
        "audio": "audio/p.mp3",
        "color": "teal",
        "hint": "Close lips then release with air"
    },
    {
        "letter": "n",
        "ipa": "/n/",
        "audio": "audio/n.mp3",
        "color": "orange",
        "hint": "Touch tongue tip to upper gum, sound through nose"
    }],
    "cards": [{
        "letter": "i",
        "label": "I /ɪ/",
        "draggable": true
    },
    {
        "letter": "p",
        "label": "P /p/",
        "draggable": true
    },
    {
        "letter": "n",
        "label": "N /n/",
        "draggable": true
    }],
    "images": [{
        "letter": "i",
        "word": "Ink"
    },
    {
        "letter": "p",
        "word": "Penguin"
    },
    {
        "letter": "n",
        "word": "Net"
    }],
    "spellingPractice": {
        "words": ["in", "pin", "nip", "pit", "sit", "spin", "snap"]
    },
    "nextGroupId": 3
}];

let currentGroupId = 1;

// ==== DOM Elements ====
const groupList = document.getElementById("groupList");
const groupContent = document.getElementById("content");
const startAdventureBtn = document.getElementById("startAdventureBtn");
const groupTitle = document.getElementById("group-title");
const groupDescription = document.getElementById("group-description");

// ==== Audio Loading State Management ====
const audioLoadingStates = new Map();

function setAudioLoading(buttonElement, isLoading) {
    if (isLoading) {
        buttonElement.disabled = true;
        buttonElement.innerHTML = `
            <div class="loading-spinner mr-2"></div>
            載入中...
        `;
    } else {
        buttonElement.disabled = false;
        buttonElement.innerHTML = buttonElement.dataset.originalText || '播放';
    }
}

// ==== Enhanced Render Group Buttons ====
function renderGroupButtons() {
    if (!groupList) {
        console.error('groupList element not found');
        return;
    }
    
    groupList.innerHTML = '';
    groups.forEach(group => {
        const isUnlocked = group.id === 1 || isGroupUnlocked(group.id);
        const completionStatus = getGroupCompletionStatus(group.id);
        
        const card = document.createElement("div");
        card.className = `bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${!isUnlocked ? 'opacity-50' : ''}`;
        card.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-semibold">${group.title}</h3>
                ${completionStatus.isCompleted ? 
                    '<div class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">已完成</div>' : 
                    completionStatus.progress > 0 ? 
                    '<div class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">進行中</div>' : 
                    ''
                }
            </div>
            <p class="text-gray-600 mb-4">${group.description}</p>
            <div class="flex items-center space-x-2 mb-4">
                ${group.letters.map(letter => `
                    <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                        ${letter.toUpperCase()}
                    </span>
                `).join('')}
            </div>
            ${completionStatus.progress > 0 ? `
                <div class="mb-4">
                    <div class="flex justify-between text-sm text-gray-600 mb-1">
                        <span>進度</span>
                        <span>${Math.round(completionStatus.progress * 100)}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-blue-600 h-2 rounded-full" style="width: ${completionStatus.progress * 100}%"></div>
                    </div>
                </div>
            ` : ''}
            <button class="mt-4 w-full px-4 py-2 rounded transition-colors ${
                isUnlocked ? 
                'bg-blue-600 text-white hover:bg-blue-700' : 
                'bg-gray-300 text-gray-500 cursor-not-allowed'
            }" ${!isUnlocked ? 'disabled' : ''}>
                ${isUnlocked ? '開始學習' : '需要解鎖'}
            </button>
        `;

        if (isUnlocked) {
            card.querySelector('button').addEventListener('click', () => {
                currentGroupId = group.id;
                renderGroup(group.id);
                groupList.style.display = "none";
                startAdventureBtn.style.display = "none";
                
                // Track group start
                if (typeof trackActivity === 'function') {
                    trackActivity('group_start', group.id);
                }
                
                // Analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'group_start', {
                        group_id: group.id,
                        group_title: group.title
                    });
                }
            });
        }

        groupList.appendChild(card);
    });
}

// ==== Progress Tracking Functions ====
function isGroupUnlocked(groupId) {
    if (groupId === 1) return true;
    
    // Check if previous group is completed
    const prevGroupStatus = getGroupCompletionStatus(groupId - 1);
    return prevGroupStatus.isCompleted;
}

function getGroupCompletionStatus(groupId) {
    const group = groups.find(g => g.id === groupId);
    if (!group) return { isCompleted: false, progress: 0 };
    
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    const completedActivities = userProgress.completedActivities || [];
    
    // Count different types of activities
    const phonicsCompleted = group.phonics.filter(p => 
        completedActivities.includes(`phonics-${groupId}-${p.letter}`)
    ).length;
    
    const songsCompleted = group.songs.filter(s => 
        completedActivities.includes(`song-${groupId}-${s.letter}`)
    ).length;
    
    const wordsCompleted = group.spellingPractice.words.filter(w => 
        completedActivities.includes(`word-${groupId}-${w}`)
    ).length;
    
    const totalActivities = group.phonics.length + group.songs.length + group.spellingPractice.words.length;
    const completedCount = phonicsCompleted + songsCompleted + wordsCompleted;
    
    const progress = totalActivities > 0 ? completedCount / totalActivities : 0;
    const isCompleted = progress >= 0.8; // 80% completion threshold
    
    return { isCompleted, progress, completedCount, totalActivities };
}

// ==== Enhanced Render Group Content ====
function renderGroup(id) {
    const group = groups.find(g => g.id === id);
    if (!group) {
        console.error(`Group ${id} not found`);
        if (typeof show404 === 'function') {
            show404();
        }
        return;
    }

    groupTitle.textContent = group.title;
    groupDescription.textContent = group.description;
    groupContent.innerHTML = "";

    // Phonics Section
    const phonicsSection = document.createElement("section");
    phonicsSection.className = "mb-12";
    phonicsSection.innerHTML = `
        <h2 class="text-2xl font-bold mb-6">自然發音練習</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${group.phonics.map(p => {
                const isCompleted = isActivityCompleted(`phonics-${id}-${p.letter}`);
                return `
                    <div class="bg-white rounded-lg shadow-md p-6 ${isCompleted ? 'ring-2 ring-green-500' : ''}">
                        <div class="flex justify-between items-start mb-4">
                            <div class="text-4xl font-bold text-${p.color}-600">${p.letter.toUpperCase()}</div>
                            ${isCompleted ? '<div class="text-green-500">✓</div>' : ''}
                        </div>
                        <div class="text-xl mb-2">${p.ipa}</div>
                        <p class="text-gray-600 mb-4">${p.hint}</p>
                        <button 
                            onclick="playAudioWithTracking('${p.audio}', 'phonics', '${id}', '${p.letter}')" 
                            data-original-text="聽發音"
                            class="w-full bg-${p.color}-100 text-${p.color}-600 px-4 py-2 rounded hover:bg-${p.color}-200 transition-colors"
                            aria-label="播放 ${p.letter} 的發音"
                        >
                            聽發音
                        </button>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    groupContent.appendChild(phonicsSection);

    // Songs Section
    const songsSection = document.createElement("section");
    songsSection.className = "mb-12";
    songsSection.innerHTML = `
        <h2 class="text-2xl font-bold mb-6">自然發音歌曲</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${group.songs.map(s => {
                const isCompleted = isActivityCompleted(`song-${id}-${s.letter}`);
                return `
                    <div class="bg-white rounded-lg shadow-md p-6 ${isCompleted ? 'ring-2 ring-green-500' : ''}">
                        <div class="flex justify-between items-start mb-4">
                            <div class="text-2xl font-bold">${s.label}</div>
                            ${isCompleted ? '<div class="text-green-500">✓</div>' : ''}
                        </div>
                        <button 
                            onclick="playAudioWithTracking('${s.audio}', 'song', '${id}', '${s.letter}')"
                            data-original-text="播放歌曲"
                            class="w-full bg-purple-100 text-purple-600 px-4 py-2 rounded hover:bg-purple-200 transition-colors"
                            aria-label="播放 ${s.label}"
                        >
                            播放歌曲
                        </button>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    groupContent.appendChild(songsSection);

    // Spelling Practice Section
    const spellingSection = document.createElement("section");
    spellingSection.className = "mb-12";
    spellingSection.innerHTML = `
        <h2 class="text-2xl font-bold mb-6">拼字練習</h2>
        <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex flex-wrap gap-2 mb-4">
                ${group.spellingPractice.words.map(word => {
                    const isCompleted = isActivityCompleted(`word-${id}-${word}`);
                    return `
                        <button 
                            onclick="speakWordWithTracking('${word}', '${id}')"
                            class="px-4 py-2 rounded transition-colors ${
                                isCompleted ? 
                                'bg-green-100 text-green-800 ring-2 ring-green-500' : 
                                'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }"
                            aria-label="聽 ${word} 的發音"
                        >
                            ${word} ${isCompleted ? '✓' : ''}
                        </button>
                    `;
                }).join('')}
            </div>
            <div class="text-gray-600">
                點擊單字聽發音練習
            </div>
        </div>
    `;
    groupContent.appendChild(spellingSection);

    // Navigation
    const nav = document.createElement("div");
    nav.className = "flex justify-between items-center mt-8";
    nav.innerHTML = `
        <button onclick="goBack()" class="text-blue-600 hover:text-blue-800 flex items-center">
            ← 回到群組選擇
        </button>
        ${group.nextGroupId && isGroupUnlocked(group.nextGroupId) ? `
            <button onclick="renderGroup(${group.nextGroupId})" 
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
                下一組 →
            </button>
        ` : group.nextGroupId ? `
            <button class="bg-gray-300 text-gray-500 px-4 py-2 rounded cursor-not-allowed" disabled>
                下一組 (需解鎖)
            </button>
        ` : ''}
    `;
    groupContent.appendChild(nav);
}

// ==== Activity Completion Tracking ====
function isActivityCompleted(activityKey) {
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    const completedActivities = userProgress.completedActivities || [];
    return completedActivities.includes(activityKey);
}

// ==== Enhanced Audio Functions with Progress Tracking ====
function playAudioWithTracking(src, type, groupId, letterId) {
    const activityKey = `${type}-${groupId}-${letterId}`;
    
    // Find the button that was clicked
    const button = event.target;
    setAudioLoading(button, true);
    
    const audio = new Audio(src);
    
    audio.addEventListener('loadstart', () => {
        console.log('Audio loading started');
    });
    
    audio.addEventListener('canplaythrough', () => {
        setAudioLoading(button, false);
        audio.play().then(() => {
            // Track completion
            if (typeof trackActivity === 'function') {
                trackActivity(type, `${groupId}-${letterId}`);
            }
            
            // Update UI to show completion
            if (!isActivityCompleted(activityKey)) {
                const card = button.closest('.bg-white');
                if (card) {
                    card.classList.add('ring-2', 'ring-green-500');
                    const checkmark = document.createElement('div');
                    checkmark.className = 'text-green-500';
                    checkmark.textContent = '✓';
                    card.querySelector('.flex.justify-between')?.appendChild(checkmark);
                }
            }
            
            // Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'audio_played', {
                    audio_type: type,
                    group_id: groupId,
                    letter_id: letterId
                });
            }
        }).catch(err => {
            console.log('Audio play failed:', err);
            setAudioLoading(button, false);
            speakWordWithTracking(letterId, groupId);
        });
    });
    
    audio.addEventListener('error', (e) => {
        console.log('Audio loading failed:', e);
        setAudioLoading(button, false);
        
        // Fallback to speech synthesis
        speakWordWithTracking(letterId, groupId);
        
        // Show user-friendly error message
        if (typeof showMessage === 'function') {
            showMessage('音檔載入失敗，使用語音合成播放', 'error');
        }
    });
    
    // Set a timeout for loading
    setTimeout(() => {
        if (button.disabled) {
            setAudioLoading(button, false);
            speakWordWithTracking(letterId, groupId);
        }
    }, 5000);
}

function speakWordWithTracking(text, groupId) {
    const activityKey = `word-${groupId}-${text}`;
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        
        utterance.onstart = () => {
            // Track completion
            if (typeof trackActivity === 'function') {
                trackActivity('word', `${groupId}-${text}`);
            }
            
            // Update UI
            const button = event?.target;
            if (button && !isActivityCompleted(activityKey)) {
                button.classList.add('bg-green-100', 'text-green-800', 'ring-2', 'ring-green-500');
                button.innerHTML = `${text} ✓`;
            }
            
            // Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'word_spoken', {
                    word: text,
                    group_id: groupId
                });
            }
        };
        
        utterance.onerror = () => {
            if (typeof showMessage === 'function') {
                showMessage('語音播放失敗，請檢查瀏覽器設定', 'error');
            }
        };
        
        speechSynthesis.speak(utterance);
    } else {
        if (typeof showMessage === 'function') {
            showMessage('您的瀏覽器不支援語音播放功能', 'error');
        }
    }
}

// ==== Navigation Functions ====
function goBack() {
    groupList.style.display = "grid";
    startAdventureBtn.style.display = "block";
    groupContent.innerHTML = "";
    groupTitle.textContent = "LadderLessons Phonics";
    groupDescription.textContent = "一起學習有趣的字母音素吧！選擇一組開始學習，或從第一組開始冒險！";
    
    // Update progress display
    if (typeof updateProgressDisplay === 'function') {
        updateProgressDisplay();
    }
}

// ==== Start Adventure Button ====
if (startAdventureBtn) {
    startAdventureBtn.addEventListener("click", () => {
        currentGroupId = 1;
        renderGroup(currentGroupId);
        groupList.style.display = "none";
        startAdventureBtn.style.display = "none";
        
        // Track adventure start
        if (typeof trackActivity === 'function') {
            trackActivity('adventure_start', '1');
        }
        
        // Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'adventure_start');
        }
    });
}

// ==== Error Handling ====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    if (typeof showMessage === 'function') {
        showMessage('發生錯誤，請重新整理頁面', 'error');
    }
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    if (typeof showMessage === 'function') {
        showMessage('載入失敗，請檢查網路連線', 'error');
    }
});

// ==== Initialize ====
console.log("Enhanced game script loaded with progress tracking!");

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof renderGroupButtons === 'function') {
            renderGroupButtons();
        }
    });
} else {
    // DOM is already ready
    if (typeof renderGroupButtons === 'function') {
        renderGroupButtons();
    }
}

// Override the global renderGroupButtons function
window.renderGroupButtons = renderGroupButtons;
