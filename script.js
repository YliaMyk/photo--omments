let comments = [];
let form = document.getElementById('form');

const showComments = (comments) => {
  let fotoComments = document.getElementById('comments');
  countComments(comments);
  let out = ``;
  comments.forEach(element => {
    let id = comments.indexOf(element);
    let comment = createComment(element, id);
    out += comment;
  });
  if (!!out) {
    fotoComments.innerHTML = out;
  }
}

const countComments = (comments) => {
  let countComments = document.getElementById('count_comments');
  countComments.textContent = comments.length;
}

const delComment = (elem) => {
  comments.slice(elem.id, 1);
  elem.parentNode.parentNode.remove();
}

const createComment = (element, id) => {
  let out = `<div class="comment">`;
  out += `<div class="comment__info">`;
  out += `<p class="comment__name">${element.name}</p>`;
  out += `<p class="comment__text">${element.text.replaceAll( "\n", "<br>" )}</p>`;
  out += `<p class="comment__date">${correctDate(element.date)}</p>`;
  out += `</div>`;
  out += '<div class="comment__btns">';
  out += `<button class="btns btns__del" id='${id}' onclick="delComment(this)">`;
  out += `<img class="btns__icon" src="img/icon/del.svg">`;
  out += '</button>';
  out += '<button class="btns btns__like" onclick="liked(this)">';
  out += `<img class="btns__icon" id="img_${id}" src="img/icon/like_contur.svg">`;
  out += '</button>';
  out += '</div>';
  out += '</div>';
  return  out;
}

const correctDate = (date) => {
  let today = new Date().toLocaleDateString('en-ca');
  let tommorrow = new Date(new Date() - 86400000).toLocaleDateString('en-ca');
  switch (date) {
    case today:
      return 'сегодня, 16:23';
      break;
    case tommorrow:
      return 'вчера, 18:39';
      break;
    case '':
      return 'сегодня, 16:23';
      break;
    default:
      return date + ' 13:50';
  }
}

const liked = (elem) => {
  let id = elem.children[0].id;
  let img = document.getElementById(id);
  if (img.src.indexOf('like_contur') !== -1) {
    img.src = 'img/icon/like.svg';
    return
  }
  img.src = 'img/icon/like_contur.svg';
}

const clearForm = () => {
  let commentName = document.getElementById('comment_name');
  let commentText = document.getElementById('comment_text');
  let commentDate = document.getElementById('comment_date');
  commentName.value = '';
  commentText.value = '';
  commentDate.value = '';
}

const submitComment = () => {
  let commentName = document.getElementById('comment_name');
  let commentText = document.getElementById('comment_text');
  let commentDate = document.getElementById('comment_date');
  if (!commentName.value || !commentText.value) {
    alert('Не заполнен логин или текст комментария!');
    return
  }
  let comment = {
    name: commentName.value,
    text: commentText.value,
    date: commentDate.value
  };
  comments.push(comment);
  showComments(comments);
  clearForm();
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  submitComment();
});