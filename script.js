document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseover', () => {
    btn.style.boxShadow = '0 0 40px #00f2ff';
  });
});
