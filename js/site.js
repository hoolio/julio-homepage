// Load posts and populate the page
(async function () {
  const postList = document.getElementById('post-list');
  const ticker = document.getElementById('ticker');

  let posts = [];
  try {
    const res = await fetch('/posts/index.json');
    posts = await res.json();
  } catch (e) {
    // If we can't fetch posts (e.g. file:// protocol), fail silently
    return;
  }

  // Populate post list
  if (postList) {
    posts.forEach(post => {
      const li = document.createElement('li');
      li.className = 'post-item';
      li.innerHTML = `
        <span class="post-date">${post.date}</span>
        <span class="post-title"><a href="/posts/${post.slug}.html">${post.title}</a></span>
      `;
      postList.appendChild(li);
    });

    if (posts.length === 0) {
      postList.innerHTML = '<li class="post-item"><span class="post-date">---</span><span class="post-title" style="color: var(--text-faint);">nothing yet</span></li>';
    }
  }

  // Populate ticker (duplicate content for seamless loop)
  if (ticker && posts.length > 0) {
    const items = posts.map(post =>
      `<span class="ticker-item"><span class="date">${post.date}</span><a href="/posts/${post.slug}.html">${post.title}</a></span>`
    );
    // Need enough content to fill the viewport and loop seamlessly
    const repeated = items.join('') + items.join('') + items.join('') + items.join('');
    ticker.innerHTML = repeated;
  }
})();
