document.addEventListener('DOMContentLoaded', function () {
  const mobileMenu = document.getElementById('mobile-menu');
  const navList = document.querySelector('.nav-list');
  const toggleDark = document.getElementById('toggle-dark');

  if (mobileMenu && navList) {
    mobileMenu.addEventListener('click', () => {
      navList.classList.toggle('active');
    });
  }

  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }

  if (toggleDark) {
    toggleDark.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const mode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', mode);
    });
  }

  // Search filter for posts.html
  const searchInput = document.getElementById('searchInput');
  const postsList = document.getElementById('postsList');

  if (searchInput && postsList) {
    const posts = postsList.getElementsByClassName('post');

    searchInput.addEventListener('input', function () {
      const filter = this.value.toLowerCase();
      Array.from(posts).forEach(post => {
        const text = post.textContent.toLowerCase();
        post.style.display = text.includes(filter) ? '' : 'none';
      });
    });
  }
});
