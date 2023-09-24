const newPostDashboard = document.querySelector('#new_post_dashboard');
const new_post_card = document.querySelector('#new_post_card');
const submitButton = document.querySelector('#submit_new_blog');



newPostDashboard.addEventListener('click', () => {
  new_post_card.style.display = 'block';
});

const handleNewBlogSubmit = async (e) => {
  e.preventDefault();

  const title = document.querySelector('#new_blog_title').value.trim();
  const text = document.querySelector('#new_blog_content').value.trim();

  if (title && text) {
    const response = await fetch('/api/blog', {
      method: 'POST',
      body: JSON.stringify({ title, text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response);
    if (response.ok) {
      new_post_card.style.display = 'none';
      window.location.reload();
    } else {
      alert('Failed to create project');
    }
  }
};



submitButton.addEventListener('click', handleNewBlogSubmit);
