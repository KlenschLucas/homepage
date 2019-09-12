const date = () => {
  const currentDate = new Date();
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const date = currentDate.toLocaleDateString('en-GB', dateOptions);
  document.getElementById('header_date').innerHTML = date;
};

const greet = () => {
  const currentTime = new Date();
  const greet = Math.floor(currentTime.getHours() / 6);
  switch (greet) {
    case 0:
      document.getElementById('header_greet').innerHTML = 'Good night Klensch';
      break;
    case 1:
      document.getElementById('header_greet').innerHTML =
        'Good morning Klensch';
      break;
    case 2:
      document.getElementById('header_greet').innerHTML =
        'Good afternoon Klensch';
      break;
    case 3:
      document.getElementById('header_greet').innerHTML =
        'Good evening Klensch';
      break;
    default:
      break;
  }
};

const loadFunctions = () => {
  date();
  greet();
};
