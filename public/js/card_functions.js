const deleteBlog = async (id, card) => {

  const response = await fetch(`/api/blog/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    card.remove();
  } else {
    return console.log(`You can't delete that which doesn't exist`);
  }

  location.reload();
};

const openEditor = async (id) => {

  await fetch(`/api/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ is_editing: true }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  location.reload();
};

const handleUpdateSubmit = async (id, title, text) => {

  if (title && text) {
    const response = await fetch(`/api/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, text, is_editing: false }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert('Failed to update');
    }
  }
};

const handleCancel = async (id) => {

  await fetch(`/api/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ is_editing: false }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  location.reload();
};

const openComments = async (id, card) => {
  const commentList = card.querySelector('#comment_list');
  commentList.innerHTML = '';

  const response = await fetch(`/api/blog/${id}/comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const commentsData = await response.json(); // Parse JSON response

  const length = commentsData.comments.length;

  if (length <= 0) {
    commentList.innerHTML = 'No Comments Yet';
    commentList.style.color = 'black';
  }

  for (let i = 0; i < commentsData.comments.length; i++) {
    commentList.innerHTML += `
    <li style="width: 100%; display: flex; justify-content: space-between; margin: 10px 0px;">
      <div style="color: var(--font-color);">
        ${commentsData.comments[i].text}
      </div>
      <div style="color: var(--font-color);">
        ${commentsData.comments[i].user.username} on ${dayjs(
          commentsData.comments[i].createdAt,
        ).format('MM/DD/YYYY')}
      </div
    </li>`;
  }
};

const handleNewCommentSubmit = async (blog_id, card) => {

  const textField = card.querySelector('#new_comment');

  const text = textField.value;

  const response = await fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({ text, blog_id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  openComments(blog_id, card);

  if (!response.ok) {
    console.log('Oops, something went wrong!');
  }
};

document.addEventListener('click', async (event) => {
  const target = event.target;
  const card = target.closest('.card'); // Find the closest parent with the .card class

  if (!card) {
    return; // Click didn't happen within a card, exit
  }

  const blogId = card.getAttribute('data-id');

  if (target.matches('.comment-button')) {
    // Handle comment button click
    const commentState = target.getAttribute('data-state');

    const commentSection = card.querySelector('#comments_section');
    if (commentState === 'closed') {
      target.setAttribute('data-state', 'open');
      target.innerHTML = 'Hide Comments';
      commentSection.style.display = 'flex';
      openComments(blogId, card);
    } else {
      target.innerHTML = 'Comments';
      commentSection.style.display = 'none';
      target.setAttribute('data-state', 'closed');
    }
  } else if (target.matches('#add_comment')) {
    // Handle add comment button click
    const addCommentDisplay = card.querySelector('#add_comment_display');
    if (addCommentDisplay.style.display === 'none') {
      target.innerHTML = 'Cancel';
      addCommentDisplay.style.display = 'block';
    } else {
      target.innerHTML = 'Add Comment +';
      addCommentDisplay.style.display = 'none';
    }
  } else if (target.matches('#submit_new_comment')) {
    // Handle submit new comment button click
    handleNewCommentSubmit(blogId, card);
  } else if (target.matches('.edit_button')) {
    openEditor(blogId);
  } else if (target.matches('.delete_button')) {
    deleteBlog(blogId, target);
  } else if (target.matches('.edit_button')) {
    openEditor(blogId);
  } else if (target.matches('.save_button')) {
    const title = card.querySelector('#new_blog_title').value.trim();
    const text = card.querySelector('#new_blog_content').value.trim();
    handleUpdateSubmit(blogId, title, text);
  } else if (target.matches('.cancel_button')) {
    handleCancel(blogId, card);
  }
});
