// 目前没有交互功能，可以在这里添加

// 添加平滑滚动效果
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 移除所有active类
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        // 添加active类到当前点击的链接
        this.classList.add('active');

        // 隐藏所有section
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active-section');
        });

        // 显示目标section
        const targetSection = document.querySelector(this.getAttribute('href'));
        if (targetSection) {
            targetSection.classList.add('active-section');
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 添加页面加载欢迎信息
window.addEventListener('load', function() {
    console.log("欢迎来到 Fortune Club!");
});

// 添加页面滚动效果
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// 初始化页面动画
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.5s ease-in-out';
    });
});

// 搜索快捷键
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('.search-bar input').focus();
    }
});

// 页面滚动时的动画效果
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-out');
    observer.observe(section);
});

// 初始化active状态
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    let currentSection = '';

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = '#' + section.id;
        }
    });

    document.querySelectorAll('nav a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === currentSection) {
            a.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// 初始化：确保第一个section可见
document.addEventListener('DOMContentLoaded', function() {
    const firstSection = document.querySelector('section');
    if (firstSection) {
        firstSection.classList.add('active-section');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('nav a');
    
    // 为每个链接添加点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取目标section的id
            const targetId = this.getAttribute('href').substring(1);
            
            // 隐藏所有section
            document.querySelectorAll('main section').forEach(section => {
                section.classList.remove('active-section');
                section.style.opacity = '1';  // 重置透明度
                section.style.transform = 'none';  // 重置变换
            });
            
            // 显示目标section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active-section');
            }
            
            // 更新活动链接样式
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // 初始化：确保第一个section可见并重置样式
    const firstSection = document.querySelector('#fortune-club');
    if (firstSection) {
        firstSection.classList.add('active-section');
        firstSection.style.opacity = '1';
        firstSection.style.transform = 'none';
    }
});

// 在现有代码后添加导航按钮功能
document.addEventListener('DOMContentLoaded', function() {
    const sections = [
        'fortune-club',
        'fortune-alpha',
        '新人必读',
        '小白入门',
        '金狗秘籍',
        '复盘日记',
        '好文分享',
        '工具推荐',
        '注意安全'
    ];

    function updateNavButtons() {
        const currentSection = document.querySelector('section.active-section');
        const currentIndex = sections.indexOf(currentSection.id);
        
        // 移除旧的导航按钮
        const oldNav = currentSection.querySelector('.page-navigation');
        if (oldNav) oldNav.remove();
        
        // 创建新的导航按钮
        const navHTML = `
            <div class="page-navigation">
                <div class="nav-buttons">
                    <a class="nav-button prev">
                        <div class="nav-content">
                            <span class="nav-direction">Previous</span>
                            <span class="nav-title"></span>
                        </div>
                    </a>
                    <a class="nav-button next">
                        <div class="nav-content">
                            <span class="nav-direction">Next</span>
                            <span class="nav-title"></span>
                        </div>
                    </a>
                </div>
            </div>
        `;
        
        currentSection.insertAdjacentHTML('beforeend', navHTML);
        
        const prevButton = currentSection.querySelector('.nav-button.prev');
        const nextButton = currentSection.querySelector('.nav-button.next');
        
        // 更新按钮状态和内容
        if (currentIndex > 0) {
            const prevSection = document.getElementById(sections[currentIndex - 1]);
            prevButton.style.display = 'flex';
            prevButton.querySelector('.nav-title').textContent = prevSection.querySelector('h1, h2').textContent;
            prevButton.onclick = () => {
                document.querySelector(`nav a[href="#${sections[currentIndex - 1]}"]`).click();
            };
        } else {
            prevButton.style.display = 'none';
        }
        
        if (currentIndex < sections.length - 1) {
            const nextSection = document.getElementById(sections[currentIndex + 1]);
            nextButton.style.display = 'flex';
            nextButton.querySelector('.nav-title').textContent = nextSection.querySelector('h1, h2').textContent;
            nextButton.onclick = () => {
                document.querySelector(`nav a[href="#${sections[currentIndex + 1]}"]`).click();
            };
        } else {
            nextButton.style.display = 'none';
        }
    }

    // 在section切换时更新导航按钮
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(updateNavButtons, 0);
        });
    });

    // 初始化导航按钮
    updateNavButtons();
});
