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

  const postContainer = document.getElementById('postContainer');

  if (postContainer) {
    fetch('posts.json')
      .then(response => response.json())
      .then(posts => {
        let displayPosts = posts;

        // Show only first 3 posts on the homepage
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '/zenhomeflow.github.io/') {
          displayPosts = posts.slice(0, 3);
        }

        displayPosts.forEach(post => {
          const article = document.createElement('article');
          article.classList.add('post');

          article.innerHTML = `
            <h2><a href="${post.url}">${post.title}</a></h2>
            <p>${post.summary}</p>
          `;

          postContainer.appendChild(article);
        });
      })
      .catch(error => {
        console.error('Error loading posts:', error);
        postContainer.innerHTML = "<p>Failed to load posts.</p>";
      });
  }
});

